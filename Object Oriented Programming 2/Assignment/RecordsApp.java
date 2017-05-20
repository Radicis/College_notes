package patient_records;

import java.io.IOException;

public class RecordsApp {

	public static void main(String[] args) {
			
		Gui view = null;
		try {
			view = new Gui("Patient Records");
		} catch (IOException e) {
			e.printStackTrace();
		}
		view.init();
	}	

}
