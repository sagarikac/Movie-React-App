import { useState } from "react";
import axios from "axios";

function SearchMovies(){
    const [title, setTitle] = useState("");
    let [movie,setMovie]=useState([{}]);

    let searchMovie = (event)=> {
        event.preventDefault();
        axios.get("http://localhost:3000/Movies").then(result=> {
                console.log(result.data.filter(
                    (element) => element.Title === title)
                );
                setMovie(result.data.filter(
                    (element) => element.Title === title))
        }).catch(error=> {
            console.log(error)
        })
       reset();
    }
    let reset = (event)=> {
        setTitle("")
       setMovie([{}])
    }
        return(
            <div>
                <form onSubmit={searchMovie}>
    <input type="text" name="title" placeholder="Search for a Movie..." onChange={(event)=>setTitle(event.target.value)}/>
    <input type="submit" value="Search Movie"/>
    </form>
    <table border="1">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Rating</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {movie.map(p=>
                        <tr key={p.Title}>
                            <td>{p.Title}</td>
                            <td>{p.Genre}</td>
                            <td>{p.Rating}</td>
                            <td><img src={p.Image} width="200px" height="200px"/></td>
                        </tr>

                    )}
                </tbody>
            </table>
        </div>
    )
}
export default SearchMovies;