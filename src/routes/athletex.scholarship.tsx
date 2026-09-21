import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/athletex/scholarship")({
  beforeLoad: () => {
    throw redirect({ to: "/athletex/enquiry" });
  },
});
