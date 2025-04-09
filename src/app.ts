import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';


const app = express();

app
    .use(cors())
    .use(express.json())
    .use(routes)
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error(error);
        res.status(500).json({ message: 'Oops. Something went wrong' });
    });

export default app;