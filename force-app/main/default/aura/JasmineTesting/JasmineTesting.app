<aura:application extends="force:slds" description="Sample wrapper test app">
    
            <c:lts_jasmineRunner testFiles="{!join(',',
                $Resource.testting
            )}" />
        
            <!--  placeholder div which example test specs use to render components under test -->
            <div aura:id="renderTestComponents" id="renderTestComponents"></div>
        </aura:application>