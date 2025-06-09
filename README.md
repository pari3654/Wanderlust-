# WANDERLUST

Wanderlust is a full-stack web application inspired by Airbnb — built using the **MERN** stack to deliver a smooth, secure, and scalable experience.

# 🌍 Wanderlust

**Wanderlust** is a full-stack travel listing web application inspired by Airbnb. Built using Node.js, Express, MongoDB, and EJS, it allows users to register, log in, create and manage listings, write reviews, and explore destinations via interactive maps.

🔗 **Live Demo:** [https://wanderlust-cq5m.onrender.com/listings](https://wanderlust-cq5m.onrender.com/listings)

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Frontend:** EJS, HTML, CSS, JavaScript
- **Authentication:** Passport.js, Passport-Local
- **Image Storage:** Cloudinary
- **Location & Maps:** Mapbox
- **Validation & Utilities:** Joi, express-session, connect-flash, Multer
- **Deployment:** Render

---

## ✨ Features

- 🧭 Clean **MVC architecture**
- 🔐 **User authentication** (register, login, logout)
- 👤 **User authorization** for listings and reviews
- 🏞 Full **CRUD operations** for listings and reviews
- ☁️ **Cloud-based image uploads** using Cloudinary
- 🗺 **Map integration** using Mapbox for location data
- 📷 Image carousel and rating visuals
- ⚠️ Flash messages and server-side validations
- 🛡 Secure sessions with hashed passwords and cookie management

---

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust

2. Install Dependencies
bash
Copy
Edit
npm install
3. Configure Environment Variables
Create a .env file in the root directory and add:

env
Copy
Edit
DB_URL=mongodb+srv://<your-mongo-db-url>
SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
💡 Use your credentials from Cloudinary, Mapbox, and MongoDB Atlas.

4. Run the Server
bash
Copy
Edit
node app.js
Visit: http://localhost:8080/listings

