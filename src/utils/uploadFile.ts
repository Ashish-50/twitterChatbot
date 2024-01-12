import multer from 'multer';
import path from 'path'
import fs from 'fs';

const createUploadsFolder = () => {
    const uploadsPath = path.join(__dirname, '../../', 'uploads');
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath);
    }
    console.log('Uploads Path:', uploadsPath);
    return uploadsPath;
  };
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadsPath = createUploadsFolder();
      cb(null, uploadsPath);
    },
    
    filename: function (req: any, file: any, cb: any) {
        const datePrefix = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
        const filename = `${datePrefix}-${file.originalname}`;
        cb(null, filename);
    }
  });


  const fileFilter = (req: any, file: any, cb: any) => {
    const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov', '.avi']; 
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images (jpg, jpeg, png, gif) and videos (mp4, mov, avi) are allowed.'));
    }
  };

export const upload = multer({ storage: storage,fileFilter: fileFilter });