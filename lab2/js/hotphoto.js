const cvs = document.getElementById('canvas')
const ctx = cvs.getContext('2d')
let imgW, imgH

function loadPict(input) {
	let pict = input.files[0].name
	showPict(canvas, pict)
}

function showPict(canvas, pictName) {
	let img = new Image()
	img.src = "image/" + pictName
	
	img.onload = function() {
		ctx.drawImage(img, 0, 0, img.width, img.height)
		img.style.display = 'none'
	}
	cvs.width = img.width * 3 + 20
	cvs.height = img.height * 2 + 10
	console.log(img.width, img.height)
	blackAndWhite()
}

function blackAndWhite() {
	let myImgData = ctx.getImageData(0, 0, cvs.width / 3 - 6, cvs.height / 2 - 5)
	let myData = myImgData.data
	console.log(myImgData.width, myImgData.height)
	for (let y = 0; y < myImgData.height; y++) {
		for (let x = 0; x < myImgData.width; x++) {
			let i = (y * 4) * myImgData.width + x * 4; 
			let avg = (myImgData.data[i] + myImgData.data[i+1] + myImgData.data[i+2]) / 3
			myImgData.data[i] = avg
			myImgData.data[i+1] = avg
			myImgData.data[i+2] = avg
		}
	}
	ctx.putImageData(myImgData, myImgData.width + 5, 0, 0, 0, myImgData.width, myImgData.height);
	console.log(myImgData)
}
