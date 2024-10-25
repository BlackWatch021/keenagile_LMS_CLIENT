import { NextResponse } from "next/server";

// Handler for fetching course completion data
export async function POST(req, { params }) {
  // Fetch the access token from the request cookies
  const cookies = req.cookies.get("accessToken");
  const token = cookies?.value;
  const bodyData = await req.json();
  console.log("-----------------------------------------------");
  console.log({ token, bodyData }); // Log the token and userid for debugging
  console.log("-----------------------------------------------");

  if (!token) {
    return NextResponse.json({ error: "Token is missing" }, { status: 401 });
  }

  try {
    // Make the request to the Strapi API with the Bearer token

    const strapiResponse = await fetch(
      `${
        process.env.PRODUCTION_URL || "http://localhost:1337"
      }/api/course-progresses`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the Bearer token from the cookie
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: bodyData }),
      }
    );

    if (!strapiResponse.ok) {
      throw new Error(
        `Failed to creating course completion data: ${strapiResponse.statusText}`
      );
    }

    // Parse the response data from Strapi
    const data = await strapiResponse.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error creating course completion data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
