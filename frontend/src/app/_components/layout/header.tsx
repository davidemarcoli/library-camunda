"use client";

import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/app/_components/ui/sheet";
import { Menu } from "lucide-react";
import { type Session } from "next-auth";
import UserDropdown from "./user-dropdown";
import { useSignInModal } from "./sign-in-modal";
import { ModeToggle } from "~/app/_components/mode-toggle";
import Image from "next/image";
import useScroll from "~/lib/hooks/use-scroll";

const Header = ({ session }: { session: Session | null }) => {
    const scrolled = useScroll(50);
    const { SignInModal, setShowSignInModal } = useSignInModal();
    const routes = [
        {
            href: "/",
            label: "Home"
        },
        {
            href: "demos",
            label: "Demos",
        }
    ];

    return (
        <header className="sm:flex sm:justify-between">
            <div
                className={`fixed top-0 flex w-full justify-center ${
                    scrolled ? "backdrop-blur-xl" : "bg-white/0"
                } z-30 px-4 transition-all`}
            >
                <div className="flex items-center">
                    <Sheet>
                        <SheetTrigger>
                            <Menu className="h-6 w-6 md:hidden" />
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <nav className="flex flex-col gap-4">
                                {routes.map((route, i) => (
                                    <Link
                                        key={i}
                                        href={route.href}
                                        className="block px-2 py-1 text-lg"
                                    >
                                        {route.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
                    <Link href="/" className="font-display flex items-center text-2xl">
                        <Image
                            src="/logo.png"
                            alt="Library Camunda Logo"
                            width="30"
                            height="30"
                            quality={90}
                            className="mr-2 rounded-sm"
                        ></Image>
                        <p>Library Camunda</p>
                    </Link>
                    <nav className="mx-6 flex hidden items-center space-x-4 md:block lg:space-x-6">
                        {routes.map((route, i) => (
                            <Link href={route.href} key={i}>
                                <Button variant={"ghost"}>{route.label}</Button>
                            </Link>
                        ))}
                    </nav>
                    <div>
                        {session ? <UserDropdown session={session} /> : <SignInModal />}
                    </div>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;