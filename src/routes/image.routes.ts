import  { Router } from 'express';
import path from 'path';

const imageRouter = Router();

imageRouter.get('/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  console.log( path.join(__dirname, '../../uploads'))
  const imagePath = path.join(__dirname, '../../uploads', imageName);

  // Assuming you have a middleware to check if the file exists
  // You might want to add additional security checks and error handling
  res.sendFile(imagePath);
});

export default imageRouter;