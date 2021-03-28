export type NodeType =
  | "Title"
  | "Paragraph"
  | "Image"
  | "List"
  | "Table"
  | "Video";
export interface ListData {
  content?: string[] | string | string[][];
  numbered?: boolean;
  type: NodeType;
}

export interface TableData {
  content?: any;
  type: NodeType;
}

export interface TitleData {
  content?: string;
  textSize?: number;
  type: "Title";
}

export interface ParagraphData {
  content?: string;
  type: "Paragraph";
}

export interface ImageData {
  content?: string;
  type: "Image";
  srcType?: "file" | "link";
  size?: string[];
}

export interface VideoData {
  content?: string;
  type: "Video";
}

export type NodeData =
  | TitleData
  | ParagraphData
  | ImageData
  | ListData
  | TableData
  | VideoData;
export interface EditorComponent<T = NodeData> {
  idx: number;
  id: string;
  data: T;
}

export interface EditorState {
  nodes: EditorComponent<NodeData>[];
  selectedNodeIdx: number | null;
  currentNode: HTMLElement | null;
  loading: boolean;
  articleTitle: string;
  articleId: number | null;
}

export interface Article {
  id: number;
  title: string;
  data: EditorComponent<NodeData>[];
  tags: string[];
  public: boolean;
  requires_membership: boolean;
  comments: null | any[];
  likes: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    username: string;
  };
  thumbnail: {
    url: string;
    srcId: string;
  };
  description?: string;
}
