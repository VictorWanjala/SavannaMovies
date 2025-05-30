
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useContext } from "react";
import UIContext from "../context/UIContext";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const context = useContext(UIContext);

  const { loading, setLoading } = context ?? {};
  const router = useRouter();

  const handleSignup = async () => {
    if (setLoading) setLoading(true);
    const toastId = toast.loading("Creating account...");

    try {
      const response = await axios.post("/api/users/sign-up", {
        name,
        username,
        email,
        password,
      });


      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err?.response?.data?.message || "An error occurred during signup."
      );
    } finally {
      toast.dismiss(toastId);
      if (setLoading) setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-no-repeat">
      <div className="border border-gray-300 rounded-2xl p-5 bg-white flex flex-col gap-4 w-1/4 max-md:w-full max-md:mx-2">
        <h3 className="text-center">Sign Up</h3>
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <Label>Username</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Label>Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />

          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="rounded" onClick={handleSignup} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        <div className="flex justify-center items-center my-1">
          <span className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-secondary hover:underline">
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
