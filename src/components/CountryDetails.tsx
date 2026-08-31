import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { type Country, fetchCountries } from "../service/restCountry";

const CountryDetails = () => {
  const { countryName } = useParams();
  const [detail, setDetail] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const fetchCountryDetails = async () => {
      try {
        const res = await fetchCountries(countryName || "", controller);
        if (res.length > 1) {
          const exactMatch = res.find(
            (country) =>
              country.names.common.toLowerCase() === countryName?.toLowerCase(),
          );
          console.log("Exact match:", exactMatch);
          if (exactMatch) {
            setDetail(exactMatch);
          } else {
            setDetail(res[0] || null);
          }
        } else setDetail(res[0] || null);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          setDetail(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCountryDetails();
    return () => {
      controller.abort();
    };
  }, [countryName]);

  const visitMap = (link: string) => {
    window.open(link, "_blank");
  };

  const nativeNames = detail?.names?.native
    ? Object.values(detail.names.native)
    : [];
  const currencies = detail?.currencies ? Object.values(detail.currencies) : [];
  const borders = detail?.borders || [];
  const timezones = detail?.timezones || [];

  return (
    <div className="country-details">
      {loading && <p>Loading country details...</p>}
      {!loading && detail ? (
        <>
          <h3>{detail?.names?.common ?? "Unknown Country"}</h3>
          <img
            src={detail?.flag?.url_png}
            alt={`flag of ${detail?.names?.common ?? "Unknown"}`}
          />
          <p>
            Other Names:{" "}
            <strong>
              {nativeNames.map((name, index) => (
                <span key={index}>{name.official} | </span>
              ))}
            </strong>
          </p>
          <p>
            Capital: <strong>{detail?.capitals[0]?.name ?? "N/A"}</strong>
          </p>
          <p>
            Currency:{" "}
            <strong>
              {currencies.length > 0
                ? `${currencies[0]?.name ?? "--"} (${currencies[0]?.symbol ?? ""})`
                : "--"}
            </strong>
          </p>
          <p>
            Region: <strong>{detail?.region ?? "N/A"}</strong>
          </p>
          <p>
            Subregion: <strong>{detail?.subregion ?? "N/A"}</strong>
          </p>
          <p>
            Area: <strong>{detail?.area.kilometers ?? "N/A"}Km</strong>
          </p>
          <p>
            Population:{" "}
            <strong>{detail?.population.toLocaleString() ?? "N/A"}</strong>
          </p>

          <p>
            Timezones: <strong>{timezones.join(", ") || "N/A"}</strong>
          </p>
          <p>
            Borders With:{" "}
            <strong>
              {borders.map((border, index) => (
                <span key={index}>{border} </span>
              ))}
            </strong>
          </p>
          <p>
            Is LandLocked ? <strong>{detail?.landlocked ? "Yes" : "No"}</strong>
          </p>
          <button
            className="badge"
            onClick={() => visitMap(detail?.links?.google_maps)}
          >
            See on Map
          </button>
        </>
      ) : (
        !loading && <p>No country details found</p>
      )}
    </div>
  );
};

export default CountryDetails;
