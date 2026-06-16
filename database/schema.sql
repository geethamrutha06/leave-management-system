-- ============================================================
-- Leave Management System - Complete Database
-- Run this file in MySQL Workbench or any MySQL client
-- ============================================================

CREATE DATABASE IF NOT EXISTS leave_management_db;
USE leave_management_db;

DROP TABLE IF EXISTS leave_requests;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,
    email         VARCHAR(100)  NOT NULL UNIQUE,
    password      VARCHAR(255)  NOT NULL,
    role          ENUM('EMPLOYEE','ADMIN') NOT NULL DEFAULT 'EMPLOYEE',
    department    VARCHAR(100)  DEFAULT 'General',
    phone         VARCHAR(20)   DEFAULT '',
    position      VARCHAR(100)  DEFAULT 'Employee',
    leave_balance INT           NOT NULL DEFAULT 20,
    created_at    DATETIME      DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE leave_requests (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT        NOT NULL,
    leave_type      ENUM('CASUAL','SICK','ANNUAL','MATERNITY','UNPAID') NOT NULL,
    start_date      DATE          NOT NULL,
    end_date        DATE          NOT NULL,
    number_of_days  INT           NOT NULL,
    reason          TEXT          NOT NULL,
    status          ENUM('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
    admin_comment   VARCHAR(500)  DEFAULT '',
    applied_date    DATE          NOT NULL,
    reviewed_date   DATE          DEFAULT NULL,
    reviewed_by     BIGINT        DEFAULT NULL,
    created_at      DATETIME      DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)    REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Sample Data
-- Passwords: admin123 for admin, emp123 for employees (BCrypt hashed)
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
(5,'SICK',   '2025-06-18','2025-06-19',2,'Medical appointment','APPROVED','Get well soon.',   '2025-06-17','2025-06-17',1),
(3,'CASUAL', '2025-07-10','2025-07-11',2,'Family function',    'PENDING', '',                 '2025-07-08', NULL,        NULL),
(4,'ANNUAL', '2025-08-01','2025-08-07',7,'Summer vacation',    'PENDING', '',                 '2025-07-20', NULL,        NULL);

SELECT 'Database ready!' AS message;
