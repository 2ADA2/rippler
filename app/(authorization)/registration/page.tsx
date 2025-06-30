"use client"
import Link from "next/link";
import {signup} from "@/app/(authorization)/action/auth";
import {useState} from "react";

export default function Page() {
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    return (
        <>
            <form className={"auth-form"}>
                <h5>Rippler registration</h5>
                <div className={"input-form"}>
                    <label >Username</label>
                    <input type={"text"} placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className={"input-form"}>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className={"input-form"}>
                    <div/>
                    <button type="submit" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        signup(e, username, password).then((err: string | null) => setError(err))
                    }}>
                        Sign Up
                    </button>
                </div>

                <div className="errors auth-under">
                    {error && <p>{error}</p>}
                </div>
                <div className={"auth-under"}>
                    Do you already have an account? <Link href="/login">sign in there</Link> !
                </div>
            </form>
        </>
    )
        ;
};
