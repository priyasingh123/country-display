import CountryBoard from "./CountryBoard";
import { Country } from "../service/restCountry";

const DisplayCountries = ({ results }: { results: Country[] | [] }) => {
  return (
    <div>
      {results === null ? null : results?.length === 0 ? (
        <p>No Matching Results</p>
      ) : (
        <CountryBoard results={results} />
      )}
    </div>
  );
};

export default DisplayCountries;
