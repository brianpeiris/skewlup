export default function App({ children }) {
  return (
    <main>
      <h1><a href="/">Resources</a></h1>
      <a className="tags-link" href="/tags">Browse Tags</a>
      <main>
        {children}
      </main>
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
          color: black
        }
        .tags-link {
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
