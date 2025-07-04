# Pet Adoption System

A full-stack pet adoption platform where users (owners, service providers, and admins) can register, list pets, request adoptions, review, and manage pet services. Featuring authentication, role-based access control, email verification, and an interactive user interface built with React, Node.js, Express, MongoDB, and Vite.

## 🌐 Live Demo

Explore the live application here:

[Pet Adoption System](https://pet-adoption-system-1-ksct.onrender.com)

## 🚀 Features

* **User Roles**: Owner, Service Provider, Admin
* **Authentication**: JWT-based sign-up, login, email verification, password reset
* **Pet Listings**: Owners can list pets for adoption or temporary care
* **Adoption Requests**: Users can request permanent or temporary pet care
* **Role-based Routing**: Protected routes via `PrivateRoute` component
* **Reviews & Ratings**: Owners can review service providers
* **Notifications**: Email confirmations for account actions
* **Admin Panel**: Manage pet types, request types, and user interests

## 🛠️ Tech Stack

* **Frontend**: React, Vite, Redux, React Router
* **Backend**: Node.js, Express
* **Database**: MongoDB Atlas
* **Authentication**: JWT
* **Email Service**: Nodemailer (Gmail SMTP)
* **Image Hosting**: Cloudinary
* **Payments**: Stripe
* **Geolocation**: OpenCage Geocoding API

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/surya391/Pet_Adoption_System.git
   cd Pet_Adoption_System
   ```

2. **Backend Setup**

   ```bash
   cd server
   npm install
   ```

   * Create a `.env` file with:

     ```env
     PORT=3001
     JWT_SECRET=YOUR_JWT_SECRET
     MONGO_URI=YOUR_MONGODB_URI
     BASE_URL=http://localhost:5173
     HOST=smtp.gmail.com
     SERVICE=gmail
     EMAIL_PORT=587
     SECURE=false
     USER=your.email@gmail.com
     PASS=your_app_password
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDNARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     OPEN_CAGE_API=your_opencage_api_key
     STRIPE_SECRET_KEY=your_stripe_secret
     ```
   * Start the backend:

     ```bash
     npm run dev
     ```

3. **Frontend Setup**

   ```bash
   cd ../client
   npm install
   ```

   * Create `.env` with:

     ```env
     VITE_API_BASE_URL=http://localhost:3001/api
     ```
   * Start the development server:

     ```bash
     npm run dev
     ```

## 🔌 Deployment

* **Backend** on Render (Node service)
* **Frontend** on Render (Static site with Vite build)
* **Use environment variables** in Render Dashboard for all secrets and connection strings.

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m "feat: description"`)
4. Push to branch (`git push origin feature/name`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ by Surya M M*
