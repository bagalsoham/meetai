"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OctagonAlertIcon } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export const SignUpView = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: (error) => {
          setError(error.error.message);
          setPending(false);
        },
      }
    );
  };

  if (!mounted) {
    return (
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 p-0">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Create Account</h1>
                  <p className="text-muted-foreground text text-balance">Please enter your details to get started</p>
                </div>
                <div className="grid gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Name</label>
                    <div className="h-10 rounded-md border bg-background px-3 py-2 text-sm"></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Email</label>
                    <div className="h-10 rounded-md border bg-background px-3 py-2 text-sm"></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Password</label>
                    <div className="h-10 rounded-md border bg-background px-3 py-2 text-sm"></div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Confirm Password</label>
                    <div className="h-10 rounded-md border bg-background px-3 py-2 text-sm"></div>
                  </div>
                </div>
                <Button disabled>Sign Up</Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <span className="font-medium text-primary underline underline-offset-4 cursor-pointer">
                    Sign in
                  </span>
                </p>
              </div>
            </div>
            <div className="relative hidden md:flex flex-col items-center justify-center gap-y-4 bg-gradient-to-br from-green-700 to-green-900 h-full">
              <Image 
  src="/logo.svg" 
  alt="Logo" 
  width={92} 
  height={92} 
  className="h-[92px] w-[92px]" 
/>
              <p className="text-2xl font-semibold text-white">Meet.Ai</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Create Account</h1>
                  <p className="text-muted-foreground text text-balance">Please enter your details to get started</p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
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
                          <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    disabled={pending}
                    onClick={() => {
                      authClient.signIn.social({
                        provider: "google",
                      });
                    }}
                    variant="outline"
                    type="button"
                    className="w-full">
                    <FaGoogle /> Sign in with Google
                  </Button>
                  <Button
                    disabled={pending}
                    onClick={() => {
                      authClient.signIn.social({
                        provider: "github",
                      });
                    }}
                    variant="outline"
                    type="button"
                    className="w-full">
                    <FaGithub />
                  </Button>
                </div>

                <Button disabled={pending} type="submit">
                  Sign Up
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/sign-in")}
                    className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </Form>
          <div className="relative hidden md:flex flex-col items-center justify-center gap-y-4 
  bg-gradient-to-br from-gray-900 to-gray-800 h-full">

            {/* Black Logo */}
            <img src="/logo-white.svg" alt="Logo" className="h-[92px] w-[92px]" />

            {/* White Brand Name */}
            <p className="text-2xl font-semibold text-white">Meet.Ai</p>
          </div>

        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance">
        By clicking continue, you agree to our{" "}
        <a href="*" className="underline hover:text-primary underline-offset-2">
          Terms of Service
        </a>{" "}
        and acknowledge that you have read our{" "}
        <a href="*" className="underline hover:text-primary underline-offset-2">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};