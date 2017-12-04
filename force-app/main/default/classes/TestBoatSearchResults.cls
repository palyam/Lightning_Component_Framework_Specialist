@isTest

private class TestBoatSearchResults {
    
    @testSetup static void setup() {
            List<BoatType__c> types = new List<BoatType__c>();

            BoatType__c bt1 = new BoatType__c();
            bt1.Name='type 1';

            BoatType__c bt2 = new BoatType__c();
            bt2.Name='type 2';
            
            BoatType__c bt3 = new BoatType__c();
            bt3.Name='type 3';

            types.add(bt1);
            types.add(bt2);
            types.add(bt3);

            insert types;       

            Contact c = new Contact();
            c.LastName = 'Rivard';
            insert c;  

        }       



    static testMethod void testgetBoatByTypeId(){

            List<Boat__c> boats = new List<Boat__c>();
              

            BoatType__c type1 = [select Id from BoatType__c where Name = 'type 1' ];
            BoatType__c type2 = [select Id from BoatType__c where Name = 'type 2' ];
            BoatType__c type3 = [select Id from BoatType__c where Name = 'type 3' ];

            Contact c = [select Id from Contact where LastName = 'Rivard'];


            Boat__c b1 = new Boat__c();
            b1.Name = 'Boat 1';
            b1.BoatType__c = type1.Id;
            b1.Contact__c = c.id;
            boats.add(b1);
                                
            Boat__c b2 = new Boat__c();
            b2.Name = 'Boat 2';
            b2.BoatType__c = type1.Id;
            b2.Contact__c = c.id;
            boats.add(b2);

            Boat__c b3 = new Boat__c();
            b3.Name = 'Boat 3';
            b3.BoatType__c = type1.Id;
            b3.Contact__c = c.id;
            boats.add(b3);

            Boat__c b4 = new Boat__c();
            b4.Name = 'Boat 4';
            b4.BoatType__c = type2.Id;
            b4.Contact__c = c.id;
            boats.add(b4);

            Boat__c b5 = new Boat__c();
            b5.Name = 'Boat 5';
            b5.BoatType__c = type2.Id;
            b5.Contact__c = c.id;
            boats.add(b5);

            Boat__c b6 = new Boat__c();
            b6.Name = 'Boat 6';
            b6.BoatType__c = type2.Id;
            b6.Contact__c = c.id;
            boats.add(b6);

            Boat__c b7 = new Boat__c();
            b7.Name = 'Boat 7';
            b7.BoatType__c = type3.Id;
            b7.Contact__c = c.id;
            boats.add(b7);

            Boat__c b8 = new Boat__c();
            b8.Name = 'Boat 8';
            b8.BoatType__c = type3.Id;
            b8.Contact__c = c.id;
            boats.add(b8);

            Boat__c b9 = new Boat__c();
            b9.Name = 'Boat 9';
            b9.BoatType__c = type3.Id;
            b9.Contact__c = c.id;
            boats.add(b9);

            insert boats;


            List<Boat__c> boatsTest1 = BoatSearchResults.getBoats(type1.Id);
            System.assertEquals(3, boatsTest1.size());
            System.assertEquals('Boat 1', boatsTest1[0].Name);
   
            List<Boat__c> boatsTest2 = BoatSearchResults.getBoats(type2.Id);
            System.assertEquals(3, boatsTest2.size());
            System.assertEquals('Boat 4', boatsTest2[0].Name);

            List<Boat__c> boatsTest3 = BoatSearchResults.getBoats(type3.Id);
            System.assertEquals(3, boatsTest3.size());
            System.assertEquals('Boat 7', boatsTest3[0].Name);
   
    
    }



}
