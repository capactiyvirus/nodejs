const Joi = require('joi');
const serverless = require('serverless-http');
const express = require('express');
const app = express();

//middlewear used in request processing pipeline
app.use(express.json());


const courses = [
    {id: 1, name:'course1'},
    {id: 2, name:'course2'},
    {id: 3, name:'course3'},
    {id: 4, name:'course4'}
];


app.get('/',(req,res)=>{
    res.send("hello world");

});


app.get('/api/courses',(req,res)=>{
    res.send(courses);
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


app.put('/api/courses/:id',(req,res)=>{
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

    //updatecourse
    course.name = req.body.name;

    //return updated course
    res.send(course);

});



app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The Course with the given ID was not found");  //404
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



module.exports.handler = serverless(app);

// app.post()
// app.put()
// app.delete()