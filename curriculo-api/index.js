const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/pessoas',      require('./routes/pessoas'));
app.use('/experiencias', require('./routes/experiencias'));
app.use('/formacoes',    require('./routes/formacoes'));
app.use('/habilidades',  require('./routes/habilidades'));

app.get('/', (req, res) => res.json({ status: 'API Currículo online' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
