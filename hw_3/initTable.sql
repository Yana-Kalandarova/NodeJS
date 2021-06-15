CREATE TABLE users (
    id varchar(40) PRIMARY KEY,
    login varchar(40) NOT NULL,
    password varchar(40) NOT NULL,
    age integer NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp
);

INSERT INTO users (id,login,password,age)
VALUES ('0cf756a0-5805-4e29-b975-cf8eb36f63e8', 'Paul', 'voluptatem', 126);
INSERT INTO users (id,login,password,age)
VALUES ('a2d5c5a6-fd1a-4488-9a1d-cd5407dbda51', 'Casey', 'blanditiis', 83);
INSERT INTO users (id,login,password,age)
VALUES ('58a1f1f5-ad71-47bf-a861-233280eaa233', 'Dimitri', 'asperiores', 32);
