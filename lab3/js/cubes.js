var camera, scene, renderer;
var isRotate = true;
var meshes = [];
var gap = 0.5;

init();

document.body.appendChild(renderer.domElement);

scene.rotation.x = -45;
scene.rotation.z = 45;

renderer.render(scene, camera);

function init() {
    var mesh;

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -25;
    camera.position.x = -25;
    camera.position.y = 50;
    camera.position.z = 300;

    scene = new THREE.Scene();
	const light = new THREE.AmbientLight( 0x00FFFF ); // soft white light
	scene.add( light );	

	const light1 = new THREE.PointLight( 0x00FF00, 1, 100 );
	light1.position.set( 100, 100, 100 );
	scene.add( light1 );
			
    var material = [
       new THREE.MeshDepthMaterial(),
       new THREE.MeshNormalMaterial(),
       new THREE.MeshBasicMaterial( { color: "yellow", wireframe: false } ),
       new THREE.MeshLambertMaterial( { color: 0x00FFFF } ),
       new THREE.MeshPhongMaterial( { color: 0x00FFFF } ),
       new THREE.MeshStandardMaterial( { color: 0x00FFFF } ),
	];
	

    for(var i = -1; i < 2; i++)
		for(var j = -1; j < 2; j++)
            for(var k = -1; k < 2; k++) {
						
                var geometry = new THREE.BoxBufferGeometry(50, 50, 50);
				var material1 = new THREE.MeshBasicMaterial();

                mesh = new THREE.Mesh(geometry, material);

                mesh.position.x = i * 50;
                mesh.position.y = j * 50;
                mesh.position.z = k * 50;

                scene.add(mesh);
                meshes.push(mesh);
            }

    updateGap();
	

    renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x808080)
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateGap() {
    meshes.forEach(function (item, i, arr) {
        item.scale.x = gap;
        item.scale.y = gap;
        item.scale.z = gap;
    });
}

function changeGap() {
    gap = gap + 0.0625;

    updateGap();

    renderer.render(scene, camera);
}
		
function reduceGap() {
	gap = gap - 0.0625;
			
	updateGap();
			
	renderer.render(scene, camera);
}
		
function updateRotate() {
		
	scene.rotation.x += 0.01;
	scene.rotation.y += 0.01;
	scene.rotation.z += 0.01;
			
}
		
function rotateCube() {
	requestAnimationFrame( rotateCube );
			
	updateRotate();
			
	renderer.render(scene, camera);
}
		
