
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export const proxy = async (request) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
        return NextResponse.redirect(
            new URL("/sign-in", request.url)
        );
    }

    return NextResponse.next();
};

export const config = {
    matcher: ["/product/:path*", "/profile/:path*"],
};
