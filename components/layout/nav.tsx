import Header from "./header";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Nav() {
    const session = await getServerSession(authOptions);
    return <Header session={session} />;
}