const CountryBoard = ({results}) => {
    return (
        <div className="country-board">
            {results?.map ((country) => {
                return (
                    <div key={country.name.common} className="country-card">
                        <h3 >{country.name.common}</h3>
                        <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>
                        <p>Capital: <strong>{country?.capital}</strong></p>
                        <p>Currency: {<strong>{country?.currencies ?`${Object.values(country?.currencies)[0]?.name} (${Object.values(country?.currencies)[0]?.symbol})`: '--'}</strong>}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default CountryBoard