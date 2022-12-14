status = "";
objects = [];

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(480, 380);
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectneeded = document.getElementById("name_input").value;
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
        if(objectneeded == objects[i].label){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML = "Object Mentioned Found!";
            var synth = window.speechSynthesis;
            speak_data = "Object mentioned found";
            var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
        }
        else{
            document.getElementById("status").innerHTML = "Object Mentioned Not Found In Camera";
        }
    }
}
}
