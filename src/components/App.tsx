import { useRouter } from "next/router";
import { friendlyName } from "../lib/names";

export default function App({ children }) {
  const { query, asPath } = useRouter();
  const breadcrumbs = [{ text: "Home", link: "/" }];
  if (query.country) {
    breadcrumbs.push({
      text: friendlyName(query.country as string),
      link: `/${query.country}`,
    });
  }
  if (query.city) {
    breadcrumbs.push({
      text: friendlyName(query.city as string),
      link: `/${query.country}/${query.city}`,
    });
  }
  if (query.tag || asPath.endsWith("/tags")) {
    breadcrumbs.push({
      text: "tags",
      link: `/${query.country}/${query.city}/tags`,
    });
  }
  if (query.tag) {
    breadcrumbs.push({
      text: query.tag as string,
      link: `/${query.country}/${query.city}/tag/${query.tag}`,
    });
  }

  return (
    <main>
      <h1>
        <a href="/">
          <img className="logo" src="/logo.svg" />
          Skwelup
        </a>
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
        :root {
          --background: white;
          --secondary-background: #f3f3f3;
          --text: black;
          --secondary-text: #555;
          --link: blue;
          --visited-link: purple;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --background: #111;
            --secondary-background: #333;
            --text: white;
            --secondary-text: #aaa;
            --link: #99dafb;
            --visited-link: #72a2ba;
          }
        }
        body {
          margin: 0;
          font-family: sans-serif;
          display: flex;
          color: var(--text);
          background: var(--background);
        }
        .logo {
          height: 50px;
          margin-right: 10px;
        }
        a {
          color: var(--link);
        }
        a:visited {
          color: var(--visited-link);
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
          color: var(--text);
          display: flex;
          align-items: center;
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
