const CountryBoard = ({results, setShowInfo, setCountryDetails}) => {
    const visitMap = (link) => {
        window.open(link, '_blank')
    }

    const handleMoreInfo = (info) => {
        setShowInfo(true)
        console.log ('info', [info])
        setCountryDetails([info])
    }

    return (
        <div className="country-board">
            {results?.map ((country) => {
                return (
                    <div key={country.name.common} className="country-card">
                        <button className="badge top-right" onClick={()=>visitMap(country?.maps?.googleMaps)}>See on Map</button>
                        <h3 >{country.name.common}</h3>
                        <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>
                        <p>Capital: <strong>{country?.capital}</strong></p>
                        <p>Currency: {<strong>{country?.currencies ?`${Object.values(country?.currencies)[0]?.name} (${Object.values(country?.currencies)[0]?.symbol})`: '--'}</strong>}</p>
                        <p>Region: <strong>{country?.region}</strong></p>
                        <p>Area: <strong>{country?.area}</strong></p>
                        <p>Population: <strong>{country?.population}</strong></p>
                        <button className="more-info" onClick={()=>handleMoreInfo(country)}>More Info</button>
                    </div>
                )
            })}
        </div>
    )
}

export default CountryBoard