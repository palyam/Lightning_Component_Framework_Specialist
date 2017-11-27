public with sharing class BoatUtils {
    public BoatUtils() {

    }
    
    @AuraEnabled
    public static List<BoatType__c> getBoatTypes(){
    		// Check to make sure all fields are accessible to this user
    		// We know the fields for this request so just check those fields
    		// as they are the only ones we are returning
    	 	
	      

    		if ((!Schema.sObjectType.BoatType__c.fields.Name.isAccessible()) && (!Schema.sObjectType.BoatType__c.fields.Id.isAccessible())){
    			throw new System.NoAccessException();
    				return null;
    		}
    		//They have access so let the data go through
    		
    			List<BoatType__c> boats = [SELECT Id, Name FROM BoatType__c];
    			return boats;
    
    		
    		/*tfas
    		String[] fieldsToCheck = new String[] {'Id','Name'};
    		Map<String,Schema.SObjectField> fieldDescribeTokens = Schema.SObjectType.BoatType__c.fields.getMap();
    		for(String field : fieldsToCheck) {
    			if( ! fieldDescribeTokens.get(field).getDescribe().isAccessible()) {
    				throw new System.NoAccessException();
    				return null;
    			}
    		
    		}
    		*/
    	
    }
}
