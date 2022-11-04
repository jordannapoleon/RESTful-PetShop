DROP TABLE IF EXIST petStore;

CREATE TABLE petStore (
    pet_Id serial PRIMARY KEY,
    name VARCHAR(50),
    kind VARCHAR(50),
    age INTEGER
);