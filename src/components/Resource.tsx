import { ResourceView } from "../lib/interfaces";

export default function Resource({ resource }: { resource: ResourceView }) {
  return (
    <div className="resource">
      <div className="info">
        <h2>{resource.title}</h2>
        <a href={resource.url}>{resource.url}</a>
        <p>{resource.summary}</p>
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
        }
        .info {
          flex: 1;
        }
        img {
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}
