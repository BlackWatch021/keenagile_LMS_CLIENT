import { NextResponse } from "next/server";

// Handler for fetching course completion data
export async function GET(req, { params }) {
  const userid = params.userid;

  // Fetch the access token from the request cookies
  const cookies = req.cookies.get("accessToken");
  const token = cookies?.value;

  // console.log({ token, userid }); // Log the token and userid for debugging

  if (!userid) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (!token) {
    return NextResponse.json({ error: "Token is missing" }, { status: 401 });
  }

  try {
    // Make the request to the Strapi API with the Bearer token

    const strapiResponse = await fetch(
      `${
        process.env.PRODUCTION_URL || "http://localhost:1337"
      }/api/course-progresses?filters[userid]=${userid}`,

      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the Bearer token from the cookie
          "Content-Type": "application/json",
        },
      }
    );

    if (!strapiResponse.ok) {
      throw new Error(
        `Failed to fetch course completion data: ${strapiResponse.statusText}`
      );
    }

    // Parse the response data from Strapi
    const data = await strapiResponse.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching course completion data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
