import components from "../components";
import models from "../models";
import { ResourceView } from "../lib/interfaces";
import _ from "lodash";

export default function Home({ resources }: { resources: ResourceView[] }) {
  return (
    <main>
      <h1>Resources</h1>
      <div className="resources">
        {resources.map((resource, i) => (
          <components.Resource key={i} resource={resource} />
        ))}
      </div>
      <style global jsx>{`
        body {
          margin: 0;
          font-family: sans-serif;
          display: flex;
        }
        #__next {
          width: 100%;
        }
      `}</style>
      <style jsx>{`
        h1 {
          text-align: center;
          margin: 30px 0 20px 0;
        }
        main {
          width: 100%;
        }
        .resources {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
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
