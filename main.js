prediction_1 = "";
prediction_2 = "";

Webcam.set
({ 
    width:350,
    height:300,
    image_format: 'png', 
    png_quality:90 
})

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot() 
{ Webcam.snap(function(data_uri) 
    { document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'; 
}); 
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/oQsvfVrq3/model.json',modelLoaded);

function modelLoaded() {
console.log('Model Loaded!');
}

function speak() {
var synth = window.SpeechSynthesis;
speakData1 = "A primeira previsão é" + prediction_1;
speakData2 = "E a segunda previsão é" + prediction_2;
var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
synth.speak(utterThis);
}

function check() {
img = document.getElementById('captured_image'); 
classifier.classify(img, gotResult);
}

function gotResult(error,results) {
if(error)
{
    console.log(error);
}
else
{
    console.log(results);
    document.getElementById("resultEmotionName").innerHTML = results[0].label;
    document.getElementById("resultEmotionName2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();

    //primeira previsão
    if(result[0].label == "feliz")
    {
        document.getElementById("updateEmoji").innerHTML="&#128522;";
    }
    if(result[0].label == "triste")
    {
        document.getElementById("updateEmoji").innerHTML="&#128532;";
    }
    if(result[0].label == "irritado")
    {
        document.getElementById("updateEmoji").innerHTML="&#128545;";
    }

    //segunda previsão
    if(result[1].label == "feliz")
    {
        document.getElementById("updateEmoji2").innerHTML="&#128522;";
    }
    if(result[1].label == "triste")
    {
        document.getElementById("updateEmoji2").innerHTML="&#128532;";
    }
    if(result[1].label == "irritado")
    {
        document.getElementById("updateEmoji2").innerHTML="&#128545;";
    }
}

}

