"use client"
import {Box, Container} from "@mui/system";
import {useDispatch} from "react-redux";
import {userLogout} from "@/lib/features/user/UserSlice";

export default function Page() {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(userLogout())
    }

    return (
        <Container>
            <Box>
                <button onClick={() => logout()}>
                    Logout
                </button>
            </Box>
        </Container>
    )
}