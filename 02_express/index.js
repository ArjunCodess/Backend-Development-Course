import express from 'express';
import 'dotenv/config';

const port = process.env.PORT || 3000;
const app = express();
const link = '127.0.0.1';

app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };

    teaData.push(newTea);

    res.status(201).send(newTea);
})

// get all tea
app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
})

// get a tea with id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));

    if (!tea) return res.status(404).send('Tea Not Found');
    res.status(200).send(tea);
})

// update tea
app.put('/teas/:id', (req, res) => {
    const teaId = req.params.id;

    const tea = teaData.find(t => t.id === parseInt(teaId));

    if (!tea) return res.status(404).send('Tea Not Found');

    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
})

// delete tea
app.delete('/teas/:id', (req, res) => {
    const teaId = req.params.id;

    const index = teaData.findIndex(t => t.id === parseInt(teaId));

    if (index === -1) return res.status(404).send('Tea Not Found');

    teaData.splice(index, 1);
    return res.status(204).send('Deleted!');
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Example app listening on port http://${link}:${port}`);
})