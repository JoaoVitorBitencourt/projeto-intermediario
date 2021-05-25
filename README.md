## rota / : https://projeto-intermediario.herokuapp.com/
### funcionalidade: Encaminha para a rota /Habilidades

## rota /Pokemon : https://projeto-intermediario.herokuapp.com/Pokemon
### tipo de dado retornado:
    {
        name: "nome do pokemon", --tipo: String
        url: "url para acessar informações detalhadas sobre o pokemon", --tipo: String
        date: "data em que foi feito a requisição" --tipo: Date
    }
### outras utilidades:
 QueryString: pokemon= (Nome do pokemon desejado)
 exemplo: https://projeto-intermediario.herokuapp.com/Pokemon?pokemon=bulbasaur

## rota /Habilidades : https://projeto-intermediario.herokuapp.com/Habilidades
### tipo de dado retornado:
    {
        name: "nome do pokemon", --tipo: String
        abilities: "habilidades do pokemon", --tipo: Array de String
        date: "data em que foi feito a requisição" --tipo: Date
    }
### outras utilidades:
QueryString: pokemon= (Nome do pokemon desejado)
exemplo: https://projeto-intermediario.herokuapp.com/Habilidades?pokemon=bulbasaur

## bibliotecas utilizadas além do express:
### AXIOS

## APIs utilizadas para requisição:
### https://api.pokemontcg.io/v2/cards
### https://pokeapi.co/api/v2/pokemon?limit=1138
