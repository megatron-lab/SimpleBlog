# SimpleBlog App
> A simple blog app designed with RESTful architecture. Users can create, read, update, or destroy blogs.

## Description
Write a blog and have it published on the web. Users can write as many blogs as they want and they can create, read, update, or destroy their blogs.

## Installation
Instructions for running this on local server.
1) Clone or download source code.
2) cd into SimpleBlog directory.
3) In terminal and in the SimpleBlog directory, do npm install body-parser ejs express express-sanitizer method-override mongoose dotenv
4) If you want to connect to local mongoDB database, download and install mongoDB. Uncomment out the connect to local mongoDB database and comment out the connect to mongoDB atlas code. Otherwise, if you want to use mongoDB Atlas, leave code unchanged, create an account on mongoDB Atlas and create a .env file on root directory and paste in env variables with username and password information filled out.
DB_USER='type in username'
DB_PASS='type in password'
DB_NAME=simple_blog

5) do node app.js in terminal

6) go to http://127.0.0.1:3000/blogs


## Demo
Click [here](https://simpleblog-app.herokuapp.com/blogs) for a live demo.

