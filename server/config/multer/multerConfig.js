import multer from 'multer'
const storage = multer.memoryStorage();
const upload = multer({storage,limits:'5mb'})
export default upload