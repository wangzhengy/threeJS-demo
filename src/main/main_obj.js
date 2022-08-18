import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
mouse.set(1, 1)


{
    const objLoader = new OBJLoader();
    objLoader.load('././images/WindMill.obj',(root) => {
        root.position.set(5,5,5)
        scene.add(root)
    })

}
const scene = new THREE.Scene()
// scene.background = new THREE.Color(0xffffff)

const fov = 45
const aspect =2
const near = 0.1
const far = 100

const camera = new THREE.PerspectiveCamera(fov,aspect,near,far)
camera.position.set(0,10,20)
scene.add(camera)


// controls.target.set(0,5,0)
// controls.update()

const planeSize = 40

const loader = new THREE.TextureLoader();
const texture = loader.load('/images/checker.png')
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping
texture.magFilter = THREE.NearestFilter
const repeats = planeSize/2;
texture.repeat.set(repeats,repeats)

const planeGeo = new THREE.PlaneGeometry(planeSize,planeSize)
const planeMat = new THREE.MeshPhongMaterial({
    map:texture,
    side:THREE.DoubleSide
});
const mesh = new THREE.Mesh(planeGeo,planeMat);
mesh.rotation.x = Math.PI* -0.5;

scene.add(mesh)

{
    const loader = new THREE.TextureLoader();
    const texture = loader.load('/images/frame.png');
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize)
    const cubeMat = new THREE.MeshPhongMaterial({
        color:'#8AC',
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
    });
    const mesh = new THREE.Mesh(cubeGeo,cubeMat);
    mesh.position.set(cubeSize+1,cubeSize/2,0)
    scene.add(mesh);
}
{
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius,sphereWidthDivisions,sphereHeightDivisions)
    const sphereMat = new THREE.MeshPhongMaterial({color:'#CA8'})
    const mesh = new THREE.Mesh(sphereGeo,sphereMat)
    mesh.position.set(-sphereRadius-1,sphereRadius+2,0)
    scene.add(mesh)
}

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color,intensity)
light.position.set(10,10,10)
light.target.position.set(-5,0,0)
scene.add(light)
scene.add(light.target)

const canvas = document.querySelector('#c')
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false
});
renderer.setClearAlpha(0.2)
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera,renderer.domElement)

function onMouseMove(event) {
    //将鼠标位置归一化为设备坐标
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

window.addEventListener('resize',onWindowResize)
window.addEventListener('mousemove', onMouseMove)


var old;
var oldColor;

function animate() {

    raycaster.setFromCamera(mouse,camera)

    const intersects = raycaster.intersectObjects(scene.children)

    if (intersects.length > 0) {
        if (old) old.material.color.setHex(oldColor)
        old = intersects[0].object
        oldColor = old.material.color.getHex();
        old.material.color.set(0xff0000)
        // console.log(oldColor)
    } else {
        if (old) old.material.color.setHex(oldColor)
        old = null
    }

    renderer.render(scene,camera)
    requestAnimationFrame(animate)
}

animate()
