const express = require('express');
const path = require('path');
const cors = require('cors');
const camelCaseReq = require('./middlewares/camelCaseReq');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();
require('./models');

const { PORT } = require('./configs');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(camelCaseReq);


app.use(express.static(path.join(__dirname, '..', 'public')));

require('./routes')(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
