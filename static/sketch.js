// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/EFUVLU9pU/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

let videoIsOn = false;


// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
    var canvas = createCanvas(450, 358);
    canvas.parent('sketch-holder');
    // Create the video
    video = createCapture(VIDEO);
    video.size(450, 338);
    video.hide();

    flippedVideo = ml5.flipImage(video)
    // Start classifying
    classifyVideo();
}

function draw() {
    background(0);
    // Draw the video
    if (videoIsOn) {
        image(flippedVideo, 0, 0);

        // Draw the label
        fill(255);
        textSize(16);
        textAlign(CENTER);
        text(label, width / 2, height - 4);
    }
    else{
        background(50);
        fill(255);
        textSize(16);
        textAlign(CENTER);
        text("Click to start video", width/2, height/2);
    }
}

function mousePressed(){
    videoIsOn = !videoIsOn;
    if(videoIsOn) video.play();
    else video.stop();
}
// Get a prediction for the current video frame
    function classifyVideo() {
        flippedVideo = ml5.flipImage(video)
        classifier.classify(flippedVideo, gotResult);
    }

// When we get a result
    function gotResult(error, results) {
        // If there is an error
        if (error) {
            console.error(error);
            return;
        }
        // The results are in an array ordered by confidence.
        // console.log(results[0]);
        label = results[0].label;
        // Classifiy again!
        classifyVideo();
    }