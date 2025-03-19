import express from 'express';
import homeController from '../controllers/homeController';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/hoidanit', (req, res) => {
        return res.send('hello world hoidanit');
    });
    return app.use('/', router);
};

export default initWebRoutes;
