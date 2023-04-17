import { Worker } from "bullmq";
import connection from "../connection";
import { getText } from "../../lib/scrape";
import { getSummary, isPrimarySource } from "../../lib/llm";
import logger from "../../lib/logger";
import models from "../../models";
import * as interfaces from "../../lib/interfaces";

function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export default new Worker(
  "resource",
  async (job) => {
    const { country: countryName, query, url } = job.data;

    const country = await models.Country.findOne({
      where: { name: countryName },
    });

    const alreadyExists =
      (await models.Resource.count({ where: { CountryId: country.id, url } })) >
      0;
    if (alreadyExists) return;

    const { title, text } = await getText(url);

    await sleep(1);
    const primarySource = await isPrimarySource(text, query);
    logger.debug(
      `${title} at ${url} is primary source for ${query}? ${primarySource}`
    );
    if (!primarySource) return;

    await sleep(1);
    const { summary, tags } = await getSummary(text);

    await models.Resource.create({
      CountryId: country.id,
      title,
      url,
      summary,
      tags,
    });

    for (const tag of tags) {
      if (
        !(await models.Tag.findOne({ where: { CountryId: country.id, tag } }))
      ) {
        await models.Tag.create({ CountryId: country.id, tag });
      }
      await models.Tag.increment("count", {
        where: { CountryId: country.id, tag },
      });
    }
  },
  { connection, limiter: { duration: 1000, max: 1 } }
);
