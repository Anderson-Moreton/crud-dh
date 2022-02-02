const express = require('express');
const app = express();

app.use(express.json());

const paes = [{
    id: 1,
    nome: "Pão Italiano",
    preco: 10
}];

app.get('/paes', function (req, res) {
    res.json(paes);
});

app.get('/paes/:id', function (req, res) {

    const { id } = req.params;

    const pao = paes.find(pao => pao.id === Number(id));

    res.json(pao);
});

app.post('/paes', function (req, res) {

    const { nome, preco } = req.body;

    const novoPao = { id: paes[paes.length - 1] .id + 1, nome, preco };

    paes.push(novoPao);

    res.json(novoPao);
});

app.listen(3000, () => console.log('O servidor está ON!!!'))