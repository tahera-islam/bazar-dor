"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getBanglaDate } from "@/lib/utils";

const HeroBanner = () => {
    const [date, setDate] = useState("");

    useEffect(() => {
        setDate(getBanglaDate());
    }, []);

    return (
        <section className="w-full overflow-hidden rounded-2xl bg-white">
            <div className="flex flex-col gap-6 p-5 sm:p-8 md:flex-row md:items-center md:gap-8 lg:p-10">

                {/* Left Side: Text */}
                <div className="w-full min-w-0 md:w-1/2">
                    <p className="mb-3 inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800">
                        {date}
                    </p>

                    <h1 className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl lg:text-5xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base lg:text-lg">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <a
                        href="#সব-পণ্য"
                        className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
                    >
                        সব পণ্য দেখুন
                    </a>
                </div>

                {/* Right Side: Image */}
                <div className="w-full min-w-0 md:w-1/2">
                    <Image
                        src="/bazar-hero.png"
                        alt="নিত্যপ্রয়োজনীয় বাজারের পণ্য"
                        width={600}
                        height={400}
                        priority
                        sizes="(max-width: 767px) 100vw, 50vw"
                        className="mx-auto h-auto w-full max-w-md object-contain md:max-w-full"
                    />
                </div>

            </div>
        </section>
    );

};

export default HeroBanner;
