const express = require("express");
const app = express();
const port = 3001;

const phonesRouter = require('./routes/phones');
app.use('/phones', phonesRouter);

app.listen(port, () => {
console.log(`express run http://localhost:${port}`);
});