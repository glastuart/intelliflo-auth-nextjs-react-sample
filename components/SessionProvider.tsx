"use client";

import React from "react";
import { Session } from "next-auth";
import { SessionProvider as AuthProvider } from "next-auth/react";

export function SessionProvider({ children, session } : Readonly<{ children: React.ReactNode, session: Session | null }>) {
    return <AuthProvider session={session}>{children}</AuthProvider>;
}