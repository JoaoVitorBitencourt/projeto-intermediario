import axios from 'axios';
import express from 'express';
import parse from 'node-html-parser'

const app = express();
const PORTA = process.env.PORT || 8080;

async function geraPokemon() {
    let resposta2 = await axios.get('https://api.pokemontcg.io/v2/cards'),
        data2 = resposta2.data;

    return data2;
}

async function geraPokemon2() {
    let resposta = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1138'),
        data = resposta.data;

    return data;
}

async function pokemonEspecifico(URL) {
    let resposta = await axios.get(URL),
        data = resposta.data;

    return data;
}

async function retornaPokemon(nome, vetor, res) {
    let objPokemon, URL;
    vetor.forEach(element => {
        if (element.name == nome) {
            URL = element.url;
        }
    })
    objPokemon = await pokemonEspecifico(URL)
    return objPokemon;
}

app.use('/Pokemon2', (req, res) => {
    let ListaPokemons = geraPokemon2(),
        queryString = req.query.pokemon,
        vetorPokemon = [],
        Pokemon;
    ListaPokemons.then(resposta => {
        resposta.results.forEach(element => {
            vetorPokemon.push(element);
        })
        if (queryString) {
            Pokemon = retornaPokemon(queryString, vetorPokemon, res);
            Pokemon.then(resp => {
                res.send(resp);
            })
        } else {
            res.send(vetorPokemon);
        }
    })
});

app.use('/Pokemon', (req, res) => {
    let Pokemon = geraPokemon(req.query.pokemon),
        a = [];
    Pokemon.then(resposta => {
        resposta.data.forEach(element => {
            a.push(element.name);
        });
        res.send(a.join(", "));
    })
})

app.listen(PORTA, () => {
    console.log(`Rodando na porta ${PORTA}`);
});