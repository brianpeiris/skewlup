import components from "../components";
import models from "../models";
import { ResourceView } from "../lib/interfaces";
import _ from "lodash";

export default function Home({ resources }: { resources: ResourceView[] }) {
  return (
    <components.App>
      <components.Resources resources={resources} />
    </components.App>
  );
}

export async function getServerSideProps() {
  const resources = await models.Resource.findAll({
    order: [["createdAt", "DESC"]],
  });
  return {
    props: {
      resources: resources.map((r) =>
        _.omit(r.toJSON(), ["createdAt", "updatedAt"])
      ),
    },
  };
}
