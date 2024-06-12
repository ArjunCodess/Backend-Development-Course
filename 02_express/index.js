import express from 'express';
import 'dotenv/config';
import logger from './logger.js';
import morgan from 'morgan';

const morganFormat = ':method :url :status :response-time ms';

const port = process.env.PORT || 3000;
const app = express();
const link = '127.0.0.1';

// everytime a request is made, the logger will log the method, url, status, and response time in the below format:
// info: {"method":"POST","url":"/teas","status":"201","responseTime":"0.823"}

/*
logger.info('This is an info message');
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.debug('This is a debug message');
*/

app.use(morgan(morganFormat, {
     stream: {
          write: (message) => {
               const logObject = {
                    method: message.split(' ')[0],
                    url: message.split(' ')[1],
                    status: message.split(' ')[2],
                    responseTime: message.split(' ')[3],

               };
               logger.info(JSON.stringify(logObject));
          }
     }
}));

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
     console.log(`App listening on port http://${link}:${port}`);
})