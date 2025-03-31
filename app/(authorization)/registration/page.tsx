"use client"
import Link from "next/link";
import {signup} from "@/app/(authorization)/action/auth";
import {useActionState} from "react";

export default function Page() {
    const [state, action, pending] = useActionState(signup, undefined)

    return (
        <>
            <form action={action}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" placeholder="Name"/>
                </div>

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

                {state?.errors?.name && <p>{state.errors.name || "name error"}</p>}
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
                Do you have an account? <Link href="/login">sign in there</Link> !
            </div>
        </>
    )
        ;
};
