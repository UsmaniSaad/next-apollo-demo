"use client";

import { gql, useQuery } from "@apollo/client";
import React, { Suspense, useEffect } from "react";
import User from "./user";
import Header from "../components/header";
import Users from "./users";



export default function ListUsers() {
    return (
        <>
            <Header />
            <Suspense fallback={<p>loading...</p>}>
                <Users />
            </Suspense>
            
        </>
    );
}
