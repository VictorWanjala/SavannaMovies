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

export default function Home() {
  const context = useContext(UIContext);
  const { loading, setLoading } = context ?? {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      // if (setLoading) setLoading(false);
      // return;
    } finally {
      toast.dismiss(toastId);
      if (setLoading) setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-no-repeat "
      // style={{
      //   backgroundImage: "url('/background.jpg')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <div className="border border-gray-300 rounded-2xl p-5 bg-white flex flex-col gap-4 w-1/4 max-md:w-full max-md:mx-2">
        <h3 className="text-center">Login</h3>
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="rounded" onClick={handleSubmit} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        <div className="flex justify-center items-center my-1">
          <span className="text-sm text-gray-500">
            Don&rsquo;t have an account?{" "}
            <a href="/signup" className="text-secondary hover:underline">
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
