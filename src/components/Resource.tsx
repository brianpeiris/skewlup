import { useRouter } from 'next/router';
import { ResourceView } from "../lib/interfaces";

export default function Resource({ resource }: { resource: ResourceView }) {
  const { country, city } = useRouter().query;
  return (
    <div className="resource">
      <div className="info">
        <h2>{resource.title}</h2>
        <a href={resource.url} target="_blank">
          {resource.url}
        </a>
        <p>{resource.summary}</p>
        <div className="tags">
          {resource.tags.map((tag) => (
            <a key={tag} className="tag" href={`/${country}/${city}/tag/${tag}`}>
              {tag}
            </a>
          ))}
        </div>
      </div>
      <img src={resource.thumbnail} />
      <style jsx>{`
        h2 {
          margin: 0 0 10px 0;
        }
        .resource {
          width: 600px;
          background: #f3f3f3;
          padding: 10px;
          border-radius: 10px;
          display: flex;
          margin: 20px;
          margin-top: 0;
        }
        .info {
          flex: 1;
        }
        .tags {
          display: flex;
          gap: 5px;
        }
        .tags a {
          color: #333;
        }
        img {
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}
