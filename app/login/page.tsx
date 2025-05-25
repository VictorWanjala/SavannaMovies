"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react"
import { useRouter } from "next/navigation"


export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async () => {
    router.push("/home")
  }
    return (
   <div className="min-h-screen flex justify-center items-center bg-no-repeat " style={{backgroundImage: "url('/background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
    <div className="border border-gray-300 rounded-2xl p-5 bg-white flex flex-col gap-4 w-1/4 max-md:w-full max-md:mx-2">
      <h3 className="text-center">Login</h3>
      <div className="flex flex-col gap-2">
        <Label>
          Email
        </Label>
        <Input value={email} onChange={(e)=>setEmail(e.target.value)} />
         <Label>
          Password
        </Label>
        <Input value={password} onChange={(e)=>setPassword(e.target.value)} />
      </div>
      <Button className="rounded" onClick={handleSubmit}>Login</Button>
    </div>

   </div>
  );
}
