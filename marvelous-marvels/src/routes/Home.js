import React from "react";
import { useState } from "react";

//components
import Container from "../components/Container";
import Searchbar from "../components/SearchBar";
import Grid from "../components/Grid";
import Card from "../components/Card";

import { fetchHeroes } from "../utils";

const IMAGE_SIZE = 'portrait_fantastic'

export default function Home() {
    const [heroes, setHeroes] = useState([])
    const [error, setError] = useState()

    let cards;

    const handleClick = async (e, args) => {
        e.preventDefault();
        if (args ==='') return
        try {
            return await fetchHeroes(args);
        } catch (err) {
            return err;
        }
    }

    if(heroes) {
        cards = heroes.map((hero) => (
            <Card 
                name={hero.name} 
                id={hero.id} 
                key={hero.id} 
                thumbnail={`${hero.thumbnail.path}/${IMAGE_SIZE}.${hero.thumbnail.extention}`}
            />
        ))
    }

    return (
    <Container>
        <div className="title">
            <h1>Discover Heroes</h1>
        </div>
        
        <Searchbar 
            handleClick={handleClick}
            setHeroes={setHeroes}
            setError={setError} />
        <Grid>
            {cards ? cards: ''}
        </Grid>
    </Container>
    )
}