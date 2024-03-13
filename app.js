import 'dotenv/config'
import express from 'express'
import expressEjsLayouts from 'express-ejs-layouts';
import mainRoutes from './server/routes/main.js';
import connectDB from './server/config/db.js';
import adminRoutes from './server/routes/admin.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';


const app = express();
const PORT = 3000 | process.env.PORT;

connectDB();

app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use(express.static('public'))

app.use(expressEjsLayouts);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');

app.use('/', mainRoutes)
app.use('/', adminRoutes)


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})