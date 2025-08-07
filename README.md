# GetChef 🍳

Welcome to GetChef, a smart recipe generator that helps you create delicious meals from the ingredients you already have. Powered by AI, GetChef is designed to inspire creativity in the kitchen, reduce food waste, and make cooking fun and easy.

![GetChef Screenshot](https://i.imgur.com/your-screenshot-url.png) 
*(Suggestion: Replace this with a real screenshot of your app!)*

---

## ✨ Features

* **AI-Powered Recipe Generation**: Enter the ingredients you have on hand or the name of a dish, and our AI will generate a unique recipe for you in seconds.
* **User Authentication**: Secure sign-up and sign-in with Google or email/password, powered by Firebase Authentication.
* **Saved Recipes**: Logged-in users can save their favorite generated recipes to a personal collection.
* **Multi-Page Interface**: A smooth, single-page application experience with dedicated pages for About, Pricing, Blog, and Contact.
* **Dynamic & Responsive UI**: Built with React and styled with Tailwind CSS for a beautiful experience on any device.

---

## 🛠️ Tech Stack

* **Front-End**: [React](https://reactjs.org/) (with Vite)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
* **Database**: [Cloud Firestore](https://firebase.google.com/docs/firestore)
* **AI Model**: [Mistral AI](https://mistral.ai/) via [OpenRouter](https://openrouter.ai/)
* **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later)
* npm

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/PI-Prasaad-Krishna/CHEF_AI.git](https://github.com/PI-Prasaad-Krishna/CHEF_AI.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd CHEF_AI
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Set up your environment variables**
    * Create a `.env` file in the root of the project.
    * Add your API keys and Firebase configuration:
        ```
        VITE_OPENROUTER_API_KEY=your_key_here
        VITE_WEB3FORMS_ACCESS_KEY=your_key_here
        VITE_FIREBASE_API_KEY=your_key_here
        VITE_FIREBASE_AUTH_DOMAIN=your_key_here
        VITE_FIREBASE_PROJECT_ID=your_key_here
        VITE_FIREBASE_STORAGE_BUCKET=your_key_here
        VITE_FIREBASE_MESSAGING_SENDER_ID=your_key_here
        VITE_FIREBASE_APP_ID=your_key_here
        ```
5.  **Run the development server**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

---
