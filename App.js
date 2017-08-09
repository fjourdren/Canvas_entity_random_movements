var canvas,
ctx;

var entities = [];


class Entity {
	constructor(id) {
		this.id = id;
		this.location = new Vector(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));
		this.mass = Math.floor(Math.random() * 7) + 2;
		this.speed = Math.floor(Math.random() * 2) + 0.5;
		this.objective = new Vector(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));
		this.color = getRandomColor();
	}

	draw() {

		if(this.partner && ((this.partner.partner.id == this.id) != true) && (this.partner.id > this.id)) {
			ctx.beginPath();
			ctx.moveTo(this.location.x, this.location.y);
			ctx.lineTo(this.partner.location.x, this.partner.location.y);
			ctx.strokeStyle = "#555";
			ctx.stroke();	
		}
		

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.location.x, this.location.y, this.mass, 0, 2 * Math.PI);
		ctx.fill();
	}

	update() {

		this.detectcloses();

		if((this.location.x >= this.objective.x - (this.mass * 1.5)) && (this.location.x <= this.objective.x + (this.mass * 1.5)) &&
			(this.location.y >= this.objective.y - (this.mass * 1.5)) && (this.location.y <= this.objective.y + (this.mass * 1.5))) {

			this.objective = new Vector(Math.random() * canvas.width, Math.random() * canvas.height);
		} else {

			var angleRadians = Math.atan2(this.objective.y - this.location.y, this.objective.x - this.location.x);

			this.location.x = this.location.x + this.speed * Math.cos(angleRadians);
			this.location.y = this.location.y + this.speed * Math.sin(angleRadians);
		}

	}


	detectcloses() {
		var entity;
		var dist;

		for(var i = 0; i < entities.length; i++) {
			if((dist > this.location.dist(entities[i].location)) || (!dist)) {

				if(this.location.dist(entities[i].location) < 300) {
					entity = entities[i];
					dist = this.location.dist(entities[i].location);
				}

			}
		}

		this.partner = entity;


	}
}


function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}


function main() {
	// init
	canvas = document.getElementById('game');
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");

	document.body.appendChild(canvas);

	init();

	//game loop
	var loop = function() {
		update();
		draw();
		window.requestAnimationFrame(loop, canvas);
	};

	window.requestAnimationFrame(loop, canvas);
}

// init game objects
function init() {
	for(let id=0; id <= 70; id++) {
		let entity = new Entity(id);
		entities.push(entity);
	}
}

function update() {

	for(let i = 0; i < entities.length; i++) {
			entities[i].update();
	}



}

function draw() {
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.save();

	for(let i = 0; i < entities.length; i++) {
		entities[i].draw();
	}


	ctx.restore();
}

main();
