import components from "../components";
import models from "../models";
import { CountryView } from "../lib/interfaces";
import _ from "lodash";

export default function Home({ countries }: { countries: CountryView[] }) {
  return (
    <components.App>
      <components.Places places={countries} />
    </components.App>
  );
}

export async function getServerSideProps() {
  const countries: any[] = await models.Country.findAll({
    order: [["createdAt", "DESC"]],
  });
  return {
    props: {
      countries: countries.map((r) => ({
        ..._.omit(r.toJSON(), ["createdAt", "updatedAt"]),
        link: `/${r.name}`,
      })),
    },
  };
}
