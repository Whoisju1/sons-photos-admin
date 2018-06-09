import express from 'express';
import { signUp, signIn } from '../handlers/auth';

const router = express.Router({ mergeParams: true });

router
  .route('/signin')
  .get(signIn);

router
  .route('/signup')
  .post(signUp);

export default router;
