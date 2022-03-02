const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const shirtsRoutes = require('./Routes/Api/shirts'); 
const usersRoutes = require('./Routes/Api/auth'); 
const cookieParser = require('cookie-parser')
const dbConnection = require('./DB/storeDB');
const verifyJWT = require('./Middlewares/verifyJWT')



app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.use(express.json()); 
app.use(cookieParser());


// app.use(verifyJWT); // insted of in every route 
app.use('/Api',shirtsRoutes);
app.use('/Api',usersRoutes);

//for validation..must be after route middelware
// app.use((err,req,res,next) => {
//     res.status(422).send({Error : err.message});
// })

if (process.env.NODE_ENV === 'production'){ 
    app.use(express.static(path.join(__dirname,'../Client/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, '../Client/build','index.html'))
    });
} else {
    app.get('/', (req,res) =>{
        res.send("Api running")
    })
}



const port =  process.env.PORT || 9000 ;
app.listen(port,() => {
    console.log(`listening on port ${port}`);
})