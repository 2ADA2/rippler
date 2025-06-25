"use client"
import Link from "next/link";
import {useActionState, useRef} from "react";
import {signin} from "@/app/(authorization)/action/auth";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {loginUser} from "@/lib/features/user/auth";

export default function Page() {
    const dispatch = useAppDispatch();
    const [state, action, pending] = useActionState(signin, undefined)

    const login = () => {
        if(!state?.errors){
            dispatch(loginUser)
        }
    }
    return (
        <>
            <form action={action}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" placeholder="Email"/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password"/>
                </div>
                <button disabled={pending} type="submit" onClick={login}>
                    Sign In
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
