import { useState } from "react"
import CountryBoard from "./CountryBoard"

const DisplayCountries = ({results}) => {
    return (
        <div>
            {results?.length === 0 ? <p>No Matching Results</p> : <CountryBoard results={results}/>
            }
        </div>
    )
}

export default DisplayCountries