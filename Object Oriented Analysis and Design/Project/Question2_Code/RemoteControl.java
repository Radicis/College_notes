package question2;

public class RemoteControl {
	

	
	public RemoteControl(){		
	}
	
	//Connect to remote
	public boolean connect(Device device){
		try{
			device.connectRemote();
			System.out.println("Connected to Device Successfully");
			return true;
		}
		catch(Error e){
			System.out.println("Error Connecting to Device");
			return false;
		}
	}
	
	//Turn device on
	public void turnOn(Device device){
		device.turnOn();
	}
	
	//Turn device off
	public void turnOff(Device device){
		device.turnOff();
	}

}
