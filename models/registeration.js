const registrationSchemaQuery = `CREATE TABLE IF NOT EXISTS Registration(
    registrationID INT NOT NULL,
	userName varchar(30) NOT NULL ,
	email varchar(30) UNIQUE NOT NULL ,
	hashedPassword char(64) UNIQUE NOT NULL,
	userRole varchar(10) NOT NULL,
	createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
    fypStudentID INT,
    supervisorID INT,
)`;

module.exports = registrationSchemaQuery;
