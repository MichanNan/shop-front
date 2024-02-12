"use client";
import { Button } from "@/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useState } from "react";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();

  const handleSubmit: MouseEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      setIsloading(true);
      const formData = new FormData(event.target as HTMLFormElement);
      const data = Object.fromEntries(formData);
      await axios.post("/api/sign-up", data);
      toast.success("successfully signed up!");
      router.push("/sign-in");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[20rem] rounded-sm p-4 mx-auto mt-10 h-full bg-gray-100"
    >
      <h1 className="text-2xl text-center mb-10">Register</h1>

      <div className="flex flex-col gap-4">
        <label htmlFor="name">Name</label>
        <input
          type="name"
          name="name"
          className="border-2 rounded-md focus:border-gray-300 focus:outline-none"
        />
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
        {isLoading && <p>Sign in...</p>}
        <Button
          disabled={isLoading}
          type="submit"
          className="bg-black text-white mt-10 hover:scale-105"
        >
          Register
        </Button>
        <p className="text-sm text-slate-800 opacity-80 text-center">
          Already have an account? Please
          <Link className="underline text-blue-600" href="/sign-in">
            &nbsp; Sign in!
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
