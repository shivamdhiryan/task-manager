# Task Manager API

A Node.js REST API for managing tasks with user authentication, session management, and AI-powered title suggestions. Tasks are stored in a local JSON file. Recent updates include improved error handling and session-based user identification for tasks.

## Features
- User registration and login
- Session-based user management (tasks are linked to logged-in user)
- CRUD operations for tasks (Create, Read, Update, Delete)
- AI-generated task titles based on description
- Improved error handling in controllers
- Data persistence using a JSON file

## Project Structure
```
controllers/         # Route handlers for authentication and tasks
middlewares/         # Custom middleware (e.g., session authentication)
routes/              # Express route definitions
utils/               # Utility functions (AI helper, file operations)
  data/register.json # User registration data
  data/task.json     # Task data storage
index.js             # Entry point
package.json         # Project metadata and dependencies
README.md            # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)

### Installation
1. Clone the repository or copy the project files.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   node index.js
   ```

## API Endpoints

### Authentication
- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and start a session

### Tasks
- `POST /task` — Create a new task (requires authentication; uses session user)
- `GET /task` — Get all tasks for the logged-in user
- `PUT /task/:id` — Update a task by ID (requires authentication)
- `DELETE /task/:id` — Delete a task by ID (requires authentication)

## Utilities
- AI helper for generating task titles (`utils/ai.helper.js`)
- File utilities for reading/writing tasks (`utils/file.util.js`)

## Notes
- All task operations require a valid session (user must be logged in).
- Tasks are stored in `utils/data/task.json`.
- User data is stored in `utils/data/register.json`.
- AI title suggestion uses a helper function (can be replaced with an actual AI service).
- Error messages are returned for missing fields and invalid operations.

## License
This project is for educational purposes.
