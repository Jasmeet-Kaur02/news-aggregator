# News Aggregator Backend

To get started with above project, you need to have node installed on local machine. To check node version, run

```

node --version

```

To clone this repo, you must have Git installed on local machine.


## Installation

To get started with above code, run the following commands

```
npm i
node index

```

Here index.js is the application startup file.

This will start the local development server on port `3000`. Open `localhost:3000` to preview the dev server.
You will see following result in the browser.

```

Welcome to the News Aggregator

```


## Tech Stack

This project is primarily created using Nodejs.


## About 

This application allow user to register or login with their account to access news articles based on their preferences. All the news articles are being fetched from News API.  


## Routes Details 

This application has following routes. 

1. /signup - POST - To create user account. Full name, email and password are required in body.
2. /signin - POST - To login on the existing account. Email and password are requied in body.
3. /users/{userId}/news - GET - To fetch all the news as per user preferences. User id should be a valid in path parameter. Authorization token should be contain in headers.
4. /users/{userId}/news/preferences - GET - To fetch user's news preference. User id should be a valid in path parameter. Authorization token should be contain in headers
5. /users/{userId}/news/preferences - PUT - To add or update user's new preference. User id should be a valid in path parameter. Authorization token should be contain in headers.

## Additional Information 

This application do not have any database. Application use in-memory data to store users and their news preferences.
All users are stored in the users.json file.
All user's news preferences are stored in the userNewsPreferences.json file.
