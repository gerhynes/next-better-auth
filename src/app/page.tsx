"use client";

import { BetterAuthActionButton } from "@/components/auth/better-auth-action-button";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending: loading } = authClient.useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-6 px-4 max-w-md mx-auto">
      {session == null ? (
        <>
          <h1 className="text-center space-y-6 text-3xl">Welcome to Our App</h1>
          <Button asChild size="lg">
            <Link href="/auth/login">Sign In / Sign Up</Link>
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-center space-y-6 text-3xl">
            Welcome {session.user.name}
          </h1>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/profile">Profile</Link>
            </Button>
          </div>
          <BetterAuthActionButton
            size="lg"
            variant="destructive"
            action={() => authClient.signOut()}
          >
            Sign Out
          </BetterAuthActionButton>
        </>
      )}
    </div>
  );
}
