import Link from "next/link";
import { Post } from "../../@types/Post";

type PropsBlog = {
  name: string;
  posts: Post[];
};

const Blog = ({ name, posts }: PropsBlog) => {
  return (
    <div>
      <h1>Blog do {name}</h1>

      <ul>
        {posts.map((post, index) => (
          <li key={index} style={{marginBottom: 15, color: 'blue' }}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  return {
    props: {
      name: "Vinícius Garcia",
      posts,
    },
    //prop para fazer uma nova consulta na base
    revalidate: 10, // segundos
  };
};

export default Blog;
