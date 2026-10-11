"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";

const SignUpPage = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState("");

    const handleSignUp = async (event) => {
        event.preventDefault();
        setError("");

        if (password.length < 8) {
            setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
            return;
        }

        if (password !== confirmPassword) {
            setError("দুটি পাসওয়ার্ড মিলছে না।");
            return;
        }

        setLoading(true);

        try {
            const result = await signUp.email({
                name,
                email,
                password,
            });

            if (result.error) {
                setError(
                    result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
                );
                return;
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            setError("অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialSignUp = async (provider) => {
        setError("");
        setSocialLoading(provider);

        try {
            await signIn.social({
                provider,
                callbackURL: "/",
            });
        } catch (error) {
            setError("সোশ্যাল অ্যাকাউন্ট দিয়ে চালিয়ে যাওয়া যায়নি।");
            setSocialLoading("");
        }
    };

    return (
        <main className="flex flex-col min-h-[75vh] items-center justify-center">
            <div className="mb-7 text-center">


                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            নাম
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="যেমন: রহিম উদ্দিন"
                            autoComplete="name"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

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
                            autoComplete="new-password"
                            minLength={8}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            placeholder="আবার লিখুন"
                            autoComplete="new-password"
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
                        disabled={loading || Boolean(socialLoading)}
                        className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
                    </button>
                </form>

                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm text-gray-500">অথবা</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={() => handleSocialSignUp("google")}
                        disabled={loading || Boolean(socialLoading)}
                        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                    >
                        <span className="text-lg font-bold text-blue-600">G</span>
                        {socialLoading === "google"
                            ? "Google খুলছে..."
                            : "Google দিয়ে চালিয়ে যান"}
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocialSignUp("github")}
                        disabled={loading || Boolean(socialLoading)}
                        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                    >
                        <span className="text-lg font-bold text-gray-900">GH</span>
                        {socialLoading === "github"
                            ? "GitHub খুলছে..."
                            : "GitHub দিয়ে চালিয়ে যান"}
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/signin"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        সাইন ইন করুন
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

export default SignUpPage;


