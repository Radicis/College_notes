package patient_records;
import java.util.List;
 

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
 
@XmlRootElement(name = "payments")
@XmlAccessorType (XmlAccessType.FIELD)
public class Payments
{
    @XmlElement(name = "payment")
    private List<Procedure> payments;
 
    public List<Procedure> getPayments() {
        try{
        	return payments;
        }catch(NullPointerException e){        	
        	return null;
        }
    }
 
    public void setPayments(List<Procedure> pays) {
        this.payments = pays;
    }
}