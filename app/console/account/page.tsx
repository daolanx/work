"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconCheck, IconEdit, IconLoader2, IconX } from "@tabler/icons-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUser } from "@/app/hooks/useUser";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const profileSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function AccountPage() {
  const { user, isLoading, isMutating, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  // 同步数据
  useEffect(() => {
    if (user)
      form.reset({
        name: user.name,
        email: user.email,
      });
  }, [user, form]);

  const onSubmit = async (data: ProfileValues) => {
    await updateUser({ ...data, id: user.id });
    setIsEditing(false);
  };

  if (isLoading) return <AccountSkeleton />;

  return (
    <div className="flex max-w-5xl flex-col gap-8 px-4 py-8 lg:px-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Header Action Bar */}
          <div className="mb-8 flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="font-bold text-3xl tracking-tight">Account</h2>
              <p className="text-muted-foreground text-sm">
                Manage profile and information.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      form.reset();
                    }}
                    size="sm"
                    type="button"
                    variant="ghost"
                  >
                    <IconX className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                  <Button
                    className="border-slate-200"
                    disabled={isMutating}
                    size="sm"
                    type="submit"
                    variant="outline"
                  >
                    {isMutating ? (
                      <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <IconCheck className="mr-2 h-4 w-4" />
                    )}
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  className="border-slate-200"
                  onClick={() => setIsEditing(true)}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  <IconEdit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              )}
            </div>
          </div>

          <Separator className="mb-10" />

          <div className="grid gap-10">
            <FormSection
              description="Your public identity."
              title="Personal Profile"
            >
              <EditableField
                form={form}
                isEditing={isEditing}
                label="Display Name"
                name="name"
              />
            </FormSection>

            <Separator className="opacity-50" />

            <FormSection
              description="Where we send updates."
              title="Contact Email"
            >
              <EditableField
                form={form}
                isEditing={isEditing}
                label="Email Address"
                name="email"
                type="email"
              />
            </FormSection>
          </div>
        </form>
      </Form>
    </div>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="space-y-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="space-y-6 md:col-span-2">{children}</div>
    </section>
  );
}

function EditableField({ form, name, label, isEditing, type = "text" }: any) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-1 space-y-0">
          <Label className="mb-1 text-slate-500">{label}</Label>
          <FormControl>
            {isEditing ? (
              <Input
                {...field}
                className="max-w-md focus-visible:ring-1"
                type={type}
              />
            ) : (
              <p className="py-2 font-medium text-md text-slate-900">
                {field.value || "—"}
              </p>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function AccountSkeleton() {
  return (
    <div className="flex max-w-5xl flex-col gap-8 px-4 py-8 lg:px-12">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-24" />
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-32 w-full" />
        <div className="col-span-2 space-y-4">
          <Skeleton className="h-12 w-full max-w-md" />
          <Skeleton className="h-12 w-full max-w-md" />
        </div>
      </div>
    </div>
  );
}
