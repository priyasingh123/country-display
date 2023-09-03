const CountryDetails = ({countryDetails}) => {
    console.log ('countyr',countryDetails[0])
    let detail = countryDetails[0]

    const visitMap = (link) => {
        window.open(link, '_blank')
    }

    return (
        <div className="country-details">
            <h3>{detail?.name?.common}</h3>
            <img src={detail.flags.png}/>
            <p>Other Names: <strong>{Object.values(detail?.name.nativeName).map ((name, index)=> <span key={index}>{name.official} |</span>) }</strong></p>
            <p>Capital: <strong>{detail?.capital}</strong></p>
            <p>Currency: {<strong>{detail?.currencies ?`${Object.values(detail?.currencies)[0]?.name} (${Object.values(detail?.currencies)[0]?.symbol})`: '--'}</strong>}</p>
            <p>Region: <strong>{detail?.region}</strong></p>
            <p>Subregion: <strong>{detail?.subregion}</strong></p>
            <p>Area: <strong>{detail?.area}</strong></p>
            <p>Population: <strong>{detail?.population}</strong></p>
            <p>Is UN member: <strong>{detail?.unMember? 'Yes': 'No'}</strong></p>
            <p>Timezones: <strong>{detail?.timezones?.map((time) => time)}</strong></p>
            <p>Borders With: <strong>{detail?.borders?.map((border) => <span>{border} </span>)}</strong></p>
            <p>Is LandLocked ? <strong>{detail?.landlocked ? 'Yes' :'No'}</strong></p>
            <p>Location: <strong>latitude: {detail?.latlng[0]}, longtitude: {detail?.latlng[1]}</strong></p>
            <button className="badge" onClick={()=>visitMap(detail?.maps?.googleMaps)}>See on Map</button>
        </div>
    )
}

export default CountryDetails