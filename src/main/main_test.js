import * as THREE from 'three';
import{OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2()
mouse.set(1,1)

//初始化canvas、renderer、camera、scene、sceneInfo
// const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// light.position.set(-1,2,4)
var camera;
var scene;
var mode = 1;

//绘制初始场景
const scene0 = new THREE.Scene()
const camera0 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
{
    camera0.position.set(5,30,30)
    const lightColor = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(lightColor,intensity)
    camera0.add(light)

    const geometry = new THREE.BoxGeometry(10, 10, 5);
    const material = new THREE.MeshPhongMaterial({color: 'yellow'});
    const mesh = new THREE.Mesh(geometry, material);

    const geometry0 = new THREE.BoxGeometry(4, 4, 2);
    const material0 = new THREE.MeshPhongMaterial({color: 'orange'});
    const mesh0 = new THREE.Mesh(geometry0, material0);
    mesh0.position.set(2.5,2.5,0)

    const geometry1 = new THREE.BoxGeometry(4, 4, 2);
    const material1 = new THREE.MeshPhongMaterial({color: 'blue'});
    const mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.position.set(2.5,-2.5,0);

    const geometry2 = new THREE.BoxGeometry(4, 4, 2);
    const material2 = new THREE.MeshPhongMaterial({color: 'green'});
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.set(-2.5,2.5,0)

    mesh.add(mesh0)
    mesh.add(mesh1)
    mesh.add(mesh2)

    scene0.background = new THREE.Color(0xdddddd)
    scene0.add(mesh)
    scene0.add(camera0)
}
const scene1 = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
{
    camera1.position.set(5,40,40)
    const lightColor = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(lightColor,intensity)
    camera1.add(light)

    const geometry = new THREE.BoxGeometry(10, 10, 5);
    const material = new THREE.MeshPhongMaterial({color: 'red'});
    const mesh = new THREE.Mesh(geometry, material);

    const geometry0 = new THREE.BoxGeometry(4, 4, 2);
    const material0 = new THREE.MeshPhongMaterial({color: 'orange'});
    const mesh0 = new THREE.Mesh(geometry0, material0);
    mesh0.position.set(2.5,2.5,0)

    const geometry1 = new THREE.BoxGeometry(4, 4, 2);
    const material1 = new THREE.MeshPhongMaterial({color: 'blue'});
    const mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.position.set(2.5,-2.5,0);

    const geometry2 = new THREE.BoxGeometry(4, 4, 2);
    const material2 = new THREE.MeshPhongMaterial({color: 'green'});
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.set(-2.5,2.5,0)

    mesh.add(mesh0)
    mesh.add(mesh1)
    mesh.add(mesh2)

    scene1.background = new THREE.Color(0xdddddd)
    scene1.add(mesh)
    // scene1.add(camera0)
    scene1.add(camera1)
}
scene = scene0
camera = camera0;
//创建轨道控制器
let controls = new OrbitControls(camera, renderer.domElement);










let selectedObjects = []
let effectComposer = new EffectComposer(renderer)
let renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

let outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );



effectComposer.addPass( outlinePass );

function addSelectedObject( object ) {

    selectedObjects = [];
    selectedObjects.push( object );

}

function checkIntersection() {

    raycaster.setFromCamera( mouse, camera );

    const intersects = raycaster.intersectObject( scene, true );

    if ( intersects.length > 0 ) {

        const selectedObject = intersects[ 0 ].object;
        addSelectedObject( selectedObject );
        outlinePass.selectedObjects = selectedObjects;

    } else {

        outlinePass.selectedObjects = [];

    }

}











function render() {

    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera);

    // 计算物体和射线的焦点
    // const intersects = raycaster.intersectObjects(scene.children);

    // if (intersects.length > 0) {
    //     if (old) old.material.color.setHex(oldColor)
    //     old = intersects[0].object
    //     oldColor = old.material.color.getHex();
    //     old.material.color.set(0xff0000)
    // } else {
    //     if (old) old.material.color.setHex(oldColor)
    //     old = null
    // }


    renderer.render(scene,camera);
    effectComposer.render()
    requestAnimationFrame(render);
}

function changeMode(){
    if(mode === 1){
        scene = scene1
        camera = camera1
        mode = 2;
    }
    else if (mode === 2 ){
        scene = scene0
        camera = camera0
        mode = 1;
    }
    controls = new OrbitControls(camera, renderer.domElement);
    renderPass = new RenderPass(scene, camera)
    effectComposer.addPass(renderPass)
    outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
    effectComposer.addPass( outlinePass );

}
function onMouseMove(event) {
    //将鼠标位置归一化为设备坐标
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    checkIntersection()
}

function onMouseDown() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);


    if (intersects.length > 0) {
        // console.log(intersects[0].object.children)
        // console.log(intersects[0].object)
        console.log(camera.position)
        changeMode();
    }

    console.log(scene)
    // scene0.clear();
    // scene=scene1;
    //
    // renderPass = new RenderPass(scene, camera)
    // effectComposer.addPass(renderPass)
    // outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
    // effectComposer.addPass( outlinePass );

    // scene = scene1.clone();
    // camera = camera1.clone();

    // if (intersects.length>0) {
    //     let c = intersects[0].object
    //     alert('hello')
    // }
}
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

window.addEventListener('resize',onWindowResize)
window.addEventListener('click', onMouseDown)
window.addEventListener('mousemove', onMouseMove)







render()

