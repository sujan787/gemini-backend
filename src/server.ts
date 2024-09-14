import express, { Express } from 'express';
import cors from 'cors';
import appConfig from './app/configs/app.config';
import RouteProvider from './app/providers/route.provider';

const PORT = appConfig.app_port || 3000;

const initializeApp = (): Express => {
    const app = express();
    app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    return app;
};

const bootProviders = (app: Express): void => {
    (new RouteProvider(app)).boot();
};

const startServer = (app: Express): void => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

const app = initializeApp();
bootProviders(app);
startServer(app);
