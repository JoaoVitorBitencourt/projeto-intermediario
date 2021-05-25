import express from 'express';
import apiPokemon from './Pokemon.js'
import apiHabilidades from './Habilidades.js'

const app = express();
const PORTA = process.env.PORT || 8080;

app.use('/Pokemon', apiPokemon);

app.use('/Habilidades', apiHabilidades);

app.use('/', (req, res) => {
    res.redirect('/Habilidades');
})

app.listen(PORTA, () => {
    console.log(`Rodando na porta ${PORTA}`);
});