"use client"
import Link from "next/link";
import {useState} from "react";
import {signin} from "@/app/(authorization)/action/auth";
import {useDispatch} from "react-redux";
import {setIsLoggedIn, setUserData} from "@/lib/features/user/UserSlice";
import {getUserData} from "@/functions/getUserData";
import {GetUserDataInterface} from "@/lib/globalInterfaces";
import {getCookie} from "typescript-cookie";
import {redirect} from "next/navigation";


export default function Page() {
    const [error, setError] = useState<string|null>();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    function callback(){
        const token = getCookie("token")
        if(!token)return;

        getUserData(token)
            .then((data: GetUserDataInterface) => {
                dispatch(setUserData({userData: data}))
            }).then(() => {
            dispatch(setIsLoggedIn({isLoggedIn: true}));
            redirect("/dashboard")

        })
    }

    return (
        <>
            <form className={"auth-form"}>
                <h5>Rippler login</h5>
                <div className={"input-form"}>
                    <label htmlFor="text">Username</label>
                    <input type="" name="username" placeholder="username"
                           onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className={"input-form"}>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={"input-form"}>
                    <div/>
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => signin(e, username, password,() =>callback())}>
                        Sign In
                    </button>
                </div>

                <div className="errors auth-under">
                    {error && <p>{error}</p>}
                </div>
                <div className={"auth-under"}>
                    Don't you have an account? <Link href="/registration">sign up there</Link> !
                </div>
            </form>
        </>

    );
};
