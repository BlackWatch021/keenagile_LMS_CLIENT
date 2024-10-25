// /src/app/api/auth/validate/route.js
import { NextResponse } from "next/server";

// Exporting named GET handler
export async function GET(request) {
  const cookies = request.cookies.get("accessToken"); // Get cookies from request
  const token = cookies?.value; // Retrieve the token if exists

  console.log("Hitting article authentication API");

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  // Validate token with Strapi
  try {
    const responseToSend = NextResponse.json(
      {
        message: "user logged out successfully",
      },
      { status: 200 }
    );

    responseToSend.cookies.delete("accessToken");
    responseToSend.cookies.delete("userId");
    responseToSend.cookies.delete("username");

    // responseToSend.cookies.set("accessToken", authorization, {
    //     httpOnly: true, // Prevents JavaScript from accessing the cookie
    //     secure: process.env.NODE_ENV === "production", // Ensures cookies are only sent over HTTPS
    //     sameSite: "Strict", // CSRF protection
    //     path: "/", // Cookie will be accessible throughout the entire domain
    //   });

    return responseToSend;
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
