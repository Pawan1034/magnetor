import './App.css';
import GetMovies from './GetMovies';
import { useState } from 'react';

function App() {
  const [searchTerm,setSearchTerm ]= useState('')
  const [showMovies,setShowMovies ]= useState(false)
  console.log(showMovies,searchTerm)
  return (
    <div className="App">
      <input type="text" placeholder="Enter the movie name" value={searchTerm} onChange={(e)=>{
        setSearchTerm(e.target.value)
        setShowMovies(false)
        }}/>
      <button onClick={()=>{
        setSearchTerm(searchTerm)
        setShowMovies(true)
        }}>Search</button>
      {showMovies?<GetMovies searchTerm={searchTerm}/>:<></>}
    </div>
  );
}

export default App;
