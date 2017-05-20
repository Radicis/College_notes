package patient_records;
import java.util.List;
 
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
 
@XmlRootElement(name = "patients")
@XmlAccessorType (XmlAccessType.FIELD)
public class Patients
{
    @XmlElement(name = "patient")
    private List<Patient> patients;
 
    public List<Patient> getPatients() {
        try{
        	return patients;
        }catch(NullPointerException e){
        	return null;
        }
    }
 
    public void setPatient(List<Patient> patients) {
        this.patients = patients;
    }
}