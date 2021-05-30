# nodejs - express


## Before you get started there are some really useful tools you can download!

#### [Joi](https://www.npmjs.com/package/joi)
  - very useful for validation
#### [Postman](https://www.postman.com/)
  - very useful for testing endpoints
#### [Express](https://www.npmjs.com/package/express)
  - the framework we are using to create our restful service
#### [Nodemon](https://www.npmjs.com/package/nodemon)
  - Allows you to refresh the nodejs app with out restarting it!!! (11/10) usefulness!!!!


little thing with example of how to use nodejs

## What are Restful API's/ Restful Services
  - Systems can used a client/server arch, Client is FE, Server is BE to save data. 
  - this uses HTTP protocol
  - Client can directly enteract with server via http and this is where REST comes into play.
  
REST - Representational State Transfer
  - We use simple http protocols to create, read, update and delete data (CRUD Operations)
  - ![example](https://user-images.githubusercontent.com/46537188/120080626-bde88580-c06e-11eb-9761-dbfd232d1bb0.png)
  - this is an example of a company with a url(endpoint)

first part is the protocol, domain, can include api but it would be the directory what we would be using (the resource)

Standarad Http methods used to interact with server ----> 
  - GET (getting data)
  - POST (creating data)
  - PUT (updating data)
  - DELETE (deleting data)
 
So as an example of a GET request ... ![Get Example](https://user-images.githubusercontent.com/46537188/120080764-3f401800-c06f-11eb-9d9e-d74a7d5c3142.png)

we can further this by specifying the data by including customer id such as this ![csu1](https://user-images.githubusercontent.com/46537188/120080818-64348b00-c06f-11eb-88c7-33ff899f9713.png)

Similarly with PUT ![put](https://user-images.githubusercontent.com/46537188/120080856-83cbb380-c06f-11eb-81b8-038a9e526037.png)

Overall the restful convenstion is this --- ![restful conv](https://user-images.githubusercontent.com/46537188/120080903-ad84da80-c06f-11eb-950e-8677019f9ad9.png)


After setting up your app you can upload it to git etc do what ever you want to save it.

we will be using Postgre SQL and heroku to host since they are free.

First make a heroku account its really ez.
after you can link your REST API with heroku via --- ![heroku](https://user-images.githubusercontent.com/46537188/120087969-3e27de80-c0a1-11eb-804c-553fd26d027f.png)

and select an addon in resources and pick postgre sql 

```
heroku addons:create heroku-postgresql:hobby-dev

heroku pg:credentials DATABASE
or
heroku pg:credentials:url

```
then when you get ur url and other detail for the db just link them together and you should get a heroku page
![dbpage](https://user-images.githubusercontent.com/46537188/120088037-c312f800-c0a1-11eb-97f1-26262195534b.png)

which then if you install postgre sql 

you can get a sql CLI ![cli](https://user-images.githubusercontent.com/46537188/120088058-ee95e280-c0a1-11eb-91cf-8de36c1dabb3.png)

and use it to upload tables, etc








 


