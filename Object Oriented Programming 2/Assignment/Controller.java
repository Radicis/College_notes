package patient_records;


import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;


public class Controller {


	//List of all patients
	private ArrayList<Patient> patientList;
	//List of all available procedures
	private ArrayList<Procedure> procedureList;


	public Controller(){
		this.patientList = new ArrayList<Patient>();
		this.procedureList = new ArrayList<Procedure>();
	}

	public ArrayList<Patient> getPatientList(){
		return this.patientList;
	}

	public ArrayList<Procedure> getProcedureList(){
		return this.procedureList;
	}

	public void setTotal(Patient patient, Procedure procedure, JLabel patientTotal){
		if(procedure != null){
			patient.addProcedure(procedure);
		}
		double total = 0.00;
		for(Procedure proc: patient.getProcs()){
			total += proc.getCost();		        			
		}		        		
		//error passing gui
		patientTotal.setText("" + total);
	}


	public String doReport(){

		String report = "All Payments\n\n";

		for(Patient patient: patientList){
			List<Payment> payments = patient.getPayments();
			report += "Patient Name: " + patient.getName() + "\n";
			for(Payment payment: payments){
				report += payment + "\n";
			}
			report += "\n";
		}

		return report;
	}

	public String doOwedReport(){

		String report = "All Payments\n\n";

		for(Patient patient: patientList){
			List<Payment> payments = patient.getPayments();
			report += patient.getName() + "\n";
			for(Payment payment: payments){
				if(!payment.paid()){
					report += payment + "\n";
				}
			}
		}

		return report;
	}

	public void loadData() throws IOException{


		String dbURL = "jdbc:derby:patientDB";
		String tableName = "PATIENTS";
		
		// jdbc Connection
		Connection connection = null; // manages connection
		Statement statement = null; // query statement
		ResultSet resultSet = null; // manages results

		try
		{
			//Get a connection
			connection = DriverManager.getConnection(dbURL, "root", "root" );

			//create Statement for querying database
			//statement = connection.createStatement();

			//query database
			//resultSet = statement.executeQuery("SELECT * FROM patients" );

			//process query results
			//ResultSetMetaData metaData = resultSet.getMetaData();
			//int numberOfColumns = metaData.getColumnCount();
			
		}
		catch (Exception except)
		{
			except.printStackTrace();
		}

		//Unmarshall xml file into patient list
		try{	
			JAXBContext jaxbContext = JAXBContext.newInstance(Patients.class);
			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();		     

			Patients Plist = new Patients();

			try{
				Plist = (Patients) jaxbUnmarshaller.unmarshal( new File("patients.xml") );
				//Check if the array is empty
				if(Plist.getPatients() != null){
					for(Patient patient: Plist.getPatients()){
						this.patientList.add(patient);			    	
					}
				}
			}catch(JAXBException e){
				System.out.println("No Patient file found, creating blank");
			}	
		}catch(JAXBException e){

		}
		try{	
			JAXBContext jaxbContext = JAXBContext.newInstance(Procedures.class);
			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

			Procedures Proclist = new Procedures();

			try{
				Proclist = (Procedures) jaxbUnmarshaller.unmarshal( new File("procedures.xml") );
				//Check if the array is empty
				if(Proclist.getProcedures() != null){
					for(Procedure proc: Proclist.getProcedures()){
						this.procedureList.add(proc);
					}
				}
			}catch(JAXBException e){
				System.out.println("No Prodecures file found, creating blank");
			}
		}catch(JAXBException e){

		}


	}		 


	public void saveQuit() throws IOException{

		//Marshall patient list into XML
		try {			  
			Patients Plist = new Patients();
			Plist.setPatient(patientList);
			JAXBContext jaxbContext = JAXBContext.newInstance(Patients.class);
			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);		 
			jaxbMarshaller.marshal(Plist, new File("patients.xml"));						 
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		try {			  
			Procedures Proclist = new Procedures();
			Proclist.setProcedures(procedureList);
			JAXBContext jaxbContext = JAXBContext.newInstance(Procedures.class);
			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);		 
			jaxbMarshaller.marshal(Proclist, new File("procedures.xml"));						 
		} catch (JAXBException e) {
			e.printStackTrace();
		}


		JOptionPane.showMessageDialog(null, "Data successfully written to Disk!\n\nGood Bye!");
		System.exit(0);

	}
}





