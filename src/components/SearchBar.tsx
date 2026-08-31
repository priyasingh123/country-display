import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { type Country, fetchCountries } from "../service/restCountry";

interface SearchBarProps {
  setResults: Dispatch<SetStateAction<Country[]>>;
}

const SearchBar = ({ setResults }: SearchBarProps) => {
  const [inputVal, setInputVal] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      if (inputVal.trim()) {
        try {
          const res = await fetchCountries(inputVal, controller);
          setResults(res);
        } catch (error) {
          if (error instanceof Error && error.name !== "AbortError") {
            setResults([]);
          }
        }
      } else {
        setResults([]);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputVal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputVal(value);
    if (value.trim()) {
      navigate("/country-display");
    }
  };

  return (
    <div>
      <label className="country-heading">Start Typing Country Name... </label>
      <input
        className="input-country"
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={inputVal}
      />
    </div>
  );
};

export default SearchBar;
