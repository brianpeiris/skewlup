import { friendlyName } from "../lib/names";

export default function Places({ places }) {
  return (
    <>
      {places.map((place) => (
        <a href={place.link}>{friendlyName(place.name)}</a>
      ))}
      <style jsx>{`
        a {
          font-size: 20px;
          margin: 5px;
        }
      `}</style>
    </>
  );
}
