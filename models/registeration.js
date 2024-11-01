const registerationSchemaQuery = `CREATE TABLE IF NOT EXISTS Registeration(
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255) NOT NULL ,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    role VARCHAR(10) CHECK (role IN ('student','teacher')),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

module.exports = registerationSchemaQuery;
