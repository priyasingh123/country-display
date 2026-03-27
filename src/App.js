import './App.css';
import SearchBar from './components/SearchBar'
import {useState} from 'react'
import DisplayCountries from './components/DisplayCountries';
import CountryDetails from './components/CountryDetails';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className='App'>
      <Outlet />
    </div>
  )
}
function App() {
  const [results, setResults] = useState(null)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout/>,
      children:[
        {
          path: "/country-display",
          element: (<>
            <SearchBar setResults={setResults}/>
            {results && <DisplayCountries results={results} />}
          
          </>)
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
