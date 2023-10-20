USE master;
DROP DATABASE WorkShifts;
GO

CREATE DATABASE WorkShifts;
GO
USE WorkShifts;
GO
CREATE SCHEMA workShifts;
GO

CREATE TABLE workShifts.Cities
(
Id  int NOT NULL IDENTITY(1,1) PRIMARY KEY,
[Name] nvarchar (20) NOT NULL
);

CREATE TABLE workShifts.WorkShops
(
Id  int NOT NULL IDENTITY(1,1) PRIMARY KEY,
[Name] nvarchar (20) NOT NULL,
CityId int NOT NULL FOREIGN KEY REFERENCES workShifts.Cities (Id)
);

CREATE TABLE workShifts.Teams
(
Id  int NOT NULL IDENTITY(1,1) PRIMARY KEY,
Team varchar (10) NOT NULL
);

CREATE TABLE workShifts.Employees
(
Id  int NOT NULL IDENTITY (1,1) PRIMARY KEY,
Surname nvarchar (20) NOT NULL,
[Name] nvarchar(20) NOT NULL,
WorkShopId int NOT NULL FOREIGN KEY REFERENCES workShifts.WorkShops (Id),
TeamId int NOT NULL FOREIGN KEY REFERENCES workShifts.Teams (Id),
);

