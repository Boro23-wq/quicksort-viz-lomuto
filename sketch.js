//LOMUTO PARTITION SCHEME
//the idea is we select a pivotIndex and a pivotValue
//and check if the element is less than pivotValue
//if it is then swap the element at i with the pivotIndex
//and increment the pivotIndex for further recursive calls
let values = [];
let w = 10;
let states = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;  
  }
  frameRate = 5;
  quickSort(values, 0, values.length - 1);
}

//quick sort function
async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }

  let index = await partition(arr, start, end);
  states[index] = -1;

  Promise.all([
    await quickSort(arr, start, index - 1),
    await quickSort(arr, index + 1, end),
  ]);
}

//partition function (finding the pivot and sort)
async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }
  let pivotIndex = start;
  let pivotValue = arr[end];
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);
  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }
  return pivotIndex;
}

// draw function
function draw() {
  background(51);

  for (let i = 0; i < values.length; i++) {
    stroke(0);
    fill(255);
    if (states[i] === 0) {
      fill('#ff0000');
    } else if (states[i] === 1) {
      fill('#ffb2b2');
    } else {
      fill(255);
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}

//swap function
async function swap(arr, a, b) {
  await sleep(30);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
