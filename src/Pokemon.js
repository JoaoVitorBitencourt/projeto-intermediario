import express from 'express';
import {geraPokemon2, geraPokemon} from './util.js'

const app = express();

export default function getPokemon (req, res) {
    let Pokemon = geraPokemon2(),
        aux = [],
        retorno = [];

    Pokemon.then(resposta => {
        let ListaPokemons = geraPokemon(),
            vetorPokemon = [],
            queryString = req.query.pokemon,
            pokemonUrl = [];

        resposta.results.forEach(element => {
            pokemonUrl.push({ name: element.name, URL: element.url });
        })
        
        ListaPokemons.then(resposta => {
            resposta.data.forEach(element => {
                aux.push(element.name);
            })

            aux.forEach(element => {
                pokemonUrl.forEach(element2 => {
                    if(element2.name.toLowerCase() == element.toLowerCase()){
                        vetorPokemon.push({name: element, url: element2.URL, date: Date.now() })
                    }
                })
            })

            if(queryString){
                vetorPokemon.forEach(element => {
                    if(element.name.toLowerCase() == queryString.toLowerCase()){
                        retorno.push(element);
                    }
                })
                res.json(retorno);
            }else{
                res.json(vetorPokemon);
            }
        })
    })
};