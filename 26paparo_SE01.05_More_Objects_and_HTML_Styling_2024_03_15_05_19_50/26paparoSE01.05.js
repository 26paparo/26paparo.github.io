//header comment

//declare variables
let colorPicker; //variable used to access the ColorPicker control
let colorPicker2;
let colorPicker3;
let clearButton; //variable used to access the Button control
let shapeSelector; //variable used to access the dropdown Select control
let sizeSlider; //variable used to access the Slider control
let imageSelector; //variable used to access a Select dropdown control for images
let controlsContainer; //this is an html section in the index.html file!
let controlsContainer2;
let sliderValue; //this is the value of the slider which sets the paintbrush size
let currentShape = "draw"; //variable to decide the shape of the paintbrush
let images = []; //collection of images that you can draw on
let currentImage; //the image selected to draw on
let selectedImage; //currently selected image
let currentColor;
let saveButton;

//create an array of objects with two fields, file and description 
//#0.1 enter the following array code into *AI* to have it explain it to you
//#0.2 Find 5 images for your theme and load them into the assets folder
let imageFiles = [
  { file: 'assets/coloring1.jpeg', 
   description: 'Coloring Page 1' },
  { file: 'assets/coloring2.jpeg', 
   description: 'Coloring Page 2' },
  { file: 'assets/easymaze.png', 
   description: 'Easy Maze' },
  { file: 'assets/hardmaze.webp', 
   description: 'Harder Maze' },
  { file: 'assets/tictactoe.jpeg', 
   description: 'Tic Tac Toe' }
];

//preload images for asynchronous web
//#1.1 enter the following code into *AI* to explain it to you
function preload() {
  for (let file of imageFiles){
    images.push(loadImage(file.file)); //load each image
  }
} //end function preload()

//initialize variables and setup program
function setup() {
  //update the title in the index.html file from Processing!
  let bannerDiv = select('#app-header');
  bannerDiv.html('Coloring and Activity Book'); //#2 Change to your themed title
  
  let canvas = createCanvas(500, 400);
  let canvasContainer = select("#canvasContainer");
  canvas.parent("canvasContainer");
  
  let controlsContainer = select("#controlsContainer"); //look in the index.html file
  background("white");

  //create a color picker
  colorPicker = createColorPicker("#000000"); //#3.1 Change the default color
  colorPicker.parent(controlsContainer);
  
  colorPicker.mousePressed(() => {
    currentColor = colorPicker.color();
  } );
  
  colorPicker.input(() => {
  currentColor = colorPicker.color();
});
  
  let controlsContainer2 = select("#controlsContainer2"); //look in the index.html file
  background("white");

  //create a color picker
  colorPicker2 = createColorPicker("pink"); //#3.1 Change the default color
  colorPicker2.parent(controlsContainer);
  
  colorPicker2.mousePressed(() => {
    currentColor = colorPicker2.color();
  } );
  
   colorPicker2.input(() => {
  currentColor = colorPicker2.color();
});
  
  
  let controlsContainer3 = select("#controlsContainer3"); //look in the index.html file
  background("white");

  //create a color picker
  colorPicker3 = createColorPicker("lightblue"); //#3.1 Change the default color
  colorPicker3.parent(controlsContainer);
  
  colorPicker3.mousePressed(() => {
    currentColor = colorPicker3.color();
  } );
  
 colorPicker3.input(() => {
  currentColor = colorPicker3.color();
});
  
  //create a clear button
  clearButton = createButton("Clear").parent(controlsContainer);
  clearButton.mousePressed(clearCanvas); //assign a function

  //create a shape selector dropdown
  //*** createSelect() ***//
  shapeSelector = createSelect().parent(controlsContainer);
  //add the dropdown options!
  shapeSelector.option("draw");
  shapeSelector.option("circle");
  shapeSelector.option("square");
  shapeSelector.option("triangle");
  shapeSelector.option("diamond");

  //create a size slider
  sizeSlider = createSlider(1, 100, 5).parent(controlsContainer2);
  
  //create a paragraph for slider value display
  sliderValueDisplay = createSpan("size: " + sizeSlider.value()).parent(
    controlsContainer2
  );
  sliderValueDisplay.style("margin-left", "10px"); //add margin for spacing
  sliderValueDisplay.style("flex-shrink", "0"); //prevent the span from shrinking

  //*** getting value from slider to label ***//
  sizeSlider.input(() => {
    sliderValueDisplay.html("size: " + sizeSlider.value());
  });

  //create an image selector dropdown
  imageSelector = createSelect().parent(controlsContainer2);
  //populate image selector (assuming you have an array of image names)
  //populate the selector with options using descriptions
  imageFiles.forEach((file, index) => {
    imageSelector.option(file.description, index.toString());
  });

  imageSelector.changed(onImageSelect); //event handler for selection

} //end function setup()

//use variables to have fun
function draw() {
  if (mouseIsPressed) {
    drawShape();
  }
  saveButton = createButton("Save");
  saveButton.position(440,70);
  saveButton.style('white');
  
  saveButton.mousePressed(saveCanvas);
  saveButton.html('Save');
} //end function draw()

//draw the selected shape
//*** drawShape() ***//
function drawShape() {
  let size = sizeSlider.value();
  noStroke();
  
  //*** switch ***// 
  switch (shapeSelector.value()) {
    case "draw":
      stroke(currentColor);
      strokeWeight(size);
      line(pmouseX, pmouseY, mouseX, mouseY);
      break;
    case "circle":
      ellipse(mouseX, mouseY, size, size);
      break;
    case "square":
      rect(mouseX, mouseY, size, size);
      break;
    case "triangle":
      triangle(
        mouseX, mouseY,
        mouseX + size, mouseY,
        mouseX + size / 2, mouseY - size
      );
      break;
    case "diamond":
      quad(
        mouseX, mouseY - size / 2,
        mouseX + size / 2, mouseY,
        mouseX, mouseY + size / 2,
        mouseX - size / 2, mouseY
      );
      break;
  }
} //end function drawShape()

//clear the canvas
function clearCanvas() {
  clear();
  background(255);
} //end function clearCanvas()

//function to handle image selection - this function is mapped to the control
function onImageSelect() {
  const selectedIndex = parseInt(imageSelector.value(), 10);
  selectedImage = images[selectedIndex];
  clearCanvas();
  //displaying the image at width, height below changes the image. 
  //build an algorithm to set the height or width in the resize function.
  image(selectedImage, 0, 0, width, height);
}//end function onImageSelect()

function saveButtonPressed() {
  saveCanvas = true;
  canvas.saveCanvas();
}