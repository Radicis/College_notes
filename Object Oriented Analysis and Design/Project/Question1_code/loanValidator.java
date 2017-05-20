//Interface
public interface loanValidator {
	  public boolean isValid();
}


public class VehicleLoanValidator implements loanValidator
{
  public boolean isValid()
  {
	return false;
    //Validation logic
  }
}

public class PersonalLoanValidator implements loanValidator
{
  public boolean isValid()
  {
	return false;
    //Validation logic
  }
}

public class LoanApprovalHandler
{
  public void approveLoan (loanValidator validator)
  {
    if ( validator.isValid())
    {
      //Process the loan.
    }
  }
}


