import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { Article } from "./_editorTypes";
import { PostContainer } from "./_styles";
import React from "react";
import {
  BlogImage,
  BlogList,
  BlogTable,
  BlogText,
  BlogTitle,
  BlogVideo,
} from "./articleComponents";
import { formatDate } from "./formatDate";
import Head from "next/head";
import { useRouter } from "next/router";
import { Loading } from "../../components";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await axios.get("/content");
    const articles = response.data.posts as Article[];
    let paths = [];

    articles.forEach(({ id }) => {
      paths.push({ params: { id: id.toString() } });
    });
    return {
      paths,
      fallback: true,
    };
  } catch (e) {
    console.error(e);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const post = await axios.get(`/content/${params.id}`);

    return {
      props: {
        post: post.data as Article,
      },
      revalidate: 10,
    };
  } catch (e) {
    if (e.isAxiosError && e.response.status === 404) {
      return {
        notFound: true,
        revalidate: 10,
      };
    } else {
      return {
        props: {
          err: "Ocorreu um erro",
        },
        revalidate: 10,
      };
    }
  }
};

interface INodeComponentMap {
  [x: string]: any;
}
interface PostProps {
  err?: string;
  post?: Article;
}

const Post: React.FC<PostProps> = ({ post, err }) => {
  const router = useRouter();
  if (err) {
    return <h1>{err}</h1>;
  } else if (router.isFallback) {
    return <Loading wholePage isVisible={true} />;
  }
  const { title, data, updatedAt, description, tags } = post;
  const nodeComponentMap: INodeComponentMap = {
    Title: <BlogTitle />,
    Paragraph: <BlogText />,
    Image: <BlogImage />,
    Table: <BlogTable />,
    Video: <BlogVideo />,
    List: <BlogList />,
  };
  return (
    <PostContainer className="page-container">
      <Head>
        <title>{title} - Blog RS-Personal</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={tags} />
      </Head>

      <header>
        <h1>{title}</h1>
        <time dateTime={updatedAt}>{formatDate(updatedAt)} </time>
        <section className="tags">
          {tags.split(",").map((tag, idx) => (
            <em key={idx}>{tag}</em>
          ))}
        </section>
      </header>
      {data &&
        data.map((node, idx) =>
          React.cloneElement(nodeComponentMap[node.data.type], {
            ...node.data,
            key: idx,
          })
        )}
    </PostContainer>
  );
};

export default Post;
