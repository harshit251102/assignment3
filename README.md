# assignment3
#Tech Stack Used - Node, Express, MySQL
#Everything is developed accurately according to given problem statement

Steps to try out the assigment
1. Create a mySql server at port 3307 with password 123456aA#
2. Open the project in any text editor and run the command nodemon index.js in the command line.
3. Node server will start at localhost:8000
3. You can now try out the different APIs used using postman/swagger etc.

APIs- 
1. post/http://localhost:8000/create
body - {
        "username" : "harshit12",
        "firstname": "harshit",
        "lastname" : "gupta", 
        "email" : "hg25112002@gmail.com", 
        "mobile" : "8307407429",
        "gender" : "male",
        "password" : "hello"
}

2. post/http://localhost:8000/add/harshit12/davy12
body - {}

3. get/http://localhost:8000/friends/harshit12

4. get/http://localhost:8000/friendRequests/harshit12

5. http://localhost:8000/suggestions/harshit12
