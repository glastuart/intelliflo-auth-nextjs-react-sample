"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { SplashScreen } from "@/components/SplashScreen";
import {ClientsTable} from "@/components/ClientsTable";

const Home = () => {
    const session = useSession();
    const { status, data } = session;

    if (status === "loading") {
        return <SplashScreen />;
    }

    return (
        <main className="p-3">
            <h1 className="mb-3 text-5xl">Intelliflo React Auth Sample</h1>
            {session.status === "unauthenticated" && (
                <section className="rounded-box border border-base-content/5">
                    <p className="mb-3">You will need to sign in below to continue...</p>
                    <button type="button" className="btn btn-soft" onClick={() => signIn('iflo')}>Sign in</button>
                </section>
            )}
            {session.status === "authenticated" && (
                <section className="p-5 rounded-box border border-base-content/5">
                    <h1 className="text-3xl">Hello, {data?.user?.name}</h1>
                    <p>Here are your Intelliflo token details:</p>
                    <div className="my-3 p-3 border overflow-scroll">
                        {JSON.stringify(data)}
                    </div>
                    <div>
                        <button type="button" className="btn btn-soft" onClick={() => signOut()}>Sign Out</button>
                    </div>
                </section>
            )}
            {session.status === "authenticated" && <ClientsTable />}
        </main>
    );
}

export default Home;