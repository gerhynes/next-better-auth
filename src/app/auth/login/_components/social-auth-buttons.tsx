"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  SUPPORTED_OAUTH_PROVIDERS,
  SUPPORTEDOAUTH_PROVIDERDETAILS,
} from "@/lib/oauth-providers";

export function SocialAuthButtons() {
  return SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
    const Icon = SUPPORTEDOAUTH_PROVIDERDETAILS[provider].Icon;

    return (
      <Button
        variant="outline"
        key={provider}
        onClick={() => authClient.signIn.social({ provider, callbackURL: "/" })}
      >
        <Icon />
        {SUPPORTEDOAUTH_PROVIDERDETAILS[provider].name}
      </Button>
    );
  });
}
