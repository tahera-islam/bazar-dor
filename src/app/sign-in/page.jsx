"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";


const SignInPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const result = await signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (result.error) {
                toast.error(result.error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
                setError(result.error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
                return;
            }

            toast.success("সফলভাবে লগইন হয়েছে!");

            router.push("/");
            router.refresh();
        } catch (error) {
            toast.error("লগইন করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        setGoogleLoading(true);

        try {
            await signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            setError("Google দিয়ে Login করা যায়নি। আবার চেষ্টা করো।");
            setGoogleLoading(false);
        }
    };

    return (
        <main className="flex flex-col min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-10">

            <div className="mb-7 text-center">

                <h1 className="text-3xl font-bold text-gray-900">
                    সাইন ইন
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            autoComplete="current-password"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || googleLoading}
                        className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "লগইন হচ্ছে..." : "সাইন ইন"}
                    </button>
                </form>

                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm text-gray-500">অথবা</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading || googleLoading}
                    className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <span className="font-bold text-lg text-blue-600">G</span>
                    {googleLoading ? "Google খুলছে..." : "Google দিয়ে চালিয়ে যান"}
                </button>

                <p className="mt-6 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>
            </div>

            <div className=" mt-4 text-center">
                <Link
                    href="/"
                    className="text-sm font-medium text-gray-500 hover:text-green-700"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
};

export default SignInPage;
