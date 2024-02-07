const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const UsersModel = require('./models/UserSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var cookieParser = require('cookie-parser')



//  const storage = multer.uploads();
const app = express()
app.use(express.text())
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(cors({
    origin: ["http://localhost:3000"],
    methods:  ['POST','GET'],
    credentials: true
}));
app.use(cookieParser());


const url = "mongodb+srv://chetan1150:chetan@cluster0.lbd2z8q.mongodb.net/?retryWrites=true&w=majority";

try {
    mongoose.connect(url);
    console.log("connected to mongodb")
}
catch (error) {
    console.error(error);
}

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.locals.isAuthenticated = false;
        return res.sendStatus(401);
    }

    jwt.verify(token, 'jwt-key', (err, user) => {
        if (err) {
            res.locals.isAuthenticated = false;
            return res.sendStatus(403);
        }
        req.user = user;
        res.locals.isAuthenticated = true; 
        next();
    });
};



app.post('/usersinfo', async (req, res) => {
    console.log("chetan")
    const { name, email, password } = req.body;
    // console.log(req.body.role)
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const existingUser = await UsersModel.findOne({ email })

        console.log(existingUser)
        if (existingUser) {
            return res.status(400).json("Email already exist");
        }
        const newuser = await UsersModel.create({ name, email, password: hashedPassword });
        console.log('newuser', newuser)
        res.status(200).json(newuser)
    }


    catch (err) { res.status(500).json(err) }
  
})

app.post('/logout',authenticateJWT, (req, res) => {
    console.log(res.locals.isAuthenticated)
    if (res.locals.isAuthenticated) {
        res.clearCookie('token');
        res.json({ success: true, message: 'Logout successful' });
    } else {
        res.json({ success: false, message: 'Not logged in' });
    }
});

app.post('/logininfo', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UsersModel.findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ ID: user._id }, 'jwt-key');
            res.cookie('token', token, { httpOnly: true });
            res.json({ success: true, user });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});





  




app.listen(7080, () => {
    console.log('server at port 7080')
})