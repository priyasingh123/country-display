import CountryBoard from "./CountryBoard"
import CountryDetails from "./CountryDetails"
import {useState} from 'react'

const DisplayCountries = ({results, setShowInfo, showInfo}) => {
    const [countryDetails, setCountryDetails] = useState([])
    return (
        <div>
            {results?.length === 0 ? 
                <p>No Matching Results</p> : 
                showInfo ? <CountryDetails countryDetails={countryDetails}/> :
                <CountryBoard results={results} setShowInfo={setShowInfo} setCountryDetails={setCountryDetails}/>
            }
        </div>
    )
}

export default DisplayCountries