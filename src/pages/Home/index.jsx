import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import tmdbApi from "../../services/tmdbApi";
import "./style.css";

export default function Home(){

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        async function loadMovies(){
            try{

                const { data } = await tmdbApi.get("movie/now_playing", {
                    params:{
                        api_key: "342d337f64b3b71256445dcd9ce0984b",
                        language: "pt-BR",
                        page: 1,
                    }   
                })
                
                setMovies(data.results.slice(0,20));
                setLoading(false);

            }
            catch(err){
                console.log(`Erro na API: ${err}`);
            }
        }

        loadMovies();

    }, [])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="list-films">
                {movies.map((movie) => {
                        return(
                            <article key={movie.id}>
                                <strong>{movie.title}</strong>
                                <img src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
                                <Link to={`/movie/${movie.id}`}>Acessar</Link>
                            </article> 
                        ) 
                    })
                }
            </div>
        </div>
    );
}