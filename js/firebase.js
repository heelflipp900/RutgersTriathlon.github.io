function retrieveAndPopulatePracticeData(){
     /** VAR Initialization **/
	var listItemPrefix = "<li class=\"list-group-item\">",listItemPostFix="</li>"
    var firebaseReference = new Firebase("https://rutgerstriteam.firebaseio.com/Practices");

      /** VAR collection and view population from firebase **/
	firebaseReference.on("value", function(snapshot) {
     	practiceData = snapshot.val();
     	document.getElementById("PracticeList").innerHTML = concatinatePracticeSchedule(practiceData);
	});

    function concatinatePracticeSchedule(practiwceData){
       return listItemPrefix.concat("<b>Monday: </b>",practiceData.Monday,listItemPostFix,
        listItemPrefix,"<b>Tuesday: </b>",practiceData.Tuesday,listItemPostFix,
        listItemPrefix,"<b>Wednesday: </b>",practiceData.Wednesday,listItemPostFix,
        listItemPrefix,"<b>Thursday: </b>",practiceData.Thursday,listItemPostFix,
        listItemPrefix,"<b>Friday: </b>",practiceData.Friday,listItemPostFix,
        listItemPrefix,"<b>Saturday: </b>",practiceData.Saturday,listItemPostFix,
    	listItemPrefix,"<b>Sunday: </b>",practiceData.Sunday,listItemPostFix);          
    }
}

function retrieveAndPopulateOfficerData(){
     /** VAR Initialization **/
	var listItemPrefix = "<li class=\"list-group-item\">",listItemPostFix="</li>"
    var firebaseReference = new Firebase("https://rutgerstriteam.firebaseio.com/Officers");

      /** VAR collection and view population from firebase **/
	firebaseReference.on("value", function(snapshot) {
     	officerData = snapshot.val();
     	document.getElementById("OfficerList").innerHTML = concatinateOfficerList(officerData);
	});

    function concatinateOfficerList(officerData){
        var officerListForDisplay = "";
       for(officer in officerData){
        var officerInformation = new Firebase('https://rutgerstriteam.firebaseio.com/Officers/'+officer);
        officerInformation.on('value', function(snapshotinner) {
            officerPosition = snapshotinner.val().Position;
        });
        officerListForDisplay = officerListForDisplay.concat(listItemPrefix,"<b>",officer,"</b>"," - ",officerPosition,listItemPostFix);
       }
       return officerListForDisplay;
    }
}

function retrieveAndPopulateRaceData(){
     /** VAR Initialization **/
    var listItemPrefix = "<li class=\"list-group-item\">",listItemPostFix="</li>"
    var firebaseReference = new Firebase("https://rutgerstriteam.firebaseio.com/Races");

      /** VAR collection and view population from firebase **/
    firebaseReference.on("value", function(snapshot) {
        raceListData = snapshot.val();
        document.getElementById("RaceList").innerHTML = concatinateRaceList(raceListData);
    });

    function concatinateRaceList(raceListData){
        var raceListForDisplay = "";
        for(race in raceListData){
            var raceListInformation = new Firebase('https://rutgerstriteam.firebaseio.com/Races/'+race);
            raceListInformation.on('value', function(snapshotinner) {
                raceInformation = snapshotinner.val().Information;
            });
            raceListForDisplay = raceListForDisplay.concat(listItemPrefix,"<b>",race,"</b>"," - ",raceInformation,listItemPostFix);
       }
       return raceListForDisplay;
    }
}

function retrieveAndPopulateMemberData(){  
    var firebaseReference = new Firebase("https://rutgerstriteam.firebaseio.com/Members");

    /** VAR collection and view population from firebase **/
    firebaseReference.on("value", function(snapshot) {
        memberData = snapshot.val();
        document.getElementById("MemberList").innerHTML = createMemberClassData(memberData);
    });
}

function createMemberClassData(memberClassData){
    
    var returnedClassMemberData = "";
    console.log("createClassData " + memberClassData);

    for(classData in memberClassData){
        returnedClassMemberData = returnedClassMemberData.concat(createMemberClass(classData));
    }

    return returnedClassMemberData;
}

//Creates the member list for each class
function createMemberClass(memberClass){
    var classNamePrefix = "<h3>",
    classNamePostFix = "</h3>",
    returnedClassData = "";
    returnedClassData = returnedClassData.concat(classNamePrefix,memberClass,classNamePostFix,concatinateMemberList(memberClass));
    return returnedClassData;
}

function clearNavBarClasses(){
    // var homeNavBarItem = document.getElementById("homeNavBarItem"),
    var joinNavBarItem = document.getElementById("joinNavBarItem"),
        // sponsorsNavBarItem = document.getElementById("sponsorsNavBarItem"),
        membersNavBarItem = document.getElementById("membersNavBarItem");
        // newsNavBarItem = document.getElementById("newsNavBarItem"),
        // contactNavBarItem = document.getElementById("contactNavBarItem");

        // homeNavBarItem.className = "";
        joinNavBarItem.className = "";
        // sponsorsNavBarItem.className = "";
        membersNavBarItem.className = "";
        // newsNavBarItem.className = "";
        // contactNavBarItem.className = "";
}

function updateNavbarToMembersPage(){
    var membersNavBarItem = document.getElementById("membersNavBarItem");
    clearNavBarClasses();

    membersNavBarItem.className = "active";
}

function concatinateMemberList(memberData){
    var memberInformationForDisplay = "";
    var memberCardPrefix = "<div class=\"panel panel-default\">", memberCardPostfix = "</div>",
        memberTitlePrefix = "<div class=\"panel-heading\">",memberTitlePostfix="</div>",
        memberInformationPrefix = " <div class=\"panel-body\">", memberInformationPostfix = "</div>"
        memberTitleAndGraduationPrefix = "<h4><b>",memberTitleAndGraduationPostfix="</b></h4>",memberTitleGraduationDash= " - ",
        memberPhotoPrefix = "<img src=\"", memberPhotoPostfix = "\"  class=\"img-responsive img-rounded member-image pull-left\">",
        memberBioPrefix = "<p>", memberBioPostfix = "</p>",
        memberRowPrefix="<div class=\"row\">",memberRowPostfix="</div>",
        memberColPrefix="<div class=\"col-md-6 col-md-offset-3\">",memberColPostfix="</div>";

        var memberInformation = new Firebase('https://rutgerstriteam.firebaseio.com/Members/'+memberData);

        var memberName = "";

        console.log('https://rutgerstriteam.firebaseio.com/Members/'+memberData);
        memberInformation.on('value', function(snapshot) {
            memberInfoSnapshot = snapshot.val();
        });

        for(member in memberInfoSnapshot){
            memberInformationForDisplay = memberInformationForDisplay.concat(memberRowPrefix,
            memberColPrefix,
            memberCardPrefix,
            memberInformationPrefix,
            memberTitleAndGraduationPrefix,
            member,
            memberTitleGraduationDash,
            memberTitleAndGraduationPostfix,
            memberInformationPostfix,
            memberCardPostfix,
            memberColPostfix,
            memberRowPostfix);
        }
        // console.log(memberInformationForDisplay);
        return memberInformationForDisplay;
    }
