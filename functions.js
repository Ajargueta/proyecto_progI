//esta es la matriz que representa los numeros que se escriben en el grid de sudoku
var field = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0]
];

//esta matriz indica el estado de cada celda en el grid
//0 es una celda vacia
//1 es una respuesta correcta
//2 es una celda con un numero escrito al comenzar el juego(no se debe de poder modificar)
//3 es una celda con un numero erroneo escrito.
var answers = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0]
];

var counter = 1;
var colors = ['#ffffff','#000000', '#6892fa', '#ff5733', '#3cff33'];
var rows = [1,1,1,1,1,1,1,1,1];
var cols = [1,1,1,1,1,1,1,1,1];
var fams = [1,1,1,1,1,1,1,1,1];
var primes = [1,2,3,5,7,11,13,17,19,23];

var seg = 0;
var mnt = 0;
var hrs = 0;
var actual;

function creating_families(i , j){
  var k = i + 1;
  var tmp1;
  var tmp2;
  if((k % 3) === 0){
    tmp2 = (k / 3) - 1;
  }else{
    tmp2 = (k - (k % 3)) / 3;
  }
  k = j + 1;
	if ((k % 3) === 0){
		tmp1 = (k / 3);
	}else{
		tmp1 = Math.floor((k + 3) / 3);
	}
	k = (tmp1 + (tmp2 * 3)) - 1;
  return k;
}

//la funcion crea numeros aleatorios y hace la verificacion de filas, columnas y cajas usando numeros primos
function filling_field() {
  for (var i = 0; i < 9; i++){
    counter *= primes[i + 1];
    running = true;
    for(var j = 0; j < 9; j++){
      //crean un numero entre 0 y 10, para crear una probabilidad de que una casilla se llene con un numero
      var prob = Math.floor(Math.random() * 11);
      //esta decision indica que tiene una probabilidad de 4 en 10 de llenarse
      if (prob > 7){
        var found = false;
        var k = creating_families(i , j);
				var found = false;
				var skipper = 1;
				while(found == false ){
					var n = Math.floor(Math.random() * 9) + 1;
					if((rows[i] % primes[n]) !== 0 && (cols[j] % primes[n]) !== 0 && (fams[k] % primes[n]) != 0){
						rows[i] *= primes[n];
            cols[j] *= primes[n];
            fams[k] *= primes[n];
            answers[i][j] = 2;
            field[i][j] = n;
						found = true;
					}
          //esta desicion es para evitar un ciclo infinito o uno muy largo, al ser un numero random no se garantiza que se va a crear el numero optimo y puede quedar
          //atrapado durante un largo tiempo encontranto un numero que no se repita
					if (skipper === 15){
						found = true;
					}
					skipper++;
				}
      }
    }
  }
}

function checking_val(i, j){
  //var f = creating_families(i , j);
  var found = true;
  var tmp1;
  var tmp2;
  for (var l = 0; l < 9; l++){
    //comprobacion de filas
    if (j !== l){
      if(field[i][l] === field[i][j]){
        if (answers[i][l] === 1){
          answers[i][l] = 3;
        }
        found = false;
        answers[i][j] = 3;
      }else{
          if(answers[i][l] === 3){
            tmp1 = rows[i] / primes[field[i][l]];
            tmp2 = cols[l] / primes[field[i][l]];
            //field[6][7] = tmp2;
            if((tmp1 % primes[field[i][l]]) !== 0 && (tmp2 % primes[field[i][l]]) !== 0){
              answers[i][l] = 1;
              //field[7][7] = tmp2;
            }
          }
          
      }
    }
    //comprobacion de columnas
    if (i !== l){
      if(field[l][j] === field[i][j]){
        if (answers[l][j] === 1){
          answers[l][j] = 3; 
        }
        found = false;
        answers[i][j] = 3;
      }else{
        if (answers[l][j] === 3){
          tmp1 = cols[j] / primes[field[l][j]];
          tmp2 = rows[l] / primes[field[l][j]];
          if((tmp1 % primes[field[l][j]]) !== 0 && (tmp2 % primes[l][j]) !== 0){
            answers[l][j] = 1;
          }
        }
      }
    }
  }
  if (found === true){
    answers[i][j] = 1;
  }
  var x = i - (i % 3);
  var y = j - (j % 3);
  var x = i - (i % 3);
  var y = j - (j % 3);
  var r;
  var k = creating_families(i, j);
  r = fams[k] / primes[field[i][j]];
  if(answers[i][j] === 1 && (r % primes[field[i][j]]) === 0){
    answers[i][j] = 3;
  }
  
}

function winner(){
  var ans =  false;
  for(var l = 0; l < 9; l++){
    if(cols[l] !== counter && rows[l] !== counter && fams[l] !== counter){
      ans = true;
    }
  }
  if (ans === false){
    for(var x = 0; x < 9; x++){
      for(var y = 0; y < 9; y++){
        answers[x][y] = 4;
      }
    }
    return true;
  }else{
    return false;
  }
}

function finishing_game(){
  running = false;
  counter = 1;
  stepx = 0;
  stepy = 0;
  seg = 0;
  mnt = 0;
  hrs = 0;
  tiempo.innerHTML = "00:00:00";
  for(var i = 0; i < 9; i++){
    rows[i] = 1;
    cols[i] = 1;
    for(var j = 0; j < 9; j++){
      field[i][j] = 0;
      answers[i][j] = 0;
      var k = creating_families(i, j);
      fams[k] = 1;
    }
  }
}

function inicio(){
  var btn = document.getElementById("starting").value;
  if(btn === "Comenzar"){
    document.getElementById("starting").value = "Terminar";
    filling_field();
    felicidades.innerHTML = "";
    control = setInterval(timer,1000);
  }else{
    document.getElementById("starting").value = "Comenzar";
    clearInterval(control);
    finishing_game();
  }
}

function final_message(){
  clearInterval(control);
  felicidades.innerHTML = "Felicidades!!!\nResolviste el Sudoku en:\n" + actual +"!!!";
  document.getElementById("starting").value = "Comenzar";
  finishing_game();
}

function timer(){
  seg ++;
  actual = "";
  if(seg === 60){
    mnt++;
    seg = 0;
  }
  if (seg < 10){
    actual = ":0" + seg;
  }else{
    actual = ":" + seg;
  }
  if(mnt === 60){
    hrs ++;
    mnt = 0;
  }
  if (mnt < 10){
    actual = ":0" + mnt + actual;
  }else{
    actual = ":" + mnt + actual;
  }
  if(hrs < 9){
    actual = "0" + hrs + actual;
  }else{
    actual = hrs + actual;
  }
  tiempo.innerHTML = actual;
}