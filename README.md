# URL Shortener API

A simple URL shortener API built with Node.js, Express, MongoDB, and EJS.

## Table of Contents
- [Introduction](#introduction)
- [Setup](#setup)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [User](#user)
  - [URLs](#urls)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [License](#license)

## Introduction

This URL shortener API allows users to shorten long URLs into unique short IDs. Users can create accounts, log in, and manage their shortened URLs.

## Setup

1. Install dependencies:
   ```bash
   npm install
2.Start the server:
  ```bash
  npm start
  ```
3.The server will be running at http://localhost:8000.

## Authentication

The API uses session-based authentication. Users need to sign up or log in to manage their URLs.

## Endpoints

### User

- **POST /user**
  - Create a new user account.
  - Request body: { name, email, password }

- **POST /login**
  - Log in an existing user.
  - Request body: { email, password }

- **GET /login**
  - Render the login page.

- **GET /signup**
  - Render the signup page.

### URLs

- **POST /url**
  - Shorten a URL.
  - Requires authentication.
  - Request body: { url }
  - Returns a short URL.

- **GET /url/:shortid**
  - Redirect to the original URL based on the short ID.

- **GET /**
  - Render the home page with a list of all URLs.

## Usage

1. Sign up or log in to your account.
2. Use the /url endpoint to shorten a long URL.
3. View and manage your shortened URLs on the home page.

## Dependencies

- Express: Web application framework
- Mongoose: MongoDB object modeling
- EJS: Embedded JavaScript templating
- Shortid: Short ID generation
- Cookie-parser: Middleware for parsing cookies
- uuid: UUID generation

## License

This project is licensed under the MIT License.
