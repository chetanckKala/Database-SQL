CREATE TABLE user
(
    id VARCHAR(60) PRIMARY KEY,
    username VARCHAR(60) NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL
)