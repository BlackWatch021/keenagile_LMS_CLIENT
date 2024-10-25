import { NextResponse } from "next/server";

// Handler for fetching course completion data
export async function GET(req, { params }) {
  const userid = params.userid;
  const courseid = params.courseid;
  const articleid = params.articleid;

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
      }/api/last-seen-articles?filters[userid]=${userid}&filters[courseid]=${courseid}`,

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

    // Parse the response data from Strapi to check if data of user for the course is already present or not
    const data = await strapiResponse.json();
    if (data.data.length > 0) {
      //user with this course id already exists

      const createentryresponse = await fetch(
        `${
          process.env.PRODUCTION_URL || "http://localhost:1337"
        }/api/last-seen-articles/${data.data[0].id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // Pass the Bearer token from the cookie
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { articleid },
          }),
        }
      );

      if (!createentryresponse.ok) {
        console.log("error creating user entry");
        return NextResponse.json({ status: 404 });
      }
      console.log(
        `last seen article value updated to ${articleid}, congratulations`
      );
      return NextResponse.json(
        {
          message: `last seen article value updated now it ${articleid}`,
        },
        { status: 200 }
      );
    } else {
      //create new entry of user for this course
      const createentryresponse = await fetch(
        `${
          process.env.PRODUCTION_URL || "http://localhost:1337"
        }/api/last-seen-articles`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Pass the Bearer token from the cookie
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { userid, courseid, articleid },
          }),
        }
      );

      if (!createentryresponse.ok) {
        console.log("error creating user entry");
        return NextResponse.json({ status: 404 });
      }
      console.log("new entry for user created, congratulations");
      return NextResponse.json(
        { message: "New entry for user created" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching course completion data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
