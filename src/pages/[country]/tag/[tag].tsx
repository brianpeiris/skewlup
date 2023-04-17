import components from "../../../components";
import models from "../../../models";
import { ResourceView, TagView } from "../../../lib/interfaces";
import { Op } from "sequelize";
import { omitDates } from "../../../lib/props";

export default function Tag({
  tags,
  resources,
}: {
  tags: TagView[];
  resources: ResourceView[];
}) {
  return (
    <components.App>
      <components.Tags tags={tags} />
      <components.Resources resources={resources} />
    </components.App>
  );
}

export async function getServerSideProps({ params: { country, tag } }) {
  const tags = await models.Tag.findAll({
    include: [{ model: models.Country, attributes: [] }],
    where: {
      "$Country.name$": { [Op.eq]: country },
    },
    order: [["count", "DESC"]],
  });
  const resources = await models.Resource.findAll({
    include: [{ model: models.Country, attributes: [] }],
    where: {
      "$Country.name$": { [Op.eq]: country },
      tags: { [Op.contains]: tag },
    },
    order: [["createdAt", "DESC"]],
  });
  return {
    props: {
      tags: omitDates(tags),
      resources: omitDates(resources),
    },
  };
}
