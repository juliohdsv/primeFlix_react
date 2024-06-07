import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/index";
import Movie from "../pages/Movie/index";
import Header from "../components/Header/header";
import Erro from "../pages/Erro/index";
import Favorites from "../pages/Favorites/index";

export default function RoutesApp(){
    return(
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/movie/:id" element={<Movie/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path="*" element={<Erro/>}/>
                </Routes>
        </BrowserRouter>
    );
}
