import { useRouter } from "next/router";
import components from "../../../components";
import models from "../../../models";
import { TagView } from "../../../lib/interfaces";
import { Op } from "sequelize";
import _ from "lodash";

export default function Tags({ tags }: { tags: TagView[] }) {
  const { country, city } = useRouter().query;
  return (
    <components.App>
      <div className="tags">
        {tags.map((tag) => (
          <a key={tag.tag} className="tag" href={`/${country}/${city}/tag/${tag.tag}`}>
            {tag.tag} ({tag.count})
          </a>
        ))}
      </div>
      <style jsx>{`
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          max-width: 800px;
        }
      `}</style>
    </components.App>
  );
}

export async function getServerSideProps({ params: { country, city } }) {
  const tags = await models.Tag.findAll({
    include: [
      {
        model: models.City,
        attributes: [],
        include: [{ model: models.Country, attributes: [] }],
      },
    ],
    where: {
      "$City.Country.name$": { [Op.eq]: country },
      "$City.name$": { [Op.eq]: city },
    },
    order: [["count", "DESC"]],
  });
  return {
    props: {
      tags: tags.map((t) => _.omit(t.toJSON(), ["createdAt", "updatedAt"])),
    },
  };
}
