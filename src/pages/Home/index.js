import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import tmdbApi from "../../services/tmdbApi";
import "./style.css";

export default function Home(){

    const [films, setFilms] = useState([]);

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
                
                setFilms(data.results.slice(0,10))

            }
            catch(err){
                console.log(`Erro na API: ${err}`);
            }
        }

        loadMovies();

    }, [])

    return(
        <div className="container">
            <div className="list-films">
                {films.map((film) => {
                        return(
                            <article key={film.id}>
                                <strong>{film.title}</strong>
                                <img src={`http://image.tmdb.org/t/p/original/${film.poster_path}`} alt={film.title}/>
                                <Link to={`/film/${film.id}`}>Acessar</Link>
                            </article> 
                        ) 
                    })
                }
            </div>
        </div>
    );
}