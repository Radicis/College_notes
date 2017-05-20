Assignment 2
Adam Lloyd - R00117318
30/10/2014 - IT 2.1

/* 1. Properties that have been viewed by clients that have staff members assigned to manage the property */

	SELECT p.propertyNo, street, city, type, p.staffNo, p.ownerNo, v.viewDate
	FROM propertyForRent p, viewing v
	WHERE p.staffNo IS NOT NULL
	AND p.propertyNo = v.propertyNo;
	


/* 2. Find all the details of the branch that has staff members who look after houses. */

	SELECT b.branchNo, b.street, b.city, b.postcode
	FROM branch b, staff s, propertyForRent p
	WHERE type = 'House'
	AND p.staffNo = s.staffNo
	AND s.branchNo = b.branchNo;
	


/* 3. Find the property that has been viewed by clients that has no staff member assigned to it. */

	SELECT DISTINCT p.propertyNo, street, city, postcode, type, rooms, rent
	FROM client c, propertyForRent p, viewing v
	WHERE p.staffNo IS NULL
	AND c.clientNo = v.clientNo
	AND p.propertyNo = v.propertyNo;
	
	

/* 4. What client looked at property owner by Carol Farrel. */

	SELECT c.clientNo, c.fName, c.lName
	FROM client c, propertyForRent p, PrivateOwner po, viewing v
	WHERE (po.fName = 'Carol' AND po.lName = 'Farrel')
	AND po.ownerNo = p.ownerNo
	AND p.propertyNo = v.propertyNo
	AND v.clientNo = c.clientNo;