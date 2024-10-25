import { NextResponse } from "next/server";

export async function POST(req) {
  let { identifier, password } = await req.json();

  console.log("hitting user login api");
  console.log({ identifier, password });

  // Check if required fields are present
  if (!identifier || !password) {
    return NextResponse.json(
      { message: "All fields are required." }, // Error message
      { status: 400 } // Bad Request
    );
  }

  //Hitting Actual backend for user registration
  try {
    const response = await fetch(
      `${
        process.env.PRODUCTION_URL || "http://localhost:1337"
      }/api/auth/local/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: {
            message:
              responseData.message ||
              "Error in logging!!! , please ensure that credentials are correct",
          },
        },
        { status: 401 }
      );
    }

    const authorization = responseData.jwt;
    const userId = responseData.user.id;
    const username = responseData.user.username;
    // const refreshToken = responseData.refreshToken;

    const responseToSend = NextResponse.json(
      {
        message: "Here is the data after loggingin",
        responseData,
      },
      { status: 200 }
    );

    // Set cookies using the `response.cookies` API
    responseToSend.cookies.set("accessToken", authorization, {
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      // secure: process.env.NODE_ENV === "production", // Ensures cookies are only sent over HTTPS
      sameSite: "Strict", // CSRF protection
      path: "/", // Cookie will be accessible throughout the entire domain
    });

    responseToSend.cookies.set("userId", userId, {
      // secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });

    responseToSend.cookies.set("username", username, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });
    // Return the responseToSend with cookies set
    return responseToSend;
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message:
            "Network error or server is unreachable. Please try again later.",
        },
      },
      { status: 500 }
    );
  }
}
