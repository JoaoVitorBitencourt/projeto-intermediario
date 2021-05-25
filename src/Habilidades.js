import express from 'express';
import {geraPokemon2, geraPokemon} from './util.js'

const app = express();

export default function habilidades (req, res) {
    let Pokemon = geraPokemon(),
        aux = [],
        habilidades = [],
        listaPokemon = [],
        retorno = [];

    Pokemon.then(resposta => {
        let ListaPokemons = geraPokemon2(),
            vetorPokemon = [],
            queryString = req.query.pokemon;

        resposta.data.forEach(element => {
            if (element.abilities) {
                element.abilities.forEach(element => {
                    habilidades.push(element.name);
                })
            }
            aux.push({ name: element.name, abilities: habilidades });
            habilidades = []
        });

        ListaPokemons.then(resposta => {
            resposta.results.forEach(element => {
                vetorPokemon.push(element);
            })

            vetorPokemon.forEach(element => {
                let nome = element.name;
                aux.forEach(element => {
                    if (element.name.toLowerCase() == nome.toLowerCase()) {
                        listaPokemon.push({ name: nome, abilities: element.abilities, date: Date.now() })
                    }
                })
            })

            if (queryString) {
                listaPokemon.forEach(element => {
                    if (element.name.toLowerCase() == queryString.toLowerCase()) {
                        retorno.push(element)
                    }
                })
                res.json(retorno);
            } else {
                res.json(listaPokemon);
            }
        })
    })
};