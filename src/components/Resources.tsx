import components from "../components";
import { ResourceView } from "../lib/interfaces";

export default function Resources({
  resources,
}: {
  resources: ResourceView[];
}) {
  return (
    <>
      <div className="resources">
        {resources.map((resource) => (
          <components.Resource key={resource.id} resource={resource} />
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
