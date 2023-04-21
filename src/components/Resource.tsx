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
        <div className="thumbnailContainer">
          <img src={`/api/static/${resource.thumbnail}`} />
        </div>
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
          padding: 15px;
          border-radius: 10px;
          display: flex;
          margin: 40px 20px;
          margin-top: 0;
          display: flex;
          flex-direction: column;
        }
        .url {
          font-size: 14px;
          word-break: break-all;
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
        .thumbnailContainer {
          min-width: 200px;
          display: flex;
          justify-content: center;
        }
        img {
          border-radius: 5px;
          max-height: 150px;
          max-width: 200px;
          object-fit: contain;
        }
        @media (max-width: 600px) {
          .resource {
            margin: 10px 0;
          }
          .thumbnailContainer {
            min-width: 100px;
          }
          img {
            width: 100px;
            max-height: 75px;
          }
        }
      `}</style>
    </div>
  );
}
