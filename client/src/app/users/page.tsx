import { Suspense } from "react";
import ListUsers from "./listusers";


export const dynamic = "force-dynamic";

export default async function Users() {
    return <ListUsers />
}