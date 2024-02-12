"use client";
import { Button } from "@/ui/button";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useState } from "react";
import toast from "react-hot-toast";

const SignInForm = () => {
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();

  const handleSubmit: MouseEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsloading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const { email, password } = data;

    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (login?.ok) {
      toast.success("Logged in!");
      router.push("/");
    } else if (login?.error) {
      toast.error(login.error);
    }

    setIsloading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[20rem] rounded-sm p-4 mx-auto mt-10 h-full bg-gray-100"
    >
      <h1 className="text-2xl text-center mb-10">Sign In</h1>

      <div className="flex flex-col gap-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className="border-2 rounded-md focus:border-gray-300 focus:outline-none"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="border-2 rounded-md  focus:border-gray-300 focus:outline-none"
        />
        <Button
          disabled={isLoading}
          type="submit"
          className="bg-black text-white mt-10 hover:scale-105"
        >
          Sign In
        </Button>
        <p className="text-sm text-slate-800 opacity-80 text-center">
          Do not have an account? Please
          <Link className="underline text-blue-600" href="/sign-up">
            &nbsp; Sign up!
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
