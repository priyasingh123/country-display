import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCountries } from "../service/restCountry";

const SearchBar = ({ setResults }) => {
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      if (inputVal.trim()) {
        try {
          const res = await fetchCountries(inputVal, controller);
          setResults(res);
        } catch (error) {
          if (error.name !== "AbortError") {
            setResults([]);
          }
        }
      } else {
        setResults(null);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [inputVal]);

  const handleChange = (e) => {
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
