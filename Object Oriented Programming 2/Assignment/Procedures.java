package patient_records;
import java.util.List;
 

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
 
@XmlRootElement(name = "procedures")
@XmlAccessorType (XmlAccessType.FIELD)
public class Procedures
{
    @XmlElement(name = "procedure")
    private List<Procedure> procedures;
 
    public List<Procedure> getProcedures() {
        try{
        	return procedures;
        }catch(NullPointerException e){        	
        	return null;
        }
    }
 
    public void setProcedures(List<Procedure> procs) {
        this.procedures = procs;
    }
}