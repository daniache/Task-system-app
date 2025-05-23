# TASK MANAGEMENT SYSTEM

A web-based application that allows users to create, view, update, and delete tasks. Designed with productivity and clarity in mind, it helps users manage workloads efficiently using a clean, GOV.UK-inspired interface.


 ### 🌐 TECHNOLOGIES USED

    - Frontend: HTML5, Tailwind CSS, Vanilla JavaScript, jQuery, Flowbite Modal Components, Font Awesome Icons
    - Backend: Java, Spring Boot 3.3.4, Spring MVC, Spring Validation
    - Database: PostgreSQL
    - API Testing: Postman
    - Deployment: Localhost (can be extended to cloud deployment)


### ✅ FUNCTIONALITIES

    - Add new tasks with case number, title, description, status, and due date
    - View all active tasks with filtering and sorting
    - Edit entire task or update only its status
    - Delete tasks
    - View completed tasks separately
    - Search and sort functionality for quick task access
    - RESTful API endpoints with API documentation


## 🔗 HOW TO INVOKE THE APPLICATION

**⚙️ Prerequisites**

    Java 21+
    Maven
    Postgresql 16+ (with a database and appropriate credentials configured)
    Any web browser
    Git

🧱 Setup

    1. Clone the repository.
    2. Update application.properties with your DB credentials.
    3. Run the Spring Boot application via your IDE or terminal:

mvn spring-boot:run

Open your browser and navigate to:

    http://localhost:8080/frontend/home.html


🛠️ Database Setup

This project uses PostgreSQL as the database system.

    Make sure PostgreSQL is installed and running.

    Create a new database (e.g., task_management_db).

    Import the sample data:

psql -U your_username -d task_management_db -f tasks.sql

Update your application.properties with your database credentials.

### 🔐 API OVERVIEW

The backend exposes RESTful endpoints for performing task-related operations:

    GET /tasks - Get all tasks

    GET /tasks/{id} - Get a task by ID

    POST /tasks - Create a new task

    PUT /tasks/{id} - Update full task details

    PATCH /tasks/{id}/status - Update task status only

    DELETE /tasks/{id} - Delete task
    
A Comprehensive API documentation is found in Task Management Sy Folder named "task-api-doc.md". 
If you require a generated version, you will find the link within the document.

### 🧪 TESTING THE API

You can test the API using Postman or cURL.

**Example: Create a new task**

    POST /tasks
    Content-Type: application/json

    {
    "caseNumber": "TMS-101",
    "title": "Fix security bug",
    "description": "Patch XSS vulnerability in login page",
    "status": "Pending",
    "dueDateTime": "2025-04-20T00:00:00"
    }

    PUT /tasks/{id} - Update full task details

    PATCH /tasks/{id}/status - Update task status only

    DELETE /tasks/{id} - Delete task

### ✨ FEATURES TO EXPAND

    - User authentication and authorisation
    - Cloud deployment (e.g. Heroku or AWS)
    - Priority Status Implementation

    

    
