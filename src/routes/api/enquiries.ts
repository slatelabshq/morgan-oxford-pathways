import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "crypto";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiries/schemas";

function makeRef() {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < 8; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

function formDataToObject(fd: FormData): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const key of new Set(fd.keys())) {
    const values = fd.getAll(key);
    if (key === "consent" || key === "marketing_opt_in") {
      obj[key] = values.some((v) => v === "on" || v === "true");
    } else if (key === "document_names") {
      obj[key] = values.map((v) => String(v)).filter(Boolean);
    } else if (key === "documents") {
      const names = values
        .map((v) => (v instanceof File ? v.name : ""))
        .filter(Boolean);
      obj["document_names"] = names;
    } else {
      obj[key] = values.length > 1 ? values.map(String) : String(values[0]);
    }
  }
  return obj;
}

function zodErrorsToMap(issues: import("zod").ZodIssue[]) {
  const map: Record<string, string[]> = {};
  for (const issue of issues) {
    const key = issue.path.join(".") || "_form";
    (map[key] ||= []).push(issue.message);
  }
  return map;
}

export const Route = createFileRoute("/api/enquiries")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const contentType = request.headers.get("content-type") || "";
        const wantsJson =
          contentType.includes("application/json") ||
          request.headers.get("accept")?.includes("application/json");

        let rawInput: Record<string, unknown> = {};
        let redirectTo = "/enquiry/thanks";
        let startedAt: number | undefined;

        if (contentType.includes("application/json")) {
          const body = (await request.json().catch(() => ({}))) as Record<
            string,
            unknown
          >;
          startedAt = Number(body.started_at) || undefined;
          delete body.started_at;
          rawInput = body;
        } else {
          const fd = await request.formData();
          startedAt = Number(fd.get("started_at")) || undefined;
          const redirectVal = fd.get("redirect");
          if (typeof redirectVal === "string" && redirectVal.startsWith("/")) {
            redirectTo = redirectVal;
          }
          rawInput = formDataToObject(fd);
          delete rawInput.started_at;
          delete rawInput.redirect;
        }

        // Honeypot: silently accept but do not process.
        if (rawInput.company_website && String(rawInput.company_website).length > 0) {
          return wantsJson
            ? Response.json({ ok: true, ref: "IGNORED0" })
            : new Response(null, {
                status: 303,
                headers: { Location: `${redirectTo}?kind=${rawInput.kind ?? ""}` },
              });
        }

        // Timing: reject impossibly fast submits.
        if (startedAt && Date.now() - startedAt < 1500) {
          return wantsJson
            ? Response.json({ ok: true, ref: "IGNORED0" })
            : new Response(null, {
                status: 303,
                headers: { Location: `${redirectTo}?kind=${rawInput.kind ?? ""}` },
              });
        }

        const parsed = enquirySchema.safeParse(rawInput);
        if (!parsed.success) {
          const errors = zodErrorsToMap(parsed.error.issues);
          if (wantsJson) {
            return Response.json(
              { ok: false, errors, message: "Please fix the highlighted fields." },
              { status: 422 },
            );
          }
          const params = new URLSearchParams();
          params.set("kind", String(rawInput.kind ?? ""));
          params.set("errors", Object.keys(errors).join(","));
          const referer = request.headers.get("referer");
          const back = referer ?? "/enquire";
          return new Response(null, {
            status: 303,
            headers: { Location: `${back}?${params.toString()}` },
          });
        }

        const input = parsed.data as EnquiryInput;
        const ref = makeRef();

        const forwardedFor =
          request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "";
        const ipHash = forwardedFor
          ? createHash("sha256")
              .update(forwardedFor + (process.env.SUPABASE_PROJECT_ID ?? ""))
              .digest("hex")
              .slice(0, 32)
          : null;
        const userAgent = request.headers.get("user-agent")?.slice(0, 500) ?? null;

        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );

        // Strip fields we store as columns from the payload for cleanliness.
        const { kind, ...payload } = input as Record<string, unknown> & {
          kind: string;
        };
        const email = String(
          (payload as Record<string, unknown>).email ??
            (payload as Record<string, unknown>).parent_email ??
            "",
        );
        delete (payload as Record<string, unknown>).company_website;

        const dbKind =
          kind === "parent"
            ? "contact"
            : kind === "scout"
              ? "general"
              : (kind as "general" | "school_placement" | "athletex" | "contact");

        const { error } = await supabaseAdmin.from("enquiries").insert({
          kind: dbKind,
          ref,
          email: email || `unknown+${ref}@morganoxford.local`,
          payload: payload as never,
          ip_hash: ipHash,
          user_agent: userAgent,
        });

        if (error) {
          console.error("[enquiries] insert failed", error);
          if (wantsJson) {
            return Response.json(
              {
                ok: false,
                message:
                  "We couldn't save your enquiry right now — please try again in a moment.",
              },
              { status: 500 },
            );
          }
          return new Response(null, {
            status: 303,
            headers: {
              Location: `${redirectTo}?kind=${kind}&error=1`,
            },
          });
        }

        if (wantsJson) return Response.json({ ok: true, ref });
        return new Response(null, {
          status: 303,
          headers: {
            Location: `${redirectTo}?kind=${kind}&ref=${ref}`,
          },
        });
      },
    },
  },
});
