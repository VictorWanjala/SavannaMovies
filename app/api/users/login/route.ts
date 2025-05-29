import { NextResponse } from "next/server";
import { prisma } from "../../_utils/prisma";
import bcrypt from "bcrypt";
import axios from "axios";
import { convertBigIntToString } from "../../_utils/converBigInt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }
    const comparePass = await bcrypt.compare( password, user?.password);
    if (!comparePass) {
      return NextResponse.json(
        {
          message: "Passwords do not match",
        },
        { status: 400 }
      );
    }

    const res = await axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/authentication/token/new",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    if (res?.statusText !== "OK")
      return NextResponse.json(
        {
          message: "Failed to fetch token from TMDB",
        },
        { status: 500 }
      );

    const token = res?.data?.request_token;


    const result = { user, token}


    return NextResponse.json(convertBigIntToString(result), { status: 200 });

  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error)?.message || "An error occurred",
      },
      { status: 500 }
    );
  }
}
