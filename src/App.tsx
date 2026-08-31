import "./App.css";
import SearchBar from "./components/SearchBar";
import { Dispatch, SetStateAction, useState } from "react";
import DisplayCountries from "./components/DisplayCountries";
import CountryDetails from "./components/CountryDetails";
import {
  createHashRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Country } from "./service/restCountry";

const AppLayout = ({
  setResults,
}: {
  setResults: Dispatch<SetStateAction<Country[]>>;
}) => {
  return (
    <div className="App">
      <SearchBar setResults={setResults} />
      <Outlet />
    </div>
  );
};
function App() {
  const [results, setResults] = useState<Country[]>([]);

  const router = createHashRouter([
    {
      path: "/",
      element: <AppLayout setResults={setResults} />,
      children: [
        {
          path: "/",
          element: <Navigate to="/country-display" replace />,
        },
        {
          path: "/country-display",
          element: <>{<DisplayCountries results={results} />}</>,
        },
        {
          path: "/country-display/:countryName",
          element: <CountryDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
