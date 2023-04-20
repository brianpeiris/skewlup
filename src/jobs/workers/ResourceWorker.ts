import { Worker } from "bullmq";
import connection from "../connection";
import { getText, saveThumbnail } from "../../lib/scrape";
import { getSummary, isValidProvider } from "../../lib/llm";
import logger from "../../lib/logger";
import models from "../../models";

function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export default new Worker(
  "resource",
  async (job) => {
    const { country: countryName, city: cityName, query, url } = job.data;

    const city = await models.City.findOne({
      include: [{ model: models.Country, attributes: [] }],
      where: {
        name: cityName,
        "$Country.name$": countryName,
      },
    });

    const alreadyExists =
      (await models.Resource.count({ where: { CityId: city.id, url } })) > 0;
    if (alreadyExists) return;

    const { title, text } = await getText(url);

    await sleep(1);
    const validProvider = await isValidProvider(text, query);
    logger.debug(
      `${title} at ${url} is primary source for ${query}? ${validProvider}`
    );
    if (!validProvider) return;

    const thumbnail = await saveThumbnail(url);

    await sleep(1);
    const { summary, tags } = await getSummary(text);

    const cleanTags = tags
      .map((tag) => tag.toLowerCase().replace(/[^a-z0-9]/g, "-"))
      .filter((tag) => ![countryName, cityName].includes(tag));

    await models.Resource.create({
      CityId: city.id,
      title,
      url,
      summary,
      thumbnail,
      tags: cleanTags,
    });

    for (const tag of cleanTags) {
      if (!(await models.Tag.findOne({ where: { CityId: city.id, tag } }))) {
        await models.Tag.create({ CityId: city.id, tag });
      }
      await models.Tag.increment("count", {
        where: { CityId: city.id, tag },
      });
    }
  },
  { connection, limiter: { duration: 1000, max: 1 } }
);
