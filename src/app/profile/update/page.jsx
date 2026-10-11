"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    // Session থেকে নাম নিয়ে input-এ দেখানো
    const currentName = session?.user?.name || "";
    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session?.user?.name]);

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (!name.trim()) {
            toast.error("আপনার নাম লিখুন");
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
            });

            if (error) {
                toast.error(error.message || "নাম আপডেট করা যায়নি");
                return;
            }

            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে");
            router.push("/profile");
        } catch (error) {
            toast.error("কিছু একটা সমস্যা হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="px-4 py-16 text-center text-gray-600">
                প্রোফাইল লোড হচ্ছে...
            </div>
        );
    }

    if (!session) {
        return (
            <div className="px-4 py-16 text-center">
                <p className="text-gray-700">
                    প্রোফাইল আপডেট করতে প্রথমে সাইন ইন করুন।
                </p>

                <button
                    onClick={() => router.push("/signin")}
                    className="mt-4 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
                >
                    সাইন ইন
                </button>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gray-50 px-4 py-12">
            <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7">
                    <h1 className="text-2xl font-bold text-gray-900">
                        প্রোফাইল আপডেট
                    </h1>

                    <p className="mt-2 text-sm text-gray-600">
                        আপনার নাম পরিবর্তন করুন।
                    </p>
                </div>

                <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
                        👤
                    </div>

                    <div className="min-w-0">
                        <p className="font-semibold text-gray-800">
                            {currentName}
                        </p>

                        <p className="break-all text-sm text-gray-500">
                            {session.user.email}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleUpdate}>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        আপনার নাম
                    </label>

                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="আপনার নাম লিখুন"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
                    </button>
                </form>
            </div>
        </section>
    );
}