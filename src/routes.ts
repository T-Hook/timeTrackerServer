import { Router } from 'express';
require ('./modules/user/user.module');

const AuthRouter = Router();
const SwaggerAPIRouter = Router();
export { SwaggerAPIRouter };