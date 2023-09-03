import {useState, useEffect} from 'react'

const SearchBar = ({setResults, setShowInfo}) => {
    const [inputVal, setInputVal] = useState ('')
    const url = "https://restcountries.com/v3.1/name/"

    const getData = async() => {
        if (inputVal) {
            try {
                const res = await fetch(`${url}${inputVal}`)
                if (!res.ok) {
                    throw new Error ()
                }
                console.log ('res ',res.status)
                const response = await res.json()
                console.log (response)
                setShowInfo(false)
                setResults(response)
            } catch (error) {
                console.log ('No results')
                setResults([])
            }
        }
        else {
            setResults('')
        }
    }

    useEffect(() => {
        let timer
        timer = setTimeout(() => {
            getData()
        }, 400)

        return ()=> {clearTimeout(timer)}
    }, [inputVal])


    const handleChange = (e) => {
        setInputVal(e.target.value)
    }

    return (
        <div>
            <label className="country-heading">Which Country are you looking for ? </label>
            <input className="input-country" type="text" placeholder="Search..." onChange={handleChange} value={inputVal}/>
            
        </div>
    )
}

export default SearchBar