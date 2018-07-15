
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
                
                    var pages = doc.data().BookPages,
                        pgCounter = 1,
                        tagText = '',
                        tagStyle,
                        element,
                        page;

                    pages.forEach(function(item, id) {
                        if (id > 0) {

                                tagStyle = '<div style="background-image: url(' + "'images/pg" + pgCounter.toString() + ".JPG')" + '" />'
                                element = $(tagStyle);
                                $("#Caterpillar").turn("addPage", element, pgCounter+3)

                                tagText = '';
                                page = (id * 2)
                                tagText += '<p style="font-size:24px !important;padding:15px;text-align:center;">Page ' + page.toString() + '</p><p>'

                                arrWords = item.split(' ');
                                arrWords.forEach(function(word) {
                                    tagText += '<a style="font-size:48px !important;padding:15px;" href="#" class="wordLink" text="'+word+'">';
                                    tagText += word + '</a> '
                                });

                                tagText +='</p>'
                                pgCounter += 2;
                        }
                        element = $('<div class="text-center"/>').html(tagText);
                        $("#Caterpillar").turn("addPage", element, page+3)
                    })
                } else {
                    // doc.data() will be undefined in this case
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

var music = document.getElementById("music")
music.volume = 0.05;
var titleAudio = document.getElementById("titlePage")
var pg2 = document.getElementById("pga2")
var pg4 = document.getElementById("pga4")
var pg6 = document.getElementById("pga6")
var pg8 = document.getElementById("pga8")
var pg10 = document.getElementById("pga10")
    pg10.volume = 1;
var pg12 = document.getElementById("pga12")
var pg14 = document.getElementById("pga14")
var pg16 = document.getElementById("pga16")
var pg18 = document.getElementById("pga18")
var pg20 = document.getElementById("pga20")
var pg22 = document.getElementById("pga22")
var pg24 = document.getElementById("pga24")
var pg26 = document.getElementById("pga26")
var pg28 = document.getElementById("pga28");
var pg30 = document.getElementById("pga30")
var pg32 = document.getElementById("pga32")
var pg34 = document.getElementById("pga34")
var pg36 = document.getElementById("pga36")
var pg38 = document.getElementById("pga38")
var pg40 = document.getElementById("pga40")
var pg42 = document.getElementById("pga42")
var pg44 = document.getElementById("pga44")
var pg46 = document.getElementById("pga46")
var myAudio = document.getElementById("testAudio");
var audio2 = document.getElementById("testAudio2")


$("#test").on("click", function(){
      pg2.play();
})
var pg1Playing = false;

$("#Caterpillar").bind("turning", function(event, page) {
if (page == 1){
    music.pause()
}
if(page == 2) {
    music.play()
    titleAudio.play()
}
if (page == 4){
    titleAudio.pause();
     pg2.play();
}
if (page == 6){
    pg2.pause();
    pg4.play();
}
if (page == 8){
    pg4.pause()
    pg6.play()
}
if (page == 10){
    pg6.pause();
    pg8.play()
}
if(page== 12){
    pg8.pause()
    pg10.play()
}
if (page == 14){
    pg10.pause()
    pg12.play()
}
if (page == 16 ){
    pg12.pause()
    pg14.play()
}
if (page == 18){
    pg14.pause()
    pg16.play()
}
if (page == 20){
    pg16.pause()
    pg18.play()
}
if(page == 22){
    pg18.pause()
    pg20.play()
}
if(page == 24){
    pg20.pause()
    pg22.play()
}
if (page == 26){
    pg22.pause()
    pg24.play()
}
if (page == 28){
    pg24.pause()
    pg26.play()
}
if (page == 30){
    pg26.pause()
    pg28.play()
}
if (page == 32){
    pg28.pause()
    pg30.play()
}
if (page == 34){
    pg30.pause()
    pg32.play()
}
if (page == 36) {
    pg32.pause()
    pg34.play()
}
if (page ==38){
    pg34.pause()
    pg36.play()
}
if (page == 40){
    pg36.pause()
    pg38.play()
}
if (page == 42){
    pg38.pause()
    pg40.play()
}
if (page == 44){
    pg40.pause()
    pg42.play()
}
if (page == 46){
    pg42.pause()
    pg44.play()
}
if (page == 48){
    pg44.pause()
    pg46.play()
}
if (page == 49){
    music.pause()
}
});