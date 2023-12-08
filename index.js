const express= require('express')
const colors= require('colors')
const fileupload= require('express-fileupload')


const app= express();
const port=5001

app.use(fileupload())

// limité la taile des fichiers.
// app.use(
//     fileupload({
//         limits:{
//             fileSize:10000000, //10mb
//         },
//         abortOnLimit:true,
//     })
// );

app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.status(200).json({message: "Welcome here"})
})

// => route de l'upload.
app.post('/upload', (req,res)=>{
    // console.log(req.files)
    // res.sendStatus(200);

    const {image}=req.files;
    if(!image){
        return res.sendStatus(400)
    }

    // empecher le telechargement d'autre type de fichier.
    // if(/^image/.test(image.mimetype)){
    //     return res.sendStatus(400)
    // }

    image.mv(__dirname + '/upload' +image.name);
    return res.sendStatus(200);
});

app.listen(port, (req,res)=>{
    console.log(`Server demarré sur le port: ${port}`.cyan.underline)
})