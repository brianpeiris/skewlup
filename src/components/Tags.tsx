import { useRouter } from 'next/router';
import { TagView } from "../lib/interfaces";

export default function Tags({
  tags,
}: {
  tags: TagView[];
}) {
  const { country, city } = useRouter().query;
  return (
    <>
      <div className="tags">
        {tags.filter(tag => tag.count > 1).map((tag) => (
          <a key={tag.tag} href={`/${country}/${city}/tag/${tag.tag}`}>{tag.tag} ({tag.count})</a>
        ))}
        <a href={`/${country}/${city}/tags`}>more tags</a>
      </div>
      <style jsx>{`
        .tags {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 30px;
          padding: 0 8px;
        }
      `}</style>
    </>
  );
}
