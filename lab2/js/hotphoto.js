const cvs = document.getElementById('canvas')
const ctx = cvs.getContext('2d')

let histMap = new Map()

function loadPict(input) {
	let pict = input.files[0].name
	showPict(canvas, pict)
}

function showPict(canvas, pictName) {
	let img = new Image()
	img.src = "image/" + pictName
	
	img.onload = function() {
		if (img.width < 300)
			ctx.drawImage(img, 0, 0, img.width, img.height)
		else 
			ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width / 3, img.height / 3)
	}
	if (img.width < 300) {
		cvs.width = img.width * 3 + 20
		cvs.height = img.height * 2 + 10
	} else {
		cvs.width = img.width + 20
		cvs.height = img.height / 3 * 2 + 10
	}
}

function blackAndWhite() {
	let myImgData = ctx.getImageData(0, 0, cvs.width / 3 - 6, cvs.height / 2 - 5),
		secImgData = ctx.getImageData(0, 0, cvs.width / 3 - 6, cvs.height / 2 - 5),
		hotImg = ctx.getImageData(0, 0, cvs.width / 3 - 6, cvs.height / 2 - 5)
	let arr = hotImg.data
	let maxRGB = 0,
		minRGB = 256
	
	for (let y = 0; y < myImgData.height; y++) {
		for (let x = 0; x < myImgData.width; x++) {
			let i = (y * 4) * myImgData.width + x * 4
			
			let avg = grayColor(myImgData.data, i)
			myImgData.data[i] = avg
			myImgData.data[i+1] = avg
			myImgData.data[i+2] = avg
			
			let blAvg = grayscale(secImgData.data, i)
			secImgData.data[i] = blAvg
			secImgData.data[i+1] = blAvg
			secImgData.data[i+2] = blAvg
			
			let hotAvg = Math.sqrt(Math.abs(Math.pow(avg, 2) - Math.pow(blAvg, 2)))
			arr[i] = hotAvg
			arr[i+1] = hotAvg
			arr[i+2] = hotAvg

			if (hotAvg > maxRGB) maxRGB = hotAvg
			if (hotAvg < minRGB) minRGB = hotAvg
		}
	}
	
	maxRGB -= minRGB
	for (let i = 0; i < arr.length; i += 4) {
		let heatMap = (arr[i] - minRGB) * 255 / maxRGB
		if (heatMap < 128) {
			arr[i] = 0
			arr[i+1] = heatMap * 2
			arr[i+2] = 255 - heatMap * 2
		} else {
			arr[i] = heatMap
			arr[i+1] = 255 - heatMap
			arr[i+2] = 0
		}
	}
	
	ctx.putImageData(myImgData, 0, myImgData.height + 10, 0, 0, myImgData.width, myImgData.height)
	ctx.putImageData(secImgData, secImgData.width + 5, 0 , 0, 0, secImgData.width, secImgData.height)
	ctx.putImageData(hotImg, secImgData.width + 5, myImgData.height + 10, 0, 0, hotImg.width, hotImg.height)
	
//	let myData = hotImg.data
	
	for (let i = 0; i < arr.length; i += 4){
		let histArr = [arr[i], arr[i+1], arr[i+2]]
		histMap.set(histArr, 1)
	}
	
	let histArr = new Array()
	
	for (let [key, value] of histMap) {
		let flag = true
		for (let i = 0; i < histArr.length; i++) {
			if (key[0] == histArr[i][0][0] && key[1] == histArr[i][0][1] && key[2] == histArr[i][0][2]) {
				flag = false
				histArr[i][1]++
			}
		}
		if (flag) histArr.push([key, 1])
	}
	
	for (let i = 0; i < histArr.length - 1; i++) {
		let maxVal = histArr[i][1]
		let pos 
		for (let j = i + 1; j < histArr.length; j++)
			if (histArr[j][1] > maxVal) {
				maxVal = histArr[j][1]
				pos = j
			}
		let changes = histArr[pos]
		histArr[pos] = histArr[i]
		histArr[i] = changes
	}
	console.log(histArr)

	for (let i = 1; i < 9; i++){
		let rColor = histArr[i][0][0]
		let gColor = histArr[i][0][1]
		let bColor = histArr[i][0][2]
//		console.log(rColor, gColor, bColor)
		ctx.fillStyle = `rgb(${rColor},${gColor},${bColor})`
		ctx.fillRect(2 * secImgData.width + 10, (i - 1) * 15 + secImgData.height + 10, myImgData.width / 2, 10)
	}
	histMap.clear()
}

function grayColor(data, index){
	return (data[index] + data[index+1] + data[index+2]) / 3
}

function grayscale(data, index) {
	return 0.299 * data[index] + 0.587 * data[index+1] + 0.114 * data[index+2]
}

