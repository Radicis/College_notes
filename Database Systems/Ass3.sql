Assignment 3
Adam Lloyd - R00117318
06/11/2014 - IT 2.1

/* 1. Find the details of the branch that has staff members who look after flats  */

		SELECT branchNo, street, city, postcode
		FROM Branch
		WHERE branchNo in (SELECT branchNo
							FROM Staff
							WHERE staffNo in (SELECT staffNo
												FROM PropertyForRent
												WHERE type = 'Flat'));
										

/* 2. Find the property that has been viewed by clients that has no member of staff assigned to manage it. Sort results  */

		SELECT propertyNo, street, city, postcode, type, rooms, rent
		FROM PropertyForRent
		WHERE staffNo IS NULL
		AND propertyNo in (SELECT propertyNo 
							FROM Viewing)
		ORDER BY propertyNo;	
				

/* 3. What staff members look after property viewed in May and the branch managing the property is located on a street with the name 'Argyll' */

		SELECT staffNo, fName, lName
		FROM Staff
		WHERE staffNo in (SELECT staffNo		
							FROM PropertyForRent
							WHERE street LIKE '%Argyll%'
							AND propertyNo in (SELECT propertyNo
												FROM Viewing
												WHERE viewDate BETWEEN '01-May-2001' AND '31-May-2001'));
		


/* 4. What owner has property managed by branches in London   */

		SELECT ownerNo, fName, lName
		FROM PrivateOwner
		WHERE ownerNo in (SELECT ownerNo
							FROM PropertyForRent
							WHERE branchNo in (SELECT branchNo
												FROM Branch
												WHERE city = 'London'));
												