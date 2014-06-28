// Declare global variables
// Set up background
var	canvas = document.getElementById("map");
var	ctx = canvas.getContext("2d");
var	width = canvas.width;
var	height = canvas.height;

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
var framesPerSecond = 3;

var	count = 0;
var color = null;
var date = null;
var inter;
var points = {
	linePoint: []
};
var routes = [
	// DAY 1
	// Jefferson L to Union Square L
	{
		"xyPoints": [[517, 549], [498, 549], [473, 573], [429, 530], [402, 557], [257, 557]],
		"color": "yellow", 
		"date": "Tuesday, April 1",
		"name": "Jefferson L to Union Square L"
	},
	// 1st ave L to Jefferson L
	{
		"xyPoints": [[313, 557], [402, 557], [429, 530], [473, 573], [498, 549], [517, 549]],
		"color": "pink",
		"date": "Tuesday, April 1", 
		"name": "1st ave L to Jefferson L"
	},

	// DAY 2
	// Jefferson L to GCT 45
	{
		"xyPoints": [[517, 549], [498, 549], [473, 573], [429, 530], [402, 557], [254, 557], [254, 553], [263, 553], [263, 504], [270, 497], [270, 492]],
		"color": "green",
		"date": "Wednesday, April 2",
		"name": "Jefferson L to GCT 45"
	},
	// GCT 45 to Jefferson L 
	{
		"xyPoints": [[270, 492], [270, 497], [263, 504], [263, 553], [254, 553], [254, 557], [402, 557], [429, 530], [473, 573], [498, 549], [517, 549]],
		"color": "green",
		"date": "Wednesday, April 2",
		"name": "GCT 45 to Jefferson L"
	},

	// DAY 3
	// Jefferson L to 59th st 45
	{
		"xyPoints": [[517, 549], [498, 549], [473, 573], [429, 530], [402, 557], [254, 557], [254, 553], [263, 553], [263, 504], [270, 497], [270, 430]],
		"color": "green",
		"date": "Thursday, April 3",
		"name": "Jefferson L to 59th st 45"
	},
	// 59th st 6 to 23rd st 6
	{
		"xyPoints": [[275, 430], [275, 497], [267, 503], [267, 540]],
		"color": "rgb(193, 39, 45)",
		"date": "Thursday, April 3",
		"name": "59th st 6 to 23rd st 6"
	},
	// 23rd st 6 to Jefferson L
	{
		"xyPoints": [[267, 540], [267, 555], [254, 553], [402, 557], [429, 530], [473, 573], [498, 549], [517, 549]],
		"color": "rgb(193, 39, 45)",
		"date": "Thursday, April 3",
		"name": "23rd st 6 to Jefferson L"
	},
	// Jefferson L to Bedford Ave L
	{
		"xyPoints": [[517, 549], [498, 549], [473, 573], [429, 530], [402, 557], [371, 557]],
		"color": "pink", 
		"date": "Thursday, April 3",
		"name": "Jefferson L to Bedford Ave L"
	},

	// DAY 4
	// Bedford Ave L to Jefferson L
	{
		"xyPoints": [[371, 557], [402, 557], [429, 530], [473, 573], [498, 549], [517, 549]],
		"color": "pink", 
		"date": "Friday, April 4",
		"name": "Bedford Ave L to Jefferson L"
	},
	// Jefferson L to Bedford Ave L
	{
		"xyPoints": [[517, 549], [498, 549], [473, 573], [429, 530], [402, 557], [371, 557]],
		"color": "purple", 
		"date": "Friday, April 4",
		"name": "Jefferson L to Bedford Ave L"
	},
	// Bedford Ave L to Jefferson L
	{
		"xyPoints": [[371, 557], [402, 557], [429, 530], [473, 573], [498, 549], [517, 549]],
		"color": "purple", 
		"date": "Friday, April 4",
		"name": "Bedford Ave L to Jefferson L"
	},

	// DAY 5
	//Jefferson L to Bedford ave L
	{
		"xyPoints": [[517, 549], [498, 549], [473, 573], [429, 530], [402, 557], [371, 557]],
		"color": "rgb(193, 39, 45)", 
		"date": "Saturday, April 5",
		"name": "Jefferson L to Bedford Ave L"
	},
	// Bedford Ave L to Jefferson L
	{
		"xyPoints": [[371, 557], [402, 557], [429, 530], [473, 573], [498, 549], [517, 549]],
		"color": "rgb(193, 39, 45)", 
		"date": "Saturday, April 5",
		"name": "Bedford Ave L to Jefferson L"
	},
	// Jefferson L to Lorimer L
	{
		"xyPoints": [[517, 549], [498, 549], [473, 573], [429, 530], [400, 555]],
		"color": "pink", 
		"date": "Saturday, April 5",
		"name": "Jefferson L to Lorimer L"
	},

	// DAY 6
	// Bedford Ave L to Jefferson L
	{
		"xyPoints": [[371, 557], [402, 557], [429, 530], [473, 573], [498, 549], [517, 549]],
		"color": "pink", 
		"date": "Sunday, April 6",
		"name": "Bedford Ave L to Jefferson L"
	},

	// DAY 7
	// Jefferson L to Union Square L
	{
		"xyPoints": [[517, 549], [498, 549], [473, 573], [429, 530], [402, 557], [257, 557]],
		"color": "yellow", 
		"date": "Monday, April 7",
		"name": "Jefferson L to Union Square L"
	},
	// Union Square L to Jefferson L
	{
		"xyPoints": [[257, 557], [402, 557], [429, 530], [473, 573], [498, 549], [517, 549]],
		"color": "yellow", 
		"date": "Monday, April 7",
		"name": "Union Square L to Jefferson L"
	}	
];

// Declare functions
// Function for drawing background
function drawBkgrnd(canvas, ctx) {
	var img = new Image(); // create new image element
	img.onload = function() {
		ctx.drawImage(img, 0, 0);
	}
	img.src = "images/nycMap.svg"; //set source path
}

// Function for drawing animated line
function Point(x, y, color, date) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.date = date;
}

function drawPoints() {
	setTimeout(function() {
        requestAnimationFrame(drawPoints);
	 	
	 	// Set line width 
		ctx.lineWidth = 3;
		// Set date properties
		ctx.fillStyle = "rgb(150, 150, 150)";
	    ctx.font = "lighter 1.5em Helvetica";
	    ctx.textAlign = "center";
	    ctx.textBaseline = "top";

		// Change color, depending on travel purpose
		newColor = points.linePoint[count].color;
		if (newColor != color) {
			ctx.closePath();
			color = newColor;
			ctx.beginPath();
		}

		// Change date
		newDate = points.linePoint[count].date;
		if (newDate != date) {
			ctx.closePath();
			date = newDate;
			ctx.clearRect(0, 0, width, height);
			drawBkgrnd(canvas, ctx);
			ctx.beginPath();
		}

		if(count == 0) {
		// At start, draw subway map, draw first travel route
			drawBkgrnd(canvas, ctx);
			ctx.beginPath();
			ctx.fillText(points.linePoint[count].date, 630, 532);
			ctx.strokeStyle = points.linePoint[count].color;
			ctx.moveTo(points.linePoint[count].x, points.linePoint[count].y); 
		} else {
		// Draw consequent travel routes
			ctx.fillText(points.linePoint[count].date, 630, 532);
			ctx.strokeStyle = points.linePoint[count].color;
			ctx.moveTo(points.linePoint[count - 1].x, points.linePoint[count - 1].y);
			ctx.lineTo(points.linePoint[count].x, points.linePoint[count].y);
		}
		
		ctx.stroke();

		count++;
		
		// Once all travel routes have been drawn and animated, clear the canvas
		if(count == routes.map(function(x) { return x.xyPoints.length; }).reduce(function(a, b) { return a+b; })) {
			clearInterval(inter);
		}
    }, 1000 / framesPerSecond);	
}

function entPoints() {
	// Animate travel routes
	for(var i = 0; i < routes.length; i++) {
		var xyPoints = routes[i].xyPoints;
		var color = routes[i].color;
		var date = routes[i].date;
		
		for(var j = 0; j < xyPoints.length; j++) {
			var x = xyPoints[j][0];
			var y = xyPoints[j][1];
			points.linePoint.push(new Point(x, y, color, date));
		}
	}
	inter = requestAnimationFrame(drawPoints);
}

// Function for calculating total subway rides per category
function calcSpending() {
	// go into routes and get total count per color
	var numRed = routes.reduce(function(n, red) {
    	return n + (red.color == 'rgb(193, 39, 45)');
	}, 0);
	console.log(numRed);

	var numPink = routes.reduce(function(n, pink) {
    	return n + (pink.color == 'pink');
	}, 0);
	console.log(numPink);
	
	var numPurple = routes.reduce(function(n, purple) {
    	return n + (purple.color == 'purple');
	}, 0);
	console.log(numPurple);
	
	var numYellow = routes.reduce(function(n, yellow) {
    	return n + (yellow.color == 'yellow');
	}, 0);
	console.log(numYellow);
	
	var numGreen = routes.reduce(function(n, green) {
    	return n + (green.color == 'green');
	}, 0);
	console.log(numGreen);
	
	// use that number and multiply each by 1.33
	var totalRed = numRed * 1.33;
	var totalPink = numPink * 1.33;
	var totalPurple = numPurple * 1.33;
	var totalYellow = numYellow * 1.33;
	var totalGreen = numGreen * 1.33;
		
	// sum the results to get total spent that week
	var totalGrey = totalRed + totalPink + totalPurple + totalYellow + totalGreen;
	// add $ sign in front of each result
	// insert results into respective <li> in <ul> 
	document.getElementById('a').innerHTML += " " + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "$" + " " + totalRed;
	document.getElementById('b').innerHTML += " " + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "$" + " " + totalPink;
	document.getElementById('c').innerHTML += " " + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "$" + " " + totalPurple;
	document.getElementById('d').innerHTML += " " + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "$" + " " + totalYellow;
	document.getElementById('e').innerHTML += " " + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "$" + " " + totalGreen;
	document.getElementById('f').innerHTML += " " + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp" + "$" + " " + totalGrey;
}

window.onload =
requestAnimationFrame(entPoints);
calcSpending();

// FUTURE TO DOS:
// FIGURE OUT WHERE TO BREAK IN ROUTES SO THAT IT DOESN'T CONTINUOUSLY TRY TO PULL COLOR
// FIGURE OUT HOW TO ERASE PREVIOUS ANIMATED LINE DRAWN EVERY TIME NEW SET OF XYPOINTS ARE CALLED
// FIGURE OUT HOW TO LOOP SO THAT IT CLEARS AND STARTS OVER		
// CREATE BACK END FOR DATA STORAGE
// REFACTOR CODE