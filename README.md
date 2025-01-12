# News Aggregator API
![version](https://img.shields.io/badge/version-1.0.0-yellow.svg)

**News Aggregator API:** A RESTful API for a personalized news aggregator using Node.js, Express.js, bcrypt, and JWT and api best practices. Redis is used to cache api requests.

---

## Features

1. **User Module**  
2. **News Module**

---

## Tech Stack

- **Node.js**
- **Express.js**
- **Joi** (Validation)
- **JwtToken**
- **Axios**
- **Redis**

---

## Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/airtribe-projects/news-aggregator-api-charanjsingh29.git
   ```

2. **Install Dependencies**  
   ```bash
   $ npm install
   $ npm run dev
   ```

---

## Example API Endpoints
### User Module
1. **New user signup**  
   - `POST /users/signup`  
   - **Request Body**:  
     ```json
     {
         "name": "Clark Kent",
         "email": "clark1@superman.com",
         "password": "123456",
         "preferences":["movies", "comics"]
      }
     ```
   - **Response**:
     ```json
     {
         "success": true,
         "message": "User created successfully",
         "data": {
            "id": 1,
            "name": "Clark Kent",
            "email": "clark1@superman.com",
            "preferences": [
                  "movies",
                  "comics"
            ]
         }
      }
     ```
     * <mark>All fields are required</mark>

2. **Login**  
   - `POST /users/login`  
   - **Request Body**:  
     ```json
     {
         "email": "clark1@superman.com",
         "password": "123456",
      }
     ```
   - **Response**:
     ```json
     {
         "success": true,
         "message": "User logged in successfully",
         "token": ""
         "data": {
            "id": 1,
            "name": "Clark Kent",
            "email": "clark1@superman.com",
            "preferences": [
                  "movies",
                  "comics"
            ]
         }
      }
     ```
     * <mark>All fields are required</mark>

3. **Logged in user profile**  
   - `GET /users/profile`
   - **Header**
      ```
      Authorization: Bearer `<your_token>` 
      ```
   - **Response**:
      ```json
      {
         "data": {
            "id": 1,
            "name": "Clark Kent",
            "email": "clark1@superman.com",
            "preferences": [
                  "movies",
                  "comics"
            ]
         }
      }
      ```

4. **Update logged in user profile**  
   - `PUT /users/profile` 
   - **Header**
      ```
      Authorization: Bearer `<your_token>` 
      ``` 
   - **Request Body**:  
     ```json
     {
         "name": "Clark Kent 2"
      }
     ```
   - **Response**:
     ```json
      {
         "success": true,
         "message": "Profile updated successfully",
         "data": {
            "user": {
                  "id": 1,
                  "name": "Clark Kent 2",
                  "email": "clark1@superman.com",
                  "preferences": [
                     "movies",
                     "comics"
                  ]
            }
         }
      }
     ```
     * <mark>All fields are required</mark>

5. **Get user preferences**  
   - `GET /users/preferences`
   - **Header**
      ```
      Authorization: Bearer `<your_token>` 
      ```
   - **Response**:
      ```json
      {
         "preferences": [
            "movies",
            "comics"
         ]
      }
      ```

6. **Update user preferences**  
   - `PUT /users/preferences` 
   - **Header**
      ```
      Authorization: Bearer `<your_token>` 
      ``` 
   - **Request Body**:  
     ```json
     {
         "preferences": [
            "movies", 
            "comics", 
            "games"
         ]
     }
     ```
   - **Response**:
     ```json
      {
         "success": true,
         "message": "User preferences updated successfully",
         "preferences": [
            "movies",
            "comics",
            "games"
         ]
      }
     ```
     * <mark>All fields are required</mark>

6. **Change password**  
   - `PUT /users/change_password`  
   - **Header**
      ```
      Authorization: Bearer `<your_token>` 
      ```
   - **Request Body**:  
     ```json
      {
         "current_password": "Krypt()n8",
         "new_password" : "test"
      }
     ```
   - **Response**:
     ```json
      {
         "success": true,
         "message": "User password changed successfully",
         "data": {
            "user": {
                  "id": 1,
                  "name": "Clark Kent 2",
                  "email": "clark1@superman.com",
                  "preferences": [
                     "movies",
                     "comics",
                     "games"
                  ]
            }
         }
      }
     ```
     * <mark>All fields are required</mark>

### News Module
1. **Fetch News**  
   - `GET /news`  
   - **Header**
      ```
      Authorization: Bearer `<your_token>` 
      ```
   - **Response**:
     ```json
      {
         "success": true,
         "total_results": 1,
         "news": [
            {
               "source": {
                  "id": "cnn",
                  "name": "CNN"
               },
               "author": "John Towfighi",
               "title": "Stocks tumble following blowout jobs report - CNN",
               "description": "US stocks slid Friday as investors digested a better-than-expected jobs report that soured expectations of future rate cuts from the Federal Reserve.",
               "url": "https://www.cnn.com/2025/01/10/investing/us-markets-jobs-report/index.html",
               "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2192142491.jpg?c=16x9&q=w_800,c_fill",
               "publishedAt": "2025-01-10T18:21:40Z",
               "content": "US stocks slid Friday as investors digested a better-than-expected jobs report that soured expectations of future rate cuts from the Federal Reserve.\r\nThe Dow dropped by more than 500 points, or 1.2%… [+3144 chars]"
            }
         ]
      }
     ```
     * <mark>All fields are required</mark>

---

## Run Tests

Tests are written using **Tap** and **Supertest**. Run the tests with:

```bash
npm run test
```
