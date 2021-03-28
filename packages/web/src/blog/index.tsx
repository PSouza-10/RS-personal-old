import axios from "axios";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { Logo } from "../../assets";
import { Article } from "./_editorTypes";
import { BlogContainer } from "./_styles";

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await axios.get("/content");

  return {
    props: {
      posts: response.data.posts as Article[],
    },
    revalidate: 5,
  };
};

const PostCard: React.FC<{ post: Article }> = ({ post }) => {
  const { thumbnail, title, description, id } = post;

  return (
    <Link href={`/blog/${id}`} key={id} passHref>
      <a>
        <figure>
          {thumbnail.url ? <img src={thumbnail.url} alt={title} /> : <Logo />}
        </figure>
        <h1>{title}</h1>
        <p>{description}</p>
      </a>
    </Link>
  );
};

function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BlogContainer>
      <Head>
        <title>Blog - RS Personal</title>
      </Head>
      {posts && posts.map((post, idx) => <PostCard post={post} />)}
    </BlogContainer>
  );
}

export default Blog;
