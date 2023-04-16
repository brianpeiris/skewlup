import components from "../components";
import models from "../models";
import { TagView } from "../lib/interfaces";
import _ from "lodash";

export default function Tags({ tags }: { tags: TagView[] }) {
  return (
    <components.App>
      <div className="tags">
        {tags.map((tag) => (
          <a key={tag.tag} className="tag" href={`/tag/${tag.tag}`}>
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
          max-width: 1000px;
        }
      `}</style>
    </components.App>
  );
}

export async function getServerSideProps() {
  const tags = await models.Tag.findAll({ order: [["count", "DESC"]] });
  return {
    props: {
      tags: tags.map((t) => _.omit(t.toJSON(), ["createdAt", "updatedAt"])),
    },
  };
}
