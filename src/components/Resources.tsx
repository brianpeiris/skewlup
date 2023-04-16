import components from "../components";
import models from "../../models";
import { ResourceView } from "../../lib/interfaces";
import { Op } from "sequelize";
import _ from "lodash";

export default function Resources({
  resources,
}: {
  resources: ResourceView[];
}) {
  return (
    <>
      <div className="resources">
        {resources.map((resource, i) => (
          <components.Resource key={i} resource={resource} />
        ))}
      </div>
      <style jsx>{`
        .resources {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
