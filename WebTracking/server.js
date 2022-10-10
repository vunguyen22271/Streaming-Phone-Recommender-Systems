require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require('path')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));

// Routes
app.use('/user',require('./routers/UserRouter'))
app.use('/api',require('./routers/CategoryRouters'))
app.use('/api',require('./routers/Upload'))
app.use('/api',require('./routers/TrackingRouter'))
app.use('/api',require('./routers/SimilarityRouter'))
app.use('/api',require('./routers/ProductRouter'))
app.use('/api',require('./routers/PaymentRouter')) 
// connect to mongoose

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

if(process.env.NODE_ENV === 'PRODUCTION'){
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}
// Port for server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

