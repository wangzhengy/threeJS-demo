import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {OutlinePass} from 'three/examples/jsm/postprocessing/OutlinePass.js';
import {Stack} from './Stack.js'
// import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";
// import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";
// // import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
// import {CSS2DObject, CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2()
mouse.set(1, 1)

//初始化canvas、renderer、camera、scene、sceneInfo
// const canvas = document.querySelector('#c');

// light.position.set(-1,2,4)
var camera;
var scene;

var cameraStack = new Stack();
var sceneStack = new Stack();

var mode = 1;

const planeSize = 80
const loader = new THREE.TextureLoader();
const groundMap = loader.load('textures/checker.png');
groundMap.wrapS = THREE.RepeatWrapping;
groundMap.wrapT = THREE.RepeatWrapping
groundMap.magFilter = THREE.NearestFilter
const repeats = planeSize / 2;
groundMap.repeat.set(repeats, repeats)


// const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
// const planeMat = new THREE.MeshPhongMaterial({
//     color:0x202020,
//     side: THREE.DoubleSide
// });

//绘制初始场景
const scene0 = makeScene();
const camera0 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

scene = scene0;
camera = camera0;

function makeScene() {

    let newScene = new THREE.Scene();
    let lightColor = 0xffffff;
    let intensity = 5;
    let light0 = new THREE.DirectionalLight(lightColor, intensity)
    light0.position.set(40, 40, 40)
    light0.target.position.set(0, 0, 0)
    newScene.add(light0)
    newScene.add(light0.target)
    newScene.background = new THREE.Color(0xaaaaaa)


    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
    const planeMat = new THREE.MeshPhongMaterial({
        map: groundMap,
        color: 0x202020,
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    mesh.position.set(0, -2.51, 0)
    newScene.add(mesh);

    return newScene
}


{
    camera0.position.set(15, 20, 25)
    const lightColor = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(lightColor, intensity)
    // camera0.add(light)

    // const light0 = new THREE.DirectionalLight(lightColor, intensity)
    // light0.position.set(100, 100, 100)
    // light0.target.position.set(0, 0, 0)
    // scene0.add(light0)
    // scene0.add(light0.target)


    const planeSize = 40

    // const loader = new THREE.TextureLoader();
    // const texture = loader.load('main/checker.png');
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping
    // texture.magFilter = THREE.NearestFilter
    // const repeats = planeSize / 2;
    // texture.repeat.set(repeats, repeats)

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
    const planeMat = new THREE.MeshPhongMaterial({
        color: 0x202020,
        side: THREE.DoubleSide
    });
    // const mesh = new THREE.Mesh(planeGeo, planeMat);
    // mesh.rotation.x = Math.PI * -0.5;
    // mesh.position.set(0,-2.51,0)
    // scene0.add(mesh);


    const geometry0 = new THREE.BoxGeometry(16, 5, 16);
    const material0 = new THREE.MeshPhongMaterial({color: 0x2200ff});
    const floor0 = new THREE.Mesh(geometry0, material0);
    scene0.add(floor0)
    {
        let roomGeo0 = new THREE.BoxGeometry(7, 4, 7)
        let roomMat0 = new THREE.MeshPhongMaterial({color: 0x770077});
        let room0 = new THREE.Mesh(roomGeo0, roomMat0)
        room0.position.set(4.48, 0, 4.48)
        floor0.add(room0)
        {
            let deskGeo = new THREE.BoxBufferGeometry(3, 2, 1)
            let deskMat = new THREE.MeshPhongMaterial({color: 0x566521})
            let desk = new THREE.Mesh(deskGeo, deskMat)
            room0.add(desk)
        }

        let roomGeo1 = new THREE.BoxGeometry(7, 4, 7)
        let roomMat1 = new THREE.MeshPhongMaterial({color: 0x007777});
        let room1 = new THREE.Mesh(roomGeo1, roomMat1)
        room1.position.set(4.48, 0, -4.48)
        floor0.add(room1)

        let roomGeo2 = new THREE.BoxGeometry(7, 4, 7)
        let roomMat2 = new THREE.MeshPhongMaterial({color: 0x777700});
        let room2 = new THREE.Mesh(roomGeo2, roomMat2)
        room2.position.set(-4.48, 0, 4.48)
        floor0.add(room2)

        let roomGeo3 = new THREE.BoxGeometry(7, 4, 7)
        let roomMat3 = new THREE.MeshPhongMaterial({color: 0x770000});
        let room3 = new THREE.Mesh(roomGeo3, roomMat3)
        room3.position.set(-4.48, 0, -4.48)
        floor0.add(room3)
    }

    const geometry1 = new THREE.BoxGeometry(16, 5, 16);
    const material1 = new THREE.MeshPhongMaterial({color: 'yellow'});
    const floor1 = new THREE.Mesh(geometry1, material1);
    floor1.position.set(0, 5.02, 0)
    scene0.add(floor1)
    {
        let roomGeo0 = new THREE.BoxGeometry(7, 4, 7)
        let roomMat0 = new THREE.MeshPhongMaterial({color: 0x770077});
        let room0 = new THREE.Mesh(roomGeo0, roomMat0)
        room0.position.set(4.48, 0, 4.48)
        floor1.add(room0)
        {
            let deskGeo = new THREE.BoxBufferGeometry(3, 2, 1)
            let deskMat = new THREE.MeshPhongMaterial({color: 0x566521})
            let desk = new THREE.Mesh(deskGeo, deskMat)
            room0.add(desk)
        }

        let roomGeo1 = new THREE.BoxGeometry(7, 4, 7)
        let roomMat1 = new THREE.MeshPhongMaterial({color: 0x007777});
        let room1 = new THREE.Mesh(roomGeo1, roomMat1)
        room1.position.set(4.48, 0, -4.48)
        floor1.add(room1)

        let roomGeo2 = new THREE.BoxGeometry(7, 4, 7)
        let roomMat2 = new THREE.MeshPhongMaterial({color: 0x777700});
        let room2 = new THREE.Mesh(roomGeo2, roomMat2)
        room2.position.set(-4.48, 0, 4.48)
        floor1.add(room2)

        let roomGeo3 = new THREE.BoxGeometry(7, 4, 7)
        let roomMat3 = new THREE.MeshPhongMaterial({color: 0x770000});
        let room3 = new THREE.Mesh(roomGeo3, roomMat3)
        room3.position.set(-4.48, 0, -4.48)
        floor1.add(room3)
    }

    const geometry2 = new THREE.BoxGeometry(16, 5, 16);
    const material2 = new THREE.MeshPhongMaterial({color: 'green'});
    const floor2 = new THREE.Mesh(geometry2, material2);
    floor2.position.set(0, 10.04, 0)
    scene0.add(floor2)
    {

    }
    // scene0.background = new THREE.Color(0xaaaaaa)
    scene0.add(camera0)
}
const scene1 = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
{
    camera1.position.set(5, 40, 40)
    const lightColor = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(lightColor, intensity)
    // camera1.add(light)

    const geometry = new THREE.BoxGeometry(10, 10, 5);
    const material = new THREE.MeshPhongMaterial({color: 'red'});
    const mesh = new THREE.Mesh(geometry, material);

    const geometry0 = new THREE.BoxGeometry(4, 4, 2);
    const material0 = new THREE.MeshPhongMaterial({color: 'orange'});
    const mesh0 = new THREE.Mesh(geometry0, material0);
    mesh0.position.set(2.5, 2.5, 0)

    const geometry1 = new THREE.BoxGeometry(4, 4, 2);
    const material1 = new THREE.MeshPhongMaterial({color: 'blue'});
    const mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.position.set(2.5, -2.5, 0);

    const geometry2 = new THREE.BoxGeometry(4, 4, 2);
    const material2 = new THREE.MeshPhongMaterial({color: 'green'});
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.set(-2.5, 2.5, 0)

    mesh.add(mesh0)
    mesh.add(mesh1)
    mesh.add(mesh2)

    scene1.background = new THREE.Color(0xaaaaaa)
    scene1.add(mesh)
    // scene1.add(camera0)
    scene1.add(camera1)
}

const canvas = document.querySelector('#c')
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//创建轨道控制器
let controls = new OrbitControls(camera, renderer.domElement);


let selectedObjects = []
let effectComposer = new EffectComposer(renderer)
let renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

let outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outlinePass.edgeThickness = 1;
outlinePass.Glow = 5
outlinePass.edgeStrength = 8
outlinePass.visibleEdgeColor.set('#888888')
outlinePass.hiddenEdgeColor.set('#600060')
effectComposer.addPass(outlinePass);

function addSelectedObject(object) {

    selectedObjects = [];
    selectedObjects.push(object);

}

function checkIntersection() {

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(scene, true);

    if (intersects.length > 0) {

        const selectedObject = intersects[0].object;
        addSelectedObject(selectedObject);
        outlinePass.selectedObjects = selectedObjects;

    } else {

        outlinePass.selectedObjects = [];

    }

}

function update() {
    controls = new OrbitControls(camera, renderer.domElement);
    renderPass = new RenderPass(scene, camera)
    effectComposer.addPass(renderPass)
    outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    outlinePass.edgeThickness = 5;
    outlinePass.Glow = 5
    outlinePass.edgeStrength = 8
    outlinePass.visibleEdgeColor.set('#888888')
    outlinePass.hiddenEdgeColor.set('#600060')
    effectComposer.addPass(outlinePass);
    mode = 1;
}

// const labelRender = new CSS2DRenderer();
// labelRender.setSize(window.innerWidth,window.innerHeight)
//
// labelRender.domElement.style.position = 'absolute'
// labelRender.domElement.style.top = '0px';
// document.body.appendChild(labelRender.domElement)


function render() {

    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera);


    // console.log(mode)
    // renderer.render(scene,camera);
    effectComposer.render()
    // labelRender.render(scene,camera)
    requestAnimationFrame(render);
}

// function changeMode() {
//     if (mode === 1) {
//         scene = scene1
//         camera = camera1
//         mode = 2;
//     } else if (mode === 2) {
//         scene = scene0
//         camera = camera0
//         mode = 1;
//     }
//     controls = new OrbitControls(camera, renderer.domElement);
//     renderPass = new RenderPass(scene, camera)
//     effectComposer.addPass(renderPass)
//     outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
//     effectComposer.addPass(outlinePass);
//
// }

function onMouseMove(event) {
    //将鼠标位置归一化为设备坐标
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    checkIntersection()
}

function changeScene(Mesh) {
    cameraStack.push(camera.clone())
    sceneStack.push(scene.clone())
    transitionalScene();
    mode = 2;
    setTimeout(() => {
            const newScene = makeScene()
            const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
            newCamera.position.set(15, 20, 25)
            let lightColor = 0xffffff;
            let intensity = 2;
            let light = new THREE.DirectionalLight(lightColor, intensity)
            // newCamera.add(light)
            console.log(newScene.children)
            let children = newScene.children
            newScene.children = newScene.children.concat(Mesh.children)
            newScene.add(newCamera)
            // console.log(newScene)
            // console.log(newScene.children)

            // console.log(cameraStack)
            // console.log(sceneStack)

            scene = newScene
            camera = newCamera

            update()
        }, 3000
    )
    // const newScene = makeScene()
    // const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // newCamera.position.set(15, 20, 25)
    // let lightColor = 0xffffff;
    // let intensity = 2;
    // let light = new THREE.DirectionalLight(lightColor, intensity)
    // // newCamera.add(light)
    // console.log(newScene.children)
    // let children = newScene.children
    // newScene.children = newScene.children.concat(Mesh.children)
    // newScene.add(newCamera)
    // // console.log(newScene)
    // // console.log(newScene.children)
    //
    // // console.log(cameraStack)
    // // console.log(sceneStack)
    //
    // scene = newScene
    // camera = newCamera
    //
    // update()
    // controls = new OrbitControls(camera, renderer.domElement);
    // renderPass = new RenderPass(scene, camera)
    // effectComposer.addPass(renderPass)
    // outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    // effectComposer.addPass(outlinePass);
}

function onMouseDown() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);


    if (intersects.length > 0) {
        // console.log(intersects[0].object.children)
        // console.log(intersects[0].object)
        console.log(scene)
        if (intersects[0].object.children.length > 0) {
            changeScene(intersects[0].object)
        }
    }


}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function on_B_click(event) {
    var keyNum = event.keyCode;
    if (keyNum === 66 && sceneStack.length() > 0 && mode === 1) {
        transitionalScene()
        mode=2;
        setTimeout(() => {
            scene = sceneStack.pop()
            camera = cameraStack.pop()
            update()
        }, 3000)
        // controls = new OrbitControls(camera, renderer.domElement);
        // renderPass = new RenderPass(scene, camera)
        // effectComposer.addPass(renderPass)
        // outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
        // effectComposer.addPass(outlinePass);
    }

}

window.addEventListener('keydown', on_B_click)
window.addEventListener('resize', onWindowResize)
window.addEventListener('click', onMouseDown)
window.addEventListener('mousemove', onMouseMove)


setTimeout(() => {
    render()
}, 20)

function transitionalScene() {
    var newScene = new THREE.Scene()
    var light = new THREE.DirectionalLight(0xffffff, 2)
    light.position.set(5, 2, 5)
    newScene.add(light)
    newScene.background = new THREE.Color(0xaaaaaa)
    var newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    newCamera.position.set(15, 0, 0)

    // const loader = new FontLoader();

    // loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
    //     const geometry = new TextGeometry('Hello three.js!', {
    //         font: font,
    //         size: 10,
    //         height: 5,
    //         curveSegments: 1,
    //         bevelEnabled: true,
    //         bevelThickness: 1,
    //         bevelSize: 1,
    //         bevelSegments: 1
    //     });
    //     const mat = new THREE.MeshPhongMaterial();
    //     const text = new THREE.Mesh(geometry,mat);
    //     text.position.set(-50,0,-50)
    //     newScene.add(text)
    // });



    const textureLoader = new THREE.TextureLoader();
    let earth;
    //创建地球
    const earthGeometry = new THREE.SphereGeometry(2.5, 20, 20);
    const earthMaterial = new THREE.MeshPhongMaterial({
        opacity:0.8,
        transparent:true,
        shininess: 5,
        map: textureLoader.load('textures/planets/earth_atmos_2048.jpg'),
        specularMap: textureLoader.load('textures/planets/earth_specular_2048.jpg'),
        normalMap: textureLoader.load('textures/planets/earth_normal_2048.jpg'),
    })
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.receiveShadow = true;
    earth.castShadow = true;
    earth.position.set(-2,0,0.9)
    newScene.add(earth);

    // const earthDiv = document.createElement('div');
    // earthDiv.className = 'label';
    // earthDiv.textContent = 'loading...';
    // const earthLabel = new CSS2DObject(earthDiv);
    // earthLabel.position.set(6,0,0);
    // newScene.add(earthLabel)

    const canvas = makeLabelCanvas(2048, 'loading');
    const texture = new THREE.CanvasTexture(canvas);
    // 因为我们的Canvas长宽都不太可能是2的倍数，所以将filtering设置合理一些
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const labelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
    });
    const labelGeometry = new THREE.PlaneGeometry(60, 12.5);
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(-5,0,0)
    label.rotation.y += Math.PI * 0.5
    newScene.add(label)


    function roll() {
        earth.rotation.y += 0.01
        requestAnimationFrame(roll)
    }

    roll()
    scene = newScene;
    camera = newCamera;
    update()
}

function makeLabelCanvas(size, name) {
    const borderSize = 2;
    const ctx = document.createElement('canvas').getContext('2d');
    const font =  `${size}px bold sans-serif`;
    ctx.font = font;
    // 测量一下name有多长
    const doubleBorderSize = borderSize * 2;
    const width = ctx.measureText(name).width + doubleBorderSize;
    const height = size + doubleBorderSize;
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    // 注意，调整画布后需要重新修改字体
    ctx.font = font;
    ctx.textBaseline = 'top';

    ctx.fillStyle = 'skyblue';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.fillText(name, borderSize, borderSize);

    return ctx.canvas;
}
