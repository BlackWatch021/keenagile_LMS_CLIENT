// /src/app/api/auth/validate/route.js
import { NextResponse } from "next/server";

// Exporting named GET handler
export async function GET(request) {
  console.log("public", process.env.NEXT_PUBLIC_PRODUCTION_URL);
  console.log("secured", process.env.PRODUCTION_URL);

  const cookies = request.cookies.get("accessToken"); // Get cookies from request
  const token = cookies?.value; // Retrieve the token if exists

  console.log("Hitting article authentication API");

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  // Validate token with Strapi
  try {
    const response = await fetch(
      `${process.env.PRODUCTION_URL || "http://localhost:1337"}/api/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userData = await response.json();
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
