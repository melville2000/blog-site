import 'dotenv/config'
import express from 'express'
import expressEjsLayouts from 'express-ejs-layouts';
import mainRoutes from './server/routes/main.js';
import connectDB from './server/config/db.js';

const app = express();
const PORT = 3000 | process.env.PORT;

connectDB();

app.use(express.urlencoded({extended:true}))


app.use(express.static('public'))

app.use(expressEjsLayouts);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');

app.use('/', mainRoutes)

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})