import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

import routes from './routes';

// Configuração da porta 
const PORT = process.env.PORT || 3333;

// Inicializa a aplicação Express
const app = express();
app.use(express.json());

// Middleware para interpretar URL-encoded (ex: formulários)
app.use(express.urlencoded({ extended: true }));

// Middleware para log das requisições no terminal
// 'dev' provê logs coloridos e concisos
app.use(morgan('dev'));

// Middleware de CORS para permitir requisições de diferentes origens
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }

  next();
});

// Aplica todas as rotas da aplicação
app.use(routes);

// Rota simples para testar se o servidor está online
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date(),
    message: 'API do PiuPiuwer está funcionando corretamente!',
  });
});

// Middleware para tratar rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada',
    path: req.originalUrl,
  });
});

// Middleware para tratamento de erros
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'production' ? undefined : error.message,
  });
});

// Quando em ambiente de teste, não inicia o servidor
// para evitar conflitos de porta nos testes
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {});
}

export default app;
