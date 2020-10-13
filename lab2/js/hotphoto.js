const cvs = document.getElementById('canvas')
const ctx = cvs.getContext('2d')

function loadPict(input) {
	let pict = input.files[0].name
	showPict(canvas, pict)
}

function showPict(canvas, pictName) {
	let img = new Image()
	img.src = "image/" + pictName
	
	img.onload = function() {
		ctx.drawImage(img, 0, 0, img.width, img.height)
//		ctx.drawImage(img, img.width + 5, 0, img.width, img.height)
	}
	cvs.width = img.width * 3 + 20
	cvs.height = img.height * 2 + 10
//	console.log(img.width, img.height)
}

function blackAndWhite() {
	let myImgData = ctx.getImageData(0, 0, cvs.width / 3 - 6, cvs.height / 2 - 5)
	let secImgData = ctx.getImageData(0, 0, cvs.width / 3 - 6, cvs.height / 2 - 5)
	let hotImg = ctx.getImageData(0, 0, cvs.width / 3 - 6, cvs.height / 2 - 5)
	let myData = myImgData.data
//	console.log(myImgData)
	for (let y = 0; y < myImgData.height; y++) {
		for (let x = 0; x < myImgData.width; x++) {
			let i = (y * 4) * myImgData.width + x * 4
			let avg = (myImgData.data[i] + myImgData.data[i+1] + myImgData.data[i+2]) / 3
			myImgData.data[i] = avg
			myImgData.data[i+1] = avg
			myImgData.data[i+2] = avg
			
			let blAvg = 0.299 * secImgData.data[i] + 0.587 * secImgData.data[i+1] + 0.114 * secImgData.data[i+2]
			secImgData.data[i] = blAvg
			secImgData.data[i+1] = blAvg
			secImgData.data[i+2] = blAvg
			
			let hotAvg = Math.abs(avg - blAvg)
			hotImg.data[i] = hotAvg
			hotImg.data[i+1] = hotAvg
			hotImg.data[i+2] = hotAvg
			
//			grayscale(secImgData.data, i)
		}
	}
	ctx.putImageData(myImgData, 0, myImgData.height + 10, 0, 0, myImgData.width, myImgData.height)
	ctx.putImageData(secImgData, secImgData.width + 5, 0 , 0, 0, secImgData.width, secImgData.height)
	ctx.putImageData(hotImg, secImgData.width + 5, myImgData.height + 10, 0, 0, hotImg.width, hotImg.height)
//	hotMap(myImgData, secImgData)
//	console.log(myImgData)
}

function grayscale(data, index) {
	return 0.299 * data[index] + 0.587 * data[index+1] + 0.114 * data[index+2]
}

function hotMap(firstImgData, secondImgData) {
	for (let y = 0; y < firstImgData.height; y++) {
		for (let x = 0; x < firstImgData.width; x++) {
			let i = (y * 4) * firstImgData.width + x * 4
			firstImgData.data[i] = Math.abs(firstImgData.data[i] - secondImgData.data[i])
			firstImgData.data[i+1] = Math.abs(firstImgData.data[i+1] - secondImgData.data[i+1])
			firstImgData.data[i+2] = Math.abs(firstImgData.data[i+2] - secondImgData.data[i+2])
		}
	}
	ctx.putImageData(firstImgData, secondImgData.width + 5, firstImgData.height + 10, 0, 0, firstImgData.width, firstImgData.height)
}
