Assignment 3
Adam Lloyd - R00117318
13/11/2014 - IT 2.1

/* 1. Find how many houses with a rent greater than 300 are available to rent in each city */


SELECT COUNT(*) as House_Count, city
FROM PropertyForRent
WHERE type = 'House'
AND rent > 300
Group by City;


/* 2. Find how many properties are assigned to each branch */

SELECT COUNT(*) as Properties, branchNo
FROM PropertyForRent
GROUP BY branchNo;

/* 1. Find the owner of properties in Glasgow that are houses */

SELECT o.ownerNo, fName, lName
FROM PrivateOwner o, PropertyForRent p
WHERE p.city = 'Glasgow'
AND p.type = 'House'
AND p.ownerno = o.ownerno;

/* 2. Find the client who viewed a property in Aberdeen */

SELECT c.clientNo, fName, lName
FROM Client c, PRopertyForRent p, viewing v
WHERE p.propertyNo = v.propertyNo
AND c.clientno = v.clientno
AND p.city = 'Aberdeen';


/* 1. For each branch find the branch that has more than 1 assistance working there */

SELECT COUNT(*) as Assistants, branchNo
FROM Staff
WHERE position = 'Assistant'
Group by branchNo
Having COUNT(*) > 1
