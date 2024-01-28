# URL Shortener MEAN Web Application

## Overview

This is a URL shortener web application built using the MEAN stack (MongoDB, Express.js, Angular, Node.js). The application provides a simple and user-friendly interface for shortening URLs, with the added features of user authentication, registration, and analytics tracking.

## Features

1. **User Authentication and Registration:**
   - Users can create an account by registering with a valid email address and password.
   - Existing users can log in to access their personalized dashboard.

2. **URL Shortening:**
   - Users can shorten long URLs easily by entering them into the provided input field.
   - Shortened URLs are generated and stored in the user's dashboard for easy access.

3. **Dashboard:**
   - Each user has a personalized dashboard where they can view and manage their shortened URLs.
   - The dashboard displays details such as the original URL, shortened URL, creation date, and expiration time.

4. **Analytics:**
   - Users can track analytics for each of their shortened URLs, including the number of clicks and unique visitors.
   - Analytics are presented in a visually appealing and informative manner.

5. **URL Expiration:**
   - Shortened URLs are valid for 48 hours from the time of creation. After this period, the URL becomes invalid.

## Installation

1. Clone the repository:

   ```bash
   https://github.com/Os-7/URL_Shortner.git
   ```

2. Navigate to the project directory:

   ```bash
   cd URL_Shortner
   ```

3. Install dependencies for the frontend and backend:

   ```bash
   cd ./client/client-url
   npm install
   cd ./server
   npm install
   ```

4. Set up the MongoDB database:
   - Create a MongoDB database and update the database connection details in the `server/config/database.js` file.

5. Run the application:

   ```bash
   # From the backend directory
   npm start

   # From the frontend directory
   ng serve
   ```

   Access the application at `http://localhost:4200` in your web browser.

## Usage

1. Register or log in to your account.
2. Enter the long URL you want to shorten.
3. Manage and view your shortened URLs in the dashboard.
4. Track analytics for each shortened URL.

##Preview

https://github.com/Os-7/URL_Shortner/assets/96040535/80573137-00f0-4fbe-9eb9-3fc92961ec54


---

Happy URL Shortening! 😊
