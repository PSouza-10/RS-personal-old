import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return res.json([
        { id: 1, title: "Oi casada" },
        { id: 2, title: "Oi prima" },
        { id: 3, title: "Oi diretora" },
        { id: 4, title: "Oi irmã" },
      ]);

    default:
      return res.json({});
  }
};

export default handler;
