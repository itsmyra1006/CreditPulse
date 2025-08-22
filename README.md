CreditPulse
CreditPulse is a real-time, explainable credit intelligence platform. It ingests multi-source data, generates dynamic creditworthiness scores using a transparent rule-based model, and presents the results in an interactive, analyst-friendly web dashboard.


System Architecture
The application is built on a modern client-server architecture:

Frontend (Client): A React single-page application built with Vite and TypeScript. It provides the user interface, handles user input, and communicates with the backend via API calls. All styling is done with Tailwind CSS.

Backend (Server): A Node.js server built with Express.js. It serves as the core logic engine. It exposes a single API endpoint to the client, handles data ingestion from multiple external APIs, performs sentiment analysis, calculates the credit score using a rule-based model, and generates explanations.

Tech Stack
Frontend:

React 18 with Vite

TypeScript

Tailwind CSS

Recharts for data visualization

Backend:

Node.js with Express.js

axios for API requests

sentiment for NLP analysis

dotenv for environment variable management

Data Sources:

Alpha Vantage API: For structured financial data (Company Overview, Financial Ratios).

NewsAPI.org: For unstructured, real-time news headlines.

Local Setup & Installation
Prerequisites:

Node.js (v18 or later)

npm

1. Clone the Repository:

git clone [https://github.com/your-username/CreditPulse.git](https://github.com/your-username/CreditPulse.git)
cd CreditPulse

2. Set Up API Keys:
This project requires API keys from two services. You need to create a .env file in the server directory.

# Navigate to the server directory
cd server

# Create a .env file and add the following content:
ALPHA_VANTAGE_API_KEY=YOUR_ALPHA_VANTAGE_KEY_HERE
NEWS_API_KEY=YOUR_NEWS_API_KEY_HERE
PORT=3001

Get an Alpha Vantage key from https://www.alphavantage.co/support/#api-key.

Get a NewsAPI.org key from https://newsapi.org/.

3. Install Dependencies:
You need to install dependencies for both the client and the server.

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

4. Run the Application:
The application requires two terminals running simultaneously.

Terminal 1 (Backend):

cd server
npm start
# The server will be running on http://localhost:3001

Terminal 2 (Frontend):

cd client
npm run dev
# The client will be available at http://localhost:5173

Open http://localhost:5173 in your browser to use the application.

Docker Setup
You can also build and run the entire application in a single Docker container.

Prerequisites:

Docker Desktop installed and running.

1. Build the Docker Image:
From the project's root directory, run:

docker build -t creditpulse-app .

2. Run the Docker Container:

# This command runs the container and maps port 8080 on your machine to the container's port.
# Make sure to create a .env file in the server directory before running.
docker run -p 8080:3001 -d --env-file server/.env creditpulse-app

The application will be available at http://localhost:8080.