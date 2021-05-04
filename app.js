const express = require('express');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 4200;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./routes/index.routes'));

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});
