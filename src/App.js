import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar'
import {useState} from 'react'
import DisplayCountries from './components/DisplayCountries';

function App() {
  const [results, setResults] = useState(null)

  return (
    <div className="App">
      <SearchBar setResults={setResults}/>
      {results && <DisplayCountries results={results}/>}
      
    </div>
  );
}

export default App;
