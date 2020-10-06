const cvs = document.getElementById("canvas")
const ctx = cvs.getContext("2d")

function loadPict(input) {
	let pict = input.files[0].name
	showPict(canvas, pict)
}


function showPict(canvas, pictName) {
	let img = new Image()
	img.src = "image/" + pictName
	
	img.onload = function() {
		ctx.drawImage(img, 0, 0)
		img.style.display = 'none'
	}
}
