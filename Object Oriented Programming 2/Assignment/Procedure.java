package patient_records;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "procedure")
public class Procedure {
	
	private static int counter;	
	
	private int procID;
	private String procName;
	private double procCost;
	
	public Procedure(){
		
	}
	
	public Procedure(String procName, double procCost){
		this.procID = ++counter;
		this.procName = procName;
		this.procCost = procCost;		
	}
	
	//Helper methods
	
	public int getID(){
		return this.procID;
	}
	public void setID(int procID){
		this.procID = procID;
	}
	
	public String getName(){
		return this.procName;
	}
	public void setName(String procName){
		this.procName = procName;
	}
	
	public double getCost(){
		return this.procCost;
	}
	public void setCost(double procCost){
		this.procCost = procCost;
	}	

	
	public String toString(){
		return this.getName() + " | €" + this.getCost();
	}
	
	public String toStringSave(){
		String aboutMe = this.getID() + "\n" + this.getName() + "\n" + this.getCost() + "\n";
		return aboutMe;
	}

}
