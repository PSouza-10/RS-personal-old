import axios from "axios";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { MdAccessTime } from "react-icons/md";

import { Logo } from "../../assets";
import { formatDate } from "./formatDate";
import { Article } from "./_editorTypes";
import { BlogContainer } from "./_styles";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const response = await axios.get("/content");
    console.log(JSON.stringify(response.data.posts[0]));
    return {
      props: {
        posts: response.data.posts as Article[],
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        posts: [],
        revalidate: 1,
      },
    };
  }
};

const PostCard: React.FC<{ post: Article }> = ({ post }) => {
  const { thumbnail, title, description, id, data, updatedAt } = post;
  const date = formatDate(updatedAt);
  return (
    <article>
      <figure>
        {thumbnail.url ? <img src={thumbnail.url} alt={title} /> : <Logo />}
      </figure>
      <section>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
      <footer>
        <time dateTime={updatedAt}>
          <MdAccessTime />
          <h4>{date}</h4>
        </time>
        {data.length > 0 && (
          <Link
            href={`/blog/${id}`}
            as={`/blog/${title.toLowerCase().split(" ").join("-")}`}
            passHref
          >
            <a className="button read-more">Veja mais</a>
          </Link>
        )}
      </footer>
    </article>
  );
};

function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BlogContainer className="page-container">
      <Head>
        <title>Blog - RS Personal</title>
      </Head>
      {posts && posts.map((post, idx) => <PostCard post={post} key={idx} />)}
    </BlogContainer>
  );
}

export default Blog;
