import { NextApiHandler } from "next";
const posts = [
  { id: 1, title: "Oi casada" },
  { id: 2, title: "Oi prima" },
  { id: 3, title: "Oi diretora" },
  { id: 4, title: "Oi irmã" },
];
const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      const { id } = req.query;
      if (!Array.isArray(id)) {
        const requested = posts.find((post) => post.id === parseInt(id));
        return res.json(requested);
      }
      break;
    default:
      return res.json({});
  }
};

export default handler;
