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

function retrieveAndPopulateOfficerDataForOfficersPage(){
     /** VAR Initialization **/
    var listItemPrefix = "<li class=\"list-group-item\">",listItemPostFix="</li>"
    var firebaseReference = new Firebase("https://rutgerstriteam.firebaseio.com/Officers");

      /** VAR collection and view population from firebase **/
    firebaseReference.on("value", function(snapshot) {
        officerData = snapshot.val();
        document.getElementById("OfficerPageList").innerHTML = concatinateOfficerList(officerData);
    });

    function concatinateOfficerList(officerData){
        var officerListForDisplay = "", officerAboutMe = "" , officerProfileImageLink = "",officerListData = "";
       for(officer in officerData){
        var officerInformation = new Firebase('https://rutgerstriteam.firebaseio.com/Officers/'+officer);
        officerInformation.on('value', function(snapshotinner) {
            officerPosition = snapshotinner.val().Position;
            officerAboutMe = snapshotinner.val().AboutMe;
            officerProfileImageLink = snapshotinner.val().ProfileImage;
            officerListData = officerListData.concat(createOfficerLayout(officer,officerPosition,officerProfileImageLink,officerAboutMe));
        });
       }
       return officerListData;
    }
}

function createOfficerLayout(officerName, officerPosition, officerProfileImageLink,officerAboutMe){
    var cardPrefix = "<div class=\"panel panel-danger\">", cardPostfix = "</div>",
                    cardHeadingPrefix ="<div class=\"panel-heading\">", cardHeadingPostfix = "</div>",
                    officerNameAndPositionPrefix = "<h3>", officerNameAndPositionPostfix = "</h3>",
                    officerBodyInformationPrefix = "<div class=\"panel-body\"> <div class=\"media\">", officerBodyInformationPostfix = "</div></div>",
                    officerProfileImagePrefix = "<div class=\"media-left\"><img class=\"media-object member-image\" src=\"",officerProfileImagePostfix = "\"/></div>",
                    officerVariousInformationPrefix = "<div class=\"media-body\">", officerVariousInformationPostfix = "</div>";

    return cardPrefix.concat(cardHeadingPrefix,officerNameAndPositionPrefix,officerName," - ",officerPosition,officerNameAndPositionPostfix,cardHeadingPostfix,
                             officerBodyInformationPrefix,officerProfileImagePrefix,officerProfileImageLink,officerProfileImagePostfix,
                             officerVariousInformationPrefix,officerAboutMe,officerVariousInformationPostfix,
                             officerBodyInformationPostfix,cardPostfix);
}

function retrieveAndPopulateRaceData(){
     /** VAR Initialization **/
    var listItemPrefix = "<li class=\"list-group-item\">",listItemPostFix="</li>"
    var firebaseReference = new Firebase("https://rutgerstriteam.firebaseio.com/Races");

      /** VAR collection and view population from firebase **/
    firebaseReference.orderByValue().on("value", function(snapshot) {
        raceListData = snapshot.val();
        document.getElementById("RaceList").innerHTML = concatinateRaceList(raceListData);
    });

    function concatinateRaceList(raceListData){
        var raceListForDisplay = "";
        for(race in raceListData){
            var raceListInformation = new Firebase('https://rutgerstriteam.firebaseio.com/Races/'+race);
            raceListInformation.orderByValue().on('value', function(snapshotinner) {
                raceInformation = snapshotinner.val();
                console.log(raceInformation);
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

    for(classData in memberClassData){
        returnedClassMemberData = returnedClassMemberData.concat(createMemberClass(classData));
    }

    return returnedClassMemberData;
}

//Creates the member list for each class
function createMemberClass(memberClass){
    var classNamePrefix = "<div class=\"col-md-4 col-md-offset-2 member-class\"><h2><b>Class of ",
    classNamePostFix = "</b></h2></div>",
    returnedClassData = "";
    returnedClassData = returnedClassData.concat(classNamePrefix,memberClass,classNamePostFix,concatinateMemberList(memberClass));
    return returnedClassData;
}

function clearNavBarClasses(){
    var joinNavBarItem = document.getElementById("joinNavBarItem");
    // var membersNavBarItem = document.getElementById("membersNavBarItem");
    var officersNavBarItem = document.getElementById("officersNavBarItem");
    var aboutNavBarItem = document.getElementById("aboutNavBarItem");
    joinNavBarItem.className = "";
    // membersNavBarItem.className = "";
    officersNavBarItem.className = "";
    aboutNavBarItem.className = "";
}

function updateNavbarToMembersPage(){
    var membersNavBarItem = document.getElementById("membersNavBarItem");
    clearNavBarClasses();

    membersNavBarItem.className = "active";
}

function updateNavbarToOfficersPage(){
    var officersNavBarItem = document.getElementById("officersNavBarItem");
    clearNavBarClasses();

    officersNavBarItem.className = "active";
}

function updateNavbarToJoinPage(){
    var joinNavBarItem = document.getElementById("joinNavBarItem");
    clearNavBarClasses();

    joinNavBarItem.className = "active";
}

function updateNavbarToAboutPage(){
    var aboutNavBarItem = document.getElementById("aboutNavBarItem");
    clearNavBarClasses();

    aboutNavBarItem.className = "active";
}

function updateNavbarToPracPage(){
    var pracschedNavBarItem = document.getElementById("pracschedNavBarItem");
    clearNavBarClasses();

    pracschedNavBarItem.className = "active";
}

function updateNavbarToRacePage(){
    var raceNavBarItem = document.getElementById("raceschedNavBarItem");
    clearNavBarClasses();

    raceNavBarItem.className = "active";
}

function updateNavbarToResultsPage(){
    var resultsNavBarItem = document.getElementById("resultsNavBarItem");
    clearNavBarClasses();

    resultsNavBarItem.className = "active";
}

function concatinateMemberList(memberData){
    var memberInformationForDisplay = "";
    var memberCardPrefix = "<div class=\"panel panel-default\">", memberCardPostfix = "</div>",
        memberTitlePrefix = "<div class=\"panel-heading\">",memberTitlePostfix="</div>",
        memberInformationPrefix = " <div class=\"panel-body\">", memberInformationPostfix = "</div>"
        memberTitleAndGraduationPrefix = "<b>",memberTitleAndGraduationPostfix="</b>",memberTitleGraduationDash= " - ",
        memberPhotoPrefix = "<img src=\"", memberPhotoPostfix = "\"  class=\"img-responsive img-rounded member-image pull-left\">",
        memberBioPrefix = "<p>", memberBioPostfix = "</p>",
        memberRowPrefix="<div class=\"row\">",memberRowPostfix="</div>",
        memberColPrefix="<div class=\"col-md-6 col-md-offset-3\">",memberColPostfix="</div>",
        memberMajorPrefix = "",memberMajorPostfix = "";

        var memberInformation = new Firebase('https://rutgerstriteam.firebaseio.com/Members/'+memberData);

        var memberName = "";

        console.log('https://rutgerstriteam.firebaseio.com/Members/'+memberData);
        memberInformation.on('value', function(snapshot) {
            memberInfoSnapshot = snapshot.val();
        });



        for(member in memberInfoSnapshot){
            var individualMemberInformation = new Firebase('https://rutgerstriteam.firebaseio.com/Members/'+memberData + '/' + member);
            var memberMajor = "";

            individualMemberInformation.on('value', function(snapshot) {
                memberMajor = snapshot.val();
            });

            memberInformationForDisplay = memberInformationForDisplay.concat(memberRowPrefix,
            memberColPrefix,
            memberCardPrefix,
            memberInformationPrefix,
            "<h4>",
            memberTitleAndGraduationPrefix,
            member,
            memberTitleAndGraduationPostfix,
            memberTitleGraduationDash,
            memberMajorPrefix,
            memberMajor,
            memberMajorPostfix,
            "</h4>",
            memberInformationPostfix,
            memberCardPostfix,
            memberColPostfix,
            memberRowPostfix);
        }
        // console.log(memberInformationForDisplay);
        return memberInformationForDisplay;
    }
