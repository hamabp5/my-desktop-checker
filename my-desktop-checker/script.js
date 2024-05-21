let model, webcam, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = 'model/model.json';
    const metadataURL = 'model/metadata.json';
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Setup webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(640, 480, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById('webcam').appendChild(webcam.canvas);
}

async function loop() {
    webcam.update(); // update the webcam frame
    window.requestAnimationFrame(loop);
}

// Run the webcam image through the image model
async function classify() {
    const prediction = await model.predict(webcam.canvas);
    const resultElement = document.getElementById('result');
    if (prediction[0].probability > prediction[1].probability) {
        resultElement.textContent = "整頓されている";
    } else {
        resultElement.textContent = "散らかっている";
    }
}

document.getElementById('classifyButton').addEventListener('click', classify);

init();
