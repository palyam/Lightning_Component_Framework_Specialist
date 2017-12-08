public with sharing class BoatSearchResults {


    @AuraEnabled
    public static List<Boat__c> getBoats(String boatTypeId){
        System.debug('Boat Id 1 ' + boatTypeId);
        //Security check to make sure that the user has access to the name field
        if ((!Schema.sObjectType.Boat__c.fields.Name.isAccessible())){
    			throw new System.NoAccessException();
    				return null;
    		}
            
        List<Boat__c> boats = new List<Boat__c>();
        System.debug('Boat Id 2 ' + boatTypeId);

        try{
            if(String.isEmpty(boatTypeId)){
                boats = [select Id,Name,Picture__c,contact__r.Name from Boat__c];
            }else{
                boats = [select Id,Name,Picture__c,contact__r.Name  from Boat__c where BoatType__c =: boatTypeId];
            }
        }catch(Exception e){
            return boats;
        }
        return boats;

    }
}
