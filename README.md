# CreditPulse
CreditPulse is a real-time, explainable credit intelligence platform. It ingests multi-source data, generates dynamic creditworthiness scores using a transparent rule-based model, and presents the results in an interactive, analyst-friendly web dashboard.


## System Architecture
The application is built on a modern client-server architecture:

### Frontend (Client): 
A React single-page application built with Vite and TypeScript. It provides the user interface, handles user input, and communicates with the backend via API calls. All styling is done with Tailwind CSS.

### Backend (Server): 
A Node.js server built with Express.js. It serves as the core logic engine. It exposes a single API endpoint to the client, handles data ingestion from multiple external APIs, performs sentiment analysis, calculates the credit score using a rule-based model, and generates explanations.

## Tech Stack
### Frontend:

React 18 with Vite

TypeScript

Tailwind CSS

Recharts for data visualization

### Backend:

Node.js with Express.js

axios for API requests

sentiment for NLP analysis

dotenv for environment variable management

## Data Sources:

### Alpha Vantage API: 
For structured financial data (Company Overview, Financial Ratios).

### NewsAPI.org: 
For unstructured, real-time news headlines.


## How to Run This Project
There are two methods to run this application: Docker (Recommended) or the Local Setup.

## Method 1: Docker (Recommended)
This is the easiest way to run the project. It packages the entire application into a single container.

### Prerequisites:
Docker Desktop must be installed and running.

Step 1: Get the Code
Open a terminal and run this command to download the project files:

```bash
git clone https://github.com/itsmyra1006/CreditPulse.git
```

Step 2: Go Into the Project Folder
It's crucial that you navigate into the new folder that was just created.

```bash
cd CreditPulse
```

Step 3: Create the API Keys File

```bash

Create a new file named .env inside the CreditPulse/server directory.

Copy and paste the following into that file, and add your API keys:

ALPHA_VANTAGE_API_KEY=YOUR_ALPHA_VANTAGE_KEY_HERE
NEWS_API_KEY=YOUR_NEWS_API_KEY_HERE
PORT=3001
```

Get an Alpha Vantage key from https://www.alphavantage.co/support/#api-key.

Get a NewsAPI.org key from https://newsapi.org/.

Step 4: Build the Docker Image
From the project's root directory (CreditPulse), run:

```bash
docker build -t creditpulse-app .
```

Step 5: Run the Docker Container
From the same root directory, run:

```bash
docker run -p 8080:3001 -d --env-file server/.env creditpulse-app
```

The application will now be available at http://localhost:8080.

## Method 2: Local Setup (for Development)
### Prerequisites:
Node.js (v18 or later) 

npm

1. Clone the Repository:

```bash
git clone https://github.com/itsmyra1006/CreditPulse.git
cd CreditPulse
```

2. Set Up API Keys:
Follow Step 3 from the Docker instructions above to create the server/.env file.

3. Install Dependencies:

```bash
cd server
npm install
```

```bash
cd ../client
npm install
```

4. Run the Application:
You need two terminals running simultaneously.

Terminal 1 (Backend):

```bash
cd server
npm start
```

Terminal 2 (Frontend):

```bash
cd client
npm run dev
```

The application will be available at http://localhost:5173. 