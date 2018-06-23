import Busboy from 'busboy';

export const uploadFile = async (req, res) => {
  try {
    const busBoy = Busboy({ headers: req.headers });
    busBoy.on('finish', () => console.log('Upload Completed')); // eslint-disable-line no-console

    // get file from request object
    const { files } = req; // eslint-disable-line no-unused-vars

    // TODO: handle file upload

    return res.status(200);
  } catch (err) {
    return err;
  }
};

export const uploadFiles = async (req, res) => {
  try {
    // TODO: Write code for uploading multiple files
    return res.status(200);
  } catch (err) {
    return err;
  }
};

