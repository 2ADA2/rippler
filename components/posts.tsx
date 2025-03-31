import axios, {AxiosResponse} from "axios";

export  async function Posts() {

    const res:AxiosResponse = await axios.get('https://jsonplaceholder.typicode.com/posts')

    const posts = res.data
    return (
        <ul>
            {
                posts.map((post: Post) => <li key={post.id}>{post.title}</li>)
            }
        </ul>
    );
};
