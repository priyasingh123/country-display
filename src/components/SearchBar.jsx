import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = ({setResults}) => {
    const [inputVal, setInputVal] = useState ('');
    const navigate = useNavigate();
    const url = "https://restcountries.com/v3.1/name/";

    useEffect(() => {
        const controller = new AbortController();
        const timer = setTimeout(async () => {
            if (inputVal) {
                try {
                    const res = await fetch(`${url}${inputVal}`, { signal: controller.signal })
                    if (!res.ok) {
                        throw new Error ()
                    }
                    const response = await res.json()
                    setResults(response);
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        setResults([])
                    }
                }
            }
            else {
                setResults([])
            }
        }, 400)

        return ()=> {
            clearTimeout(timer);
            controller.abort();
        }
    }, [inputVal])


    const handleChange = (e) => {
        const value = e.target.value;
        setInputVal(value);
        if (value.trim()) {
            navigate('/country-display');
        }
    }

    return (
        <div>
            <label className="country-heading">Start Typing Country Name... </label>
            <input className="input-country" type="text" placeholder="Search..." onChange={handleChange} value={inputVal}/>
        </div>
    )
}

export default SearchBar