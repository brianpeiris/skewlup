import { readFileSync } from "fs";

const mimeFromExtension = {
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
};

export default async function handler(req, res) {
  const { paths } = req.query;
  const file = paths.join("/");
  const extension = file.split(".").pop();
  const buffer = readFileSync(`./public/${file}`);
  res.setHeader("content-type", mimeFromExtension[extension]);
  res.setHeader("cache-control", "max-age=86400");
  res.status(200).send(buffer);
}
