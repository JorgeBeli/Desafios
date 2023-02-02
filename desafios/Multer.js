const express = require('express');
const multer = require('multer');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// configuracion de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })



// endpoints
app.use('/', express.static(__dirname + '/public' ))

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Error subiendo archivo')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})

app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Error subiendo archivo')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
})



app.listen(3000)