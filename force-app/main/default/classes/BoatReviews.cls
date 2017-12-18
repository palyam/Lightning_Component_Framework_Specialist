public with sharing class BoatReviews {
    public BoatReviews() {

    }


     @AuraEnabled
    public static List<BoatReview__c> getAll(Id boatId){

        	System.debug('Checking Access');
            if (!Schema.sObjectType.BoatReview__c.isAccessible()){
    			throw new System.NoAccessException();
    				return null;
    		}

            System.debug('boatId = ' + boatId);
            List<BoatReview__c> reviews = [select Id,Name,Comment__c,Rating__c,LastModifiedDate,CreatedDate,
                    CreatedBy.Name,CreatedBy.SmallPhotoUrl,CreatedBy.CompanyName from BoatReview__c where Boat__c =:boatId];
        System.debug('reviews = ' + reviews);
        return reviews;
    }
}
