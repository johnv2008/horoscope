var horoscope = [
  {
    name:'libra',
    img: 'img/libra.png',
    description: 'Balance, Justice, Beauty, Truth, Perfection',
  },
  {
    name:'virgo',
    img: 'img/virgo.png',
    description: 'Analyzing, Practical, Reflective, Observation, Thoughtful',
  },
  {
    name:'scorpio',
    img: 'img/scorpio.png',
    description: 'Transient, Self-Willed, Purposeful, Unyielding',
  },
  {
    name:'taurus',
    img: 'img/taurus.png',
    description: 'Security, Subtle strength, Appreciation, Instruction, Patience',
  },
  {
    name:'gemini',
    img: 'img/gemini.png',
    description: 'Communication, Indecision, Inquisitive, Intelligent, Changeable',
  },
  {
    name:'sagittarius',
    img: 'img/sagittarius.png',
    description: 'Philosophical, Motion, Experimentation, Optimism',
  },
  {
    name:'cancer',
    img: 'img/cancer.png',
    description: 'Emotion, Diplomatic, Intensity, Impulsive, Selective',
  },
  {
    name:'capricorn',
    img: 'img/capricorn.png',
    description: 'Determination, Dominance, Perservering, Practical, Willful',
  },
  {
    name:'leo',
    img: 'img/leo.png',
    description: 'Ruling, Warmth, Generosity, Faithful, Initiative',
  },
  {
    name:'aquarius',
    img: 'img/aquarius.png',
    description: 'Knowledge, Humanitarian, Serious, Insightful, Duplicitous',
  },
  {
    name:'pisces',
    img: 'img/pisces.png',
    description: 'Fluctuation, Depth, Imagination, Reactive, Indecisive',
  },
  {
    name:'aries',
    img: 'img/aries.png',
    description: 'Active, Demanding, Determined, Effective, Ambitious',
  }
];

var btn = document.getElementById('input');
btn.addEventListener('keypress', function enterKey(e) {
	if(e.keyCode == 13) {
		getHoroscope();
	};
}, false);

function getHoroscope(){
  var input = document.getElementById('input');
  console.log(input.value);
  console.log("users value is: " + input.value);



  for(var i = 0; i <horoscope.length; i = i + 1) {
		console.log("users value lowercase is: " + input.value.toLowerCase());
		console.log("current horoscope name in loop is: " + horoscope[i].name);


		if(input.value.toLowerCase() === horoscope[i].name) {

			console.log("if statement ran");


			console.log("users typed in: " + input.value);
			console.log("current image value is: " + horoscope[i].img);
			console.log("current fortune value is: " + horoscope[i].description);


			document.getElementById("yourSign").textContent = input.value;

			document.getElementById("icon").src = horoscope[i].img;

			document.getElementById("yourHoroscope").textContent = "Your Description: " + horoscope[i].description;


			return;
		};


		console.log("no matches were found, user failed to type in a correct horoscope sign");


		document.getElementById("yourSign").textContent = "Not one of the signs. Try again!";
		document.getElementById("yourHoroscope").textContent = "";
		document.getElementById("icon").src = "";
	};
};


// Code Pen star gaze code this code is for the background gaze

"use strict";

var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight,

  hue = 217,
  stars = [],
  count = 0,
  maxStars = 1400;

// Thanks @jackrugile for the performance tip! https://codepen.io/jackrugile/pen/BjBGoM
// Cache gradient
var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
var half = canvas2.width/2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

// End cache

function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }

  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x,y) {
  var max = Math.max(x,y),
      diameter = Math.round(Math.sqrt(max*max + max*max));
  return diameter/2;
}

var Star = function() {

  this.orbitRadius = random(maxOrbit(w,h));
  this.radius = random(60, this.orbitRadius) / 12;
  this.orbitX = w / 2;
  this.orbitY = h / 2;
  this.timePassed = random(0, maxStars);
  this.speed = random(this.orbitRadius) / 50000;
  this.alpha = random(2, 10) / 10;

  count++;
  stars[count] = this;
}

Star.prototype.draw = function() {
  var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
      y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
      twinkle = random(10);

  if (twinkle === 1 && this.alpha > 0) {
    this.alpha -= 0.05;
  } else if (twinkle === 2 && this.alpha < 1) {
    this.alpha += 0.05;
  }

  ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
  this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
  new Star();
}

function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
    ctx.fillRect(0, 0, w, h)

  ctx.globalCompositeOperation = 'lighter';
  for (var i = 1, l = stars.length; i < l; i++) {
    stars[i].draw();
  };

  window.requestAnimationFrame(animation);
}

animation();
