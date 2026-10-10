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
        <section className=" mx-40 my-7.5 overflow-hidden rounded-2xl bg-white sm:mx-6 lg:mx-8">
            <div className=" flex justify-between container mx-auto  flex-col items-center gap-8 md:flex-row">

                {/* Left Side: Text */}
                <div className="min-w-0 flex-1 text-center md:text-left">

                    {/* বাংলা তারিখ */}
                    <p className="mb-3 inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800">
                        {date}
                    </p>

                    {/* Main Heading */}
                    <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* CTA Button */}
                    <a
                        href="#সব-পণ্য"
                        className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                    >
                        সব পণ্য দেখুন
                    </a>
                </div>

                {/* Right Side: Banner Image */}
                <div className="w-full flex-1">
                    <Image
                        src="/bazar-hero.png"
                        alt="নিত্যপ্রয়োজনীয় বাজারের পণ্য"
                        width={600}
                        height={400}
                        priority
                        className="mx-auto h-auto w-full max-w-lg object-contain"
                    />
                </div>

            </div>
        </section>
    );
};

export default HeroBanner;
