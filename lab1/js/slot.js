const cvs = document.getElementById("slot")
const ctx = cvs.getContext("2d")

let tablo = new Image(),
	stickUp = new Image(),
	stickDown = new Image()

tablo.src = "image/Tablo.png"
stickUp.src = "image/sticks/sticks_0.png"
stickDown.src = "image/sticks/Sticks_1.png"

const startSl = new Audio('sound/Running.mp3'),
	stopSl = new Audio('sound/Stop.mp3'),
	win = new Audio('sound/Win.mp3'),
	lose = new Audio('sound/Losing.mp3')

let arr = new Array()

for (let i = 0; i < 5; i++) {
	let logo = new Image()
	logo.src = "image/logo/logo_" + i + ".png"
	arr[i] = logo
}

let startTime = 0,
	left_slot = 0,
	right_slot = 0,
	y_pos = 450,
	score = 300,
	winScore = [250, 500, 2000, 1500, 750],
	isSpining = false

ctx.font = "24px Bernard MT Condensed"
ctx.fillStyle = "white"


function draw() {
	ctx.clearRect(0, 0, slot.width, slot.height)
	ctx.fillText("Coins: " + score, 60, 40)
	ctx.drawImage(tablo, 130, 100, 250, 150)
	ctx.drawImage(arr[left_slot], 0, 0, arr[left_slot].width, arr[left_slot].height, 143, 120, 105, 105)
	ctx.drawImage(arr[right_slot], 0, 0, arr[right_slot].width, arr[right_slot].height, 263, 120, 105, 105)
	ctx.drawImage(stickUp, 380, 85, 50, 130)
}

stickUp.onload = draw

function setParams() {
	if (y_pos == 450) {
		return [Math.floor(Math.random() * (5)), Math.floor(Math.random() * (5))]
	} else {
		return [left_slot, right_slot]
	}
}


function draw_slots() {
	left_slot = setParams()[0]
	right_slot = setParams()[1]
	ctx.clearRect(0, 0, slot.width, slot.height)
	ctx.fillText("Coins: " + score, 60, 40)
	ctx.drawImage(tablo, 130, 100, 250, 150)
	ctx.drawImage(arr[left_slot], 0, y_pos, arr[left_slot].width, arr[left_slot].height, 143, 120, 105, 105)
	ctx.drawImage(arr[right_slot], 0, y_pos, arr[right_slot].width, arr[right_slot].height, 263, 120, 105, 105)
	if (isSpining || startTime == 0) {
		ctx.drawImage(stickUp, 380, 85, 50, 130)
	} else if (Date.now() - startTime < 1500){
		ctx.drawImage(stickDown, 380, 130, 50, 130)
	}
	if (y_pos > -450){
		y_pos -= 50
		requestAnimationFrame(draw_slots)
	} else {
		y_pos = 450
	}
	
	checkEnd()
}

function startSpinning() {
	if (score == 0) {
		alert("У вас нулевой баланс! Вот вам еще 150 коинов :)")
		alert("Нажмите старт еще раз!")
		score += 150
		return
	}
	if(isSpining) {
		return
	}
	startSl.play().then(() => {})
	isSpining = true
	score -= 50
	interval = setInterval(draw_slots, 500)
}

function stopSpinning() {
	startTime = Date.now()
	stopSl.play().then(() => {})
	isSpining = false
}

function checkEnd() {
	if (isSpining || Date.now() - startTime < 1500) {
        return
    }
    clearInterval(interval)
	checkResults()
	draw()
	startTime = 0
}

function checkResults() {
	if (left_slot == right_slot) {
		win.play().then(() => {})
		if (y_pos == -450) {
			alert("Ваш выигрыш составил: " + winScore[left_slot])
			score += winScore[left_slot]
		}
	} else {
		lose.play().then(() => {})
	}
}

