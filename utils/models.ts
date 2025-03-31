import {ReactNode} from "react";

interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    category: string;
}
export interface Children {
    children: ReactNode
}