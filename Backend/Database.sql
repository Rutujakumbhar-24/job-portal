-- database.sql : PostgreSQL me chalane ke liye (pgAdmin ya psql)

-- Step 1: database banayein (postgres database me chalayein)
CREATE DATABASE jobportal;

-- Step 2: ab jobportal database me connect karke neeche ke tables banayein
-- (Agar ddl-auto=update hai to ye tables Spring Boot khud bana dega,
--  ye sirf samajhne / manual setup ke liye hai.)

CREATE TABLE IF NOT EXISTS users (
    id         BIGSERIAL PRIMARY KEY,
    name       VARCHAR(255),
    email      VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255),
    phone      VARCHAR(255),
    role       VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS jobs (
    id           BIGSERIAL PRIMARY KEY,
    title        VARCHAR(255),
    company      VARCHAR(255),
    location     VARCHAR(255),
    job_type     VARCHAR(255),
    salary       VARCHAR(255),
    description  TEXT,
    posted_by    BIGINT,
    posted_date  DATE
);

CREATE TABLE IF NOT EXISTS applications (
    id               BIGSERIAL PRIMARY KEY,
    job_id           BIGINT,
    user_id          BIGINT,
    job_title        VARCHAR(255),
    company          VARCHAR(255),
    applicant_name   VARCHAR(255),
    applicant_email  VARCHAR(255),
    resume_link      VARCHAR(1000),
    cover_letter     TEXT,
    status           VARCHAR(255),
    applied_date     DATE
);

-- Step 3 (optional): demo jobs
INSERT INTO jobs (title, company, location, job_type, salary, description,
                  posted_by, posted_date) VALUES
('Java Developer', 'TCS', 'Bengaluru', 'Full Time', '5-8 LPA',
 'Spring Boot aur PostgreSQL ka knowledge zaroori hai.', 0, CURRENT_DATE),
('Frontend Developer', 'Infosys', 'Mysuru', 'Full Time', '4-6 LPA',
 'HTML, CSS, JavaScript aur Bootstrap me kaam karna hoga.', 0, CURRENT_DATE),
('Web Development Intern', 'Startup Hub', 'Remote', 'Internship', '10k/month',
 'Fresher can apply. Training di jayegi.', 0, CURRENT_DATE);

 SELECT * FROM users;

 INSERT INTO jobs (title, company, location, job_type, salary, description, posted_by, posted_date) VALUES
('Java Developer', 'TCS', 'Bengaluru', 'Full Time', '5-8 LPA', 'Spring Boot and PostgreSQL knowledge required.', 0, CURRENT_DATE),
('Frontend Developer', 'Infosys', 'Mysuru', 'Full Time', '4-6 LPA', 'HTML, CSS, JavaScript and Bootstrap.', 0, CURRENT_DATE),
('Web Development Intern', 'Startup Hub', 'Remote', 'Internship', '10k/month', 'Freshers can apply.', 0, CURRENT_DATE);

SELECT * FROM users;
SELECT * FROM jobs;
SELECT * FROM applications;

SELECT COUNT(*) AS total_users FROM users;

SELECT role, COUNT(*) AS total FROM users GROUP BY role;

SELECT id, name, email, phone, role FROM users ORDER BY id;

SELECT COUNT(*) AS total_jobs FROM jobs;

SELECT COUNT(*) AS total_applications FROM applications;

SELECT
  (SELECT COUNT(*) FROM users) AS users,
  (SELECT COUNT(*) FROM users WHERE role = 'EMPLOYER') AS employers,
  (SELECT COUNT(*) FROM users WHERE role = 'JOB_SEEKER') AS job_seekers,
  (SELECT COUNT(*) FROM jobs) AS jobs,
  (SELECT COUNT(*) FROM applications) AS applications;