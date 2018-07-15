
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
    },
}

//***************************************************************/
$(document).ready(function() {
//***************************************************************/
    
        var arrWords = [];
    
            TheLibrary.InitializeFirestore();
            var db = TheLibrary.database,
                docRef = db.collection("Library").doc("g0uw83YLJsQcMegopfVy");

            docRef.get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                
                    var pages = doc.data().BookPages,
                        pgCounter = 1,
                        tagText = '',
                        tagStyle,
                        tag,
                        element,
                        page;

                    pages.forEach(function(item, id) {
                        console.log("id = " + id)
                        console.log("item = " + item)
                        if (id > 0) {

                                tagText = '';
                                tagText += '<p>Page ' + pgCounter.toString() + '</p>'

                                tagStyle = '<div style="background-image: url(' + "'images/pg" + pgCounter.toString() + ".JPG')" + '" />'
                                console.log(tagStyle)
                                element = $(tagStyle).html(tagText);
                                console.log(element)
                                $("#Caterpillar").turn("addPage", element, pgCounter+3)

                                tagText = '';
                                page = (id * 2)
                                tagText += '<p>Page ' + page.toString() + '</p><p>'

                                arrWords = item.split(',');
                                console.log(item)
                                arrWords.forEach(function(word) {
                                    console.log(word)
                                    tagText += '<a href="#" class="wordLink" text="'+word+'">';
                                    tagText += word + '</a> '
                                });

                                tagText +='</p>'

                                pgCounter += 2;
                                console.log("page = " + pgCounter)
                        }
                        element = $("<div />").html(tagText);
                        $("#Caterpillar").turn("addPage", element, page+3)
                    })

                    console.log(tagText)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            }); 
    });
    
    $(document).on('click', 'a', function(e) {
        e.preventDefault(); 
    
        
        var word = $(this).attr("text");
    
        AWS.config.region = 'us-west-1';
        AWS.config.accessKeyId = 'AKIAI2EZ7T5G64IDZQ6Q';
        AWS.config.secretAccessKey = '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';
    
        var polly = new AWS.Polly({apiVersion: '2016-06-10'});
        // Create the Speaker instance
    
        var params = {
            OutputFormat: 'mp3',
            Text: word,
            VoiceId: 'Kendra',
            SampleRate: '22050',
            TextType: 'text'
        };
    
        polly.synthesizeSpeech(params, function(err, data) {
            if (err) 
              console.log(err, err.stack); // an error occurred
            else {   
                var buf = data.AudioStream.toString('base64');
                var snd = new Audio("data:audio/mp3;base64," + buf);
                snd.play();
            }
        });

        return false; 
    });


$(window).ready(function() {
    console.log("onWindow")
    $('#Caterpillar').turn({
        display: 'double',
        acceleration: true,
        gradients: !$.isTouch,
        elevation:50,
        when:   {
                    turned: function(e, page) {
                    /*console.log('Current view: ', $(this).turn('view'));*/
                    }
                }
     });
});

$(window).bind('keydown', function(e){
    if (e.keyCode==37)
        $('#Caterpillar').turn('previous');
    else if (e.keyCode==39)
        $('#Caterpillar').turn('next');
});

// var music = document.getElementById("music")
// music.volume = 0.05;
// var titleAudio = document.getElementById("titlePage")
// var pg2 = document.getElementById("pga2")
// var pg4 = document.getElementById("pga4")
// var pg6 = document.getElementById("pga6")
// var pg8 = document.getElementById("pga8")
// var pg10 = document.getElementById("pga10")
//     pg10.volume = 1;
// var pg12 = document.getElementById("pga12")
// var pg14 = document.getElementById("pga14")
// var pg16 = document.getElementById("pga16")
// var pg18 = document.getElementById("pga18")
// var pg20 = document.getElementById("pga20")
// var pg22 = document.getElementById("pga22")
// var pg24 = document.getElementById("pga24")
// var pg26 = document.getElementById("pga26")
// var pg28 = document.getElementById("pga28");
// var pg30 = document.getElementById("pga30")
// var pg32 = document.getElementById("pga32")
// var pg34 = document.getElementById("pga34")
// var pg36 = document.getElementById("pga36")
// var pg38 = document.getElementById("pga38")
// var pg40 = document.getElementById("pga40")
// var pg42 = document.getElementById("pga42")
// var pg44 = document.getElementById("pga44")
// var pg46 = document.getElementById("pga46")
// var myAudio = document.getElementById("testAudio");
// var audio2 = document.getElementById("testAudio2")


// $("#test").on("click", function(){
//       pg2.play();
//       console.log("Value")
// })


$("#Caterpillar").bind("turning", function(event, page) {
    
    var audio = {};

    if (page == 1) {
        audio["music"] = new Audio();
        audio["music"].src = "audio/music.mp3";

        audio["music"].pause();
    }
    if (page == 2) {
        audio["music"].play();

        audio["title"] = new Audio();
        audio["title"].src = "audio/TITLE.mp3";
        audio["title"].play();
    }
    if (page == 4) {
        audio["title"].pause();

        audio["pg2"] = new Audio();
        audio["pg2"].src = "audio/pg2.mp3";
        audio["pg2"].play();
    }
    if (page == 6) {
        audio["pg2"].pause();

        audio["pg4"] = new Audio();
        audio["pg4"].src = "audio/pg4.mp3";
        audio["pg4"].play();
    }
    if (page == 8) {
        audio["pg4"].pause();

        audio["pg6"] = new Audio();
        audio["pg6"].src = "audio/pg6.mp3";
        audio["pg6"].play();
    }
    if (page == 10) {
        audio["pg6"].pause();

        audio["pg8"] = new Audio();
        audio["pg8"].src = "audio/pg8.mp3";
        audio["pg8"].play();
    }
    if (page == 12) {
        audio["pg8"].pause();

        audio["pg10"] = new Audio();
        audio["pg10"].src = "audio/pg10.mp3";
        audio["pg10"].play();
    }
    if (page == 14) {
        audio["pg10"].pause();

        audio["pg12"] = new Audio();
        audio["pg12"].src = "audio/pg12.mp3";
        audio["pg12"].play();
    }
    if (page == 16) {
        audio["pg12"].pause();

        audio["pg14"] = new Audio();
        audio["pg14"].src = "audio/pg14.mp3";
        audio["pg14"].play();
    }
    if (page == 18) {
        audio["pg14"].pause();

        audio["pg16"] = new Audio();
        audio["pg16"].src = "audio/pg16.mp3";
        audio["pg16"].play();
    }
    if (page == 20) {
        audio["pg16"].pause();

        audio["pg18"] = new Audio();
        audio["pg18"].src = "audio/pg18.mp3";
        audio["pg18"].play();
    }
    if (page == 22) {
        audio["pg18"].pause();

        audio["pg20"] = new Audio();
        audio["pg20"].src = "audio/pg20.mp3";
        audio["pg20"].play();
    }
    if (page == 24) {
        audio["pg20"].pause();

        audio["pg22"] = new Audio();
        audio["pg22"].src = "audio/pg22.mp3";
        audio["pg22"].play();
    }
    if (page == 26) {
        audio["pg22"].pause();

        audio["pg24"] = new Audio();
        audio["pg24"].src = "audio/pg24.mp3";
        audio["pg24"].play();
    }
    if (page == 28) {
        audio["pg24"].pause();

        audio["pg26"] = new Audio();
        audio["pg26"].src = "audio/pg26.mp3";
        audio["pg26"].play();
    }
    if (page == 30) {
        audio["pg26"].pause();

        audio["pg28"] = new Audio();
        audio["pg28"].src = "audio/pg28.mp3";
        audio["pg28"].play();
    }
    if (page == 32) {
        audio["pg28"].pause();

        audio["pg30"] = new Audio();
        audio["pg30"].src = "audio/pg30.mp3";
        audio["pg30"].play();
    }
    if (page == 34) {
        audio["pg30"].pause();

        audio["pg32"] = new Audio();
        audio["pg32"].src = "audio/pg32.mp3";
        audio["pg32"].play();
    }
    if (page == 36) {
        audio["pg32"].pause();

        audio["pg34"] = new Audio();
        audio["pg34"].src = "audio/pg34.mp3";
        audio["pg34"].play();
    }
    if (page == 38) {
        audio["pg34"].pause();

        audio["pg36"] = new Audio();
        audio["pg36"].src = "audio/pg36.mp3";
        audio["pg36"].play();
    }
    if (page == 40) {
        audio["pg36"].pause();

        audio["pg38"] = new Audio();
        audio["pg38"].src = "audio/pg38.mp3";
        audio["pg38"].play();
    }
    if (page == 42) {
        audio["pg38"].pause();

        audio["pg40"] = new Audio();
        audio["pg40"].src = "audio/pg40.mp3";
        audio["pg40"].play();
    }
    if (page == 44) {
        audio["pg40"].pause();

        audio["pg42"] = new Audio();
        audio["pg42"].src = "audio/pg42.mp3";
        audio["pg42"].play();
    }
    if (page == 46) {
        audio["pg42"].pause();

        audio["pg44"] = new Audio();
        audio["pg44"].src = "audio/pg44.mp3";
        audio["pg44"].play();
    }
    if (page == 48) {
        audio["pg44"].pause();

        audio["pg46"] = new Audio();
        audio["pg46"].src = "audio/pg46.mp3";
        audio["pg46"].play();
    }
    if (page == 49) {
        audio["music"].pause();
    }
});