import React, { useState } from "react";
import axios from "axios";

const AddMovie = ({ getMovieList }) => {
    const initialData = {
        title: "",
        director: "",
        metascore: "",
        stars: {
            star1: ""
        }
    }
    const initialStarData = ['star1']
    const [ data, setData ] = useState(initialData)
    const [ stars, setStars ] = useState(initialStarData)
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name] : e.target.value }) 
    }
    const handleOnStarsChange = (e) => {
        setData({ ...data, stars: { ...data.stars, [e.target.name]: e.target.value } })
    }
    const handleAddStars = e => {
        e.preventDefault();
        setStars([ ...stars, `$stars${stars.length}`])
    }
    const handleOnSubmit = e => {
        e.preventDefault();

        let starsString = Object.keys(data.stars).map(star => (`${data.stars[star]},`)).join("")
        axios
        .post("http://localhost:5000/api/movies", {
            ...data,
            stars: starsString
        })
        .then(res => {
            console.log(res)
            getMovieList()
        })
        .catch(err => console.log(err))
        setData(initialData)
        setStars (initialStarData)
    }
    return (
        <form onSubmit={handleOnSubmit}>
            <h2>Add Movie</h2>
            <label>Title</label>
            <input type="text" onChange={handleOnChange} value={data.title} name="title"/>
            <label>Director</label>
            <input type="text" onChange={handleOnChange} value={data.director} name="director"/>
            <label>Metascore</label>
            <input type="text" onChange={handleOnChange} value={data.metascore} name="metascore"/>
            <label>Stars</label>
            {stars.map((star, i ) => <input key={i} type="text" onChange={handleOnStarsChange} name={`star${stars.length}`} value={data.stars[`star${stars.length}`]} />)}
            <button type = "button" onClick={(e) => handleAddStars(e)}>Add More Stars</button>
            <button type= "submit">Submit</button>
        </form>
    );
};

export default AddMovie;