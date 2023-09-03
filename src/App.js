import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar'
import {useState} from 'react'
import DisplayCountries from './components/DisplayCountries';

function App() {
  const [results, setResults] = useState(null)
  const[showInfo, setShowInfo] = useState(false)

  return (
    <div className="App">
      <SearchBar setResults={setResults} setShowInfo={setShowInfo}/>
      {results && <DisplayCountries results={results} setShowInfo={setShowInfo} showInfo={showInfo}/>}
      
    </div>
  );
}

export default App;
