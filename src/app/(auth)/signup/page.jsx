"use client";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setError("Password doesn't match");
      setLoading(false); // Stop loading in case of an error
      return;
    }
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Added this to specify JSON format
        },
        body: JSON.stringify({
          email: form.email,
          username: form.username,
          password: form.password,
        }),
      });

      const responseData = await response.json();
      console.log({ responseData });
      if (!response.ok) {
        console.log("error is here");
        // Handle application-level errors (e.g., invalid input, email already in use)
        setError(
          responseData?.error?.message ||
            "An error occurred during registration."
        );
        return;
      } else {
        console.log("working fine");
        // Handle successful registration
        console.log({ responseData });
        setError(false);

        setForm({
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        // Redirect to the login page on successful registration
        router.push("/signin");
      }

      console.log("user registered successfully");
    } catch (err) {
      console.log(err);
      setError(err?.err || `Something went wrong, please try again`);
    } finally {
      setLoading(false); // Ensure loading state is stopped after everything
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={registerUser} method="POST">
        {/* email */}
        <div className="flex flex-col gap-8 md:px-20 px-4 py-10 rounded-md shadow-[0_20px_90px_-15px_rgba(0,0,0,0.4)]">
          <div className={`grid items-center gap-1.5`}>
            <label htmlFor="email" className="text-xs">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleFormChange}
              className={`max-w-sm  bg-slate-100 md:py-3 md:px-4 py-2 px-2 md:text-sm text-xs focus:ring-2 border-2 border-slate-200 focus:ring-slate-400 outline-none rounded-md md:w-96 w-64`}
            />
          </div>

          {/* UserName */}

          <div className={`grid items-center gap-1.5`}>
            <label htmlFor="username" className="text-xs">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              name="username"
              placeholder="@username"
              value={form.username}
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
              autocomplete="new-password"
              className={`max-w-sm  bg-slate-100 md:py-3 md:px-4 py-2 px-2 md:text-sm text-xs focus:ring-2 border-2 border-slate-200 focus:ring-slate-400 outline-none rounded-md md:w-96 w-64`}
            />
          </div>

          {/* Confirm Your Password */}

          <div className={`grid items-center gap-1.5`}>
            <label htmlFor="confirmPassword" className="text-xs">
              Confirm Your Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              name="confirmPassword"
              placeholder="Confirm Your Password"
              value={form.confirmPassword}
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
            Register
            {loading && <LoaderCircle className="animate-spin" />}
          </button>
          <Link href="/signin" className="text-center text-xs md:text-sm">
            Already have an account,{" "}
            <span className="text-green-400 hover:underline">Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
