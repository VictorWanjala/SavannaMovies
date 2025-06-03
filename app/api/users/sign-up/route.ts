import { NextResponse } from "next/server";
import { prisma } from "../../_utils/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, username, password, confirmPassword } = body;

    if (!email || !password || !name || !username || !confirmPassword) {
      return NextResponse.json(
        {
          message: "Required fields are missing",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          message: "Passwords do not match",
        },
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (user) {
      return NextResponse.json(
        {
          message: "User with this email already exists",
        },
        { status: 404 }
      );
    }
    const hashPass = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: { name, email, username, password: hashPass },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error)?.message || "An error occurred",
      },
      { status: 500 }
    );
  }
}
