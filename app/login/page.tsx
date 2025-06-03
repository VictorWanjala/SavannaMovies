"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import UIContext from "../context/UIContext";
import axios, { AxiosError } from "axios";

import { useRouter } from "next/navigation";
import AuthContext from "../context/AuthContext";
import { UserType } from "../types/UserTypes";
import { toast } from "sonner";

export default function Login() {
  const context = useContext(UIContext);
  const { loading, setLoading } = context ?? {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const auth = useContext(AuthContext);
  const { saveUser } = auth ?? {};

  const handleSubmit = async () => {
    if (setLoading) setLoading(true);
    const toastId = toast.loading("Logging in...");

    try {
      const response = await axios({
        method: "POST",
        url: "/api/users/login",
        data: {
          email,
          password,
        },
      });

      const { token, user }: { token: string; user: UserType } = response.data;

      toast.success("Login successful!");

      if (saveUser) {
        saveUser(user, token);
      }
      localStorage.setItem("session_id", token);
      window.dispatchEvent(new Event("sessionchange"));
      router.push("/home");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;

      toast.error(
        err?.response?.data?.message ||
          "Login error. Please check your credentials and try again."
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
          Welcome Back
        </h2>

        <div className="space-y-4">
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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="text-gray-500"
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

          <Button
            className="w-full rounded-2xl"
            onClick={handleSubmit}
            disabled={loading || !email || !password}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-secondary hover:underline font-medium"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
