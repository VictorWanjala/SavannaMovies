"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { UserType } from "../types/UserTypes";
import { toast } from "sonner";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { saveUser } = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    toast.loading("Logging in...");

    try {
      const response = await axios({
        method: "POST",
        url: "/api/users/login",
        data: {
          email,
          password,
        },
      });

      
      if (response?.statusText !== "OK") {
        console.error("Login failed:", response?.data);
        toast.error("Login failed. Please check your credentials.");
        setLoading(false);
        return;
      } 

      toast.success("Login successful!");

      

      const { token, user }: { token: string; user: UserType } = response.data;

      saveUser(user, token);
      localStorage.setItem("session_id", token);
      window.dispatchEvent(new Event("sessionchange"));
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login. Please try again.");
      toast.dismiss()
      setLoading(false);
      return;
    }finally{
      toast.dismiss()
      setLoading(false);
    }

    router.push("/home");
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
