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
  const[showInfo, setShowInfo] = useState(false)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout/>,
      children:[
        {
          path: "/country-display",
          element: (<>
            <SearchBar setResults={setResults} setShowInfo={setShowInfo} />
            {results && <DisplayCountries results={results} showInfo={showInfo} setShowInfo={setShowInfo} />}
          
          </>)
        },
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
