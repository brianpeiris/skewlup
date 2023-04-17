import { useRouter } from "next/router";
import { friendlyName } from "../lib/country";

export default function App({ children }) {
  const { query, asPath } = useRouter();
  const breadcrumbs = [{ text: "Home", link: "/" }];
  if (query.country) {
    breadcrumbs.push({
      text: friendlyName(query.country as string),
      link: `/${query.country}`,
    });
  }
  if (query.tag || asPath.endsWith("/tags")) {
    breadcrumbs.push({
      text: "tags",
      link: `/${query.country}/tags`,
    });
  }
  if (query.tag) {
    breadcrumbs.push({
      text: query.tag as string,
      link: `/${query.country}/tag/${query.tag}`,
    });
  }

  return (
    <main>
      <h1>
        <a href="/">Resources</a>
      </h1>
      <div className="breadcrumbs">
        {breadcrumbs.map((crumb, i) => (
          <span key={i}>
            <a href={crumb.link}>{crumb.text}</a>{" "}
            {i === breadcrumbs.length - 1 ? "" : "> "}
          </span>
        ))}
      </div>
      <main>{children}</main>
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
          margin: 30px 0 30px 0;
        }
        h1 a {
          text-decoration: none;
          color: black;
        }
        .breadcrumbs {
          margin-bottom: 30px;
        }
        main {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </main>
  );
}
