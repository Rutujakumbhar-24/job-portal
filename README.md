# Job Portal

A full-stack job portal where employers post jobs and job seekers search and apply for them.
The frontend is built with HTML, CSS, JavaScript and Bootstrap. The backend is a Spring Boot
REST API connected to a PostgreSQL database.

## Home Page
<img width="1792" height="1120" alt="Homepage" src="https://github.com/user-attachments/assets/233de74f-78d7-44fe-8821-67b831fb7006" />

## Registration page
<img width="1792" height="1120" alt="Registratiion" src="https://github.com/user-attachments/assets/e546ae7e-230f-4f10-99fd-5a484ec80e3b" />

## Login Page
<img width="1792" height="1120" alt="Loginpage" src="https://github.com/user-attachments/assets/1ad214fc-3bc4-401e-90f0-688e4e137190" />

## Job Portal
<img width="1792" height="1120" alt="Jobportal" src="https://github.com/user-attachments/assets/f2a67436-93ec-461e-a2b2-315cbab12307" />

## Find Job
<img width="1792" height="1120" alt="FindJobpage" src="https://github.com/user-attachments/assets/11dd2a86-243c-4c04-a50f-5927882b94c5" />



## Features

**For job seekers**
- Register and log in as a job seeker
- Search jobs by keyword (title or company), location and job type
- View full job details
- Apply with a resume link and a cover letter (duplicate applications are blocked)
- Track the status of every application (Applied, Shortlisted, Accepted, Rejected)

**For employers**
- Register and log in as an employer
- Post new jobs and delete existing ones
- View all applicants for a job
- Update an applicant's status

**General**
- Passwords are hashed with BCrypt before they are stored
- Role-based pages and navigation
- Responsive UI built with Bootstrap 5

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (ES6, Fetch API), Bootstrap 5 |
| Backend | Java, Spring Boot 3.5, Spring Data JPA (Hibernate), REST API |
| Database | PostgreSQL |
| Build tool | Maven |

## Project structure

```
Job-Portal/
├── Backend/
│   ├── pom.xml
│   ├── Database.sql
│   └── src/main/
│       ├── java/com/jobportal/
│       │   ├── JobPortalApplication.java
│       │   ├── config/        CorsConfig.java
│       │   ├── controller/    AuthController, JobController, ApplicationController
│       │   ├── entity/        User, Job, JobApplication
│       │   └── repository/    UserRepository, JobRepository, JobApplicationRepository
│       └── resources/
│           └── application.properties.example
└── Frontend/
    ├── index.html, jobs.html, job-details.html
    ├── login.html, register.html, post-job.html
    ├── employer-dashboard.html, my-applications.html
    ├── css/style.css
    └── js/   (config, api, auth and one script per page)
```

## REST API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in |
| GET | `/api/jobs?keyword=&location=&type=` | Search jobs |
| GET | `/api/jobs/{id}` | Get one job |
| POST | `/api/jobs` | Post a job |
| DELETE | `/api/jobs/{id}` | Delete a job and its applications |
| GET | `/api/jobs/employer/{id}` | Jobs posted by an employer |
| POST | `/api/applications` | Apply for a job |
| GET | `/api/applications/user/{id}` | Applications of a job seeker |
| GET | `/api/applications/job/{id}` | Applicants of a job |
| PUT | `/api/applications/{id}/status?status=` | Update application status |

## Getting started

### Prerequisites
- JDK 17 or newer (developed and tested with JDK 25)
- Maven 3.9+
- PostgreSQL
- VS Code with the Live Server extension (or any static file server)

### 1. Create the database
Create a PostgreSQL database, for example `jobportal`. The tables are created automatically
on the first run. `Backend/Database.sql` contains the same schema and a few demo jobs if you
want to set it up manually.

### 2. Configure the backend
Copy the example configuration and enter your own database details:

```bash
cd Backend/src/main/resources
cp application.properties.example application.properties
```

Then edit `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/jobportal
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD
```

`application.properties` is listed in `.gitignore`, so your password is never committed.

### 3. Run the backend

```bash
cd Backend
mvn spring-boot:run
```

The API starts on `http://localhost:8080`. Open `http://localhost:8080/api/jobs` to check it.

### 4. Run the frontend
Open the `Frontend` folder in VS Code, right-click `index.html` and choose
**Open with Live Server**. The app opens at `http://127.0.0.1:5500/Frontend/index.html`.

If your backend runs on a different address, change `API_BASE` in `Frontend/js/config.js`.

## Try it out
1. Register an **Employer** account and log in.
2. Post one or two jobs.
3. Log out, register a **Job Seeker** account and log in.
4. Search for a job and apply.
5. Log in as the employer again, open the dashboard, view the applicants and change a status.
6. Log in as the job seeker and check **My Applications**.

## Known limitations and future work
- The session is kept in `localStorage` and the API is not protected with tokens.
  Adding Spring Security with JWT is the next step.
- Resumes are submitted as links; file upload is not implemented yet.
- Planned improvements: pagination, request validation, unit tests, an admin role,
  email notifications and deployment.

## Author
**Rutuja Kumbhar**
GitHub: [Rutujakumbhar-24](https://github.com/Rutujakumbhar-24)<img width="1792" height="1120" alt="Screenshot 2026-11-15 at 13 41 19" src="https://github.com/user-attachments/assets/2eb7e4df-1261-4213-bedb-e6ec46073cab" />
