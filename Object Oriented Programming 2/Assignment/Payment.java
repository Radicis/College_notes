package patient_records;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "payment")
public class Payment {
	
	static int counter;	
	
	private int paymentID;
	private double paymentAmt;
	private String paymentDate;
	private boolean isPaid = false;
	
	public Payment(){
		
	}
	
	public Payment(double paymentAmt, String paymentDate){
		this.paymentID = ++counter;
		this.paymentAmt = paymentAmt;
		this.paymentDate = paymentDate;
	}
	
	//Helper methods
	public int getID(){
		return this.paymentID;
	}
	public void setID(int paymentID){
		this.paymentID = paymentID;
	}
	
	public double getAmount(){
		return this.paymentAmt;
	}
	public void setAmount(double paymentAmt){
		this.paymentAmt = paymentAmt;
	}
	
	public String getDate(){
		return this.paymentDate;
	}
	public void setDate(String paymentDate){
		this.paymentDate = paymentDate;
	}
	
	
	public boolean paid(){
		return this.isPaid;
	}
	public boolean pay(double amount){
		this.isPaid = true;
		//check if amount is >= cost
		return true;
	}
	
	public String toString(){
		return "ID: " + this.getID() + " Amount: " + this.getAmount() + " Date: " + this.getDate();
	}


}
