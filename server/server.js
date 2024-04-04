const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { routers } = require('./routes/route')

const port = 3000;

app.use(bodyParser.json())

routers(app)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
