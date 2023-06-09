const Mystorage = multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null,path.join(__dirname,'../../www/home/urungorselleri'));
    },
    filename:(req,file,cb) => {
        const min = 10000;
        const max = 1000000;
        const randomInt = Math.floor(Math.random()* (max - min + 1) + min);
        cb(null,randomInt+""+path.extname(file.originalname));
    }
});


const resimFileFilter = (req,file,cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/webp'){
        cb(null, true);
    }else{ 
        cb(null, false);
    } 
}

const uploadResim = multer({storage: Mystorage, fileFilter:resimFileFilter});


module.exports = uploadResim;

