import "./globals.css";
import Nav from "@/components/layout/nav";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { inter, sfPro } from "@/app/fonts";
import { cx } from "class-variance-authority";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
    title: "Library Camunda",
    description:
        "A library made with camunda",
    twitter: {
        card: "summary_large_image",
        title: "Library Camunda",
        description:
            "A library made with camunda",
        creator: "@davide_marcoli",
    },
    metadataBase: new URL("https://library-camunda.davidemarcoli.dev"),
    themeColor: "#FFF",
};


export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <html lang="en">
            <body className={cx(sfPro.variable, inter.variable)}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {/*<Suspense fallback="...">*/}
                <Nav/>
                {/*</Suspense>*/}
                <main className={"mx-4 mt-16"}>{children}</main>
                <Toaster/>
            </ThemeProvider>
            </body>
            </html>
        </>
    );
}