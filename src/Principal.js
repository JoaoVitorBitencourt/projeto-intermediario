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
});

app.use('/Habilidades', (req, res) => {
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
})

app.listen(PORTA, () => {
    console.log(`Rodando na porta ${PORTA}`);
});