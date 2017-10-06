const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

const mutler = require('multer');
const upload = mutler();

const jwt = require('jsonwebtoken');


//views for ejs
app.set('views','./views');
//view angine
app.set('view engine','ejs');


app.use('/public', express.static('public'));

// app.use(bodyParser.urlencoded({extended: false}));

var movies =  [
  {title:"Bottle rocket", year : 1996},
  {title:"Aquatic life" , year : 2003},
  {title:"Gran Budapest hotel", year : 2013 }
];


app.get('/',(req,res)=>{
//  res.send('Hello <b>World</b>!!');
  res.render('index');
});

app.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`);
});

app.get('/movies',(req,res)=>{

  const title = "Film de Wes Anderson";
  wesmovies = [
    {title:"Bottle rocket", year : 1996},
    {title:"Aquatic life" , year : 2003},
    {title:"Gran Budapest hotel", year : 2013 }
  ];
  res.render('movies', {movies : wesmovies, title : title});
});

var urlencoderParser = bodyParser.urlencoded({extended: false});

/*app.post('/movies',urlencoderParser,(req,res)=>{
  console.log( 'title: ' + req.body.movietitle);
  console.log( 'year: ' + req.body.movieyear);
  const newMovie= {title :  req.body.movietitle, year:req.body.movieyear };
  movies.push(newMovie);
  console.log(movies);

  res.sendStatus(201);
});*/

app.post('/movies',upload.fields([]),(req,res)=>{
  if(!req.body){
    return res.sendStatus(500);
  }else{
    const formData = req.body;
    console.log("formdata: ", formData);
    const newMovie= {title :  req.body.movietitle, year:req.body.movieyear };
    wesmovies = [...wesmovies,newMovie];
    res.sendStatus(201);
  }
});

app.get('/movies/add',(req,res)=>{
  res.send(`form for adding movie incoming`);
});

app.get('/movies/:id', (req,res)=>{
  const id = req.params.id;

  //res.send(`Film numéro ${id}`);
  res.render('movie-detail',{movieid:id });
});


app.get('/movie-detail',(req,res)=>{
  res.render('movie-detail');
});

app.get('/movie-search',(req,res)=>{
  res.render('movie-search');  
});

app.get('/login',(req,res)=>{
  res.render('login',{title:'connexion'});  
});


const fakeUser ={email:'testuser@mail.com',password:'qsd'};

const secret ='sAEeGEGrokre54ae00agpltmG684654gf01Ggq6ae4Zrg654Ggqd544fg6AarG40g5g4qd5Zg44qeG3r5g4eEa454EFF6501651f32Gssf166zFe5f165Zq00df13sA0ZZEd5fz6ef165dfh6fdh4';
app.post('/login',urlencoderParser,(req,res) => {
  if(!req.body){
    res.sendStatus(500);
  }else{
    if (fakeUser.email === req.body.email && fakeUser.password === req.body.password){
      const myToken = jwt.sign({iss:'moviestuff',user:'Sam', scope:'moderator'},secret);
      res.json(myToken);
    }else{
      res.status(401);
    }
  }
});