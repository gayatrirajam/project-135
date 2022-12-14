status = "";
objects = {};

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd');
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectneeded = document.getElementById("name_input").value;
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}
function draw(){
    image(video, 0, 0, 480, 380);
}
