const Footer = () => {
    return (
        <footer className="mt-auto border-t border-gray-200 bg-white text-gray-700">
            <div className="container mx-auto flex flex-col items-center justify-between gap-5 px-4 py-8 md:flex-row w-full">
                {/* Left Side */}
                <div>
                    <p className="mt-1 text-sm text-gray-600">
                        বাজার দর-প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>
                </div>

                {/* Right Side */}
                <p className=" w-full max-w-lg text-center text-sm leading-6 text-gray-600 md:text-right">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;
