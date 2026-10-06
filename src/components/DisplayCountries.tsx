import CountryBoard from "./CountryBoard";
import { Country } from "../service/restCountry";

const DisplayCountries = ({
  results,
  inputVal,
}: {
  results: Country[] | [];
  inputVal: string;
}) => {
  return (
    <div>
      {!!inputVal && results?.length === 0 ? (
        <p>No Matching Results</p>
      ) : (
        <CountryBoard results={results} />
      )}
    </div>
  );
};

export default DisplayCountries;
