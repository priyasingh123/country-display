import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ setResults }) => {
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();
  const url = new URL(process.env.REACT_APP_BASEURL);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      if (inputVal.trim()) {
        try {
          url.searchParams.set("q", inputVal.toString().toLowerCase());
          const res = await fetch(url, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
            signal: controller.signal,
          });
          if (!res.ok) {
            throw new Error();
          }
          const response = await res.json();
          setResults(response.data.objects);
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
