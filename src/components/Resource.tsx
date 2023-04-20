import { useRouter } from "next/router";
import { ResourceView } from "../lib/interfaces";

export default function Resource({ resource }: { resource: ResourceView }) {
  const { country, city } = useRouter().query;
  return (
    <div className="resource">
      <h2>{resource.title}</h2>
      <a className="url" href={resource.url} target="_blank">
        {resource.url.replace(/https?:\/\//, "").replace(/\/$/, "")}
      </a>
      <div className="content">
        <span>{resource.summary}</span>
        <img src={resource.thumbnail} />
      </div>
      <div className="tags">
        {resource.tags.map((tag) => (
          <a key={tag} className="tag" href={`/${country}/${city}/tag/${tag}`}>
            {tag}
          </a>
        ))}
      </div>
      <style jsx>{`
        h2 {
          font-size: 20px;
          margin: 0 0 10px 0;
        }
        .resource {
          width: 600px;
          max-width: 80vw;
          background: var(--secondary-background);
          padding: 10px;
          border-radius: 10px;
          display: flex;
          margin: 40px 20px;
          margin-top: 0;
          display: flex;
          flex-direction: column;
        }
        .url {
          font-size: 14px;
        }
        .tags {
          margin-top: 10px;
          display: flex;
          gap: 5px;
          flex: 1;
          align-items: end;
        }
        .tags a {
          color: var(--secondary-text);
        }
        .content {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          justify-content: flex-start;
        }
        img {
          border-radius: 5px;
          width: 200px;
          height: 150px;
          object-fit: contain;
        }
        @media (max-width: 600px) {
          .resource {
            margin: 10px 0;
          }
          img {
            width: 100px;
            height: 75px;
          }
        }
      `}</style>
    </div>
  );
}
