objects =[];
Status="";
video="";

function setup()
{
    canvas = createCanvas(400, 380);
    canvas.center();
}

function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(Status!="")
    {
        objectDetector.detect(video, gotResults);
    }

    for(i = 0; i < objects.length; i++)
    {
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are: ";

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + ""+ percent+ "%" + objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        Reflect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded Successfully!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume();
}