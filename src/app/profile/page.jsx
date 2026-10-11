
"use client";

import { useState } from "react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const router = useRouter();
    const [name, setName] = useState("Rezwan Ahmed");
    const [email, setEmail] = useState("rezwanahmed@gmail.com");

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("সাইন আউট সফল হয়েছে");
            router.push("/signin");
        } catch (error) {
            toast.error("সাইন আউট করা যায়নি");
        }
    };

    const handleUpdate = () => {
        toast.success("আপডেট বাটন কাজ করার জন্য পরের ধাপে সংযোগ করব");
    };

    return (
        <section className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-900">
                    আমার প্রোফাইল
                </h1>

                <p className="mt-2 text-gray-600">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>

                <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {name}
                            </h2>

                            <p className="mt-2 text-gray-600">
                                {email}
                            </p>
                        </div>

                        <button
                            onClick={handleSignOut}
                            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
                        >
                            ↩ সাইন আউট
                        </button>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-bold text-gray-900">
                            তথ্য
                        </h3>

                        <div className="mt-5">
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
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                            />
                        </div>


                        <button
                            onClick={handleUpdate}
                            className="mt-6 w-full rounded-lg bg-green-700 px-70 py-3 font-semibold text-white hover:bg-green-800 sm:w-auto"
                        >
                            আপডেট
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ProfilePage;
