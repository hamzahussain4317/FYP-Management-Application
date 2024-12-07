-- CREATE TABLE Students(
-- StudentID INT NOT NULL,
-- studentRoll VARCHAR(8),
-- studentName VARCHAR(30) NOT NULL,
-- departmentID INT NOT NULL,
-- email VARCHAR(30) NOT NULL UNIQUE,
-- dateOfBirth DATE ,
-- CONSTRAINT emailValidation CHECK (email REGEXP '^k[0-9]{6}@nu\\.edu\\.pk$' OR email REGEXP '^[A-Za-z]+\\.[A-Za-z]+@nu\\.edu\\.pk$'),
-- CONSTRAINT idValidation CHECK(studentRoll REGEXP '^[0-9]{2}[K | L | I | P ]\\-[0-9]{4}$')
-- );
-- ALTER TABLE Students ADD CONSTRAINT students_PK PRIMARY KEY(studentID);
-- ALTER TABLE Students  MODIFY COLUMN studentID INT AUTO_INCREMENT;

-- CREATE TABLE FYPStudent(
-- 	fypStudentID INT NOT NULL,
--     groupID INT DEFAULT NULL,
--     midEvaluation DOUBLE DEFAULT 0.0,
--     finalEvaluation DOUBLE DEFAULT 0.0
-- );
-- ALTER TABLE FYPStudent ADD CONSTRAINT fypStudent_PK PRIMARY KEY(fypStudentID);
-- ALTER TABLE FYPStudent MODIFY COLUMN fypStudentID INT AUTO_INCREMENT;


-- -- Foreign Key Constraints
-- ALTER TABLE FYPStudent ADD CONSTRAINT fypstd_student_FK FOREIGN KEY(fypStudentID) REFERENCES Students(studentID);

-- CREATE TABLE Teachers(
-- 	teacherID INT NOT NULL,
-- 	firstName VARCHAR(8) NOT NULL,
-- 	lastName VARCHAR(30) NOT NULL,
-- 	departmentID INT NOT NULL,
-- 	email VARCHAR(30) NOT NULL UNIQUE,
-- 	dateOfBirth DATE ,
-- 	CONSTRAINT teacherEmailValidation CHECK (email REGEXP '^[A-Za-z]+\\.[A-Za-z]+@nu\\.edu\\.pk$')
-- );
-- ALTER TABLE Teachers ADD CONSTRAINT teacher_PK PRIMARY KEY(teacherID);
-- ALTER TABLE Teachers  MODIFY COLUMN teacherID INT AUTO_INCREMENT;


-- CREATE TABLE Supervisor(
-- 	supervisorID INT NOT NULL,
--     cgpaCriteria DOUBLE,
--     No_Of_Projects INT DEFAULT 0,
--     specializedDomain VARCHAR(50)
-- );
-- ALTER TABLE Supervisor ADD CONSTRAINT Supervisor_PK PRIMARY KEY(supervisorID);
-- ALTER TABLE Supervisor MODIFY COLUMN supervisorID INT AUTO_INCREMENT;

-- -- Foreign Key Constraints 
-- ALTER TABLE Supervisor ADD CONSTRAINT supervisor_teacher_FK FOREIGN KEY(supervisorID) REFERENCES Teachers(teacherID);


-- CREATE TABLE Registration(
-- 	registrationID INT NOT NULL,
-- 	userName varchar(30) NOT NULL ,
-- 	email varchar(30) UNIQUE NOT NULL ,
-- 	hashedPassword char(64) UNIQUE NOT NULL,
-- 	userRole varchar(10) NOT NULL,
-- 	createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
--     fypStudentID INT,
--     supervisorID INT,
-- 	CONSTRAINT role_check CHECK(userRole IN ('student','teacher')),
-- 	CONSTRAINT validate_email CHECK (email REGEXP '^k[0-9]{6}@nu\\.edu\\.pk$' OR email REGEXP '^[A-Za-z]+\\.[A-Za-z]+@nu\\.edu\\.pk$')
-- );

-- ALTER TABLE Registration ADD CONSTRAINT registration_PK PRIMARY KEY(registrationID);
-- ALTER TABLE Registration MODIFY COLUMN registrationID INT AUTO_INCREMENT;

-- -- FOREIGN KEY CONSTRAINTS 
-- ALTER TABLE Registration ADD CONSTRAINT fyp_registeration_FK FOREIGN KEY(fypStudentID) REFERENCES FYPStudent(fypStudentID);
-- ALTER TABLE Registration ADD CONSTRAINT supervisor_registeration_FK FOREIGN KEY(supervisorID) REFERENCES Supervisor(supervisorID);

-- select * from Registration;

-- CREATE TABLE Project(
-- 	projectID INT NOT NULL,
-- 	description TEXT,
-- 	projectName VARCHAR(255) DEFAULT NULL,
-- 	startDate Date,
-- 	endDate Date,
-- 	status ENUM('Not Started','In Progress','Completed') DEFAULT "Not Started",
-- 	createdAt timestamp default CURRENT_TIMESTAMP,
-- 	updatedAt timestamp default current_timestamp ON UPDATE CURRENT_TIMESTAMP
-- );
-- ALTER TABLE Project ADD CONSTRAINT Project_PK primary key(projectID);
-- ALTER TABLE Project MODIFY COLUMN projectID INT AUTO_INCREMENT;


-- CREATE TABLE ProjectGroup(
-- 	groupID INT NOT NULL,
--     leaderID INT NOT NULL,
--     projectID INT DEFAULT NULL,
--     supervisorID INT DEFAULT NULL,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );
-- ALTER TABLE ProjectGroup ADD CONSTRAINT group_PK PRIMARY KEY(groupID);
-- ALTER TABLE ProjectGroup MODIFY COLUMN groupID INT auto_increment;
-- ALTER TABLE ProjectGroup ADD CONSTRAINT unique_leaderID UNIQUE(leaderID);

-- -- Foreign key constraints
-- ALTER TABLE ProjectGroup ADD CONSTRAINT group_leader_FK FOREIGN KEY (leaderID) REFERENCES FYPStudent(fypSTudentID);
-- ALTER TABLE ProjectGroup ADD CONSTRAINT group_supervisor_FK FOREIGN KEY (supervisorID) REFERENCES Supervisor(supervisorID);
-- ALTER TABLE ProjectGroup ADD CONSTRAINT group_project_FK FOREIGN KEY (projectID) REFERENCES Project(projectID);



-- select * from Project;


-- CREATE TABLE Message(
-- 	messageID INT NOT NULL,
--     studentID INT NULL,
--     supervisorID INT NULL,-- receipentID can be null if message is sent to group
--     senderType ENUM('fypstudent','supervisor'),
--     receiverType ENUM('fypstudent','supervisor'),
--     groupID INT NULL,-- can be null if message is sent indivdually
--     messageContentID INT,
--     sentTime timestamp default current_timestamp
-- );
-- ALTER TABLE Message ADD CONSTRAINT Message_PK PRIMARY KEY(messageID);
-- ALTER TABLE Message MODIFY COLUMN messageID INT auto_increment;

-- -- FOREIGN KEY CONSTRAINTS
-- ALTER TABLE Message ADD CONSTRAINT message_bodyContent_FK FOREIGN KEY(messageContentID) REFERENCES MessageContent(contentID);
-- ALTER TABLE Message ADD CONSTRAINT message_to_group_FK FOREIGN KEY(groupID) REFERENCES ProjectGroup(groupID);
-- ALTER TABLE Message ADD CONSTRAINT message_fypstudent_FK FOREIGN KEY(studentID) REFERENCES fypStudent(fypStudentID);
-- ALTER TABLE Message ADD CONSTRAINT message_supervisor_FK FOREIGN KEY(supervisorID) REFERENCES Supervisor(supervisorID);

-- CREATE TABLE MessageContent(
-- 	contentID INT NOT NULL,
-- 	title VARCHAR(30) DEFAULT "No Title",
--     description TEXT,
--     type VARCHAR(10)
-- );
-- ALTER TABLE MessageContent ADD CONSTRAINT Message_Content_PK PRIMARY KEY(contentID);
-- ALTER TABLE MessageContent MODIFY COLUMN contentID INT auto_increment;


-- CREATE TABLE Notification (
--     notificationID INT,
--     messageID INT NOT NULL,                
--     receiverID INT,               
--     receiverType ENUM('fypstudent', 'supervisor'), 
--     is_groupNotification BOOLEAN,  
--     isRead BOOLEAN DEFAULT FALSE
-- );

-- ALTER TABLE Notification ADD CONSTRAINT Notification_PK PRIMARY KEY(notificationID);

-- -- FOREIGN KEY CONSTRAINTS
-- ALTER TABLE Notification ADD CONSTRAINT notification_message_FK FOREIGN KEY(messageID) REFERENCES Message(messageID);



-- CREATE table tasks(
--  taskID INT not null,
--  projectID INT not null,
--  fypStudentID INT not null,
--  taskName varchar(30) default "no title",
--  taskDescription varchar(100) default "no description",
--  taskDeadline TIMESTAMP default null ,
--  taskStatus boolean default null,
--  assignedDate TIMESTAMP default current_timestamp
-- );

-- ALTER TABLE Tasks ADD CONSTRAINT tasks_PK PRIMARY KEY(taskID);
-- ALTER TABLE Tasks MODIFY COLUMN taskID INT AUTO_INCREMENT;
-- ALTER TABLE Tasks ADD CONSTRAINT tasks_project_FK FOREIGN KEY(projectID) REFERENCES Project(projectID);
-- ALTER TABLE Tasks ADD CONSTRAINT tasks_fypstudent_FK FOREIGN KEY(fypStudentID) REFERENCES fypStudent(fypStudentID);


-- CREATE TABLE proposal (
--   groupID INT not null,
--   supervisorID INT not null,
--   projectName VARCHAR (255) not null,
--   projectDomain VARCHAR(30),
--   projectDescription TEXT not null,
--   projectFile longblob
-- );

-- ALTER TABLE proposal ADD CONSTRAINT proposal_pk PRIMARY KEY(groupID,supervisorID);
-- ALTER TABLE proposal ADD CONSTRAINT proposal_group_fk FOREIGN KEY(groupID) REFERENCES projectGroup(groupID);
-- ALTER TABLE proposal ADD CONSTRAINT proposal_supervisor_fk FOREIGN KEY(supervisorID) REFERENCES supervisor(supervisorID);


-- -- All drop queries 
-- drop table notification;
-- drop table message;
-- drop table messageContent;
-- drop table registeration;
-- drop table project;
-- drop table projectgroup;
-- drop table fypstudent;
-- drop table supervisor;
-- drop table teachers;
-- drop table students;
-- drop table tasks;
-- drop table proposal;

-- -- Triggers

-- -- Trigger For Handling Registeration Check and Data feeding into fypstudent or supervisor
-- DELIMITER //

-- CREATE  TRIGGER before_registration_insert
-- BEFORE INSERT ON Registration
-- FOR EACH ROW
-- BEGIN
--     -- Check if the role is 'student'
--     IF NEW.userRole = 'student' THEN
--         IF EXISTS (SELECT 1 FROM fypstudent WHERE fypStudentID = NEW.fypStudentID) THEN
--             SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Student already registered in FYPStudent table';
--         ELSE
--             INSERT INTO fypstudent (fypstudentID,  groupID , midEvaluation , finalEvaluation)
--             VALUES (NEW.fypStudentID,NULL,NULL,NULL);
--         END IF;

--     ELSEIF NEW.userRole = 'teacher' THEN
--         IF EXISTS (SELECT 1 FROM supervisor WHERE supervisorID = NEW.supervisorID) THEN
--             SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Teacher already registered as Supervisor';
--         ELSE
--             INSERT INTO supervisor (supervisorID, cgpaCriteria, specializedDomain)
--             VALUES (NEW.supervisorID, NULL,NULL); 
--         END IF;
--     END IF;
-- END;
-- //

-- DELIMITER ;



-- INSERT INTO Students (studentRoll, studentName, departmentID, email, dateOfBirth) 
-- VALUES 
-- ('22k-4111', 'Junaid Shiekh', 2, 'k224111@nu.edu.pk', '2001-12-30'),
-- ('22k-4222', 'Rafay Ahmed', 3, 'k224222@nu.edu.pk', '2002-09-02'),
-- ('22k-4333', 'Abdul Rafay', 2 ,'k224333@nu.edu.pk', '2003-09-23');

-- INSERT INTO Teachers (firstName, lastName, departmentID, email, dateOfBirth) 
-- VALUES 
-- ('Nadeem', 'Kaafi', 1, 'Nadeem.kafi@nu.edu.pk', '1980-02-15'),
-- ('Zain', 'Noreen', 2, 'Zain.Noreen@nu.edu.pk', '1985-07-22'),
-- ('Farrukh', 'Salim', 3, 'Farrukh.salim@nu.edu.pk', '1990-11-05');

-- INSERT INTO Students (studentRoll , studentName , departmentID , email ,dateOfBirth)
-- VALUES
-- ('22k-4122','Rao Abdul Hadi',2,'k224122@nu.edu.pk','2000-06-06');
-- drop table registeration;

-- show triggers like "registration";
-- drop trigger if exists before_registration_insert;


-- INSERT INTO projectGroup (leaderID)
-- SELECT f.fypStudentID
-- FROM fypStudent f
-- JOIN students s ON f.fypStudentID = s.studentID
-- WHERE s.studentRoll = '22k-4317';

-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE projectGroup;
-- SET FOREIGN_KEY_CHECKS = 1;

-- select * from fypStudent;

-- SELECT s.studentRoll FROM students s  WHERE s.email IN ('k224317@nu.edu.pk','k224318@nu.edu.pk','k224280@nu.edu.pk') and s.studentRoll='22k-4317';
-- SELECT s.studentRoll FROM students s  WHERE s.email IN (${emails.map(() => '?').join(',')}) and s.studentRoll=?



-- DELIMITER $$

-- CREATE PROCEDURE CheckAndCreateGroup(
--     IN email1 VARCHAR(255),
--     IN email2 VARCHAR(255),
--     IN email3 VARCHAR(255),
--     OUT groupCreated BOOLEAN
-- )
-- BEGIN
--     DECLARE allNull BOOLEAN;
-- 	DECLARE leaderFypStudentID INT;
--     -- Check if all three students have groupID IS NULL
--     SELECT COUNT(*) = 3 INTO allNull
--     FROM students s
--     JOIN fypStudent f ON s.studentID = f.fypStudentID
--     WHERE s.email IN (email1, email2, email3) AND f.groupID IS NULL;

--     -- If all three have groupID = NULL, create a new group
--     IF allNull THEN
--         -- Fetch the fypStudentID of the student corresponding to the first email
--         SELECT f.fypStudentID INTO leaderFypStudentID
--         FROM students s
--         JOIN fypStudent f ON s.studentID = f.fypStudentID
--         WHERE s.email = email1;

--         -- Insert new group with leaderID as the first email's student ID
--         INSERT INTO projectGroup (leaderID)
--         VALUES (leaderFypStudentID);

--         -- Update the groupID for all three students
--         UPDATE fypStudent
--         SET groupID = LAST_INSERT_ID()
--         WHERE fypStudentID IN (
--             SELECT studentID
--             FROM students
--             WHERE email IN (email1, email2, email3)
--         );

--         -- Indicate group was created
--         SET groupCreated = TRUE;
--     ELSE
--         -- Indicate group was not created
--         SET groupCreated = FALSE;
--     END IF;
-- END$$

-- DELIMITER ;




-- SET @groupCreated = NULL;
-- CALL CheckAndCreateGroup('k224317@nu.edu.pk', 'k224318@nu.edu.pk', 'k224280@nu.edu.pk', @groupCreated);

-- -- Check the result
-- SELECT @groupCreated;

-- DROP PROCEDURE IF EXISTS CheckAndCreateGroup;

-- UPDATE projectGroup
-- SET supervisorID = NULL
-- where groupID=20;

-- SHOW PROCEDURE STATUS WHERE Db = 'fyp';


-- select * from students where studentID IN (select fypStudentID from fypStudent where groupID IN(select groupID from fypStudent where fypStudentID=10));

-- select g.groupID , projectName , status , startDate , studentRoll from projectGroup G
-- left JOIN project p 
-- ON p.projectID=g.projectID
-- JOIN fypStudent f
-- ON f.groupID=g.groupID
-- JOIN Students s 
-- ON s.studentID = f.fypStudentID
-- AND g.supervisorID=5;


-- insert into project (description,projectName,status) values("Hello this is my database project","fyp","Not Started");


-- select * from project where projectID= (select projectID from projectGroup where groupID=(select groupID from fypStudent where fypStudentID=7));



-- select f.groupID, p.* from fypStudent f join projectGroup pg on f.groupID = pg.groupID join project p on pg.projectID=p.projectID where f.fypStudentID=7;

--    
-- SHOW VARIABLES LIKE 'secure_file_priv';


CREATE TABLE Students(
	StudentID INT NOT NULL,
	studentRoll VARCHAR(8),
	studentName VARCHAR(30) NOT NULL,
	departmentName VARCHAR(50) NOT NULL,
	email VARCHAR(30) NOT NULL UNIQUE,
	dateOfBirth DATE ,
    profilePic MEDIUMBLOB DEFAULT NULL,
	CONSTRAINT emailValidation CHECK (email REGEXP '^k[0-9]{6}@nu\\.edu\\.pk$' OR email REGEXP '^[A-Za-z]+\\.[A-Za-z]+@nu\\.edu\\.pk$'),
	CONSTRAINT idValidation CHECK(studentRoll REGEXP '^[0-9]{2}[K | L | I | P ]\\-[0-9]{4}$')
);
ALTER TABLE Students ADD CONSTRAINT students_PK PRIMARY KEY(studentID);
ALTER TABLE Students  MODIFY COLUMN studentID INT AUTO_INCREMENT;
alter table Students add column section varchar(10);
alter table Students add column batch varchar(10);


CREATE TABLE FYPStudent(
	fypStudentID INT NOT NULL,
    groupID INT DEFAULT NULL,
    midEvaluation DOUBLE DEFAULT NULL,
    finalEvaluation DOUBLE DEFAULT NULL,
    isLeader boolean DEFAULT 0
);
ALTER TABLE FYPStudent ADD CONSTRAINT fypStudent_PK PRIMARY KEY(fypStudentID);
ALTER TABLE FYPStudent MODIFY COLUMN fypStudentID INT AUTO_INCREMENT;



-- Foreign Key Constraints
ALTER TABLE FYPStudent ADD CONSTRAINT fypstd_student_FK FOREIGN KEY(fypStudentID) REFERENCES Students(studentID);

CREATE TABLE Teachers(
	teacherID INT NOT NULL,
	firstName VARCHAR(8) NOT NULL,
	lastName VARCHAR(30) NOT NULL,
	departmentName VARCHAR(50) NOT NULL,
	email VARCHAR(30) NOT NULL UNIQUE,
	dateOfBirth DATE ,
    profilePic MEDIUMBLOB ,
	CONSTRAINT teacherEmailValidation CHECK (email REGEXP '^[A-Za-z]+\\.[A-Za-z]+@nu\\.edu\\.pk$')
);
ALTER TABLE Teachers ADD CONSTRAINT teacher_PK PRIMARY KEY(teacherID);
ALTER TABLE Teachers  MODIFY COLUMN teacherID INT AUTO_INCREMENT;

Alter table Teachers add column contactNo varchar(11);
Alter table Teachers add column designation varchar(25);
alter table Teachers add column qualification varchar(25);



CREATE TABLE Supervisor(
	supervisorID INT NOT NULL,
    cgpaCriteria DOUBLE,
    No_Of_Projects INT DEFAULT 0,
    specializedDomain VARCHAR(50)
);
ALTER TABLE Supervisor ADD CONSTRAINT Supervisor_PK PRIMARY KEY(supervisorID);
ALTER TABLE Supervisor MODIFY COLUMN supervisorID INT AUTO_INCREMENT;

-- Foreign Key Constraints 
ALTER TABLE Supervisor ADD CONSTRAINT supervisor_teacher_FK FOREIGN KEY(supervisorID) REFERENCES Teachers(teacherID);

CREATE TABLE supervisorRatings(
	supervisorID INT NOT NULL,
    groupID INT NOT NULL,
    ratings INT DEFAULT 0
);
ALTER TABLE supervisorRatings ADD CONSTRAINT composite_ratings_PK PRIMARY KEY(groupID);

-- FOREIGN KEY CONSTRAINTS
ALTER TABLE supervisorRatings ADD CONSTRAINT ratings_supervisor_FK FOREIGN KEY(supervisorID) REFERENCES supervisor(supervisorID);
ALTER TABLE supervisorRatings ADD CONSTRAINT ratings_group_FK FOREIGN KEY(groupID) REFERENCES projectGroup(groupID);


CREATE TABLE Registration(
	registrationID INT NOT NULL,
	userName varchar(30) NOT NULL ,
	email varchar(30) UNIQUE NOT NULL ,
	hashedPassword char(64) UNIQUE NOT NULL,
	userRole varchar(10) NOT NULL,
	createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
    fypStudentID INT,
    supervisorID INT,
	CONSTRAINT role_check CHECK(userRole IN ('student','teacher')),
	CONSTRAINT validate_email CHECK (email REGEXP '^k[0-9]{6}@nu\\.edu\\.pk$' OR email REGEXP '^[A-Za-z]+\\.[A-Za-z]+@nu\\.edu\\.pk$')
);

ALTER TABLE Registration ADD CONSTRAINT registration_PK PRIMARY KEY(registrationID);
ALTER TABLE Registration MODIFY COLUMN registrationID INT AUTO_INCREMENT;

-- FOREIGN KEY CONSTRAINTS 
ALTER TABLE Registration ADD CONSTRAINT fyp_registeration_FK FOREIGN KEY(fypStudentID) REFERENCES FYPStudent(fypStudentID);
ALTER TABLE Registration ADD CONSTRAINT supervisor_registeration_FK FOREIGN KEY(supervisorID) REFERENCES Supervisor(supervisorID);


CREATE TABLE proposal (
  groupID INT not null,
  supervisorID INT not null,
  projectName VARCHAR (255) not null,
  projectDomain VARCHAR(30),
  projectDescription TEXT not null,
  projectFile longblob,
  proposalStatus boolean default 0
);

ALTER TABLE proposal ADD CONSTRAINT proposal_pk PRIMARY KEY(groupID,supervisorID);
ALTER TABLE proposal ADD CONSTRAINT proposal_group_fk FOREIGN KEY(groupID) REFERENCES projectGroup(groupID);
ALTER TABLE proposal ADD CONSTRAINT proposal_supervisor_fk FOREIGN KEY(supervisorID) REFERENCES supervisor(supervisorID);
ALTER TABLE proposal ADD COLUMN proposalStatus boolean default 0;


CREATE TABLE Project(
	projectID INT NOT NULL,
	description TEXT,
	projectName VARCHAR(255) DEFAULT NULL,
	startDate Date,
	status ENUM('Not Started','In Progress','Completed') DEFAULT "Not Started",
	createdAt timestamp default CURRENT_TIMESTAMP,
	updatedAt timestamp default current_timestamp ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE Project ADD CONSTRAINT Project_PK primary key(projectID);
ALTER TABLE Project MODIFY COLUMN projectID INT AUTO_INCREMENT;
Alter Table project drop column endDate;


CREATE TABLE ProjectGroup(
	groupID INT NOT NULL,
    leaderID INT NOT NULL,
    projectID INT DEFAULT NULL,
    supervisorID INT DEFAULT NULL,
    groupName VARCHAR(255) DEFAULT "No Name",
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE ProjectGroup ADD CONSTRAINT group_PK PRIMARY KEY(groupID);
ALTER TABLE ProjectGroup MODIFY COLUMN groupID INT auto_increment;
ALTER TABLE ProjectGroup ADD CONSTRAINT unique_leaderID UNIQUE(leaderID);


-- Foreign key constraints
ALTER TABLE ProjectGroup ADD CONSTRAINT group_leader_FK FOREIGN KEY (leaderID) REFERENCES FYPStudent(fypSTudentID);
ALTER TABLE ProjectGroup ADD CONSTRAINT group_supervisor_FK FOREIGN KEY (supervisorID) REFERENCES Supervisor(supervisorID);
ALTER TABLE ProjectGroup ADD CONSTRAINT group_project_FK FOREIGN KEY (projectID) REFERENCES Project(projectID);


CREATE TABLE MessageContent (
    contentID INT,
    messageType ENUM('text', 'file', 'image') NOT NULL, 
    textContent TEXT DEFAULT NULL,                    
    filePath VARCHAR(255) DEFAULT NULL,           
    imagePath VARCHAR(255) DEFAULT NULL            
);

ALTER TABLE messagecontent ADD CONSTRAINT message_content_PK PRIMARY KEY(contentID);
ALTER TABLE messagecontent MODIFY COLUMN contentID INT auto_increment;


-- NOTIFICATION CENTER SCHEMA  
CREATE TABLE Message (
    messageID INT ,     
    senderID INT NOT NULL,             
    senderRole ENUM('student', 'supervisor','admin') NOT NULL,
    groupID INT DEFAULT NULL,        
    contentID INT NOT NULL,   
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE Message ADD CONSTRAINT message_PK PRIMARY KEY(messageID);
ALTER TABLE Message MODIFY COLUMN messageID INT AUTO_INCREMENT;

ALTER TABLE Message ADD CONSTRAINT message_group_FK FOREIGN KEY (groupID) REFERENCES ProjectGroup(groupID);
ALTER TABLE Message ADD CONSTRAINT message_to_content_FK FOREIGN KEY (contentID) REFERENCES MessageContent(contentID);




CREATE TABLE Conversation (
    conversationID INT ,
    receiverID INT NOT NULL,       
    receiverRole ENUM('student', 'supervisor','admin') NOT NULL
);
ALTER TABLE Conversation ADD CONSTRAINT conversation_PK PRIMARY KEY(conversationID,receiverID);
ALTER TABLE Conversation ADD CONSTRAINT conversation_message_FK FOREIGN KEY(conversationID) REFERENCES Message(messageID);


CREATE TABLE Notification (
    notificationID INT,
    conversationID INT NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE Notification ADD CONSTRAINT PRIMARY KEY(notificationID);
ALTER TABLE Notification MODIFY COLUMN notificationID INT AUTO_INCREMENT;
ALTER TABLE Notification ADD CONSTRAINT notification_converstaion_FK FOREIGN KEY(conversationID) REFERENCES Conversation(conversationID);

-- NOTIFICATION CENTER SCHEMA ENDED 


CREATE table tasks(
 taskID INT not null,
 projectID INT not null,
 fypStudentID INT not null,
 taskName varchar(30) default "no title",
 taskDescription TEXT ,
 taskDeadline TIMESTAMP default null ,
 taskStatus boolean default null,
 assignedDate TIMESTAMP default current_timestamp
);



ALTER TABLE Tasks ADD CONSTRAINT tasks_PK PRIMARY KEY(taskID);
ALTER TABLE Tasks MODIFY COLUMN taskID INT AUTO_INCREMENT;

ALTER TABLE Tasks ADD CONSTRAINT tasks_project_FK FOREIGN KEY(projectID) REFERENCES Project(projectID);
ALTER TABLE Tasks ADD CONSTRAINT tasks_fypstudent_FK FOREIGN KEY(fypStudentID) REFERENCES fypStudent(fypStudentID);

Alter table tasks drop column taskStatus;
alter table tasks add column taskStatus boolean default 0;
-- Triggers

-- Trigger For Handling Registeration Check and Data feeding into fypstudent or supervisor
DELIMITER //

CREATE  TRIGGER before_registration_insert
BEFORE INSERT ON Registration
FOR EACH ROW
BEGIN
    -- Check if the role is 'student'
    IF NEW.userRole = 'student' THEN
        IF EXISTS (SELECT 1 FROM fypstudent WHERE fypStudentID = NEW.fypStudentID) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Student already registered in FYPStudent table';
        ELSE
            INSERT INTO fypstudent (fypstudentID,  groupID , midEvaluation , finalEvaluation)
            VALUES (NEW.fypStudentID,NULL,NULL,NULL);
        END IF;

    ELSEIF NEW.userRole = 'teacher' THEN
        IF EXISTS (SELECT 1 FROM supervisor WHERE supervisorID = NEW.supervisorID) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Teacher already registered as Supervisor';
        ELSE
            INSERT INTO supervisor (supervisorID, cgpaCriteria, specializedDomain)
            VALUES (NEW.supervisorID, NULL,NULL); 
        END IF;
    END IF;
END;
//

DELIMITER ;


-- PROCEDURES 
DELIMITER $$

CREATE PROCEDURE CheckAndCreateGroup(
    IN email1 VARCHAR(255),
    IN email2 VARCHAR(255),
    IN email3 VARCHAR(255),
    IN groupName VARCHAR(255),
    OUT groupCreated BOOLEAN
)
BEGIN
    DECLARE allNull BOOLEAN;
	DECLARE leaderFypStudentID INT;
    -- Check if all three students have groupID IS NULL
    SELECT COUNT(*) = 3 INTO allNull
    FROM students s
    JOIN fypStudent f ON s.studentID = f.fypStudentID
    WHERE s.email IN (email1, email2, email3) AND f.groupID IS NULL;

    -- If all three have groupID = NULL, create a new group
    IF allNull THEN
        -- Fetch the fypStudentID of the student corresponding to the first email
        SELECT f.fypStudentID INTO leaderFypStudentID
        FROM students s
        JOIN fypStudent f ON s.studentID = f.fypStudentID
        WHERE s.email = email1;

        -- Insert new group with leaderID as the first email's student ID
        INSERT INTO projectGroup (leaderID)
        VALUES (leaderFypStudentID);

        -- Update the groupID for all three students
        UPDATE fypStudent
        SET groupID = LAST_INSERT_ID()
        WHERE fypStudentID IN (
            SELECT studentID
            FROM students
            WHERE email IN (email1, email2, email3)
        );
        
        UPDATE projectGroup
        SET groupName=groupName
        Where groupID=LAST_INSERT_ID();
        
        Update fypStudent
        set isLeader = 1
        where fypStudentID IN( select studentID from students where email=email1 );

        -- Indicate group was created
        SET groupCreated = TRUE;
    ELSE
        -- Indicate group was not created
        SET groupCreated = FALSE;
    END IF;
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS CheckAndCreateGroup;



-- All drop queries 
drop table notification;
drop table message;
drop table messageContent;
drop table registration;
drop table project;
drop table projectgroup;
drop table fypstudent;
drop table supervisor;
drop table teachers;
drop table students;
drop table tasks;
drop table proposal;
drop table supervisorRatings;
drop view supervisorList;



-- Remaining Stuff 
show triggers like "registration";
drop trigger if exists before_registration_insert;


INSERT INTO projectGroup (leaderID)
SELECT f.fypStudentID
FROM fypStudent f
JOIN students s ON f.fypStudentID = s.studentID
WHERE s.studentRoll = '22k-4317';

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE projectGroup;
SET FOREIGN_KEY_CHECKS = 1;


UPDATE projectGroup
SET projectID = 1
where groupID=19;

SHOW PROCEDURE STATUS WHERE Db = 'fyp';


select * from students where studentID IN (select fypStudentID from fypStudent where groupID IN(select groupID from fypStudent where fypStudentID=10));

select g.groupID , projectName , status , startDate , studentRoll from projectGroup G
left JOIN project p 
ON p.projectID=g.projectID
JOIN fypStudent f
ON f.groupID=g.groupID
JOIN Students s 
ON s.studentID = f.fypStudentID
AND g.supervisorID=5;


insert into project (description,projectName,status) values("Hello this is my database project","fyp","Not Started");


select * from project where projectID = (select projectID from projectGroup where groupID=(select groupID from fypStudent where fypStudentID=7));

select f.groupID, p.* from fypStudent f join projectGroup pg on f.groupID = pg.groupID join project p on pg.projectID=p.projectID where f.fypStudentID=7;


insert into project (description , projectName , startDate , status ) values("A place where you manage your fyp","fyp management","2024-12-01","Not Started");
update supervisor
set No_Of_Projects=1
where supervisorID=15 ;
-- if a project is made  certian updates has to be made 1)update supervisorID and projectID in projectGroup 2)update proposalStatus in prposal 3)increment no_of_projects in supervisor table 

select groupID from fypStudent where fypStudentID=17;

select f.groupID 
from students s
join fypStudent f
on s.studentID=f.fypStudentID
where s.email='k224111@nu.edu.pk';

select studentID
from students 
where email="k224317@nu.edu.pk";

select p.projectID
from fypStudent f
join projectGroup p
on f.groupID=p.groupID
where f.fypStudentID=21;

select * from tasks where fypStudentID=19;

update tasks 
set taskStatus=0
where fypStudentID=17 and taskName="make admin backend";

select * from supervisorlist;
drop view supervisorlist;
CREATE OR REPLACE VIEW SupervisorList AS
        SELECT 
          s.supervisorID,
          t.firstName OR ' ' OR t.lastName as supervisorName,
          t.departmentName as departmentName,
          s.specializedDomain,
          pg.groupsCount as groupsCount,
          s.cgpaCriteria
        FROM 
          supervisor s
        JOIN 
          teachers t 
        ON t.teacherID = s.supervisorID
        LEFT JOIN 
          (SELECT COUNT(groupID) as groupsCount,supervisorID from projectGroup GROUP BY supervisorID) pg
        ON pg.supervisorID = s.supervisorID
        LEFT JOIN 
          (SELECT supervisorID,AVG(ratings) as ratings FROM supervisorRatings
          GROUP BY supervisorID) r
        ON r.supervisorID = s.supervisorID;
        
        
        
-- On updating proposalStatus to 1 we have to ensure that 4 tables has to be updated 1-Supervisor(no of projects attribute incremented) 2-project(insert proposal data into project) 3-projectGroup(set projectId and supervisorID) 4-proposal status(1)

DELIMITER $$

CREATE TRIGGER before_update_proposalStatus
BEFORE UPDATE ON Proposal
FOR EACH ROW
BEGIN
      DECLARE currentProjects INT;
      DECLARE recentProjectID INT;
    -- Check if the proposalStatus is being updated to 1
    IF NEW.proposalStatus = 1 AND OLD.proposalStatus != 1 THEN
    
    
        SELECT No_Of_Projects INTO currentProjects
        FROM Supervisor
        WHERE supervisorID = NEW.supervisorID;

        -- Step 3: Throw an exception if the supervisor already has 7 or more projects
        IF currentProjects >= 7 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Supervisor cannot supervise more than 7 projects';
        END IF;
    
        -- Step 1: Increment the supervisor's number of projects
        UPDATE Supervisor
        SET No_Of_Projects = No_Of_Projects + 1
        WHERE supervisorID = NEW.supervisorID;

        -- Step 2: Insert proposal data into the Project table
        INSERT INTO Project (description, projectName, startDate, status , createdAt)
        VALUES ( NEW.projectDescription, NEW.projectName, NOW(),'In progress',NOW());
        
         SET recentProjectID = LAST_INSERT_ID();

        -- Step 3: Update the ProjectGroup table with projectId and supervisorId
        UPDATE ProjectGroup
        SET projectID = recentProjectID, supervisorID = NEW.supervisorID
        WHERE groupID = NEW.groupID;

        -- Step 4: Ensure the Proposal table's status is set to 1 (already being done by the API call)
        -- This step may not be necessary since the API updates the status
    END IF;
END$$

DELIMITER ;

DROP TRIGGER IF EXISTS before_update_proposalStatus;


update projectGroup
set projectID=null,supervisorID=null
where groupID=11;
delete from project where projectID=2;
select f.groupID, p.* , pg.*, t.firstName || ' ' ||t.lastName AS fullName , t.email from fypStudent f join projectGroup pg on f.groupID = pg.groupID join project p on pg.projectID=p.projectID join supervisor s on s.supervisorID =pg.supervisorID join teachers t on s.supervisorID=t.teacherID  where f.fypStudentID=?;
