import { Router } from 'express';
import { uploadFile, uploadFiles } from '../handlers/upload';

const router = Router({ mergeParams: true });

router
  .post('/file', uploadFile)
  .post('/files', uploadFiles);

export default router;
