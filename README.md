# Mini MERN Stack Application

This is a web application built using the MERN stack that allows us to fetch data using api from backend and show it in interface according to dropdown

The application is currently hosted at:

 1. [Netlify](https://radiant-druid-592b18.netlify.app/)

Backend Hosted at

https://oru-phones.onrender.com/

## Technologies

This application is built using the following technologies:

- MongoDB (Database)
- Express.js (Backend)
- React.js (Frontend)
- Node.js (Runtime Environment)

## Queries

The following Queries are available in the application:

1. Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
2. Male Users which have phone price greater than 10,000.
3. Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
4. Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
5. Show the data of top 10 cities which have the highest number of users and their average income.



## Getting Started with React and Node


## Prerequisites
Things that you need to run this app:


- **[Node Package Manager](https://www.npmjs.com/)**
- **[Mongodb(Optional)](https://www.mongodb.com/)**
- **[Git(Optional)](https://git-scm.com/)**



Follow these steps to get started with the application:

1. Clone the repository:  `git clone https://github.com/Vswaroop04/Oruphones.git`

2. Install dependencies:   `cd frontend && npm install`  &&  `cd backend && npm install`

3. Create a .env file in the Backend directory and add the following environment variables:
  
  
  ``` .env
   mongo_password=<mongodb_userpassword>
  ```

 
4. Start the server and the client: 'cd frontend && node start`  &&  `cd Backend && node App.js`
