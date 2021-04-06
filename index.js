const express = require('express');
const {json, urlencoded} = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.routes');
const visitorsRoutes = require('./routes/visitors.routes');
const visitsRoutes = require('./routes/visit.routes');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});

// init defaul server port
const PORT = process.env.PORT || 5000;

// init middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// init all routes
app.use('/auth', authRoutes);
app.use('/visitors', visitorsRoutes);
app.use('/visits', visitsRoutes);

// connecting to a mongo database
mongoose.connect(process.env.DB_CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log('database successfully connected\nserver runnig on port: ', PORT)))
    .then((err) => console.log(err.message));
mongoose.set('useFindAndModify', false);