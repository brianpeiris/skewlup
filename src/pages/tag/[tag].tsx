import components from "../../components";
import models from "../../models";
import { ResourceView } from "../../lib/interfaces";
import { Op } from "sequelize";
import _ from "lodash";

export default function Tag({ resources }: { resources: ResourceView[] }) {
  return (
    <components.App>
      <components.Resources resources={resources} />
    </components.App>
  );
}

export async function getServerSideProps({ params: { tag } }) {
  const resources = await models.Resource.findAll({
    where: { tags: { [Op.contains]: tag } },
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
