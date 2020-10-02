const canvas = document.getElementById("coin")
const ctxt = canvas.getContext("2d")

let coin = new Image()

coin.src = "image/sprite-animation-coins-sprite.png"

let x = 0,
	tick_count = 0

coin.onload = function() {
	tickCoin()
	requestAnimationFrame(tickCoin)
}


function tickCoin() {
	if (tick_count > 5) {
		draw_coin()
		tick_count = 0
	}
	
	tick_count += 1
	requestAnimationFrame(tickCoin)
}


function draw_coin() {
	ctxt.clearRect(0, 0, slot.width, slot.height)
	x = (x === 396 ? 0 : x + 44)
	ctxt.drawImage(coin, x, 0, 44, 40, 0, 0, 40, 40)
}

