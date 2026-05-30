"use client";

import { Suspense } from "react";
import ResetPassword from "./_components/reset-password";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPassword />
    </Suspense>
  );
}
