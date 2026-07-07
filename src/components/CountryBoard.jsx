import { Link } from "react-router-dom";

const CountryBoard = ({ results, setCountryDetails }) => {
  const visitMap = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="country-board" role="list" aria-label="list of countries">
      {results?.map((country) => {
        const currency = country?.currencies
          ? Object.values(country.currencies)[0]
          : null;

        return (
          <article
            key={country.names.common}
            className="country-card"
            role="listitem"
            aria-labelledby={`country-${country.names.common}`}
          >
            {/* Map Button */}
            <a
              className="badge top-right"
              href={country?.links?.google_maps}
              target="_blank"
              aria-label={`Open ${country.names.common} on Google Maps (opens in new tab)`}
              rel="noreferrer"
            >
              See on Map
            </a>

            {/* Title */}
            <h3 id={`country-${country.names.common}`}>
              {country.names.common}
            </h3>

            {/* Flag */}
            <img
              src={country.flag.url_png}
              alt={`flag of ${country.names.common}`}
              loading="lazy"
            />

            {/* Details */}
            <dl>
              <div style={{ display: "flex" }}>
                <dt>Capital</dt>
                <dd>
                  <strong>{country?.capitals?.[0]?.name || "--"}</strong>
                </dd>
              </div>

              <div style={{ display: "flex" }}>
                <dt>Currency</dt>
                <dd>
                  <strong>
                    {currency ? `${currency.name} (${currency.symbol})` : "--"}
                  </strong>
                </dd>
              </div>

              <div style={{ display: "flex" }}>
                <dt>Region</dt>

                <dd>
                  <strong>{country?.region || "--"}</strong>
                </dd>
              </div>

              <div style={{ display: "flex" }}>
                <dt>Area</dt>
                <dd>
                  <strong>{country?.area.kilometers || "--"}Km</strong>
                </dd>
              </div>

              <div style={{ display: "flex" }}>
                <dt>Population</dt>
                <dd>
                  <strong>
                    {country?.population.toLocaleString() || "--"}
                  </strong>
                </dd>
              </div>
            </dl>
            <Link
              className="more-info"
              to={`/country-display/${encodeURIComponent(country.names.common)}`}
              target="_blank"
            >
              More Info
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default CountryBoard;
