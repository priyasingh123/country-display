import './App.css';
import SearchBar from './components/SearchBar'
import {useState} from 'react'
import DisplayCountries from './components/DisplayCountries';
import CountryDetails from './components/CountryDetails';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';

const AppLayout = ({ setResults, results }) => {
  return (
    <div className='App'>
      <SearchBar setResults={setResults}/>
      <Outlet />
    </div>
  )
}
function App() {
  const [results, setResults] = useState(null)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout setResults={setResults} results={results} />,
      children:[
        {
          path: "/",
          element: <Navigate to="/country-display" replace />
        },
        {
          path: "/country-display",
          element: (
            <>
              {results && <DisplayCountries results={results} setResults={setResults} />}
            </>
          )
        },
        {
          path: "/country-display/:countryName",
          element: <CountryDetails countryDetails={[]} />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
