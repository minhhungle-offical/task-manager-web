task-manager-web
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package.json
├── public
│ └── vite.svg
├── README.md
├── src
│ ├── api
│ │ ├── authApi.js
│ │ ├── axiosClient.js
│ │ ├── employeeApi.js
│ │ ├── managerApi.js
│ │ ├── messageApi.js
│ │ └── taskApi.js
│ ├── App.css
│ ├── App.jsx
│ ├── assets
│ │ ├── audios
│ │ ├── react.svg
│ │ └── vite.svg
│ ├── components
│ │ ├── Common
│ │ ├── FormFields
│ │ └── Layouts
│ ├── constants
│ │ └── common.js
│ ├── features
│ │ ├── Auth
│ │ ├── Employees
│ │ ├── Main
│ │ ├── Messages
│ │ ├── Profile
│ │ ├── Tasks
│ │ └── Welcome
│ ├── index.css
│ ├── main.jsx
│ ├── stores
│ │ ├── rootReducer.js
│ │ ├── slices
│ │ └── store.js
│ └── utils
│ └── socket.js
├── vite.config.js
└── yarn.lock

## Overview

This is a mini task management app built for Skipli’s coding challenge.

It includes:

- Login with OTP (SMS/email)
- Realtime employee management
- Task assignment
- Chat messaging via socket.io

---

## Tech Stack

- React
- Vite
- MUI
- Socket.IO Client
- Redux Toolkit thunk (state management)

## GIT

```bash
GIT HTTPS: git clone https://github.com/minhhungle-offical/task-manager-web.git
GIT SSH: git clone git@github.com:minhhungle-offical/task-manager-web.git
```

## Environment Variables

| Variable            | Description                 |
| ------------------- | --------------------------- |
| `VITE_API_BASE_URL` | Base URL of the backend API |

## Prerequisites

- Node.js >= 18 // v22.17.0
