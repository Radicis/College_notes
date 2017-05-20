Assignment 1
Adam Lloyd - R00117318
23/10/2014 - IT 2.1


/* 1. Find all staff that were born between 1965 and 1970 */

	SELECT staffNo, fName, lName, position
	FROM Staff
	WHERE DOB BETWEEN '01-jan-1965' AND '31-dec-1970';



/* 2. What client provided no comment when they viewed a property */

	SELECT clientNo, propertyNo, viewDate
	FROM Viewing
	WHERE comment IS NULL;


		/* To show client details not sure if needed  */

			SELECT clientNo, fName, lName
			FROM Client
			WHERE clientNo in (SELECT clientNo 
								FROM viewing
								WHERE comment IS NULL);


/* 3. Find all staff members whose first name begins with 'J' and are Assistants */

	SELECT staffNo, fName, lName, position
	FROM Staff
	WHERE fName LIKE 'J%' AND position = 'Assistant';



/* 4. For each city find those cities that have more than 2 properties for rent */

	SELECT COUNT(*) as RentalCount, city
	FROM PropertyForRent
	GROUP BY city
	HAVING COUNT(*) >2;


/* 5. For each branch find the branch that has more than 1 assistant working there. */

	SELECT COUNT(branchNo) as AssistantCount, branchNo
	FROM Staff
	GROUP BY branchNo
	HAVING COUNT(*)>1
	ORDER BY AssistantCount;


