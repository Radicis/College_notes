package patient_records;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.swing.*;
import javax.swing.border.Border;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

public class Gui extends JFrame {		

	//Set a patient active for operations
	private Patient activePatient;	
	private Procedure activeProcedure;


	private DefaultListModel<Patient> listModel = new DefaultListModel<Patient>();
	private DefaultListModel<Procedure> proclistModel2 = new DefaultListModel<Procedure>();
	private DefaultListModel<Procedure> proclistModel = new DefaultListModel<Procedure>();

	private Controller control = new Controller();

	public Gui (String title) throws IOException{
		super(title);	
		control.loadData();	
		populate_list();
	}

	public Patient getActivePatient(){
		return this.activePatient;
	}

	public Procedure getActiveProcedure(){
		return this.activeProcedure;
	}

	public void init(){


		// ----> Start Frame initialization		



		this.setPreferredSize(new Dimension(700, 700));
		this.setResizable(false);		
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);	

		//Color

		this.getContentPane().setBackground(Color.lightGray);

		//----> Initialize tabbed pane

		JTabbedPane tabbedPane = new JTabbedPane();		
		this.add(tabbedPane);		

		// ----> Start Menu initialization

		JMenuBar menuBar = new JMenuBar();

		//Add file Menu
		JMenu fileMenu = new JMenu("File");
		menuBar.add(fileMenu);


		JMenuItem saveQuit = new JMenuItem("Save and Quit");
		JMenuItem quitNoSave = new JMenuItem("Quit without Saving");

		JMenuItem fileClose = new JMenuItem("Close");
		//Add close window functionality to close menu item
		fileClose.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent event) {
				System.exit(0);
			}
		});

		fileMenu.addSeparator();
		fileMenu.add(saveQuit);
		fileMenu.add(quitNoSave);
		fileMenu.addSeparator();		
		fileMenu.add(fileClose);

		JMenu helpMenu = new JMenu("Help");
		menuBar.add(helpMenu);

		JMenuItem about = new JMenuItem("About");

		about.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e)
			{

				tabbedPane.setSelectedIndex(3);
			}

		});
		helpMenu.add(about);

		this.setJMenuBar(menuBar);	





		// ----> Active Patient Area

		JPanel activePatientPanel = new JPanel();

		JLabel activeName = new JLabel("");

		JLabel activeLabel = new JLabel("Active Patient: ");
		activePatientPanel.add(activeLabel);
		activePatientPanel.add(activeName);		


		// ----> Start Patient Details

		JPanel patientDetails = new JPanel();

		JTextField patient_name = new JTextField(8);	
		JTextField patient_addr = new JTextField(12);	
		JTextField patient_contact = new JTextField(8);


		//Patient Details Row
		patientDetails.add(new JLabel("Patient Name"));		
		patientDetails.add(patient_name);			
		patientDetails.add(new JLabel("Address"));
		patientDetails.add(patient_addr);		
		patientDetails.add(new JLabel("Contact Number"));		
		patientDetails.add(patient_contact);


		//Patient Buttons Row

		JPanel patientButtons = new JPanel();

		JButton add_patient = new JButton("Add Patient");
		JButton remove_patient = new JButton("Remove Patient");
		JButton save_patient = new JButton("Save Patient");
		JButton save_and_quit = new JButton("Save and Quit");
		JButton quit_button = new JButton("Quit");	


		patientButtons.add(add_patient);		
		patientButtons.add(remove_patient);
		patientButtons.add(save_patient);
		patientButtons.add(save_and_quit);
		patientButtons.add(quit_button);

		//Patient List

		JList<Procedure> availableProcedures = new JList<Procedure>(proclistModel);	

		JPanel patientTextArea = new JPanel();  
		JList<Patient> jpatientList = new JList<Patient>(listModel);
		JScrollPane patientScroll = new JScrollPane (jpatientList, JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,
				JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);          		
		patientScroll.setPreferredSize(new Dimension(400,500));
		patientScroll.setBorder(BorderFactory.createLineBorder(Color.black));

		patientTextArea.add(patientScroll);

		//Patient Procedures 

		JPanel procTextarea2 = new JPanel(new BorderLayout());
		JList<Procedure> patientProcedures = new JList<Procedure>(proclistModel2);	
		JScrollPane procScroll2 = new JScrollPane (patientProcedures, JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,
				JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);          		
		procScroll2.setPreferredSize(new Dimension(260,200));
		procScroll2.setBorder(BorderFactory.createLineBorder(Color.black));

		JLabel patientTotal = new JLabel("0.00");


		procTextarea2.add(procScroll2, BorderLayout.CENTER);
		procTextarea2.add(patientTotal, BorderLayout.SOUTH);

		//Set up borderlayouts and labels

		JPanel patientPanel = new JPanel();
		patientPanel.setLayout(new BorderLayout());

		JPanel topPanel = new JPanel(new BorderLayout());
		topPanel.add(activePatientPanel, BorderLayout.NORTH);
		topPanel.add(patientDetails, BorderLayout.SOUTH);

		JPanel midPanel = new JPanel(new BorderLayout());
		midPanel.add(patientButtons, BorderLayout.NORTH);
		JLabel patientListLabel = new JLabel("Patient List");
		Border paddingBorder = BorderFactory.createEmptyBorder(10,5,10,10);
		patientListLabel.setBorder(BorderFactory.createCompoundBorder(paddingBorder,paddingBorder));

		JLabel patientprocLabel = new JLabel("Selected Patient Procedures");
		Border paddingBorder2 = BorderFactory.createEmptyBorder(10,10,10,25);
		patientprocLabel.setBorder(BorderFactory.createCompoundBorder(paddingBorder2,paddingBorder2));


		midPanel.add(patientListLabel, BorderLayout.WEST);
		midPanel.add(patientprocLabel, BorderLayout.EAST);        


		JPanel listPanel = new JPanel(new BorderLayout());        
		listPanel.add(patientTextArea, BorderLayout.WEST);

		JPanel listLeftPanel = new JPanel(new BorderLayout());
		listLeftPanel.add(procTextarea2, BorderLayout.NORTH);


		JPanel patientProcButtons = new JPanel();       

		JButton patientAddProc = new JButton("Add");
		JButton patientRemoveProc = new JButton("Remove");
		JButton patientAddPay = new JButton("Add Payment");

		patientProcButtons.add(patientAddProc);
		patientProcButtons.add(patientRemoveProc);
		patientProcButtons.add(patientAddPay);

		listLeftPanel.add(patientProcButtons, BorderLayout.CENTER);


		JScrollPane availableProcScroll = new JScrollPane (availableProcedures, JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,
				JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);          		
		availableProcScroll.setPreferredSize(new Dimension(240,245));
		availableProcScroll.setBorder(BorderFactory.createLineBorder(Color.black));

		JPanel availableProcPanel = new JPanel(new BorderLayout());

		JLabel availableProcLabel = new JLabel("Available Procedures");

		availableProcPanel.add(availableProcLabel, BorderLayout.NORTH);
		availableProcPanel.add(availableProcScroll,BorderLayout.CENTER);

		listLeftPanel.add(availableProcPanel, BorderLayout.SOUTH);

		listPanel.add(listLeftPanel, BorderLayout.EAST);    

		patientPanel.add(topPanel, BorderLayout.NORTH);
		patientPanel.add(midPanel, BorderLayout.CENTER);
		patientPanel.add(listPanel, BorderLayout.SOUTH);


		tabbedPane.addTab("Patient Details", patientPanel);


		// ----> Start Procedure Details		


		//Prodecure Details Row

		JPanel procDetails = new JPanel();

		JTextField procedure = new JTextField(15);
		JTextField amount = new JTextField(8);

		procDetails.add(new JLabel("Procedure"));		
		procDetails.add(procedure);				
		procDetails.add(new JLabel("Amount"));			
		procDetails.add(amount);


		//Procedure Buttons Row

		JPanel procButtons = new JPanel();

		JButton add_proc = new JButton("Add Procedure");
		JButton remove_proc = new JButton("Remove Procedure");
		JButton save_proc = new JButton("Update Procedure");	

		procButtons.add(add_proc);			
		procButtons.add(remove_proc);		
		procButtons.add(save_proc);       


		//Procedure Text Area Row

		JPanel procTextarea = new JPanel();

		JList<Procedure> jprocedureList = new JList<Procedure>(proclistModel);

		JScrollPane procScroll = new JScrollPane (jprocedureList, JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,
				JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);          		
		procScroll.setPreferredSize(new Dimension(500,510));
		procScroll.setBorder(BorderFactory.createLineBorder(Color.black));

		procTextarea.add(procScroll);

		JPanel procPanel = new JPanel(new BorderLayout());        


		JPanel midPanel2 = new JPanel(new BorderLayout());
		midPanel2.add(procDetails, BorderLayout.NORTH);
		midPanel2.add(procButtons, BorderLayout.CENTER);
		midPanel2.add(procTextarea, BorderLayout.SOUTH);        


		procPanel.add(midPanel2, BorderLayout.CENTER);        


		tabbedPane.addTab("Procedure Details", procPanel);


		//Reports panel

		JPanel reportsPanel = new JPanel(new BorderLayout());

		JPanel reportsButtonPanel = new JPanel(new FlowLayout());

		JButton allReport = new JButton("All Patient Report");
		JButton owedReport = new JButton("Owed Report");

		reportsButtonPanel.add(allReport);
		reportsButtonPanel.add(owedReport);

		JTextArea reportTextPanel = new JTextArea(400, 400);

		reportsPanel.add(reportsButtonPanel, BorderLayout.NORTH);
		reportsPanel.add(reportTextPanel, BorderLayout.CENTER);

		tabbedPane.addTab("Reports", reportsPanel);


		//About Panel       

		JPanel aboutPanel = new JPanel(new BorderLayout());
		JLabel aboutLabel = new JLabel();

		aboutLabel.setText("About This Project");

		JTextArea aboutText = new JTextArea();
		aboutText.setEditable(false);

		aboutText.setText("\nThis application was developed as part of the CIT module: Object Oriented Programming 2\n"
				+ "It demonstrates the following:\n\n"
				+ " Java SWING GUI\n"
				+ "  Layout Managers\n"
				+ "  Action Listeners\n"
				+ "  Selectable Lists\n\n"
				+ " MVC program structure\n\n"
				+ " File I/O\n\n"
				+ "Author: Adam  Lloyd\n"
				+ "Student ID: R00117318\n"
				+ "Course: Web Development\n"
				+ "Lecturer: Denis Long\n"
				+ "2015");

		aboutPanel.add(aboutLabel, BorderLayout.NORTH);
		aboutPanel.add(aboutText, BorderLayout.CENTER);

		tabbedPane.addTab("About", aboutPanel);  



		//----Action listeners

		//Add Patient 
		add_patient.addActionListener(new ActionListener() {

			public void actionPerformed(ActionEvent e)
			{

				String pat_name = patient_name.getText();
				String pat_addr = patient_addr.getText();
				String pat_cont = patient_contact.getText();	

				//Check for null values in textfields
				if(pat_name.equals("") || pat_addr.equals("") || pat_cont.equals("")){
					JOptionPane.showMessageDialog(Gui.this, "Unable to add patient. Please enter all details!");
					return;	            		
				}
				JOptionPane.showMessageDialog(Gui.this, "Patient Record Added");
				control.getPatientList().add(new Patient(pat_name, pat_addr, pat_cont)); 
				//Refresh patient list textarea
				activePatient = null;
				populate_list();
			}
		});


		//Remove Patient
		remove_patient.addActionListener(new ActionListener() {

			public void actionPerformed(ActionEvent e)
			{
				if(activePatient==null){
					JOptionPane.showMessageDialog(Gui.this, "No patient selected!");
				}
				else{
					//ADD CONFIRMATION BOX
					control.getPatientList().remove(activePatient);
					activePatient = null;
					patient_name.setText("");
					patient_addr.setText("");
					patient_contact.setText("");
					activeName.setText("");	 
					JOptionPane.showMessageDialog(Gui.this, "Patient Removed");
					populate_list();
				}
			}
		});

		//Save edited patient
		save_patient.addActionListener(new ActionListener() {

			public void actionPerformed(ActionEvent e)
			{
				if(activePatient!=null){
					activePatient.setName(patient_name.getText());
					activePatient.setAddress(patient_addr.getText());
					activePatient.setPhone(patient_contact.getText());
					populate_list();
				}
				else{
					JOptionPane.showMessageDialog(Gui.this, "No Patient Selected");
				}
			}
		});


		//Add list selection listener
		jpatientList.addListSelectionListener(new ListSelectionListener() {
			@Override
			public void valueChanged(ListSelectionEvent arg0) {
				try{
					activePatient = jpatientList.getSelectedValue();	
					patient_name.setText(activePatient.getName());
					patient_addr.setText(activePatient.getAddress());
					patient_contact.setText(activePatient.getPhone());

					activeName.setText(activePatient.getName());

					//Refresh active patient procedures
					if(activePatient!=null){
						//Refresh patient  precedure list data
						proclistModel2.removeAllElements();
						for(Procedure procedure : activePatient.getProcedures()){
							proclistModel2.addElement(procedure);

						} 
						control.setTotal(activePatient, patientProcedures.getSelectedValue(), patientTotal);

					}

				}catch(NullPointerException e){
					//catches error when trying to select newly deleted item
				}
			}
		});



		//Save and Quit
		save_and_quit.addActionListener(new ActionListener() {

			public void actionPerformed(ActionEvent e)
			{
				try {
					control.saveQuit();
				} catch (IOException e1) {
					JOptionPane.showMessageDialog(Gui.this, "Unable to write data to save file!");
				}
			}
		});  

		// Quit
		quit_button.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent event) {
				System.exit(0);
			}
		});


		//Add patient procedure button
		patientAddProc.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent event) {

				//change to check for activeAvailableProcedure
				if(activePatient!=null && availableProcedures.getSelectedValue()!=null){	     		
					control.setTotal(activePatient, availableProcedures.getSelectedValue(), patientTotal);		        		
					populate_list();
				}
				else{
					JOptionPane.showMessageDialog(Gui.this, "Please Select a Patient and a Procedure!");
				}
			}
		});

		//Remove patient procedure button
		patientRemoveProc.addActionListener(new ActionListener() {

			public void actionPerformed(ActionEvent event) {

				//change to check for activePatientProecdure
				if(activePatient!=null && patientProcedures.getSelectedValue()!=null){
					activePatient.removeProcedure(patientProcedures.getSelectedValue());
					control.setTotal(activePatient, patientProcedures.getSelectedValue(), patientTotal);
					populate_list();
				}
				else{
					JOptionPane.showMessageDialog(Gui.this, "Please Select a Patient and a Proecudre!");					
				}
			}
		});

		//Add Payment
		patientAddPay.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent event) {
				if(activePatient!=null && patientProcedures.getSelectedValue()!=null){
					//display input box
					String response = JOptionPane.showInputDialog(null, "Enter amount paid" ,JOptionPane.QUESTION_MESSAGE);
					//if input value >= cost of procedure then remove it
					if(Double.parseDouble(response) >= Double.parseDouble(patientTotal.getText())){


						// ### Doesn't work, procedure isn't removed from array list ###

						JOptionPane.showMessageDialog(Gui.this, "Payment complete!");	
						activePatient.removeProcedure(patientProcedures.getSelectedValue());

						//Generate current date stamp
						Date myDate = new Date();
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd:HH-mm-ss");
						String myDateString = sdf.format(myDate);

						Payment newPay = new Payment(Double.parseDouble(response), myDateString);
						activePatient.addPayment(newPay);

						//Ensure payment is paid for t esting
						newPay.pay(newPay.getAmount());
						//update total display
						control.setTotal(activePatient, patientProcedures.getSelectedValue(), patientTotal);
						populate_list();
					}
					else{
						JOptionPane.showMessageDialog(Gui.this, "Please pay more!");
					}
				}
				else{
					JOptionPane.showMessageDialog(Gui.this, "Please Select a Patient and a Proecudre!");					
				}
			}
		});



		//============ Procedure Pane Actions


		//Add list selection listener
		jprocedureList.addListSelectionListener(new ListSelectionListener() {
			@Override
			public void valueChanged(ListSelectionEvent arg0) {
				try{
					activeProcedure = jprocedureList.getSelectedValue();	
					procedure.setText(activeProcedure.getName());
					amount.setText(String.valueOf(activeProcedure.getCost()));						

				}catch(NullPointerException e){
					//catches error when trying to select newly deleted item
				}
			}
		});

		//Save procedure
		save_proc.addActionListener(new ActionListener() {

			public void actionPerformed(ActionEvent e)
			{
				if(activeProcedure!=null){
					activeProcedure.setName(procedure.getText());
					//Check for valid double
					activeProcedure.setCost(Double.parseDouble(amount.getText()));
					populate_list();
				}
				else{
					JOptionPane.showMessageDialog(Gui.this, "No Procedure Selected");
				}
			}
		});

		//Add Procedure
		add_proc.addActionListener(new ActionListener() {

			public void actionPerformed(ActionEvent e)
			{
				//Check for null values in textfields
				if(procedure.getText().equals("")){
					JOptionPane.showMessageDialog(Gui.this, "Unable to add Procedure. Please enter all details!");
					return;	            		
				}	  
				try{
					control.getProcedureList().add(new Procedure(procedure.getText(), Double.parseDouble(amount.getText()))); 
					JOptionPane.showMessageDialog(Gui.this, "Proedure Added");
					populate_list();
				}catch(NumberFormatException err){
					JOptionPane.showMessageDialog(Gui.this, "Invalid cost entered. Please enter a valid price!");
				}       		

			}
		});

		//Remove Procedure
		remove_proc.addActionListener(new ActionListener() {

			public void actionPerformed(ActionEvent e)
			{
				//ADD CONFIRMATION BOX
				if(activeProcedure != null){
					control.getProcedureList().remove(activeProcedure);
					procedure.setText("");
					amount.setText("");
					populate_list();
					JOptionPane.showMessageDialog(Gui.this, "Procedure Removed");
				}
				else{
					JOptionPane.showMessageDialog(Gui.this, "No Procedure Selected");
				}
			}
		});




		//======== Reports Section

		//GENERATE REPORT ON ALL PATIENTS
		allReport.addActionListener(new ActionListener() {

			public void actionPerformed(ActionEvent e)
			{
				reportTextPanel.setText(control.doReport());
			}
		});


		//GENERATE REPORT ON PAYMENT OWED

		owedReport.addActionListener(new ActionListener() {

			public void actionPerformed(ActionEvent e)
			{
				reportTextPanel.setText(control.doOwedReport());
			}
		});





		// ----> Start frame pack and display
		Gui.this.pack();
		Gui.this.setLocationRelativeTo(null);		
		Gui.this.setVisible(true);

	}


	public void populate_list(){		
		//Refresh patient procedure list data		
		//Refresh active patient procedures
		proclistModel2.removeAllElements();
		if(activePatient!=null){ 		
			for(Procedure procedure : activePatient.getProcs()){
				proclistModel2.addElement(procedure);		    		
			} 
		}	

		//Refresh patient list textarea
		listModel.removeAllElements();
		for(Patient patient : control.getPatientList()){    		
			listModel.addElement(patient);	
		}

		//Refresh procedure list data
		proclistModel.removeAllElements();
		for(Procedure procedure : control.getProcedureList()){
			proclistModel.addElement(procedure);	
		}  

	}		
}
