import axios from 'axios';

export async function geraPokemon() {
    let resposta = await axios.get('https://api.pokemontcg.io/v2/cards'),
        data = resposta.data;

    return data;
}

export async function geraPokemon2() {
    let resposta = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1138'),
        data = resposta.data;

    return data;
}