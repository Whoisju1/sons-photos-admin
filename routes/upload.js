import { Router } from 'express';
import { uploadFile, uploadFiles } from '../handlers/upload';

const router = Router({ mergeParams: true });

router
  .post('/file/galleryid/:id', uploadFile)
  .post('/files/galleryid/:id', uploadFiles);

export default router;
