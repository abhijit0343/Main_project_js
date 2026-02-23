# Wanderlust 🌍

Wanderlust is a full-stack web application designed for property listings and reviews. Users can explore various destinations, list their own properties, and share their experiences through a comprehensive review system.

## 🚀 Key Features

- **User Authentication**: Secure signup and login functionality using Passport.js and local strategies.
- **Listing Management**: Complete CRUD (Create, Read, Update, Delete) operations for property listings.
- **Review System**: Interactive review section for users to rate and comment on listings.
- **Input Validation**: Robust client-side and server-side validation using Joi schemas.
- **Responsive Design**: Built with Bootstrap for a seamless experience across all devices.
- **Interactive Background**: Dynamic particle network (dots animation) for enhanced visual appeal.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Frontend**: EJS (Embedded JavaScript templates), Vanilla CSS, Bootstrap
- **Authentication**: Passport.js
- **Validation**: Joi (JavaScript Object Schema Validation)
- **Middleware**: Method-override, Cookie-parser, Express-session, Connect-flash

## 📂 Project Structure

```text
MAJOR_PROJECT_1/
├── controllers/    # Route controllers (MVC pattern)
├── MODELS/         # Mongoose schemas (Listing, Review, User)
├── routes/         # Express routers
├── utils/          # Utility functions and custom error handler
├── views/          # EJS templates for layouts and pages
│   ├── includes/   # Reusable partials (Navbar, Footer, Flash)
│   ├── listings/   # Listing-related views
│   └── users/      # User-related views
├── public/         # Static assets (CSS, JS)
├── init/           # Database initialization scripts
├── app.js          # Main application entry point
└── schema.js       # Joi validation schemas
```

## ⚙️ Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running locally

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd MAJOR_PROJECT_1
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Initialize the database (Optional)**:
   ```bash
   node init/index.js
   ```

4. **Run the application**:
   ```bash
   npm start
   ```
   *Note: If `npm start` is not defined, use `node app.js`.*

5. **Access the application**:
   Open [http://localhost:8080](http://localhost:8080) in your browser.

## 📄 License

This project is licensed under the **ISC License**.
