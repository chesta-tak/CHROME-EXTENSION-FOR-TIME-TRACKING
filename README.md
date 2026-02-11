## CHROME-EXTENSION FOR TIME TRACKING

## INTRODUCTION

A smart Chrome Extension that tracks your browsing activity and helps you understand how you spend your time online. Built using **JavaScript**, **React**, **Node.js**, and **MongoDB**, this project includes a modern dashboard with charts and insights.

## 🎯 Features

- 🧠 Automatically tracks time spent on websites
- ⏱️ Logs start/end time, total active time, and website title
- 💤 Idle time detection
- 📊 Dashboard with charts (bar + pie)
- 📅 Filters for Today / This Week / This Month
- 🔐 User authentication with JWT
- 📤 Export activity as CSV
- 🌗 Clean and modern UI with dark mode
- 🛠️ Backend APIs to store & fetch activity logs

## 🚀 Run the project locally (VS Code)

This repository has three parts:

1. `backend` (Node + Express API)
2. `frontend-dashboard` (React app)
3. `extension` (Chrome extension)

### 1) Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with at least:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Run backend:

```bash
npm start
```

Backend runs on `http://localhost:5000` (or your `PORT`).

### 2) Frontend dashboard setup

Open a new terminal:

```bash
cd frontend-dashboard
npm install
npm start
```

Frontend runs on `http://localhost:3000`.

### 3) Load Chrome extension

1. Open Chrome and go to `chrome://extensions/`
2. Turn on **Developer mode**
3. Click **Load unpacked**
4. Select the `extension/` folder from this repo

---

### Quick start (after first install)

When dependencies are already installed, just run:

```bash
# terminal 1
cd backend && npm start

# terminal 2
cd frontend-dashboard && npm start
```

# 📸 Preview
![login](https://github.com/user-attachments/assets/551740fd-fd1f-44b9-a6e4-06426f1fd6e0)
![dashboard](https://github.com/user-attachments/assets/25e3053b-d45e-4c72-bd91-847d4c9b945b)
![dashboard2](https://github.com/user-attachments/assets/665bb8da-d9bd-40aa-9123-d0cedc48bee9)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
