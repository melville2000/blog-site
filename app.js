import 'dotenv/config'
import express from 'express'
import expressEjsLayouts from 'express-ejs-layouts';
import methodOveride from 'method-override';
import mainRoutes from './server/routes/main.js';
import connectDB from './server/config/db.js';
import adminRoutes from './server/routes/admin.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import isActiveRoute from './server/helpers/routeHelper.js'


const app = express();
const PORT = 3000 | process.env.PORT;

connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOveride("_method"))


app.use(session({
    secret : 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    // cookie:{maxAge:new Date(Date.now()+3600000)}

}))

app.use(express.static('public'));

app.use(expressEjsLayouts);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');

app.locals.isActiveRoute = isActiveRoute; 

app.use('/', mainRoutes)
app.use('/', adminRoutes)


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})