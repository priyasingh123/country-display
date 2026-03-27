import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CountryDetails = ({countryDetails}) => {
    const { countryName } = useParams();
    const location = useLocation();
    const [detail, setDetail] = useState(location.state?.countryDetails?.[0] || countryDetails?.[0] || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // If detail is not available from state, fetch from API
        if (!detail && countryName) {
            setLoading(true);
            const controller = new AbortController();
            
            const queryName = decodeURIComponent(countryName);
            fetch(`https://restcountries.com/v3.1/name/${queryName}?fullText=true`, { signal: controller.signal })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Country not found');
                    }
                    return res.json();
                })
                .then(data => {
                    setDetail(data[0]);
                    setLoading(false);
                })
                .catch(err => {
                    if (err.name !== 'AbortError') {
                        console.error('Error fetching country:', err);
                        setLoading(false);
                    }
                });
            
            return () => controller.abort();
        }
    }, [countryName, detail]);

    console.log ('country', detail)

    const visitMap = (link) => {
        window.open(link, '_blank')
    }

    const nativeNames = detail?.name?.nativeName ? Object.values(detail.name.nativeName) : [];
    const currencies = detail?.currencies ? Object.values(detail.currencies) : [];
    const borders = detail?.borders || [];
    const timezones = detail?.timezones || [];
    const latlng = detail?.latlng || [];

    return (
        <div className="country-details">
            {loading && <p>Loading country details...</p>}
            {!loading && detail ? (
                <>
                    <h3>{detail?.name?.common ?? 'Unknown Country'}</h3>
                    <img src={detail?.flags?.png} alt={`flag of ${detail?.name?.common ?? 'Unknown'}`} />
                    <p>Other Names: <strong>{nativeNames.map((name, index) => <span key={index}>{name.official} | </span>)}</strong></p>
                    <p>Capital: <strong>{detail?.capital ?? 'N/A'}</strong></p>
                    <p>Currency: <strong>{currencies.length > 0 ? `${currencies[0]?.name ?? '--'} (${currencies[0]?.symbol ?? ''})` : '--'}</strong></p>
                    <p>Region: <strong>{detail?.region ?? 'N/A'}</strong></p>
                    <p>Subregion: <strong>{detail?.subregion ?? 'N/A'}</strong></p>
                    <p>Area: <strong>{detail?.area ?? 'N/A'}</strong></p>
                    <p>Population: <strong>{detail?.population ?? 'N/A'}</strong></p>
                    <p>Is UN member: <strong>{detail?.unMember ? 'Yes' : 'No'}</strong></p>
                    <p>Timezones: <strong>{timezones.join(', ') || 'N/A'}</strong></p>
                    <p>Borders With: <strong>{borders.map((border, index) => <span key={index}>{border} </span>)}</strong></p>
                    <p>Is LandLocked ? <strong>{detail?.landlocked ? 'Yes' : 'No'}</strong></p>
                    <p>Location: <strong>latitude: {latlng[0] ?? 'N/A'}, longitude: {latlng[1] ?? 'N/A'}</strong></p>
                    <button className="badge" onClick={() => visitMap(detail?.maps?.googleMaps)}>See on Map</button>
                </>
            ) : !loading && <p>No country details found</p>}
        </div>
    )
}

export default CountryDetails