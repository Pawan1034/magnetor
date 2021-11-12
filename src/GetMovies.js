import axios from "axios";
import { useState,useEffect } from 'react';
function GetMovies({searchTerm}) {
    const [movies,setMovies] = useState({})
    const [moviesError,setMoviesError] = useState({})
    useEffect(()=>{
        axios.get("https://yts.mx/api/v2/list_movies.json?query_term="+searchTerm).then((res)=>{
            res?setMovies({...res.data}):setMovies({})
    }).catch((err)=>{
        console.log(err)
        setMoviesError(err)
    })
    },[searchTerm])
    if(movies){
        console.log(movies.data?.movies)
    }
    // movies?console.log(movies.data):null
    return (<>
    Here goes the list of Movies <br/>
    {movies.data?(movies.data?.movies?.map((movie)=>
    <div key={movie.id}>
        <div>{movie?.title}</div>
        <img src={movie?.large_cover_image} alt={movie?.title} ></img>
    </div>
    
    )):! moviesError && <>Loading...</>}
    {moviesError?<>error</>:null}
    </>);
}

export default GetMovies;
