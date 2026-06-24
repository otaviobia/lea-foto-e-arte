import multer from 'multer';
import path from 'path';

export function createUpload(prefix) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, prefix + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });

  return multer({ storage });
}
