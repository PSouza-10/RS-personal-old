import axios from "axios";
import { GetServerSideProps } from "next";
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
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await axios.get(`/content/${params.id}`);

  return {
    props: {
      post: post.data as Article,
    },
  };
};

interface INodeComponentMap {
  [x: string]: any;
}

const Post: React.FC<{ post: Article }> = ({ post }) => {
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
