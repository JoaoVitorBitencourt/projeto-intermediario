import axios from 'axios';
import express from 'express';

const app = express();
const PORTA = process.env.PORT || 8080;

async function geraPokemon() {
    let resposta = await axios.get('https://api.pokemontcg.io/v2/cards'),
        data = resposta.data;

    return data;
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

async function retornaPokemon(nome, vetor) {
    let objPokemon, URL;
    vetor.forEach(element => {
        if (element.name == nome) {
            URL = element.url;
        }
    })
    objPokemon = await pokemonEspecifico(URL)
    return objPokemon;
}

app.use('/Pokemon', (req, res) => {
    let ListaPokemons = geraPokemon2(),
        queryString = req.query.pokemon,
        vetorPokemon = [],
        Pokemon;
    ListaPokemons.then(resposta => {
        resposta.results.forEach(element => {
            vetorPokemon.push(element);
        })
        if (queryString) {
            Pokemon = retornaPokemon(queryString, vetorPokemon);
            Pokemon.then(resp => {
                res.send(resp);
            })
        } else {
            res.send(vetorPokemon);
        }
    })
});

app.use('/Habilidades', (req, res) => {
    let Pokemon = geraPokemon(),
        a = [],
        habilidades = [],
        retorno = [];
    Pokemon.then(resposta => {
        let ListaPokemons = geraPokemon2(),
        vetorPokemon = [],
        queryString = req.query.pokemon;

        resposta.data.forEach(element => {
            if(element.abilities){
                element.abilities.forEach(element => {
                    habilidades.push(element.name);
                })
            }
            a.push({ name: element.name, abilities: habilidades });
            habilidades = []
        });

        ListaPokemons.then(resposta => {
            resposta.results.forEach(element => {
                vetorPokemon.push(element);
            })

            vetorPokemon.forEach(element => {
                let nome = element.name;
                a.forEach(element => {
                    if(element.name.toLowerCase() == nome) {
                        retorno.push({name: nome, abilities: element.abilities, data: Date.now()})
                    }
                })
            })

            if (queryString) {
                console.log(queryString);
                retorno.forEach(element => {
                    if(element.name == queryString){
                        res.json(element);
                    }
                })
            } else {
                res.json(retorno);
            } 
        })
    })
})

app.listen(PORTA, () => {
    console.log(`Rodando na porta ${PORTA}`);
});