import { useRouter } from "next/router";
import components from "../../components";
import models from "../../models";
import { CityView } from "../../lib/interfaces";
import { friendlyName } from "../../lib/names";
import _ from "lodash";

export default function Country({ cities }: { cities: CityView[] }) {
  const { country } = useRouter().query;
  return (
    <components.App>
      {cities.map((city) => (
        <a href={`/${country}/${city.name}`}>{friendlyName(city.name)}</a>
      ))}
    </components.App>
  );
}

export async function getServerSideProps() {
  const cities = await models.City.findAll({
    include: [{model: models.Country,  attributes: []}],
    order: [["createdAt", "DESC"]],
  });
  return {
    props: {
      cities: cities.map((r: any) =>
        _.omit(r.toJSON(), ["createdAt", "updatedAt"])
      ),
    },
  };
}
