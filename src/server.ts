import express from 'express';
import morgan from 'morgan';

import routes from './routes';

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para interpretar URL-encoded (ex: forms)
app.use(express.urlencoded({ extended: true }));

// Middleware para log das requisições no terminal
app.use(morgan('dev'));

// Todas as rotas da aplicação
app.use(routes);

// Rota simples para testar se o servidor está online
app.get('/teste', (req, res) => {
  res.json({ message: 'GRAÇAS A DEUS ISSO AQUI FUNCIONOU!!!' });
});

// Inicia o servidor na porta 3333
app.listen(3333, () => {
});
