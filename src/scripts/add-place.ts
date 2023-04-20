import models from "../models";

const countryName = process.argv[2];
const cityName = process.argv[3];

(async () => {
  const [country]: any[] = await models.Country.findOrCreate({
    where: { name: countryName },
    defaults: { name: countryName },
  });
  await models.City.create({ CountryId: country.id, name: cityName });
  process.exit();
})();
