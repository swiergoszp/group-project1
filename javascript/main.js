var TheLibrary = {
    database: {},

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
    }
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
    var db = TheLibrary.database,
        docRef = db.collection("Users").doc("QQREabSxqubD0egD3as3"),
        txtOwned;

        docRef.get().then(function(doc) {
            if (doc.exists) {
            
                var ParentFirst = doc.data().ParentFirstName,
                    AddressCity = doc.data().AddressCity,
                    AddressState  = doc.data().AddressState,
                    AddressZip = doc.data().AddresZip,
                    ChildName = doc.data().ChildName,
                    ChildBday = doc.data().ChildBirthday,
                    BooksOwned = [],
                    element;


                $("#page-header").text("Just For " + ChildName)
                $("#child-name").text("Hi, " + ChildName + "!");
                $("#child-age").text(GetAge(ChildBday).toString() + " Years Old");
                
                BooksOwned = doc.data().BooksOwned;
                txtOwned = 'Today, you can read ';

                BooksOwned.forEach(function(item, id) {
                    var docRef2 = db.collection("Library").doc(item);
                    var getOptions = {
                        source: 'server'
                    };

                    docRef2.get(getOptions).then(function(doc) {
                        
                        if (doc.exists) {

                            // txtOwned += doc.data().BookTitle;

                            // if ((id+1) < BooksOwned.length)
                            //     txtOwned += ', ';
                            // if ((id+1) == (BooksOwned.length - 1))
                            //     txtOwned += 'or '
                            //element = $("<li>")
                            element = doc.data().BookTitle
                            $("#books-list").append("<li> - "+element+"</li>");
                        }
                        else {
                            // doc.data() will be undefined in this case
                            console.log('does not exist')
                        }
                    }).catch(function(error){
                        console.log("Error getting document: ", error);
                    });
                });
            } else {
                // doc.data() will be undefined in this case
                console.log('does not exist')
            }
        }).catch(function(error) {
            console.log("Error getting document: ", error);
        });
});

//***************************************************************/
function GetAge(dateString) {
//***************************************************************/

    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}