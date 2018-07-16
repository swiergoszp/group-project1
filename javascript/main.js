var TheLibrary = {
    database: {},
    AddressCity: '',
    AddressState: '',
    AddressZip: '',
    ChildName: '',
    ChildBday: '',
    BooksOwned: [],

    InitializeFirestore: function() {
    
        var config = {
            apiKey: "AIzaSyAQVjicHyIwQPcNATlFN5GAbvP66T1-8Q0",
            authDomain: "kidreadsproject.firebaseapp.com",
            databaseURL: "https://kidreadsproject.firebaseio.com",
            projectId: "kidreadsproject",
            storageBucket: "kidreadsproject.appspot.com",
            messagingSenderId: "735646109840"
        };

        firebase.initializeApp(config);
          
        // Initialize Cloud Firestore through Firebase
        this.database = firebase.firestore();
    },

    SetPageData: function() {

        var db = TheLibrary.database,
            UserInfo,
            BooksInfo,
            element;

        db.collection("Users").where(firebase.firestore.FieldPath.documentId(),"==","QQREabSxqubD0egD3as3")
        .get()
        .then(function(data) {

            UserInfo = data.docs.map(doc => doc.data());

            this.AddressCity = UserInfo[0].AddressCity;
            this.AddressState = UserInfo[0].AddressState;
            this.AddressZip = UserInfo[0].AddresZip;
            this.ChildName = UserInfo[0].ChildName;
            this.ChildBday = UserInfo[0].ChildBirthday;
            this.BooksOwned = UserInfo[0].BooksOwned;

            $("#page-header").text("Just For " + this.ChildName);
            $("#child-name").text("Hi, " + this.ChildName + "!");
            $("#child-age").text(GetAge(this.ChildBday).toString() + " Years Old");


            this.BooksOwned.forEach(function(item, id) {

                db.collection("Library").where(firebase.firestore.FieldPath.documentId(),"==",item)
                .get()
                .then (function(data) {

                    BooksInfo = data.docs.map(doc => doc.data());

                    console.log(BooksInfo)
                    element = $("<li>");
                    element = BooksInfo[0].BookTitle;
                    $("#books-list").append("<li> - "+element+"</li>");
                });
            }); 
        });
    },
};


//***************************************************************/
$(document).ready(function() {
//***************************************************************/

    // sets up click event for adding book to personal library
    $(".get-book-button").on("click", function() {
        
    // the class here changes to whichever slide is in the main position
        var book = $(".swiper-slide-active").val().trim();
    });

    // sets up click event for adding book to wishlist
    $(".wishlist-button").on("click", function() {
        
        // the class here changes to whichever slide is in the main position
        var book = $(".swiper-slide-active").text();
    });

    TheLibrary.InitializeFirestore();
    TheLibrary.SetPageData();
});


//***************************************************************/
function GetAge(dateString) {
//***************************************************************/

    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        age--;

    return age;
}