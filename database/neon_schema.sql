-- PostgreSQL schema for Neon.tech or Railway PostgreSQL
-- Use this ONLY if deploying database to Neon or Railway (not MySQL)

DROP TABLE IF EXISTS leave_requests;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id            BIGSERIAL PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,
    email         VARCHAR(100)  NOT NULL UNIQUE,
    password      VARCHAR(255)  NOT NULL,
    role          VARCHAR(20)   NOT NULL DEFAULT 'EMPLOYEE',
    department    VARCHAR(100)  DEFAULT 'General',
    phone         VARCHAR(20)   DEFAULT '',
    position      VARCHAR(100)  DEFAULT 'Employee',
    leave_balance INT           NOT NULL DEFAULT 20,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leave_requests (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    leave_type      VARCHAR(20)   NOT NULL,
    start_date      DATE          NOT NULL,
    end_date        DATE          NOT NULL,
    number_of_days  INT           NOT NULL,
    reason          TEXT          NOT NULL,
    status          VARCHAR(20)   NOT NULL DEFAULT 'PENDING',
    admin_comment   VARCHAR(500)  DEFAULT '',
    applied_date    DATE          NOT NULL DEFAULT CURRENT_DATE,
    reviewed_date   DATE          DEFAULT NULL,
    reviewed_by     BIGINT        DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL,
    created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data (passwords: admin123 / emp123)
INSERT INTO users (name,email,password,role,department,phone,position,leave_balance) VALUES
('Admin User',   'admin@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN',    'Management',  '9999999990', 'System Admin',      999),
('Ravi Kumar',   'ravi@company.com',  '$2a$10$8K1p/a0dNDNeMmvgkYZMiOlIqcmQxrb9tHLjDYeS2LPSBKPzKmpQC', 'EMPLOYEE', 'Engineering', '9876543210', 'Software Engineer', 18),
('Priya Sharma', 'priya@company.com', '$2a$10$8K1p/a0dNDNeMmvgkYZMiOlIqcmQxrb9tHLjDYeS2LPSBKPzKmpQC', 'EMPLOYEE', 'Design',      '9876543211', 'UI/UX Designer',    15),
('Arun Patel',   'arun@company.com',  '$2a$10$8K1p/a0dNDNeMmvgkYZMiOlIqcmQxrb9tHLjDYeS2LPSBKPzKmpQC', 'EMPLOYEE', 'Engineering', '9876543212', 'Backend Developer', 20),
('Sneha Reddy',  'sneha@company.com', '$2a$10$8K1p/a0dNDNeMmvgkYZMiOlIqcmQxrb9tHLjDYeS2LPSBKPzKmpQC', 'EMPLOYEE', 'HR',          '9876543213', 'HR Executive',      12);

INSERT INTO leave_requests (user_id,leave_type,start_date,end_date,number_of_days,reason,status,admin_comment,applied_date,reviewed_date,reviewed_by) VALUES
(2,'CASUAL', '2025-06-10','2025-06-11',2,'Personal work',      'APPROVED','Approved.',        '2025-06-05','2025-06-06',1),
(2,'SICK',   '2025-07-01','2025-07-02',2,'Fever and cold',     'PENDING', '',                 '2025-06-28', NULL,        NULL),
(3,'ANNUAL', '2025-06-20','2025-06-25',6,'Family vacation',    'APPROVED','Enjoy your trip!', '2025-06-15','2025-06-16',1),
(4,'CASUAL', '2025-07-05','2025-07-05',1,'Personal errand',    'REJECTED','Critical sprint.', '2025-07-03','2025-07-04',1),
(5,'SICK',   '2025-06-18','2025-06-19',2,'Medical appointment','APPROVED','Get well soon.',   '2025-06-17','2025-06-17',1);
