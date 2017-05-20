package patient_records;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "patient")
public class Patient {
	
	private static int counter;	
	
	private int patientID;
	private String patientName;
	private String patientAdd;
	private String patientPhone;
	
	//collection of procedures
	@XmlElementWrapper(nillable=true)
	private ArrayList<Procedure> p_procList;
	//collection of payments
	@XmlElementWrapper(nillable=true)
	private ArrayList<Payment> p_paymentList;
	
	
	public Patient(){
		
	}
	
	public Patient(String patientName, String patientAdd, String patientPhone){
		this.patientID = ++counter;
		this.patientName = patientName;		
		this.patientAdd = patientAdd;
		this.patientPhone = patientPhone;
		this.p_procList = new ArrayList<Procedure>();
		this.p_paymentList = new ArrayList<Payment>();
	}
	
	public ArrayList<Procedure> getProcedures(){
		return this.p_procList;		
	}
	
	//Procedure collection interaction
	public boolean addProcedure(Procedure procedure){
		p_procList.add(procedure);
		return true;		
	}
	
	public boolean removeProcedure(Procedure procedure){
		return p_procList.remove(procedure);	
	}
	
    public ArrayList<Procedure> getProcs() {
        return p_procList;
    }
    
    public void setProcedures(ArrayList<Procedure> procs) {
        this.p_procList = procs;
    }
	
	//Payment collection interaction
	public boolean addPayment(Payment payment){
	
		p_paymentList.add(payment);
		return true;		
	}
	public boolean removePayment(Payment payment){

		p_paymentList.remove(payment);
		return true;		
	}
	
    public void setPayments(ArrayList<Payment> payments) {
        this.p_paymentList = payments;
    }
	
    public List<Payment> getPayments() {
        return p_paymentList;
    }
	
	//Helper methods	
	public int getID(){
		return this.patientID;
	}
	public void setID(int patientID){
		this.patientID = patientID;
	}
	
	public String getName(){
		return this.patientName;
	}
	public void setName(String patientName){
		this.patientName = patientName;
	}
	
	public String getAddress(){
		return this.patientAdd;
	}
	public void setAddress(String patientAdd){
		this.patientAdd = patientAdd;
	}
	
	public String getPhone(){
		return this.patientPhone;
	}
	public void setPhone(String patientPhone){
		this.patientPhone = patientPhone;
	}
	
	//Output - Display Methods
	
		
	public String displayProcedures(){
		
		String myProcs = "\nMy Procedures";
		
		for(int i=0;i<p_procList.size();i++){
			myProcs += "\n" + p_procList.get(i).toString();
		}
		
		return myProcs;
		
	}
	
	public String displayPayments(){
		String myPays = "\nMy Payments";
		
		for(int i=0;i<p_paymentList.size();i++){
			myPays += "\n" + p_paymentList.get(i).toString();
		}
		
		return myPays;
		
	}
	
	public String toString(){
		String aboutMe = this.patientID + " | " + this.getName() + " | " + this.getAddress() + " | " + this.getPhone();
		return aboutMe;
	}
	
	public String toStringSave(){
		String aboutMe = this.getName() + "\n" + this.getAddress() + "\n" + this.getPhone() + "\n";
		/*
		for(Procedure procedure: this.getProcedures()){
			aboutMe += procedure.getID() + "\n";
		}
		*/
		return aboutMe;
	}
	
	public void print(){
		System.out.println(this.toString());
	}
	

}
