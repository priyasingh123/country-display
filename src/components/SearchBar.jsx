import {useState, useEffect} from 'react'

const SearchBar = ({setResults}) => {
    const [inputVal, setInputVal] = useState ('');
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
                    console.log ('res ',res.status)
                    const response = await res.json()
                    console.log (response)
                    setResults(response);
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        console.log ('No results')
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
        setInputVal(e.target.value)
    }

    return (
        <div>
            <label className="country-heading">Start Typing Country Name... </label>
            <input className="input-country" type="text" placeholder="Search..." onChange={handleChange} value={inputVal}/>
            
        </div>
    )
}

export default SearchBar