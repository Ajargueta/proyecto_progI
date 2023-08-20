var stepx = 0;
var stepy = 0;
var cuadros = 60;
var running = false;
var won = false;

function nineFields(size) {
  var fieldSize = size / 3;
  line(fieldSize, 0, fieldSize, size);
  line(fieldSize * 2, 0, fieldSize * 2, size);
  line(0, fieldSize, size, fieldSize);
  line(0, fieldSize * 2, size, fieldSize * 2);
}

function keyPressed(){
  var i = stepx / cuadros;
  var j = stepy / cuadros;
  var valuk  = keyCode - 96;

  if ( keyCode === UP_ARROW ) {
    if ( stepy === 0 ) {
      stepy = stepy;
    } else {
      stepy = stepy - cuadros;
    }

  } else if ( keyCode === DOWN_ARROW ) {
    if ( stepy === (cuadros * 8) ) {
      stepy = stepy; 
    } else {
      stepy = stepy + cuadros;
    }
    
  } else if ( keyCode === LEFT_ARROW ) {
    if ( stepx === 0 ) {
      stepx = stepx;  
    } else {
      stepx = stepx - cuadros;
    }
    
  } else if ( keyCode === RIGHT_ARROW ) {
    if ( stepx === (cuadros * 8)) {
      stepx = stepx;
    } else {
      stepx = stepx + cuadros;
    }
    
  }
  if (valuk > 0 && valuk < 10){
    if (field[j][i] !== valuk){
      if (answers[j][i] !== 2 ){
        var tmp = creating_families(j , i);
        var num = field[j][i];
        fams[tmp] = fams[tmp] / primes[num];
        fams[tmp] = fams[tmp] * primes[valuk];
        cols[i] = cols[i] / primes[num];
        cols[i] = cols[i] * primes[valuk];
        rows[j] = rows[j] / primes[num];
        rows[j] = rows[j] * primes[valuk];
        field[j][i] = valuk;
        checking_val(j , i);
        if (fams[tmp] === counter && cols[i] === counter && rows[j] === counter){
          won = winner();
          if (won === true){
            final_message();
          }
        }
      }
    }
  }
}

function mouseClicked(){
  if((mouseX < (cuadros * 9)) && (mouseY < (cuadros * 9))){
    stepx = mouseX - (mouseX % cuadros);
    stepy = mouseY - (mouseY % cuadros);
  }
  
}

function setup() {
  var cnv = createCanvas((cuadros * 9), (cuadros * 9));
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(83, 53);
  textSize(30);
}

function draw() {
  background('#fff');
  strokeWeight(3);
  nineFields(cuadros * 9);
  strokeWeight(1);
  push()
  for (var x = 0; x < 3; x++) {
    push()
    for (var y = 0; y < 3; y++) {
      nineFields(cuadros * 3);
      translate(0, cuadros * 3);
    }
    pop()
    translate(cuadros * 3, 0);
  }
  pop();
  push();
  strokeWeight(1);
  for (x = 0; x < 9; x++) {
    push();
    for (y = 0; y < 9; y++) {
      var col = answers[y][x];
      stroke(colors[col]);
      text(field[y][x] ? field[y][x] : '', 22, 40);
      translate(0, cuadros);
    }
    pop();
    translate(cuadros, 0);
  }
  pop();
  stroke(0, 0, 0);
  strokeWeight(2.5);
  if (running === true){
    line(stepx, stepy, stepx + (cuadros - 1), stepy);
    line(stepx + (cuadros - 1), stepy, stepx + (cuadros), stepy + (cuadros - 1));
    line(stepx + (cuadros - 1), stepy + (cuadros - 1), stepx, stepy + (cuadros - 1));
    line(stepx, stepy + (cuadros - 1), stepx, stepy);
  }
}
  