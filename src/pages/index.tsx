import components from "../components";
import models from "../models";
import { CountryView } from "../lib/interfaces";
import { friendlyName } from "../lib/names";
import _ from "lodash";

export default function Home({ countries }: { countries: CountryView[] }) {
  return (
    <components.App>
      {countries.map((country) => (
        <a href={`/${country.name}`}>{friendlyName(country.name)}</a>
      ))}
    </components.App>
  );
}

export async function getServerSideProps() {
  const countries = await models.Country.findAll({
    order: [["createdAt", "DESC"]],
  });
  return {
    props: {
      countries: countries.map((r) =>
        _.omit(r.toJSON(), ["createdAt", "updatedAt"])
      ),
    },
  };
}
