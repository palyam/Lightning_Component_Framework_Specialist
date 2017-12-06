@isTest
private class TestBoatUtils {
    
    static testMethod void testgetBoatTypes(){


            BoatType__c b1 = new BoatType__c();
            b1.Name='type 1';

            BoatType__c b2 = new BoatType__c();
            b2.Name='type 2';
            
            BoatType__c b3 = new BoatType__c();
            b3.Name='type 3';
            
            BoatType__c b4 = new BoatType__c();
            b4.Name='type 4';
            

            List<BoatType__c> testboats = new List<BoatType__c>();
            testboats.add(b1);
            testboats.add(b2);
            testboats.add(b3);
            testboats.add(b4);

            insert testboats;

            List<BoatType__c> boats = BoatUtils.getBoatTypes();
            System.assertEquals(4, boats.size());

    }


}
