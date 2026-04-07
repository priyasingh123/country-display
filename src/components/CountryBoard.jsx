
const CountryBoard = ({ results }) => {
  const visitMap = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="country-board">
      {results?.map((country) => {
        const currency = country?.currencies
          ? Object.values(country.currencies)[0]
          : null;

        return (
          <div key={country.name.common} className="country-card">
            
            {/* Map Button */}
            <button
              className="badge top-right"
              onClick={() => visitMap(country?.maps?.googleMaps)}
            >
              See on Map
            </button>

            {/* Title */}
            <h3>{country.name.common}</h3>

            {/* Flag */}
            <img
              src={country.flags.png}
              alt={`flag of ${country.name.common}`}
            />

            {/* Details */}
            <p>
              Capital: <strong>{country?.capital?.[0] || "--"}</strong>
            </p>

            <p>
              Currency:{" "}
              <strong>
                {currency
                  ? `${currency.name} (${currency.symbol})`
                  : "--"}
              </strong>
            </p>

            <p>
              Region: <strong>{country?.region || "--"}</strong>
            </p>

            <p>
              Area: <strong>{country?.area || "--"}</strong>
            </p>

            <p>
              Population: <strong>{country?.population || "--"}</strong>
            </p>

            {/* ✅ Open in new tab */}
            <a
              className="more-info"
              href={`#/country-display/${encodeURIComponent(
                country.name.common
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              More Info
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default CountryBoard;