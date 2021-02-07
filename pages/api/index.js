import Parser from "rss-parser";
const parser = new Parser();

async function main(userId) {
  try {
    const { items } = await parser.parseURL(
      `https://medium.com/feed/@${userId}`
    );

    return items;
  } catch (error) {
    return error;
  }
}

export default async function handler(req, res) {
  const id = req.query.id;
  const data = await main(id);
  console.log(!!data);
  res.status(200).send(data);
}
