
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useSession, signOut } from "@/lib/auth-client";
// import { getBanglaDate } from "@/lib/utils";
// import toast from "react-hot-toast";



// const Navbar = () => {
//     const pathname = usePathname();
//     const {data: session, isPending } = useSession();
//     const router = useRouter();

//     const [date, setDate] = useState("");
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

   
//     useEffect (() => {
//         fetch("https://api.api-store.workers.dev/api/bazardor/categories")
//             .then((res) => res.json())
//             .then((data) => setCategories(data))
//             .catch((err) => console.error("Error fetching categories:",
//                 err));
//     }, []);


//     const handleSignOut = async () => {
//         await signOut({
//             fetchOptions: {
//                 onSuccess: () => {
//                     toast.success("সাইন আউট সফল হয়েছে !");
//                     router.push("/");
//                 },
//             },
//         });
//     };

//     return (
//         <header className=" sticky w-full border-b border-gray-200 bg-white">
//             <div className="container mx-auto px-4">

//                 {/* First Row */}
//                 <div className="flex items-center justify-between gap-4 py-4">

//                     {/* Logo and Date */}
//                     <Link href="/" className="flex items-center gap-3">
//                         <div className="flex h-14 w-14 items-center justify-center rounded-[10px] bg-[#05893E]">
//                             <Image
//                                 src="/logo-icon.png"
//                                 width={28}
//                                 height={28}
//                                 alt="বাজার দর লোগো"
//                             />
//                         </div>

//                         <div>
//                             <h2 className="text-xl font-bold text-[#1D271F] sm:text-3xl">
//                                 বাজার দর
//                             </h2>

//                             <p className="mt-1 text-xs text-gray-600 sm:text-sm">
//                                 {date}
//                             </p>
//                         </div>
//                     </Link>

//                     {/* Authentication Buttons */}
//                     <div className="flex items-center gap-2">
//                         {isLoggedIn ? (
//                             <>
//                                 <Link
//                                     href="/profile"
//                                     className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#1D271F] sm:px-4"
//                                 >
//                                     Profile
//                                 </Link>

//                                 <button
//                                     type="button"
//                                     onClick={() => setIsLoggedIn(false)}
//                                     className="rounded-lg bg-[#05893E] px-3 py-2 text-sm text-white sm:px-4"
//                                 >
//                                     Sign Out
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <Link
//                                     href="/sign-in"
//                                     className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#1D271F] sm:px-4"
//                                 >
//                                     সাইন ইন
//                                 </Link>

//                                 <Link
//                                     href="/sign-up"
//                                     className="rounded-lg bg-[#05893E] px-3 py-2 text-sm text-white sm:px-4"
//                                 >
//                                     সাইন আপ
//                                 </Link>
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 {/* Second Row: Categories */}
//                 <nav className="flex gap-2 overflow-x-auto pb-3">
//                     {categories.map((category) => {
//                         const isActive =
//                             category.href === "/"
//                                 ? pathname === "/"
//                                 : pathname === category.href ||
//                                 pathname.startsWith(category.href + "/");

//                         return (
//                             <Link
//                                 key={category.href}
//                                 href={category.href}
//                                 className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${isActive
//                                         ? "bg-[#05893E] text-white"
//                                         : "text-[#1D271F] hover:bg-green-50"
//                                     }`}
//                             >
//                                 {category.name}
//                             </Link>
//                         );
//                     })}
//                 </nav>

//             </div>
//         </header>
//     );
// };

// export default Navbar;



"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { getBanglaDate } from "@/lib/utils";
import toast from "react-hot-toast";
import PriceTicker from "./PriceTicker";


// API URLs
const API_URLS = [
    "https://api.api-store.workers.dev/api/bazardor",
    "https://api.abcz.workers.dev/api/bazardor",
];


const Navbar = () => {
    const pathname = usePathname();
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [date, setDate] = useState("");
    const [categories, setCategories] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const isLoggedIn = Boolean(session?.user);
    const user = session?.user;

    // বাংলা তারিখ দেখানো
    useEffect(() => {
        setDate(getBanglaDate());
    }, []);
    
    // API থেকে categories আনা
    useEffect(() => {
        const fetchCategories = (apiIndex) => {
            fetch(`${ API_URLS[apiIndex] }/categories`)
             .then((res) => {
            if (!res.ok) {
                throw new Error("Category API request failed");
            }

            return res.json();
        })
        .then((data) => {
            console.log("Categories:", data);

            let categoryList = [];

        if (Array.isArray(data)) {
            categoryList = data;
        } else if (Array.isArray(data.data)) {
            categoryList = data.data;
        } else if (Array.isArray(data.categories)) {
            categoryList = data.categories;
        }

        if (categoryList.length > 0) {
            setCategories(categoryList);
        } else {
            throw new Error("Category data পাওয়া যায়নি");
        }
    })
    .catch((err) => {
        console.error(
            `API ${apiIndex + 1} failed:`,
            err
        );

        // প্রথম API ব্যর্থ হলে বিকল্প API ব্যবহার
        if (apiIndex < API_URLS.length - 1) {
            fetchCategories(apiIndex + 1);
        } else {
            console.error("দুটি API-ই কাজ করছে না");
            setCategories([]);
        }
    });
    };

fetchCategories(0);
}, []);


    // Menu বন্ধ করা
    const closeMenus = () => {
        setMenuOpen(false);
        setProfileOpen(false);
    };

    // Sign Out
    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("সাইন আউট সফল হয়েছে!");
                    closeMenus();
                    router.push("/");
                },
            },
        });
    };

    // User-এর নাম
    const userName = user?.name || user?.email || "ব্যবহারকারী";

    
    const userInitial = userName.charAt(0).toUpperCase();

    // Category-এর বাংলা নাম
    const getCategoryName = (category) => {
        return category.nameBn || category.name || "ক্যাটাগরি";
    };

    // Category-এর link
    const getCategoryHref = (category) => {
        if (category.href) {
            return category.href;
        }

        if (category.slug) {
            return `/ category / ${ category.slug } `;
        }

        if (category.id) {
            return `/ category / ${ category.id } `;
        }

        return "/";
    };

    // Login / Signup button
    const renderAuthButtons = () => {
        if (isPending) {
            return (
                <p className="text-sm text-gray-500">
                    অপেক্ষা করুন...
                </p>
            );
        }

        if (isLoggedIn) {
            return (
                <>
                    <Link
                        href="/profile"
                        onClick={closeMenus}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-[#1D271F] hover:bg-gray-50"
                    >
                        প্রোফাইল
                    </Link>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="rounded-lg bg-[#05893E] px-4 py-2 text-sm text-white hover:bg-green-700"
                    >
                        সাইন আউট
                    </button>
                </>
            );
        }

        return (
            <>
                <Link
                    href="/sign-in"
                    onClick={closeMenus}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-[#1D271F] hover:bg-gray-50"
                >
                    সাইন ইন
                </Link>

                <Link
                    href="/sign-up"
                    onClick={closeMenus}
                    className="rounded-lg bg-[#05893E] px-4 py-2 text-sm text-white hover:bg-green-700"
                >
                    সাইন আপ
                </Link>
            </>
        );
    };

    // Category link
    const renderCategoryLink = (category) => {
        const href = getCategoryHref(category);

        const isActive =
            pathname === href ||
            (href !== "/" && pathname.startsWith(`${ href }/`));

return (
    <Link
        key={
            category.id ||
            category.slug ||
            category.nameBn ||
            category.name
        }
        href={href}
        onClick={closeMenus}
        className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${isActive
                ? "bg-[#05893E] text-white"
                : "text-[#1D271F] hover:bg-green-50"
            }`}
    >
        <span>{category.icon || "🛍️"}</span>
        <span>{getCategoryName(category)}</span>
    </Link>
);
    };

return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">

            {/* First Row: Logo, Auth and Hamburger */}
            <div className="flex items-center justify-between gap-3 py-4">

                {/* Logo and Bangla Date */}
                <Link
                    href="/"
                    onClick={closeMenus}
                    className="flex min-w-0 items-center gap-3"
                >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#05893E] sm:h-14 sm:w-14">
                        <Image
                            src="/logo-icon.png"
                            width={28}
                            height={28}
                            alt="বাজার দর লোগো"
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-[#1D271F] sm:text-3xl">
                            বাজার দর
                        </h2>

                        <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                            {date}
                        </p>
                    </div>
                </Link>

                {/* Desktop Authentication */}
                <div className="hidden items-center gap-2 md:flex">

                    {isPending ? (
                        <p className="text-sm text-gray-500">
                            অপেক্ষা করুন...
                        </p>
                    ) : !isLoggedIn ? (
                        renderAuthButtons()
                    ) : (
                        <div className="relative">

                            {/* Profile Dropdown Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    setProfileOpen(!profileOpen)
                                }
                                aria-expanded={profileOpen}
                                className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 hover:bg-gray-50"
                            >
                                {user?.image || user?.imageUrl ? (
                                    <Image
                                        src={user.image || user.imageUrl}
                                        alt="প্রোফাইল ছবি"
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-[#05893E]">
                                        {userInitial}
                                    </span>
                                )}

                                <span className="max-w-32 truncate text-sm font-medium text-gray-800">
                                    {userName}
                                </span>

                                <span>
                                    {profileOpen ? "▲" : "▼"}
                                </span>
                            </button>

                            {/* Profile Dropdown Menu */}
                            {profileOpen && (
                                <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">

                                    <div className="border-b border-gray-100 px-3 py-2">
                                        <p className="truncate text-sm font-semibold text-gray-800">
                                            {userName}
                                        </p>

                                        <p className="truncate text-xs text-gray-500">
                                            {user?.email || ""}
                                        </p>
                                    </div>

                                    <Link
                                        href="/profile"
                                        onClick={closeMenus}
                                        className="mt-1 block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50"
                                    >
                                        আমার প্রোফাইল
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                    >
                                        সাইন আউট
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={
                        menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"
                    }
                    aria-expanded={menuOpen}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-2xl text-gray-800 hover:bg-gray-50 md:hidden"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Desktop Category Navigation */}
            <nav className="hidden gap-2 overflow-x-auto pb-3 md:flex">
                {categories.map((category) =>
                    renderCategoryLink(category)
                )}
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="border-t border-gray-100 py-4 md:hidden">

                    {/* Mobile Categories */}
                    <nav className="flex flex-col gap-1">

                        <Link
                            href="/"
                            onClick={closeMenus}
                            className={`flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium ${pathname === "/"
                                    ? "bg-green-50 text-[#05893E]"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            🛒 সব পণ্য
                        </Link>

                        {categories.map((category) =>
                            renderCategoryLink(category)
                        )}
                    </nav>

                    {/* Mobile Auth Buttons */}
                    <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">

                        {/* Mobile User Information */}
                        {isLoggedIn && !isPending && (
                            <div className="mb-2 flex items-center gap-3 px-2">

                                {user?.image || user?.imageUrl ? (
                                    <Image
                                        src={user.image || user.imageUrl}
                                        alt="প্রোফাইল ছবি"
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-[#05893E]">
                                        {userInitial}
                                    </span>
                                )}

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-gray-800">
                                        {userName}
                                    </p>

                                    <p className="truncate text-xs text-gray-500">
                                        {user?.email || ""}
                                    </p>
                                </div>
                            </div>
                        )}

                        {renderAuthButtons()}
                    </div>
                </div>
            )}
        </div>

        {/* Price Ticker below Navbar */}
        <PriceTicker />
    </header>
);
};

export default Navbar;




