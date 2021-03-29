interface ITitle {
  content?: string;
  textSize?: number;
}

export const BlogTitle: React.FC<ITitle> = ({ textSize, content }) => {
  if (textSize === 1) {
    return <h4>{content}</h4>;
  } else {
    return <h3>{content}</h3>;
  }
};

interface IParagraph {
  content?: string;
}

export const BlogText: React.FC<IParagraph> = ({ content }) => {
  return <p>{content}</p>;
};

interface IImage {
  content?: string;
}

export const BlogImage: React.FC<IImage> = ({ content }) => {
  return (
    <figure>
      <img src={content} />
    </figure>
  );
};
