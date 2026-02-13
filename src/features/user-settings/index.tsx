"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const emailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function updateProfileAction(formData: FormData) {
 
  const name = formData.get("name");

  // TODO: DB update
  console.log("Update profile:", name);
}

export async function changePasswordAction(formData: FormData) {
  
  console.log("Change password", Object.fromEntries(formData));
}

export async function changeEmailAction(formData: FormData) {
  
  console.log("Change email", Object.fromEntries(formData));
}



export default function UserSettingsPage() {
  const [preview, setPreview] = useState("");

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name : ""},
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  return (
    <div className="max-w-4xl p-6 space-y-8">
      <div className="gap-4">
        <h1 className="text-3xl font-semibold">Account Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your profile, email and password</p>
      </div>

      {/* PROFILE */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update name and profile photo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={preview || "https://github.com/shadcn.png"} />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>

            <div>
              <Label htmlFor="picture" className="cursor-pointer">
                <div className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-muted">
                  <UploadCloud className="w-4 h-4" /> Upload Photo
                </div>
              </Label>
              <Input id="picture" type="file" className="hidden" onChange={handleImageUpload} />
            </div>
          </div>

          <form action={updateProfileAction} className="space-y-3">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input {...profileForm.register("name")} placeholder="John Deo" name="name" />
              <p className="text-sm text-red-500">{profileForm.formState.errors.name?.message}</p>
            </div>

            <Button type="submit" className="w-full">Update Profile</Button>
          </form>
        </CardContent>
      </Card>

      {/* CHANGE PASSWORD */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={changePasswordAction} className="space-y-3">
            <div className="flex flex-col gap-2">
              <Label>Current Password</Label>
              <Input type="password" {...passwordForm.register("currentPassword")} name="currentPassword" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>New Password</Label>
              <Input type="password" {...passwordForm.register("newPassword")} name="newPassword" />
              <p className="text-sm text-red-500">{passwordForm.formState.errors.newPassword?.message}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Confirm Password</Label>
              <Input type="password" {...passwordForm.register("confirmPassword")} name="confirmPassword" />
              <p className="text-sm text-red-500">{passwordForm.formState.errors.confirmPassword?.message}</p>
            </div>

            <Button className="w-full">Change Password</Button>
          </form>
        </CardContent>
      </Card>

      {/* CHANGE EMAIL */}
      <Card>
        <CardHeader>
          <CardTitle>Change Email</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={changeEmailAction} className="space-y-3">
            <div className="flex flex-col gap-2">
              <Label>New Email</Label>
              <Input {...emailForm.register("email")} name="email" placeholder="johndeo@example.com" />
              <p className="text-sm text-red-500">{emailForm.formState.errors.email?.message}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input type="password" {...emailForm.register("password")} name="password" />
            </div>

            <Button className="w-full">Update Email</Button>
          </form>
        </CardContent>
      </Card>

    </div>
  );
}
