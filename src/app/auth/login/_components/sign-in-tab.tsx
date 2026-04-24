"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const SignInSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(6),
});

type SignInForm = z.infer<typeof SignInSchema>;

export function SignInTab({
  openEmailVerificationTab,
}: {
  openEmailVerificationTab: (email: string) => void;
}) {
  const router = useRouter();
  const form = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleSignIn(data: SignInForm) {
    await authClient.signIn.email(
      { ...data, callbackURL: "/" },
      {
        onError: (error) => {
          if (error.error.code == "EMAIL_NOT_VERIFIED") {
            openEmailVerificationTab(data.email);
          }
          toast.error(error.error.message || "Failed to sign in");
        },
        onSuccess: () => {
          router.push("/");
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSignIn)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          <LoadingSwap isLoading={isSubmitting}>Sign In</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
