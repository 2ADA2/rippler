"use client"
import Link from "next/link";
import {useActionState, useRef} from "react";
import {signin} from "@/app/(authorization)/action/auth";
import {useAppSelector} from "@/lib/hooks";

export default function Page() {
    const [state, action, pending] = useActionState(signin, undefined)
    const user = useAppSelector(state => state.userReducer.user)
    return (
        <>
            <form action={action}>
                <h1>{user}</h1>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" placeholder="Email"/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password"/>
                </div>
                <button disabled={pending} type="submit">
                    Sign Up
                </button>
            </form>
            <div className="errors">
                {state?.errors?.email && <p>{state.errors.email || "email error"}</p>}
                {state?.errors?.password && (
                    <div>
                        <p>Password must:</p>
                        <ul>
                            {state.errors.password.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                Don't you have an account? <Link href="/registration">sign up there</Link> !
            </div>
        </>

    );
};
