import { Router } from 'express';
import swaggerSpec from './utils/swagger';
import usersController from './controllers/users';
import todoController from './controllers/todos';
import userAdminController from './controllers/userAdmin.js';

/**
 * Contains all API routes for the application.
 */
let router = Router();

/**
 * GET /api/swagger.json
 */
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/users', usersController);

// router.use('/todos', todoController);

router.use('/admin', userAdminController);

export default router;
