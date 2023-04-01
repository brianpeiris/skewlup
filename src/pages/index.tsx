import components from "../components";
import models from "../models";
import { ResourceView } from "../lib/interfaces";
import _ from "lodash";

export default function Home({ resources }: { resources: ResourceView[] }) {
  return (
    <main>
      <h1>Resources</h1>
      {resources.map((resource, i) => (
        <components.Resource key={i} resource={resource} />
      ))}
      <style global jsx>{`
        body {
          margin: 0;
          font-family: sans-serif;
          display: flex;
          justify-content: center;
        }
      `}</style>
      <style jsx>{`
        h1 {
          text-align: center;
          margin: 30px 0;
        }
        main {
          width: 800px;
        }
      `}</style>
    </main>
  );
}

export async function getServerSideProps() {
  const resources = await models.Resource.findAll();
  return {
    props: {
      resources: resources.map((x) =>
        _.omit(x.toJSON(), ["updatedAt", "createdAt"])
      ),
    },
  };
}
