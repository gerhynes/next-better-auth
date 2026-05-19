"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth/auth-client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(1),
  revokeOtherSessions: z.boolean(),
});

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
  const form = useForm<ChangePasswordForm>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      revokeOtherSessions: true,
    },
  });

  const { isSubmitting } = form.formState;

  async function handlePasswordChange(data: ChangePasswordForm) {
    await authClient.changePassword(data, {
      onError: (error) => {
        toast.error(error.error.message || "Failed to change password");
      },
      onSucccess: () => {
        toast.success("Password changed successfully");
        form.reset();
      },
    });
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handlePasswordChange)}
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
