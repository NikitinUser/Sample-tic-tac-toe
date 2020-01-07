var playerMes = "X";
var timer;
function gameOver(){
	let arrBtn = new Array();
	for(var i=1;i<10;i++){
		arrBtn[i] = document.querySelector('#send'+i).value;
	}
	let arrBtnDis = new Array();
	for(var i=1;i<10;i++){
		arrBtnDis[i] = document.querySelector('#send'+i).disabled;
	}
	if( 
		( 
		( ( arrBtn[1] == arrBtn[2] && arrBtn[1] == arrBtn[3] ) && arrBtn[1] != '') || 
		( ( arrBtn[4] == arrBtn[5] && arrBtn[4] == arrBtn[6] ) && arrBtn[4] != '') || 
		( ( arrBtn[7] == arrBtn[8] && arrBtn[7] == arrBtn[9] ) && arrBtn[7] != '') ||
		( ( arrBtn[1] == arrBtn[4] && arrBtn[1] == arrBtn[7] ) && arrBtn[1] != '') || 
		( ( arrBtn[2] == arrBtn[5] && arrBtn[2] == arrBtn[8] ) && arrBtn[2] != '') || 
		( ( arrBtn[3] == arrBtn[6] && arrBtn[3] == arrBtn[9] ) && arrBtn[3] != '') ||
		( ( arrBtn[1] == arrBtn[5] && arrBtn[1] == arrBtn[9] ) && arrBtn[1] != '') || 
		( ( arrBtn[3] == arrBtn[5] && arrBtn[3] == arrBtn[7] ) && arrBtn[3] != '') 
		) ||

		( arrBtnDis[1] == true && arrBtnDis[2] == true && arrBtnDis[3] == true && arrBtnDis[4] == true &&
		  arrBtnDis[5] == true && arrBtnDis[6] == true && arrBtnDis[7] == true && arrBtnDis[8] == true &&
		  arrBtnDis[9] == true 
		) 
		){
		for(var i=1;i<10;i++){
			document.querySelector('#send'+i).disabled = true;
		}
		ajaxClear('gameOver.php');
		clearInterval(timer);

	}
}

window.onload = function(){
	
	 
	document.querySelector('#gameX').onclick = function(){
		document.querySelector('#gameO').checked= false;
		playerMes = "X";
	}

	document.querySelector('#gameO').onclick = function(){
		document.querySelector('#gameX').checked= false;
		playerMes = "O";
	}

	document.querySelector('#gameOn').onclick = function(){
		document.querySelector('#gameOn').style.visibility = "hidden";
		document.querySelector('.radioDiv').style.visibility = "hidden";
		document.querySelector('#gameOff').style.visibility = "visible";
		document.querySelector('.gameField').style.visibility = "visible";
		timer = setInterval(answer, 1000);
		for(var i=1;i<10;i++){
			document.querySelector('#send'+i).disabled = false;
		}
	}
	document.querySelector('#gameOff').onclick = function(){
		document.querySelector('#gameOn').style.visibility = "visible";
		document.querySelector('.radioDiv').style.visibility = "visible";
		document.querySelector('#gameOff').style.visibility = "hidden";
		for(var i=1;i<10;i++){
			document.querySelector('#send'+i).value = '';
		}
		document.querySelector('.gameField').style.visibility = "hidden";
		clearInterval(timer);
		ajaxClear('gameOver.php');
	}
	
	document.querySelector('#send1').onclick = function(){
		sendMes('send1')
	}

	document.querySelector('#send2').onclick = function(){
		sendMes('send2')
	}

	document.querySelector('#send3').onclick = function(){
		sendMes('send3')
	}

	document.querySelector('#send4').onclick = function(){
		sendMes('send4')
	}

	document.querySelector('#send5').onclick = function(){
		sendMes('send5')
	}

	document.querySelector('#send6').onclick = function(){
		sendMes('send6')
	}

	document.querySelector('#send7').onclick = function(){
		sendMes('send7')
	}

	document.querySelector('#send8').onclick = function(){
		sendMes('send8')
	}

	document.querySelector('#send9').onclick = function(){
		sendMes('send9')
	}
}

function sendMes(el){
	var params = 'inpMes=' + playerMes + '&' + 'id=' + el;
	ajaxPost('inp.php', params);
}


function ajaxPost(url, params){
	var request = new XMLHttpRequest();
	request.open('POST', url);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.send(params);
}

function answer(){
	gameOver();
	ajaxGet('out.php', function(data){
		if(data != ''){
			document.querySelector('#'+data[1]).value = data[0];
			document.querySelector('#'+data[1]).disabled = true;
		} 
	});
}

function ajaxGet(url, callback){
	var f = callback || function(data){};
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function(){
		if (request.readyState==4 && request.response != ''){
			var myObj = JSON.parse(request.response);
			f(myObj);
		}
	}
	
	request.open('GET', url);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.send();
}

function ajaxClear(url){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if (request.readyState==4 && request.response != ''){
			document.querySelector('#gameOver').innerHTML = request.responseText;
		}
	}
	request.open('GET', url);
	request.send();
}
