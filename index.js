import 'regenerator-runtime/runtime';
import express from 'express';
import fs from 'fs/promises';

const productos = [
	{
		title: 'Arroz',
		price: 128.34,
		thumbnail: 'https://bit.ly/3zjJXCh',
		id: 1,
	},
	{
		title: 'Papa',
		price: 200,
		thumbnail: 'https://bit.ly/3zh4584',
		id: 2,
	},
	{
		title: 'Mandarina',
		price: 500.55,
		thumbnail: 'https://bit.ly/3zocqab',
		id: 3,
	},
	{
		title: 'Cebolla',
		price: 150.24,
		thumbnail: 'https://bit.ly/3kIwa42',
		id: 4,
	},
];

const port = 8080;
const app = express();

const server = app.listen(port, () => {
	console.log(`Server Running in port ${port}`);
});

server.on('error', (err) => {
	console.log(`Hubo el siguiente error: ${err}`);
});

let visitas1 = 0;
let visitas2 = 0;

app.get('/', (req, res) => {
	visitas1++;
	res.send(`Bienvenido navega a traves de las rutas '/items' '/item-random' '/visitas'`);
});

app.set('json spaces', 2);

app.get('/items', (req, res) => {
	visitas1++;
	res.json({
		items: productos,
		cantidad: productos.length,
	});
});

app.get('/item-random', async (req, res) => {
	try {
		visitas2++;
		const readedFile = await fs.readFile('./productos.txt', 'utf-8');
		const jsonParse = JSON.parse(readedFile);
		const randomProduct =
			jsonParse[Math.floor(Math.random() * jsonParse.length)];
		res.json({
			item: randomProduct,
		});
	} catch (error) {
		console.log(error);
	}
});

app.get('/visitas', (req, res) => {
	res.json({
		visitas: {
			items: visitas1,
			item: visitas2,
		},
	});
});
