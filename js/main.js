"use strict";

let arst = [];
let arstX = [];

let lifebar = 104;
let backpos = 0;
let score = 0;

let playerX;
let playerY;
let playerDirY;
let playerSpeed;

function randomMe(maxx) {
	return Math.floor(Math.random() * (maxx));
}


function createPlayer() {
    let player = document.createElement("div");
    player.classList.add("ent");
    document.body.appendChild(player);

    playerX = 38;
    playerY = 0;
    playerDirY = 0;
    playerSpeed = 5;

    return player;
}


function createAsteroid(startX, startY) {
    let asteroid = document.createElement("div");
    asteroid.classList.add("ast");
    document.body.appendChild(asteroid);

    asteroid.style.left = startX + 'px';
    asteroid.style.top = startY + 'px';

    return asteroid;
}


document.body.addEventListener('keydown', function(e) {
    if (e.key === "ArrowUp")
        playerDirY = -1;

    if (e.key === "ArrowDown")
        playerDirY = 1;
});
document.body.addEventListener('keyup', function(e) {
	playerDirY = 0;
});


function collisionDetection(obj1, obj2) {
	let tobj1 = obj1.style.top;
	tobj1 = parseInt(tobj1.split("").reverse().slice(2, tobj1.length).reverse().join(""));
	let hobj1 = obj1.offsetHeight;
	let lobj1 = obj1.style.left;
	lobj1 = parseInt(lobj1.split("").reverse().slice(2, lobj1.length).reverse().join(""));
	let wobj1 = obj1.offsetWidth;

	let tobj2 = obj2.style.top;
	tobj2 = parseInt(tobj2.split("").reverse().slice(2, tobj2.length).reverse().join(""));
	let hobj2 = obj2.offsetHeight;
	let lobj2 = obj2.style.left;
	lobj2 = parseInt(lobj2.split("").reverse().slice(2, lobj2.length).reverse().join(""));
	let wobj2 = obj2.offsetWidth;

	if ((tobj1 + hobj1 < tobj2 || tobj1 > tobj2 + hobj2) || (lobj1 + wobj1 < lobj2 || lobj1 > lobj2 + wobj2)) {
		return false;
	}
	return true;
}


function game_over() {
	document.body.removeChild(player);
	gaov.style.visibility = "visible";
}


for(let i = 0; i < 4; i++) {
	arst.push(createAsteroid(-49, randomMe));
	arstX.push(-49);
}

let player = createPlayer();

let minastro = 5;
let minbackpos = 2;
function game() {
	backpos -= minbackpos;
	document.body.style.backgroundPosition = backpos + 'px';
	lifelife.innerHTML = "Live: " + parseInt(lifebar);
	scorebar.innerHTML = parseInt(score);

	for(let i = 0; i < 4; i++) {
		if(collisionDetection(player, arst[i])) {
			lifebar -= 1;
			arst[i].style.backgroundImage = "url(img/boom.gif)";
		}

		if (lifebar <= 0) {
			lifebar = 0;
			lifelife.innerHTML = "Live: " + parseInt(lifebar);
			player.style.width = "200px";
			player.style.height = "282px";
			player.style.backgroundImage = "url(img/boom.gif)";
			player.style.backgroundSize = "200px 282px";

			minbackpos = 0;
			minastro = 0;
			for(let j = 0; j < 4; j++) {
				document.body.removeChild(arst[j]);
			}
			let time_lose = setTimeout(game_over, 650);
		}

		arstX[i] = parseInt(arstX[i]) - minastro;
	    if (parseInt(arstX[i]) < -50) {
	    	document.body.removeChild(arst[i]);
	    	arst[i] = createAsteroid(1200, randomMe(500));
	    	arstX[i] = 1200;
	    }
	    arst[i].style.left = arstX[i] + 'px';
	}


    playerY += playerDirY * playerSpeed;
    player.style.top = playerY + 'px';
    player.style.left = playerX + 'px';

    if (playerY > -62 && playerY < 500) {
	    minbackpos += 0.001;
	    minastro += 0.01;
	    playerSpeed += 0.01;
	    score += playerSpeed;
	} else {
		lifebar -= 1;
	}
    requestAnimationFrame(game);
}
game();
