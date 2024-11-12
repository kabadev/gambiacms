"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "adminexample@gmail.com",
      password: "admin@123",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email, password } = data;

    // Check if credentials match
    if (email === "adminexample@gmail.com" && password === "admin@123") {
      // Store session details in local storage
      localStorage.setItem(
        "session",
        JSON.stringify({ email, isLoggedIn: true })
      );

      // Redirect or reload the page after login
      router.push("/");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  }

  return (
    <div className="p-4 flex h-screen gap-4 max-md:flex-col">
      <div className="md:w-1/2 h-full flex items-center justify-center flex-col md:px-16">
        <p className="text-xs">
          <b>Note:</b> This is only a demo showcase to gather requirement for
          the proposed system
        </p>
        <p>Use the credentials below to test</p>
        <p className="p-4 bg-accent rounded-sm">
          {" "}
          <b>Email:</b>adminexample@gmail.com <br />
          <b>Password:</b>admin@123
        </p>
        <h1 className="text-3xl font-bold">Login to your account</h1>
        <div className="border rounded-lg p-6 w-full mt-6">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Eg. youremail@gmail.com"
                        {...field}
                      />
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
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>

      <div className="md:w-1/2 h-full bg-accent relative rounded-lg overflow-hidden max-md:p-8 max-md:h-[300px]">
        <Image
          alt="logo"
          width={1000}
          height={1000}
          src={"/gmalogin.jpeg"}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black p-4 flex items-end"></div>
      </div>
    </div>
  );
};

export default Login;
