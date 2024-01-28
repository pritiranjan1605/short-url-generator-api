const express = require('express')
const cookieparser = require('cookie-parser')
const { v4: uuidv4 } = require('uuid')
const app = express()
app.use(cookieparser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const path = require('path')
app.set("view engine", "ejs")
app.set('views', path.resolve('./views'));
const mongoose = require('mongoose')


// authentication


const sessionidtouermap = new Map();
function setuser(id, user) {
    sessionidtouermap.set(id, user)
}
function getuser(id) {
    return sessionidtouermap.get(id);
}

function authentimethod(req, res, next) {
    const userid = req.cookies?.uid;
    if (!userid) { return res.redirect('/login') }
    console.log(userid)
    const userm = getuser(userid);
    if (!userm) {
        return res.redirect('/login')
    }
    req.user = userm;
    next();

}



// USER REQ


const users = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})
const User = mongoose.model('user', users);
app.post('/user', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.json({ status: "error blank fields" })
    await User.create({
        name: name,
        email: email,
        password: password,
    })
    const allurls = await urls.find({});
    return res.render('home', {
        ur: allurls
    })
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const signin = await User.findOne({ email, password })
    if (!signin) {
        return res.render('login', {
            error: 'no such user'
        })
    }
    const sessionid = uuidv4();
    setuser(sessionid, signin)
    res.cookie('uid', sessionid)
    return res.redirect('/')
})

app.get('/login', (req, res) => {
    return res.render('login')
})
app.get('/signup', (Req, res) => {
    return res.render('signup')
})





// URLS REQ


const urlschema = mongoose.Schema({
    shortid: {
        type: String,
        require: true,
        unique: true,
    },
    directurl: {
        type: String,
        require: true,
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }

})
const urls = mongoose.model("urls", urlschema);


const shortid = require('shortid')
app.post('/url', authentimethod, async (req, res) => {
    const body = req.body;
    if (!body.url) return res.json({ error: "some error occured" })
    const urlm = body.url;
    const short = shortid();
    await urls.create({
        shortid: short,
        directurl: urlm,
        createdby:req.user._id
    })
    return res.render('generate',{
        sh:`http://localhost:8000/url/${short}`
    })
})
app.get('/url/:shortid', async (req, res) => {
    const result = await urls.findOne({ shortid: req.params.shortid });
    const directurl = result.directurl;
    res.redirect(directurl);
})





app.get('/', async (req, res) => {
    const allurls = await urls.find({});
    return res.render('home', {
        ur: allurls
    })
})



mongoose.connect("mongodb://127.0.0.1:27017/newserver").then((req, res) => {
    console.log("mongo established")
}).catch((err) => console.log(err))
const port = 8000;
app.listen(port, () => {
    console.log("server started")
})