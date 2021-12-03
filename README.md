# socialapp


Steps to recreate: 

0. Install node.js for backend management (optional: i installed Postman for API testing). 

1. Create firebase project online & turn on Authentication (email and password), Firestore Database, Functions. 

Create a directory to clone my code into.

    mkdir socialapp
    cd socialapp
    firebase init

Go into Firebase console, click Project settings, connect to web app, and copty/paste your config credentials into my /functions/util/config.js file

2. choose these options as you are prompted:

    Functions: Configure a Cloud Functions directory and its files

    Use an existing project

    social-web-88671 (Social Web) # this was my project as named in firebase

    JavaScript

    No

    Yes

3. deploy

    firebase deploy

4. install dependences while in functions directory:
    npm install --save express
    npm install --save firebase
    npm install

