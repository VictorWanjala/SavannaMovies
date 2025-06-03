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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(UIContext);

  const { loading, setLoading } = context ?? {};
  const router = useRouter();

  const handleSignup = async () => {
    if (setLoading) setLoading(true);
    const toastId = toast.loading("Creating account...");

    try {
      await axios.post("/api/users/sign-up", {
        name,
        username,
        email,
        password,
        confirmPassword
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-secondary mb-6">
          Create an Account
        </h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="text-gray-500"
            />
          </div>

          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="text-gray-500"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="text-gray-500"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative text-gray-500">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-xs text-gray-500 hover:text-secondary"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
           <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative text-gray-500">
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                placeholder="Confirm your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleSignup}
            disabled={loading || !name || !username || !email || !password || !confirmPassword}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-secondary hover:underline font-medium"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
