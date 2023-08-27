import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import tmdbApi from "../../services/tmdbApi";
import "./style.css";

export default function Movie(){

    const {id} = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        async function loadMovie(){
            try{

                    const { data } = await tmdbApi.get(`movie/${id}`, {
                    params:{
                        api_key: "342d337f64b3b71256445dcd9ce0984b",
                        language: "pt-BR"
                    }   
                })
                
                setMovie(data);
                setLoading(false);

            }
            catch(err){
                navigate("/", {replace: true});
                return;
            }
        }

        loadMovie();

    }, [navigate, id])


    if(loading){
        return(
            <div className="movie-info">
                <h1>Carregando detalhes do filme...</h1>
            </div>
        )
    }

    return(
        <div className="movie-info">
            <h1>{movie.title}</h1>
            <img src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>
            <h3>Sinopse</h3>
            <span>{movie.overview}</span>
            <strong>Avaliação: {Math.floor(movie.vote_average)} / 10</strong>  
            <div className="container-btn">
                <button>Salvar</button> 
                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${movie.title} Trailer`}>Trailer</a>
                </button> 
                <button onClick={function(){
                    navigate("/", {replace: true});
                }}>Voltar</button> 
            </div>
        </div>
    )
}