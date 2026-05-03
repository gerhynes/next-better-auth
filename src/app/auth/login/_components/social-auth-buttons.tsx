"use client";
import { BetterAuthActionButton } from "@/components/auth/better-auth-action-button";
import { authClient } from "@/lib/auth/auth-client";
import {
  SUPPORTED_OAUTH_PROVIDERS,
  SUPPORTEDOAUTH_PROVIDERDETAILS,
} from "@/lib/auth/oauth-providers";

export function SocialAuthButtons() {
  return SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
    const Icon = SUPPORTEDOAUTH_PROVIDERDETAILS[provider].Icon;

    return (
      <BetterAuthActionButton
        variant="outline"
        key={provider}
        action={() => {
          return authClient.signIn.social({ provider, callbackURL: "/" });
        }}
      >
        <Icon />
        {SUPPORTEDOAUTH_PROVIDERDETAILS[provider].name}
      </BetterAuthActionButton>
    );
  });
}
