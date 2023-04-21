import { readFileSync } from "fs";
import { NextApiResponse, NextApiRequest } from "next";

const mimeFromExtension = {
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { paths } = req.query;
  const file = (paths as string[]).join("/");
  const extension = file.split(".").pop();
  const buffer = readFileSync(`./public/${file}`);
  res.setHeader("content-type", mimeFromExtension[extension]);
  res.setHeader("cache-control", "max-age=86400");
  res.status(200).send(buffer);
}
