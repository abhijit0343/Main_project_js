# Wanderlust 🌍 - Discover Your Next Adventure 🦁

![Wanderlust Hero](/C:/Users/ABHIJIT/.gemini/antigravity/brain/42c096d3-0fb5-4132-8313-d0b35593ce9f/wanderlust_hero_v1_1772344465640.png)

> **"The world is a book and those who do not travel read only one page."**

Wanderlust is a premium, full-stack property listing platform designed for modern travelers and hosts. Built with a robust MVC architecture, it offers a seamless experience for discovering, listing, and reviewing unique stays across the globe.

---

## ✨ Features that Roar 🦁

### 🔐 Secure Authentication & Authorization
- **Passport.js Integration**: Industry-standard local strategies for signup, login, and logout.
- **Resource Protection**: Middleware-level authorization ensures only owners can edit or delete their listings.
- **Session Management**: Persistent sessions with `connect-mongo` for a smooth user experience.

### 🏠 Listing Management (CRUD)
- **Rich Media**: High-quality image integration using Cloudinary for blazing-fast media delivery.
- **Interactive Maps**: Built-in Mapbox/Leaflet integration to visualize property locations instantly.
- **Dynamic Forms**: Intuitive interfaces for creating and editing listings with client-side and server-side validation.

### 💬 Engagement & Reviews
- **Review System**: Five-star rating system with text feedback for transparent community engagement.
- **Real-time Feedback**: Flash notifications for every critical action (Login, Signup, CRUD).
- **Responsive Interface**: Mobile-first design using Bootstrap 5 and custom glassmorphism effects.

---

## 🛠️ The Tech Empire

| Backend | Frontend | Database | Tools |
| :--- | :--- | :--- | :--- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | ![EJS](https://img.shields.io/badge/EJS-A91E22?style=for-the-badge&logo=ejs&logoColor=white) | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) | ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white) | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) |

---

## 🏗️ Architecture: The MVC Core

Wanderlust follows the **Model-View-Controller** pattern to ensure clean, scalable, and maintainable code.

```text
MAJOR_PROJECT_1/
├── 🎮 controllers/    # Logical bridge between models and views
├── 📁 MODELS/         # Data blueprints (User, Listing, Review)
├── 🛣️ routes/         # Modular endpoint management
├── 🧰 utils/          # Global Error Handling & Schema Validation
├── 🎨 views/          # Aesthetic EJS-Mate templates
├── 📂 public/          # Client-side assets (CSS, JS, Images)
└── ⚙️ app.js          # The grand entry point
```

---

## 🚀 Launch Sequence

### 1. Zero to Hero (Prerequisites)
Ensure you have **Node.js** and a **MongoDB** instance (local or Atlas) ready.

### 2. Ignite the Project (Installation)
```bash
git clone <repository-url>
cd MAJOR_PROJECT_1
npm install
```

### 3. Configure the Engine (.env)
Create a `.env` file in the root and fill in the blanks:
```env
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
```

### 4. Genesis (Database Initialization)
```bash
node init/index.js
```

### 5. Lift Off!
```bash
node app.js
```
Open [http://localhost:8080](http://localhost:8080) and witness the roar! 🦁

---

## 📜 Roadmap & Future Visions

- [ ] **Search & Filtering**: Comprehensive search by location, price, and category.
- [ ] **Advanced Analytics**: Host dashboard for tracking listing performance.
- [ ] **Social Integration**: One-click login with Google and GitHub.
- [ ] **Dark Mode**: A sleek, nocturnal aesthetic for late-night browsers.

---

## 🤝 Contributing & License

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Distributed under the **ISC License**.

---

Designed with ❤️ and 🦁 by the Wanderlust Team.
