-- Drop tables in case they already exist

DROP TABLE IF EXISTS users;

-- Create tables

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(40) NOT NULL,
  name VARCHAR(40) NOT NULL,
  role VARCHAR(40) DEFAULT 'ordinary',
  PASSWORD VARCHAR(200) NOT NULL
);