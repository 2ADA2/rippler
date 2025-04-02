import {FormState, SignInFormSchema, SignupFormSchema} from "@/app/_lib/definitions";
import axios from "axios";
import {API_URL} from "@/utils/env";
import {redirect} from "next/navigation";
import {useAppDispatch} from "@/lib/hooks";

export async function signup(state: FormState, formData: FormData) {
    const url:string = API_URL
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const dispatch = useAppDispatch()
}

export async function signin(state: FormState, formData: FormData) {
    const url:string = API_URL
    const validatedFields = SignInFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    axios.post(url+"/login", formData).then((res) => {
        if (res.data.token) {
            redirect("/dashboard")
        }
    })
}