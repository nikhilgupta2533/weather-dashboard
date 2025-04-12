# Weather Dashboard

Hey there! 👋 This is my weather dashboard project that I built using React and Node.js. It's pretty simple - you can search for any city and see its current weather. Plus, it's got a cool dark mode if you're into that!

## What you'll need
- Node.js on your computer
- An OpenWeatherMap API key (I'll tell you how to get one)
- That's it!

## Getting Started

1. First, get your API key:
   - Go to [OpenWeatherMap](https://openweathermap.org/)
   - Sign up for a free account
   - Copy your API key from your profile

2. Setting up the project:
   - Open two terminal windows (we need one for the frontend and one for backend)
   - In the first terminal:
     ```
     cd weather-dashboard/server
     npm install
     ```
   - Create a file named `.env` in the server folder
   - Put your API key in it like this:
     ```
     WEATHER_API_KEY=your_api_key_here
     ```
   - In the second terminal:
     ```
     cd weather-dashboard/client
     npm install
     ```

3. Running the project:
   - In the server terminal:
     ```
     npm start
     ```
   - In the client terminal:
     ```
     npm start
     ```
   - Open your browser and go to: http://localhost:3000

## Features
- Search for any city's weather
- Toggle between dark and light modes
- See your recent searches
- Basic error handling when things go wrong
- Simple and clean design

## Common Issues
- If you see "Failed to fetch", make sure both servers are running
- If you get API errors, double-check your API key in the .env file
- If a port is already in use, you might need to close other apps using it

## 🌐 Deployed App Links

**Frontend (React App)**:  
[https://weather-dashboard-silk-five.vercel.app](https://weather-dashboard-silk-five.vercel.app)

## That's it!
Hope you find this project useful! Feel free to play around with it and make it your own. If something's not working, just double-check the steps above and make sure everything's running properly.

Made by Nikhil Gupta
