import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import "./style.css";

export default function Favorites(){

    const [movies, setMovies] = useState([])
    
    useEffect(()=>{

        const myList = localStorage.getItem("@primeflix");
        setMovies(JSON.parse(myList) || [])

    }, []);

    function deleteItem(id){
        
       const filterMovies = movies.filter((item)=>{
            return (item.id !== id)
       })

       setMovies(filterMovies);
       localStorage.setItem("@primeflix", JSON.stringify(filterMovies));
       toast.success("Filme removido com sucesso");
       
    }

    return(
        <div className="container-favorites">
            <h1>Meus Filmes</h1>
            {movies.length === 0 && <span>Você não possui filmes na lista :(</span>}
            <ul>{
                    movies.map((item)=>{
                        return(
                            <li key={item.id}>
                                <span>{item.title}</span>
                                <div className="d-btn">
                                    <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                                    <button onClick={()=> deleteItem(item.id)}><i  class="fa-solid fa-trash" id={item.id}></i></button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}