import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/athletex/sports")({
  component: () => <Outlet />,
});
