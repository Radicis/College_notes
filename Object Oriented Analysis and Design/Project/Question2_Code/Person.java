package question2;

public class Person {

	public static void main(String[] args) {
		TV myTV = new TV();
		SurroundSoundSystem mySound = new SurroundSoundSystem();
		Projector myProjector = new Projector();
		
		RemoteControl myRemote = new RemoteControl();
		
		Boolean TV = myRemote.connect(myTV);
		Boolean Sound = myRemote.connect(mySound);
		Boolean Projector = myRemote.connect(myProjector);	
		
		if(TV){
			myRemote.turnOn(myTV);
			myRemote.turnOff(myTV);
		}
		if(Sound){
			myRemote.turnOn(mySound);
			myRemote.turnOff(mySound);
		}
		if(Projector){
			myRemote.turnOn(myProjector);
			myRemote.turnOff(myProjector);
		}
		
	}

}
