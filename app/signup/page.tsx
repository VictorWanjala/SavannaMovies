"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    toast.loading("Creating account...");

    try {
      const response = await axios.post("/api/users/register", {
        name,
        username,
        email,
        password,
      });

      if (response?.statusText !== "OK") {
        toast.error("Signup failed. Please check your inputs.");
        setLoading(false);
        return;
      }

      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(
        error?.response?.data?.message || "An error occurred during signup."
      );
    } finally {
      setLoading(false);
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
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />

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
      </div>
    </div>
  );
}
