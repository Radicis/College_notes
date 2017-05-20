/**

Individual Project 1
Programming & Problem Solving 2 Module
Lottery Program

@author Adam Lloyd R00117318
@date 27/04/2014

Course: DWEB1

 */

package Lottery;

import java.io.*;
import java.util.Random;
import java.util.Scanner;
import java.util.Arrays;
import java.text.DecimalFormat;

public class lottery {

	public static Scanner input = new Scanner(System.in);	

	//Set up login file
	public static File loginFile = new File("login.txt");

	//Set up customer details  file
	public static File customerFile = new File("customers.txt");
	
	//Set up file that holds current funds
	public static File fundsFile = new File("funds.txt");
	public static double totalFunds;

	public static String loggedUser;

	//Arrays to hold login details
	public static String[] userNames = new String[10];
	public static String[] passwords = new String[10];

	//Arrays to hold customer details
	public static String[] customerFirstNames = new String[10];
	public static String[] customerSurnames = new String[10];
	public static String[] customerTelephoneNumbers = new String[10];
	public static String[] customerLotteryNumbers = new String[10];
	public static int[] ticketNumbers = new int[10];

	public static int customerCounter = 0;

	public static Random randomGenerator = new Random();

	public static double totalWinnings;

	//Formatter to display currency values in correct format
	public static DecimalFormat formatter = new DecimalFormat("€0.00");

	public static void main(String[] args) throws IOException {

		//load login data from login.txt into arrays
		loadArrays();

		boolean validLogin = false;

		int menuOption = 1;
		String menu = "\nChoose an option from the list below:\n\n\t1. Sell Ticket\n\t2. Sell Quick Pick\n\t3. Initiate Draw\n\t4. View Previous Draw\n\t5. Change Password\n\t0. Exit\n\nSelection: ";

		System.out.println("## Lottery Program ##\n");

		//validate login details
		while(!validLogin){
			validLogin = validateLogin();
		}

		//Inform user they are successfully logged in
		System.out.println("\n\nWelcome " + loggedUser + " you have successfully logged in.");

		//Loop until user enters 0 as option in the menu screen
		while(menuOption!=0){

			System.out.print(menu);

			//request a valid integer input in the range of 0-5 from the method before continuing.
			menuOption = validateInt(5);

			switch(menuOption){
			case 1: System.out.println("\n## Sell Ticket Selected ##\n");sellTicket(1);break;
			case 2: System.out.println("\n## Sell Quickpick Selected ##\n");sellTicket(2); break;
			case 3: System.out.println("\n## Initiate Draw Selected ##\n");initDraw();break;
			case 4: System.out.println("\n## View Previous Draws Selected ##\n");viewPrevious(); break;
			case 5: System.out.println("\n## Change Password Selected## \n");changePassword(); break;
			case 0: System.out.println("\n## Saving Data and exiting System ##\n");saveExit();break;
			default: System.out.println("## Invalid Selection! ##\n"); break;
			}
		}

		input.close();
	}

	/**
	 * Method to load the data contained in the text files into arrays
	 * @throws IOException 
	 */
	public static void loadArrays() throws IOException{

		if(!customerFile.exists()){
			//Create customer.txt file if it does not exist
			FileWriter customerFile = new FileWriter("customers.txt");
		}
		
		if(!fundsFile.exists()){
			//Create funds.txt file if it does not exist and set value to 5000		
			PrintWriter createFunds = new PrintWriter("funds.txt");
			createFunds.println("5000");
			createFunds.println("500");
			createFunds.close();
		}
		else{
			//If the file exists then read in the totalfunds and the total winnings variables from file
			Scanner fundsScan = new Scanner(fundsFile);
			totalFunds=Double.parseDouble(fundsScan.nextLine());
			totalWinnings=Double.parseDouble(fundsScan.nextLine());
		}

		/**Create login.txt file and set up administrator default password if it does not exist  */
		if(!loginFile.exists()){
			//Create login.txt file if it does not exist
			System.out.println("Warning - No Login File exists - Please set up system");
			String tempPassword;
			do{
				System.out.print("Please enter the default password for the system provided in the documentation: ");
				/** Default Password -> Adam 
				 */
				tempPassword = input.nextLine();
			}while(!tempPassword.equals("Adam"));
			System.out.println("\nYou are logged in as Administrator. Please set up a username and password using the login.txt file\n\n");

			//open printwriter writer
			PrintWriter createLogin = new PrintWriter("login.txt");

			//Write admin password to created file			
			createLogin.print("Administrator" + " ");
			createLogin.println("Adam");
			createLogin.close();
		}

		Scanner fileScanLogin = new Scanner(loginFile);
		Scanner fileScanCustomer = new Scanner(customerFile);

		int i = 0;

		// Add usernames and passwords and loop until no more data in file
		while(fileScanLogin.hasNext()){
			userNames[i] = fileScanLogin.next();
			passwords[i] = fileScanLogin.next();
			i++;
		}

		//Load customer details into arrays
		i = 0;

		while(fileScanCustomer.hasNext()){
			ticketNumbers[i] = i;
			fileScanCustomer.next(); //consume ticketnumber part of entry as it is simpler to enter as counter int.
			customerFirstNames[i] = fileScanCustomer.next();
			customerSurnames[i] = fileScanCustomer.next();
			customerTelephoneNumbers[i] = fileScanCustomer.next();
			i++;
		}

		//Set the customer counter variable to be equal to the amount of customers already in the file by checking for null entries in the 10 item array
		while(fileScanCustomer.hasNext()){
			//customerCounter++;
			if(fileScanCustomer.next().equals(null)){
				break;
			}			
		}

		customerCounter = i;

		fileScanLogin.close();
		fileScanCustomer.close();

	}

	/** Method to validate user login */
	public static boolean validateLogin(){

		//if the login text file exists then run the code
		if(loginFile.exists()){			

			String username;
			String password;			

			System.out.println("Please enter a valid username and password");
			//Prompt for Username
			System.out.print("\nUsername: ");
			username = input.nextLine();
			//Prompt for Password
			System.out.print("Password: ");
			password = input.nextLine();		

			//Loop through username and password arrays and check if the entered data matches. return true if it does.
			for(int i=0;i<userNames.length;i++){				
				if((username.equals(userNames[i])) && (password.equals(passwords[i]))){				
					//Set the logged in user name variable for later use
					loggedUser = username;					
					return true;				
				}
			}			
		}
		//Output an error if the login file is not found
		else System.out.println("ERROR:LOGIN FILE NOT FOUND!");

		return false;		
	}


	/**
	 * Method for users to change their password
	 * @throws FileNotFoundException
	 */	
	public static void changePassword() throws FileNotFoundException{

		//consume new line char
		input.nextLine();		

		int userNum = 0;

		String password="";

		//Search the username list for an entry matching the logged in user
		for(int i=0;i<userNames.length;i++){
			if(loggedUser.equals(userNames[i])){
				userNum=i;
			}
		}		

		//Ask the user for their current password
		while(!password.equals(passwords[userNum])){
			System.out.print("Please enter your current password: ");
			password = input.nextLine();
		}

		//open file writer
		PrintWriter fileWrite = new PrintWriter(loginFile);

		//Prompt for and read in new password
		System.out.print("Please enter your new password: ");
		passwords[userNum] = input.nextLine();

		//Write array data to file
		for (int i=0;i<userNames.length;i++) {			
			fileWrite.print(userNames[i] + " ");
			fileWrite.println(passwords[i]);

		}		
		//close file writer
		fileWrite.close();		
		System.out.println("\n## Your password has been changed " + loggedUser + " ##");		
		return;				
	}

	/** Method for selling tickets */	
	public static void sellTicket(int choice){

		String firstName;
		String surname;
		String telephone;
		int[] numbers = new int[4];
		String pickedNumbers = "";

		input.nextLine();

		//prompt for first name
		System.out.print("Please enter the customers First Name: ");
		firstName = input.nextLine();

		//prompt for surname
		System.out.print("Please enter the customers Surname: ");
		surname = input.nextLine();

		//Prompt for tel
		System.out.print("Please enter the customers Telephone Number: ");
		telephone = input.nextLine();

		if(choice==1){
			//sell regular
			//Prompt for numbers
			for(int i=0;i<4;i++){						
				System.out.print("Please enter number " + (i+1) + ": ");
				//pass to validate function to check for valid integer value
				numbers[i] = validateInt(28);
			}
		}
		if(choice==2){			
			//sell quickpick
			//Generate random numbers
			for(int i=0;i<4;i++){
				numbers[i] = randomGenerator.nextInt(28)+1;								
			}
			//Display chosen numbers to user
			System.out.println("\n\nYour randomly generated numbers are: " + numbers[0] + ", " + numbers[1] + ", " + numbers[2] + ", " + numbers[3] + "\n\nThis customer has been entered into the draw! - Good Luck!");
		}		

		//Sort numbers by value		
		Arrays.sort(numbers);


		//Merge integers into one string for later comparison
		for(int i=0;i<4;i++){
			pickedNumbers += numbers[i];
		}
		//Add customer details to array
		customerFirstNames[customerCounter] = firstName;
		customerSurnames[customerCounter] = surname;
		customerTelephoneNumbers[customerCounter] = telephone;
		customerLotteryNumbers[customerCounter] = pickedNumbers;	

		//Generate ticket number
		ticketNumbers[customerCounter] = customerCounter;

		//Add 1.50 to totalWinnings pool
		totalWinnings += 1.50;		

		//Increment Customer counter
		customerCounter++;

		return;

	}

	/** Method inititate the draw 
	 * @throws FileNotFoundException */	
	public static void initDraw() throws FileNotFoundException{

		int[] numbers = new int[4];
		String winningNumbers = "";	
		int[] winners = new int[10];
		int winnerCount = 0;
		String fileName;
		boolean validFileName = false;
		File historyFile;

		//create array or arrays to contain users numbers

		//Generate random numbers		
		for(int i=0;i<4;i++){
			numbers[i] = randomGenerator.nextInt(28)+1;
		}

		/** generate static numbers for testing the program
		numbers[0] = 1;
		numbers[1] = 2;
		numbers[2] = 3;
		numbers[3] = 4;
		 */

		//Sort numbers by value		
		Arrays.sort(numbers);

		System.out.println("\n\nYour winning numbers are: " + numbers[0] + ", " + numbers[1] + ", " + numbers[2] + ", " + numbers[3]);


		//Merge integers into one string for later comparison
		for(int i=0;i<4;i++){
			winningNumbers += numbers[i];
		}		

		//Search numbers array for winners
		for(int i=0;i<=customerCounter;i++){
			if(winningNumbers.equals(customerLotteryNumbers[i])){				
				//Record winning customer index and increment counter
				System.out.println(winningNumbers);
				System.out.println(customerLotteryNumbers[i]);
				winners[winnerCount] = i;
				winnerCount++;
			}
		}

		input.nextLine();

		do{
			//Ask user for filename
			System.out.print("Please enter a filename to save this draw: ");
			fileName = input.nextLine();

			historyFile = new File(fileName);

			//Check if file exists
			if(historyFile.exists()){
				System.out.print("\nERROR - Invalid filename - filename already exists!\n");
			}
			else{
				validFileName = true;				
			}
		}while(!validFileName);

		System.out.println("History file saved as: " + fileName);

		//Write winning customer indexes into history file for this draw
		PrintWriter fileWrite = new PrintWriter(historyFile);

		fileWrite.println("Employee ID: " + loggedUser);
		fileWrite.println("Winning numbers: " + numbers[0] + ", " + numbers[1] + ", " + numbers[2] + ", " + numbers[3]);
		fileWrite.println("Winning customers: ");

		if(winnerCount!=0){
			for(int i=0;i<=winnerCount;i++){
				fileWrite.println(ticketNumbers[winners[i]] + "   " +
						customerFirstNames[winners[i]] + " " + customerSurnames[winners[i]] + "   " +
						customerTelephoneNumbers[winners[i]] + " " +
						formatter.format((totalWinnings/winnerCount)));
			}
			//Subtract the winnings from this week from the total funds in the file and rewrite the new values to the file
			totalFunds = totalFunds-totalWinnings;
			PrintWriter createFunds = new PrintWriter("funds.txt");
			createFunds.println(totalFunds);
			createFunds.println(totalWinnings);
			createFunds.close();			
		}
		else{
			System.out.println("No winners today!");
			fileWrite.println("\n\n!! No winners today! !!");
			//Add 150 to the winnings for the next week and write the new values to the file
			totalWinnings+=150;			
			PrintWriter createFunds = new PrintWriter("funds.txt");
			createFunds.println(totalFunds);
			createFunds.println(totalWinnings);
			createFunds.close();
		}

		fileWrite.close();		

		//Empty Arrays for next draw		
		Arrays.fill(customerFirstNames, null);
		Arrays.fill(customerSurnames, null);
		Arrays.fill(customerTelephoneNumbers, null);	

		return;

	}

	/** Method for viewing previous history files 
	 * @throws FileNotFoundException */	
	public static void viewPrevious() throws FileNotFoundException{

		String fileName;
		boolean validFileName = false;

		//Prompts for filename and Checks for file		
		do{
			input.nextLine();
			//Ask user for filename
			System.out.print("\nPlease enter a filename to view: ");
			fileName = input.nextLine();

			File historyFile = new File(fileName);

			//Check if file exists
			if(!historyFile.exists()){
				System.out.print("\nERROR - File not found!");
			}
			else{
				Scanner fileScan = new Scanner(historyFile);
				//Print out data form file to screen
				System.out.println("\n\nDisplaying data from history file: " + historyFile + "\n");
				while(fileScan.hasNext()){
					System.out.println(fileScan.nextLine());					
				}	
				fileScan.close();
				validFileName = true;				
			}
		}while(!validFileName);		

		return;
	}

	/** Method to save array to files and exit system 
	 * @throws IOException */	
	public static void saveExit() throws IOException{

		//open customer.txt and wipe it to save current data
		FileWriter customerFile = new FileWriter("customers.txt");		 

		//Filewrite customer details arrays into file
		PrintWriter fileWrite = new PrintWriter(customerFile);

		for(int i=0;i<ticketNumbers.length;i++){
			//Check if there is an entry at this index by comparing the customer name to null 
			if(customerFirstNames[i]!=null){
				fileWrite.println(ticketNumbers[i] + "  " +			
						customerFirstNames[i] + " " + customerSurnames[i] + "  " +
						customerTelephoneNumbers[i]);
			}
		}

		System.out.println("Data successfully written to Customers.txt!\n\nGood Bye " + loggedUser + ".");

		fileWrite.close();

		return;
	}


	/**Method to check for a valid integer input within a range */
	public static int validateInt(int range){
		int option = 0;
		do{
			//while the input stream does not have a next Int
			while(!input.hasNextInt()) {
				System.out.println("\n####  Invalid input!  ####");
				System.out.print("Please enter a valid selection: ");
				input.nextLine(); 			            
			}			
			option = input.nextInt();
			if((option<-1) || (option>range)){
				System.out.println("\n####  Invalid input!  ####");
				System.out.print("Please enter a valid selection: ");
			}			
		}while((option<-1) || (option>range));		
		return option;		
	}

}
