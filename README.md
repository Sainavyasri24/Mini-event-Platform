# Mini Event Platform

A full-stack web application designed to facilitate the creation, management, and viewing of events. This platform allows users to browse events and (depending on implementation) register or manage event details.

## 🚀 Features

* **Event Listing:** Browse available events with details.
* **Event Management:** Create and update events (Backend API).
* **Responsive Design:** User-friendly interface for mobile and desktop.
* **Client-Server Architecture:** Decoupled frontend and backend for better scalability.

## 🛠️ Tech Stack

**Frontend (Client)**
* React.js
* CSS / HTML
* JavaScript (ES6+)

**Backend (Server)**
* Node.js
* Express.js
* MongoDB (Assumed database - *update if using SQL/Postgres*)

## 📂 Project Structure

```bash
Mini-event-Platform/
├── client/         # Frontend React application
├── server/         # Backend Node/Express API
├── package.json    # Root configuration
└── README.md       # Project documentation
```
## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or higher)
* [npm](https://www.npmjs.com/) (Node Package Manager)
* [MongoDB](https://www.mongodb.com/) (Local or Atlas connection string)

### 📥 Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Sainavyasri24/Mini-event-Platform.git](https://github.com/Sainavyasri24/Mini-event-Platform.git)
    cd Mini-event-Platform
    ```

2.  **Install Server Dependencies**
    Navigate to the server folder and install packages:
    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies**
    Open a new terminal, navigate to the client folder, and install packages:
    ```bash
    cd client
    npm install
    ```

### ⚙️ Configuration (Environment Variables)

You likely need to set up environment variables for the backend to connect to the database.

1.  Create a `.env` file inside the **`server`** directory.
2.  Add the following variables (update based on your actual config):

    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/mini-event-db
    # JWT_SECRET=your_secret_key_here (If authentication is implemented)
    ```

### 🏃‍♂️ Running the Application

You will need to run the **Backend** and **Frontend** simultaneously.

**Option 1: Two Terminal Windows**

* **Terminal 1 (Server):**
    ```bash
    cd server
    npm start
    # OR if you use nodemon:
    # npm run dev
    ```
    *(Server should start on port 5000)*

* **Terminal 2 (Client):**
    ```bash
    cd client
    npm start
    ```
    *(Client should start on port 3000 and open in your browser)*

**Option 2: Root Script (If configured)**
If your root `package.json` has a concurrent script:
```bash
# From the root directory
npm run dev
