🧠 Mental Health Self-Check App
A full-stack web application that helps users track their mental well-being through a quick self-assessment questionnaire and visualize trends over time.
The app also generates AI-powered personalized mental health tips based on the user's responses.

🚀 Live Demo
https://mentalhealthapp-77250.web.app/index.html

✨ Features

🔐 User Authentication
Secure login and signup using Firebase Authentication
Users can safely access their personal mental health history.

🧠 Mental Health Self-Assessment
Users answer a set of questions that measure:
Mood
Stress
Sleep
Focus
Self-Perception
Social Connection
Daily Functionality
Each score ranges from 0–3, allowing quick evaluation.

📊 Mental Health Trend Visualization
Scores are stored in Firebase Firestore
Historical results are displayed using Chart.js
Users can see how their mental health changes over time.

🤖 AI-Generated Mental Health Tips
The backend sends user scores to Cohere AI
AI generates a supportive, practical mental health suggestion

Example:

"Try taking short breaks during stressful tasks and spend a few minutes practicing deep breathing to help reset your focus."

🏗 Tech Stack
Frontend
HTML
CSS
JavaScript
Chart.js
Firebase SDK

Backend
Node.js
Express.js
Cohere AI API

Database & Auth
Firebase Firestore
Firebase Authentication

Deployment
Render (Backend)
Firebase (Authentication & Database)

📂 Project Structure
Mental-health-app
│
├── public
│   ├── index.html
│   ├── results.html
│   ├── results.js
│   └── styles.css
│
├── server
│   └── server.js
│
├── package.json
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Piiush04/Mental-health-app.git
cd Mental-health-app
2️⃣ Install dependencies
npm install
3️⃣ Create .env file
Inside the root folder create:
.env

4️⃣ Run the backend server
node server.js

Server runs on:
http://localhost:5000
5️⃣ Open the frontend

Open:
index.html
in your browser.

🔑 Environment Variables
Variable	Description
COHERE_API_KEY	API key used to generate AI mental health tips
📊 How Scoring Works
Each mental health factor is rated 0–3.

Score	Meaning
0	Severe difficulty
1	Moderate difficulty
2	Mild difficulty
3	Healthy / Good

The app calculates an average score and displays trends using a line chart.

🔮 Future Improvements
Possible features to improve the project:
AI weekly mental health summary
Mood prediction based on history
Personalized recommendations
Meditation or breathing exercises
Mobile-friendly UI
Dark mode

👨‍💻 Author
Piyush

GitHub:
https://github.com/Piiush04

⭐ Contributing
Contributions are welcome!
