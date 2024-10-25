"use client";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Added this to specify JSON format
        },
        body: JSON.stringify({
          identifier: form.identifier,
          password: form.password,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        console.log("error is here");
        // Handle application-level errors (e.g., invalid input, email already in use)
        setError(
          responseData?.error?.message || "An error occurred during login."
        );
        return;
      } else {
        console.log("working fine");

        // Handle successful registration
        console.log({ responseData });
        setError(false);

        setForm({
          identifier: "",
          password: "",
        });
        // Check if there is a redirect URL stored in local storage
        const redirectTo = localStorage.getItem("redirectTo") || "/courses";
        localStorage.removeItem("redirectTo"); // Clear the redirect URL
        // router.push(redirectTo); // Redirect to the intended URL
        window.location.href = redirectTo;
      }
    } catch (err) {
      console.log(err);
      setError(err?.err || `Something went wrong, please try again`);
    } finally {
      setLoading(false); // Ensure loading state is stopped after everything
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form onSubmit={registerUser} method="POST" className="">
        {/* email */}
        <div className="flex flex-col gap-8 md:px-20 px-4 py-10 rounded-md shadow-[0_20px_90px_-15px_rgba(0,0,0,0.4)]">
          <div className={`grid items-center gap-1.5`}>
            <label htmlFor="email" className="text-xs">
              Email or UserName
            </label>
            <input
              id="email"
              type="text"
              required
              name="identifier"
              placeholder="Your Email"
              value={form.identifier}
              onChange={handleFormChange}
              className={`max-w-sm  bg-slate-100 md:py-3 md:px-4 py-2 px-2 md:text-sm text-xs focus:ring-2 border-2 border-slate-200 focus:ring-slate-400 outline-none rounded-md md:w-96 w-64`}
            />
          </div>

          {/* password */}

          <div className={`grid items-center gap-1.5`}>
            <label htmlFor="password" className="text-xs">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleFormChange}
              className={`max-w-sm  bg-slate-100 md:py-3 md:px-4 py-2 px-2 md:text-sm text-xs focus:ring-2 border-2 border-slate-200 focus:ring-slate-400 outline-none rounded-md md:w-96 w-64`}
            />
          </div>

          {/* ERROR  */}
          {error && <p className="text-xs text-red-500 italic">{error}</p>}
          {/*  */}

          <button
            type="submit"
            disabled={loading}
            className={`md:mt-3 bg-zinc-800 w-full text-white rounded-md font-medium md:py-3 py-2 md:text-lg text-sm hover:bg-black transition-colors flex justify-center ${
              loading && "opacity-50"
            }`}
          >
            Login
            {loading && <LoaderCircle className="animate-spin" />}
          </button>
          <Link href="/signup" className="text-center text-xs md:text-sm">
            Don't have an account,{" "}
            <span className="text-green-400 hover:underline">Create One</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
