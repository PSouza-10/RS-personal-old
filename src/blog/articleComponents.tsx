import ReactPlayer from "react-player";

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

interface IVideo {
  content?: string;
}

export const BlogVideo: React.FC<IVideo> = ({ content }) => {
  const VContainer: React.FC = ({ children }) => (
    <div className="video"> {children}</div>
  );

  return <ReactPlayer url={content} wrapper={VContainer} />;
};

interface IList {
  content?: string[];
  numbered?: boolean;
}

export const BlogList: React.FC<IList> = ({ content, numbered }) => {
  const Wrapper: React.FC = ({ children }) =>
    numbered ? <ol>{children}</ol> : <ul>{children}</ul>;

  return (
    <Wrapper>
      {content.map((listItem, idx) => (
        <li key={idx}>{listItem}</li>
      ))}
    </Wrapper>
  );
};

interface ITable {
  content?: string[][];
}

export const BlogTable: React.FC<ITable> = ({ content }) => {
  return (
    <table>
      <thead>
        <tr>
          {content[0].map((text, key) => (
            <th key={key}>{text}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content.map(
          (textArr, rowKey) =>
            rowKey !== 0 && (
              <tr key={rowKey}>
                {textArr.map((text, key) => (
                  <td key={key}>{text}</td>
                ))}
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};
