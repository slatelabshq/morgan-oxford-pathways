import type { EnquiryInput } from "./schemas";

export type SubmitResult =
  | { ok: true; ref: string }
  | {
      ok: false;
      status: number;
      errors?: Record<string, string[]>;
      message?: string;
    };

export async function submitEnquiry(input: EnquiryInput): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...input, started_at: Date.now() - 2000 }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      ref?: string;
      errors?: Record<string, string[]>;
      message?: string;
    };
    if (res.ok && data.ok && data.ref) {
      return { ok: true, ref: data.ref };
    }
    return {
      ok: false,
      status: res.status,
      errors: data.errors,
      message: data.message ?? "Something went wrong. Please try again.",
    };
  } catch {
    return {
      ok: false,
      status: 0,
      message:
        "We couldn't reach the server — check your connection and try again.",
    };
  }
}
