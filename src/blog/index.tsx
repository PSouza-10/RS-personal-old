import axios from "axios";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  MdAccessTime,
  MdClose,
  MdFilter,
  MdFilterList,
  MdSearch,
} from "react-icons/md";
import ReactPlayer from "react-player";

import { Logo } from "../../assets";
import { FormField } from "../../components";
import { formatDate } from "./formatDate";
import { Article } from "./_editorTypes";
import { BlogContainer, PostCardContainer } from "./_styles";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const response = await axios.get("/content");
    const articles = response.data.posts as Article[];
    let allTags = [];

    articles.forEach(({ tags }, idx) => {
      if (tags) {
        const tagsArr = tags.split(",").filter((tag) => !allTags.includes(tag));

        allTags = [...allTags, ...tagsArr];
      }
    });
    return {
      props: {
        posts: articles,
        allTags,
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        posts: [],
        allTags: [],
      },
    };
  }
};

const VContainer: React.FC = ({ children }) => (
  <div className="video">{children}</div>
);
const PostCard: React.FC<{ post: Article; setTag: (tag: string) => void }> = ({
  post,
  setTag,
}) => {
  const { thumbnail, title, description, id, data, updatedAt, tags } = post;
  const date = formatDate(updatedAt);
  const [textIsExpanded, setTextExpanded] = useState(false);

  return (
    <PostCardContainer textExpanded={textIsExpanded}>
      <figure>
        {thumbnail.srcId === "Instagram" ? (
          <ReactPlayer url={thumbnail.url} wrapper={VContainer} />
        ) : thumbnail.url ? (
          <img src={thumbnail.url} alt={title} />
        ) : (
          <Logo />
        )}
      </figure>
      <section>
        <h2>{title}</h2>
        <span className="tags">
          {tags &&
            tags
              .split(",")
              .slice(0, 6)
              .map((tag, idx) => (
                <em key={idx} className="badge" onClick={() => setTag(tag)}>
                  {tag}
                </em>
              ))}
        </span>
        <p>
          {description}{" "}
          {description.length >= 290 && (
            <span onClick={() => setTextExpanded(!textIsExpanded)}>
              {textIsExpanded ? "Esconder texto" : "Expandir texto"}
            </span>
          )}
        </p>
      </section>
      <footer>
        <time dateTime={updatedAt}>
          <MdAccessTime />
          <h4>{date}</h4>
        </time>
        {data.length > 0 && (
          <Link href={`/blog/${id}`} passHref>
            <a className="button read-more">Veja mais</a>
          </Link>
        )}
      </footer>
    </PostCardContainer>
  );
};

function Blog({
  posts,
  allTags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedTag, setTag] = useState<null | string>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const filteredPosts = posts.filter(({ tags, title }) => {
    if (!selectedTag && !searchTerm) return true;
    else {
      let hasTag = true;
      if (selectedTag) {
        if (!tags) {
          hasTag = false;
        } else {
          hasTag = tags.split(",").includes(selectedTag);
        }
      }
      let containsTitle = true;
      if (searchTerm) {
        containsTitle = title.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return hasTag && containsTitle;
    }
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };
  const [filtersIsOpen, setFiltersIsOpen] = useState(false);
  return (
    <BlogContainer className="page-container" filtersIsOpen={filtersIsOpen}>
      <Head>
        <title>Blog - RS Personal</title>
      </Head>
      <section className="posts">
        {posts && filteredPosts.length > 0 ? (
          filteredPosts.map((post, idx) => (
            <PostCard setTag={(tag) => setTag(tag)} post={post} key={idx} />
          ))
        ) : (
          <h1>Nenhuma postagem encontrada</h1>
        )}
      </section>
      <section className="filters">
        <FormField
          type="text"
          value={searchVal}
          icon={<MdSearch />}
          placeholder="Pesquise..."
          onChange={handleSearch}
        />
        <span className="search-action">
          <button onClick={() => setSearchTerm(searchVal)} className="button">
            Pesquisar
          </button>
          <button
            onClick={() => {
              setSearchVal("");
              setSearchTerm("");
              setTag(null);
            }}
            className="button danger"
          >
            Limpar
          </button>
        </span>
        <div className="tags">
          <h2>Tags </h2>
          <section className="selector">
            {allTags &&
              allTags.map((tag, idx) => (
                <em
                  key={idx}
                  onClick={() =>
                    selectedTag === tag ? setTag(null) : setTag(tag)
                  }
                  className={`badge ${selectedTag === tag && "selected"}`}
                >
                  {tag}
                </em>
              ))}
          </section>
        </div>
      </section>
      <button
        className="filter-control"
        onClick={() => {
          document.body.style.overflow = !filtersIsOpen ? "hidden" : "initial";

          setFiltersIsOpen(!filtersIsOpen);
        }}
      >
        <span>{filtersIsOpen ? <MdClose /> : <MdFilterList />}</span>
      </button>
    </BlogContainer>
  );
}

export default Blog;
