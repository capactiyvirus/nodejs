const Joi = require('joi');
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const  { Pool } = require('pg');
const path = require('path');

const pool = new Pool({
    user: 'USER',
    host: 'ec2-54-87-112-29.compute-1.amazonaws.com',
    database: 'DB',
    password: 'PASSWORD',
    port: 5432,
    ssl:{
        rejectUnauthorized: false,
        
    }
  });
  
app.set('view engine', 'ejs');

//middlewear used in request processing pipeline
app.use(express.json());

app.use(express.static('/'))



const courses = [
    {id: 1, name:'course1'},
    {id: 2, name:'course2'},
    {id: 3, name:'course3'},
    {id: 4, name:'course4'}
];


app.get('/', async (req,res)=>{

    const responce = await pool.query('SELECT * FROM persons');
    console.log(responce.rows);
    res.render('index', {user: responce.rows})
    //res.sendFile(path.join(__dirname+'/index.html'));
});

// const getUsers = async (req,res) => {
//     const responce = await pool.query('SELECT * FROM persons');
//     console.log(responce.rows);
//     res.send('persons');
// };


app.get('/api/courses', async (req,res)=>{
    //const client = await pool.connect();
    //console.log(client);

    ////// I HAVE NO IDEA WHY THIS IS NOT WORKING
    const responce = await pool.query('SELECT * FROM persons');
    console.log(responce.rows);
    //res.sendFile(path.join(__dirname+'/index.html'));
    //res.send('/index.html');
    //res.send({success: true, message: '<p>'+responce.rows+'</p>'});
    res.render('index',{user: responce.rows});
    

    // const responce = pool.query('SELECT * FROM persons;');
    // console.log(responce.rows);
    // res.send('persons');
    //res.send(courses);

    //to enteract with the sql db we need to use pool
    //pool.query('SELECT * FROM users');
});


// end point for a speicfic coruse
// /api/courses/1

app.get('/api/courses1/:courseID', (req,res)=>{
    res.send(req.params.courseID)

});

//route param
// app.get('/api/posts/:year/:month', (req,res)=>{
//     res.send(req.params);
    

// });

//how to read query param
// app.get('/api/posts/:year/:month', (req,res)=>{
//     res.send(req.query);
    

// });
function validateCourse(course){

    const schema = Joi.object ({
        name: Joi.string().min(3).required()

    });
    return schema.validate(course);
}


app.put('/api/courses/:id', async (req,res)=>{
    //look up courses
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //if not existing return 404
    if (!course){ 
        res.status(404).send("The Course with the given Id was not found");
        return;
    }
    //validate 
    //const result = validateCourse(req.body);
    const { error } = validateCourse(req.body); // result.error OBJECT DESTRUCTUREING
    
    //if invalide return 400
    if (error){
        //400 Bad Rqst
       res.status(400).send(error.details[0].message); //handling messages
       return;
    }

    const responce = await pool.query('SELECT * FROM persons', (err, res) => {
        if (err) throw err;
        console.log(res);
    });
    //updatecourse
    course.name = req.body.name;

    //return updated course
    res.send(course);

});



app.get('/api/courses/:id', async (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    ///FIX THIS SHIT
    // const responce = await pool.query('SELECT * FROM persons WHERE firstname=$firstname'|[firstname], (err, res) => {
    //     if (err) throw err;
    //     console.log(res.rows);
    // });
    
    //console.log(responce.rows);


    //if (!course) return res.status(404).send("The Course with the given ID was not found");  //404
    res.send(course);
    

});
// USE INPUT VALIDATION

app.post('/api/courses', (req,res) => {
    
    //define a schema for joi 
    // so like shape of the object (properties,types, min/max, etc)

    const {error} = validateCourse(res.body);
    // const schema = Joi.object ({
    //     name: Joi.string().min(3).required()

    // });

    // const result = schema.validate(req.body);
    
    
    
    
    //simple validation
    // if (!req.body.name || req.body.name.length<3){
    //      //400 Bad Rqst
    //     res.status(400).send('Name is required and should be min 3 characters!');
    //     return;
    // }


    
    if (error) return res.status(400).send(error.details[0].message); //handling messages
         //400 Bad Rqst


    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.delete('/api/courses/:id',(req,res)=>{
    //look up courses
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //if not existing return 404
    if (!course) return res.status(404).send("The Course with the given Id was not found");
     
    
    

    //delete Course
    const index = courses.indexOf(course);
    courses.splice(index,1);
    

    //return message
    res.send(course);



});






// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));



// module.exports = {
//     getUsers
// };

// app.post()
// app.put()
// app.delete()
