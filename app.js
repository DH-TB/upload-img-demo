let express = require('express');
let app =express();
let path = require('path');
let multer = require('multer');

app.use('/',express.static('./'));
app.use('/ajax',express.static('./ajax.html'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('upload'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({storage: storage});

app.post('/upload', upload.single('logo'), function(req, res, next) {
    res.send({
        err: null,
        filePath: 'upload/' + path.basename(req.file.path)
    });
});
app.post('/uploadMultipart', upload.array('logo',3), function(req, res, next) {
    let path = req.files.map((p)=>p.path);
    res.send({
        err: null,
        filePath:path
    });
});


app.post('/uploadImg', upload.single('avatar'), function(req, res, next) {
    res.send({
        err: null,
        filePath: 'upload/' + path.basename(req.file.path)
    });
});


app.listen(3000,()=>{
    console.log('listing 3000');
});