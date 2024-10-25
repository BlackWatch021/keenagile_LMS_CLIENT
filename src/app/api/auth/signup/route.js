import { NextResponse } from "next/server";

export async function POST(req, res) {
  let { password, username, email } = await req.json();
  console.log("hitting register api");
  console.log({ password, username, email });
  // Check if required fields are present
  if (!email || !username || !password) {
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
      }/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Added this to specify JSON format
        },
        body: JSON.stringify({
          email,
          username,
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
              "Error registering user!!! , please try later",
          },
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Here is the data for registration",
        responseData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log({ error });
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
