import axios from "axios";
import { GetServerSideProps } from "next";
import { Article } from "./_editorTypes";
import { PostContainer } from "./_styles";
import React from "react";
import { BlogImage, BlogText, BlogTitle } from "./articleComponents";
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
  const { title, data } = post;
  const nodeComponentMap: INodeComponentMap = {
    Title: <BlogTitle />,
    Paragraph: <BlogText />,
    Image: <BlogImage />,
  };

  return (
    <PostContainer>
      <h1>{title}</h1>
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
