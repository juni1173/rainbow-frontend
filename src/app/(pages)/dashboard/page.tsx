import { Suspense } from "react";
import Dashboard from "@/src/views/Dashboard";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
