import '../css/threejs.css';
import * as dat from 'dat.gui';
import * as THREE from 'three';
import {modelScollTimeline} from './threejsfn.js'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
console.log(modelScollTimeline);




let cursor=document.querySelector('.cursor')
let cursorLabel=document.querySelector('.cursorLabel')

const gui = new dat.GUI();
gui.close
const scene = new THREE.Scene();

let parameters = {
    cameraPosition: { x: -12.21, y: 1.59, z: -5.93 },
    cameraRotation: { x: 0.0, y: 4.73, z: 0 },
    littleCoutchLabel: { x: -7.2, y: 1.16, z: -5.8 }
};

let sizes = { width: window.innerWidth, height: window.innerHeight };
let aspectRatio = sizes.width / sizes.height;

const mainCamera =new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);


const littleSofaCamera=new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
const bigSofaCamera=new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
const poolCamera=new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
mainCamera.layers.enable(0)
mainCamera.layers.enable(1)
littleSofaCamera.layers.enable(0)
littleSofaCamera.layers.enable(1)
bigSofaCamera.layers.enable(0)
bigSofaCamera.layers.enable(1)
poolCamera.layers.enable(0)
poolCamera.layers.enable(1)

let activeCamera=mainCamera
const ambientLight = new THREE.AmbientLight(0xb0b0b0, 10);
scene.add(ambientLight);

// MODEL LOADING
let interiorModel;
let littleSofa;
let bigSofa;
let poolTable;
let points;
let spheres=[]
let mouse=new THREE.Vector2()

//textures
let bigSofaTextures=[]
let littleSofaTextures=[]
let poolTextures=[]

//Lights
let littleSofa_Lights=[]
let bigSofa_Lights=[]
let pool_Lights=[]


async function modelLoad() {
    return new Promise((resolve) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        const modelLoader = new GLTFLoader();
        modelLoader.setDRACOLoader(dracoLoader);
        modelLoader.load('../models/alldemodraco_pack.glb', (glb) => {

            interiorModel = glb.scene;
            console.log(interiorModel);
            
            interiorModel.remove(interiorModel.children[20])
            interiorModel.children[30].intensity=1.95
            interiorModel.children[30].position.set(-14.39, -1.28, 2.72)
            interiorModel.children[31].intensity=1.58
            interiorModel.children[31].position.set(-13.33, -0.32, 4.24)
            interiorModel.children[32].position.set(-15.75, 0.09, 2.46)
            interiorModel.children[32].intensity=2.84
            interiorModel.children[33].intensity=7.35
            interiorModel.children[34].intensity=24.5
            interiorModel.children[35].intensity=23.85
            interiorModel.children[36].intensity=11.75
            interiorModel.children[37].intensity=1
            interiorModel.children[38].intensity=12.63
            interiorModel.children[39].intensity=0.5
            interiorModel.children[38].position.set(7.63,2.16,2.99)
            interiorModel.children[38].castShadow=true




      // STEP 1: Store materials before removing
for (let i = 19; i <= 21; i++) {
    bigSofaTextures.push(interiorModel.children[i].material.clone());
}
for (let i = 22; i <= 25; i++) {
    littleSofaTextures.push(interiorModel.children[i].material.clone());
}
for (let i = 26; i <= 29; i++) {
    poolTextures.push(interiorModel.children[i].material.clone());
}

// STEP 2: Remove the original material preview meshes
const previewMeshes = interiorModel.children.slice(19, 30);
previewMeshes.forEach(mesh => {
    interiorModel.remove(mesh);
});

            console.log(bigSofaTextures,
                littleSofaTextures,
                poolTextures);
            scene.add(interiorModel);
                //Lights 
            littleSofa_Lights.push(interiorModel.children[19])
            littleSofa_Lights.push(interiorModel.children[20])
            littleSofa_Lights.push(interiorModel.children[21])
            
            bigSofa_Lights.push(interiorModel.children[23])
            bigSofa_Lights.push(interiorModel.children[24])
            bigSofa_Lights.push(interiorModel.children[25])
            bigSofa_Lights.push(interiorModel.children[26])
            // bigSofa_Lights.push(interiorModel.children[37])
            
            pool_Lights.push(interiorModel.children[27])
            pool_Lights.push(interiorModel.children[28])

            console.log(littleSofa_Lights ,bigSofa_Lights ,pool_Lights);
            
            littleSofa = interiorModel.children[16];
            bigSofa = interiorModel.children[17];
            poolTable = interiorModel.children[18];

            littleSofa.material=littleSofaTextures[0]
            bigSofa.material=bigSofaTextures[0]
            poolTable.material=poolTextures[0]



            littleSofa.layers.set(1)
            bigSofa.layers.set(1)
            poolTable.layers.set(1)
            resolve('loaded');
        });
    });
}

// SCROLLTRIGGER ANIMATION
let cameraControlls = [
    { px: -12.21, py: 1.59, pz: -5.93, rx: 0.0, ry: 4.73, rz: 0.0 },
    { px: -17.35, py: 1.46, pz: 3.12, rx: 0.0, ry: 4.73, rz: 0 },
    { px: -7.11, py: 1.43, pz: 11, rx: 0.0, ry: 6.28, rz: 0 },
    { px: 7.65, py: 1.46, pz: 10.2, rx: 0.0, ry: 6.28, rz: 0 },
    { px: 14.35, py: 1.43, pz: -2.7, rx: 0.0, ry: 7.85, rz: 0 },
    { px: 14.4, py: 1.46, pz: -18, rx: 0.0, ry: 7.9, rz: 0 }
];




mainCamera.position.set(cameraControlls[0].px, cameraControlls[0].py, cameraControlls[0].pz);
mainCamera.rotation.set(cameraControlls[0].rx, cameraControlls[0].ry, cameraControlls[0].rz);




littleSofaCamera.position.copy(mainCamera.position)
littleSofaCamera.rotation.copy(mainCamera.rotation)
bigSofaCamera.position.copy(mainCamera.position)
bigSofaCamera.rotation.copy(mainCamera.rotation)
poolCamera.position.copy(mainCamera.position)
poolCamera.rotation.copy(mainCamera.rotation)


scene.add(mainCamera,littleSofaCamera,bigSofaCamera,poolCamera);

const animationname = ['animation0', 'animation1', 'animation2', 'animation3', 'animation4', 'animation5'];

    let threetimeline
function cameraAnimation() {
    threetimeline = gsap.timeline({
        scrollTrigger: {id: "mainScroll",
            trigger: '.threejsCanvas',
            start: 'top top',
            end: '+=15000',
            pin: true,
            scrub: 0.01,
        }});




    for (let index = 1; index < cameraControlls.length; index++) {

        // Animation
        threetimeline.to(mainCamera.position, {
            x: cameraControlls[index].px,
            y: cameraControlls[index].py,
            z: cameraControlls[index].pz,
            ease: 'none'
        }, animationname[index]);

        threetimeline.to(mainCamera.rotation, {
            x: cameraControlls[index].rx,
            y: cameraControlls[index].ry,
            z: cameraControlls[index].rz,
            ease: 'none'
        }, animationname[index]);
    }
}


function scrollToCameraView(labelName) {
    const st = ScrollTrigger.getById("mainScroll");
    if (!st || !threetimeline) return;

    const labelTime = threetimeline.labels[labelName];
    const totalDuration = threetimeline.duration();

    if (labelTime == null) {
        console.warn(`Label "${labelName}" not found.`);
        return;
    }

    const progress = labelTime / totalDuration;
    const targetScroll = gsap.utils.mapRange(0, 1, st.start, st.end, progress);

    gsap.to(window, {
        scrollTo: targetScroll,
        duration: 2.5,
        ease: 'power4.inOut'
    });
}
const selectModellist=document.querySelectorAll('.selectModel ul li')
selectModellist[0].addEventListener('click',(e)=>{
modelScollTimeline.reverse()
scrollToCameraView(animationname[2]); // scrolls to camera position 3
})
selectModellist[1].addEventListener('click',(e)=>{
modelScollTimeline.reverse()
scrollToCameraView(animationname[3]); // scrolls to camera position 3
})
selectModellist[2].addEventListener('click',(e)=>{
modelScollTimeline.reverse()
scrollToCameraView(animationname[4]); // scrolls to camera position 3
})


// Store preview mode state
let isPreviewActive = false;
let currentHotspotKey = null;
let gsapPreviewTween = null;
let previewHotspots ;
let previewModels;
function cameraPreviw() {
    return new Promise((resolve) => {
        previewHotspots = {
            lillSoft: {
                camera: littleSofaCamera,
                position: new THREE.Vector3(-16.9, 1.46, 3.12),
                rotation: new THREE.Vector3(cameraControlls[1].rx,cameraControlls[1].ry,cameraControlls[1].rz,),
                textures:[littleSofaTextures[0],littleSofaTextures[1],littleSofaTextures[2],]
                },
            bigSofa: {
                camera: bigSofaCamera,
                position: new THREE.Vector3(-7.53, 1.49, 9.32),
                rotation: new THREE.Vector3(cameraControlls[2].rx,6.28,cameraControlls[2].rz),
                textures:[bigSofaTextures[0],bigSofaTextures[1],bigSofaTextures[2]]
            },
            pool: {
                camera: poolCamera,
                position: new THREE.Vector3(7.65, 1.46, 7.8),
                rotation: new THREE.Vector3(cameraControlls[3].rx,cameraControlls[3].ry,cameraControlls[3].rz,),
                textures:[poolTextures[0],poolTextures[1],poolTextures[2],]
            }
        };

previewModels = {
  lillSoft: littleSofa,
  bigSofa: bigSofa,
  pool: poolTable
};

console.log(previewModels.bigSofa,'Textures=',previewHotspots.bigSofa.textures);

        resolve('preview');
    });
}


function createTextureOptions(hotspotKey) {
    const texturePanel = document.querySelector('.texture-panel');
    texturePanel.innerHTML = '';

    const textures = previewHotspots[hotspotKey].textures;
    const model = previewModels[hotspotKey];

    textures.forEach((texture, index) => {
        const btn = document.createElement('button');
        btn.classList.add('texture-button');
        btn.textContent = `Style ${index + 1}`;

  
        btn.addEventListener('click', () => {
            model.traverse(child => {
                if (child.isMesh) {
                    child.material = texture;
                    child.material.needsUpdate = true;
                }
            });
        });

        texturePanel.appendChild(btn);
    });

    gsap.to(texturePanel, { opacity: 1, display: 'flex', duration: 0.3 });
}





let basePreviewRotation = new THREE.Vector3();
let bottomNav=document.querySelectorAll('.bottom p span')

function enterPreviewMode(hotspotKey) {
    const hotspot = previewHotspots[hotspotKey];
cursorLabel.textContent = "Customize";
    // Toggle behavior
    if (isPreviewActive && currentHotspotKey === hotspotKey) {
        exitPreviewMode();
        return;}

    currentHotspotKey = hotspotKey;
    isPreviewActive = true;
    activeCamera = hotspot.camera;

    hotspot.camera.position.copy(mainCamera.position);
    hotspot.camera.rotation.copy(mainCamera.rotation);
    basePreviewRotation.copy(hotspot.camera.rotation);


    // reset parallax influence
    gsapPreviewTween = gsap.to(hotspot.camera.position, {
        duration: 1.2,
        x: hotspot.position.x,
        y: hotspot.position.y,
        z: hotspot.position.z,
        ease: 'power2.inOut',
    });

    gsapPreviewTween = gsap.to(hotspot.camera.rotation, {
        duration: 1.2,
        x: hotspot.rotation.x,
        y: hotspot.rotation.y,
        z: hotspot.rotation.z,
        ease: 'power2.inOut',});


        createTextureOptions(hotspotKey);

gsap.to(bottomNav[0],{
    top:"150%",
    duration:0.5,
    ease:'power1'})
gsap.to(bottomNav[1],{
    top:"50%",
    duration:0.5,
    ease:'power1'})
}
function exitPreviewMode() {
    if (!isPreviewActive || !currentHotspotKey) return;
cursorLabel.textContent = "";
    const cameraToReset = previewHotspots[currentHotspotKey].camera;

    const timeline = gsap.timeline({
        onComplete: () => {
            activeCamera = mainCamera;
            isPreviewActive = false;
            currentHotspotKey = null;
        }
    });


const texturePanel = document.querySelector('.texture-panel');
gsap.to(texturePanel, { opacity: 0, display: 'none', duration: 0.3 });


gsap.to(bottomNav[0],{
    top:"50%",
    duration:0.5,
    ease:'power1'})
gsap.to(bottomNav[1],{
    top:"150%",
    duration:0.5,
    ease:'power1'})


    timeline.to(cameraToReset.position, {
        duration: 1,
        x: mainCamera.position.x,
        y: mainCamera.position.y,
        z: mainCamera.position.z,
        ease: 'power2.inOut'
    }, 0); // Start at 0

    timeline.to(cameraToReset.rotation, {
        duration: 1,
        x: mainCamera.rotation.x,
        y: mainCamera.rotation.y,
        z: mainCamera.rotation.z,
        ease: 'power2.inOut'
    }, 0); // Start at 0 (in parallel)

        
}


function pointsCreation() {
    // Get the bounding box of each object to position buttons at their center/top
    const littleSofaBox = new THREE.Box3().setFromObject(littleSofa);
    const bigSofaBox = new THREE.Box3().setFromObject(bigSofa);
    const poolTableBox = new THREE.Box3().setFromObject(poolTable);
    
    points = [
        {
            position: new THREE.Vector3(
                littleSofaBox.getCenter(new THREE.Vector3()).x,
                littleSofaBox.max.y + 0.5,
                littleSofaBox.getCenter(new THREE.Vector3()).z
            ),
            element: document.querySelector('.point-0'),
            object: littleSofa
        },
        {
            position: new THREE.Vector3(
                bigSofaBox.getCenter(new THREE.Vector3()).x,
                bigSofaBox.max.y + 0.5,
                bigSofaBox.getCenter(new THREE.Vector3()).z
            ),
            element: document.querySelector('.point-1'),
            object: bigSofa
        },
        {
            position: new THREE.Vector3(
                poolTableBox.getCenter(new THREE.Vector3()).x,
                poolTableBox.max.y + 0.5,
                poolTableBox.getCenter(new THREE.Vector3()).z
            ),
            element: document.querySelector('.point-2'),
            object: poolTable
        }
    ];
    
    points.forEach((point, index) => {
        const sphereGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const sphereMaterial = new THREE.MeshBasicMaterial({ 
            color: [0xffffff]
        });
       const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereMesh.position.copy(point.position);
        spheres.push(sphereMesh)
        scene.add(sphereMesh)


    });
  
}

let intersectionObjects;
function setIntersectionObjects() {
    intersectionObjects = [littleSofa, bigSofa, poolTable];
}



const raycaster = new THREE.Raycaster();

// MAIN ENTRY
async function main() {
    await modelLoad();
    cameraAnimation();
    pointsCreation();
    await cameraPreviw()
    setIntersectionObjects();
}

main();

// RENDERER
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure =1

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    aspectRatio = sizes.width / sizes.height;
    mainCamera.aspect = aspectRatio;
    littleSofaCamera.aspect = aspectRatio;
    bigSofaCamera.aspect = aspectRatio;
    poolCamera.aspect = aspectRatio;
    mainCamera.updateProjectionMatrix();
    littleSofaCamera.updateProjectionMatrix();
    bigSofaCamera.updateProjectionMatrix();
    poolCamera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});
const previewOffset = {
    positionStrength: 0.02, // how much the camera moves with mouse
    rotationStrength: 0.08, // how much the camera rotates
    targetPositionOffset: new THREE.Vector3(),
    targetRotationOffset: new THREE.Vector3()
};
window.addEventListener('mousemove',(e)=>{
mouse.x= e.clientX/sizes.width*2-1
mouse.y= -e.clientY/sizes.height*2+1

gsap.to('.cursor',{
    top:e.y,
    left:e.x
})
  raycaster.setFromCamera(mouse, activeCamera);
  const intersects = raycaster.intersectObjects(spheres);

  // Show "customize" only if hovering sphere and not in preview
if (intersects.length > 0) {
    const hoveredSphere = intersects[0].object;
    const index = spheres.indexOf(hoveredSphere);
    const hotspotKeys = ['lillSoft', 'bigSofa', 'pool'];
    const hoveredHotspotKey = hotspotKeys[index];

    if (!isPreviewActive) {
        cursorLabel.textContent = "Customize";
    } else if (isPreviewActive && currentHotspotKey === hoveredHotspotKey) {
        cursorLabel.textContent = "Exit";
    } else {
        cursorLabel.textContent = "";
    }
} else {
    cursorLabel.textContent = "";
}

})
window.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, activeCamera);
    const intersects = raycaster.intersectObjects(spheres);

    if (intersects.length > 0) {
        const clickedSphere = intersects[0].object;
        const index = spheres.indexOf(clickedSphere);

        if (index === 0) {
            enterPreviewMode('lillSoft');
        } else if (index === 1) {
            enterPreviewMode('bigSofa');
        } else if (index === 2) {
            enterPreviewMode('pool');
        }
    }
});
let clock=new THREE.Clock()

// RENDER LOOP
const loop = () => {
 const elapsedTime = clock.getElapsedTime(); 
    const sphereBeep = 1 + 0.3 * Math.cos(elapsedTime * 3); 
    raycaster.setFromCamera(mouse, activeCamera);

    // Handle sphere highlighting
    if (points) {
        spheres.forEach((value)=>{
            value.scale.set(sphereBeep,sphereBeep,sphereBeep)
        })

        const intersects = raycaster.intersectObjects(spheres);
        for (const object of spheres) {
            object.material.color.set('#ffffff');
        }
        for (const intersect of intersects) {
            intersect.object.material.color.set('rgb(14, 53, 51)');
        }
    // Cursor text logic
if (intersects.length > 0) {
    const hoveredSphere = intersects[0].object;
    const index = spheres.indexOf(hoveredSphere);
    const hotspotKeys = ['lillSoft', 'bigSofa', 'pool'];
    const hoveredHotspotKey = hotspotKeys[index];

    if (!isPreviewActive) {
        cursorLabel.textContent = "Customize";
    } else if (isPreviewActive && currentHotspotKey === hoveredHotspotKey) {
        cursorLabel.textContent = "Exit";
    } else {
        cursorLabel.textContent = "";
    }
} else {
    cursorLabel.textContent = "";
}



    }


    // Parallax-style camera adjustment during preview mode
if (isPreviewActive && previewHotspots[currentHotspotKey]) {
    const hotspotCam = previewHotspots[currentHotspotKey].camera;

    // calculate offset
    previewOffset.targetPositionOffset.set(
        mouse.x * previewOffset.positionStrength,
        mouse.y * previewOffset.positionStrength,
        0
    );

    previewOffset.targetRotationOffset.set(
        mouse.y * previewOffset.rotationStrength,
        -mouse.x * previewOffset.rotationStrength,
        0
    );

    // apply smooth LERP to camera position
    hotspotCam.position.lerp(
        new THREE.Vector3()
            .copy(previewHotspots[currentHotspotKey].position)
            .add(previewOffset.targetPositionOffset),
        0.05
    );

    // Apply rotation relative to base rotation (no cumulative addition)
    hotspotCam.rotation.x = THREE.MathUtils.lerp(hotspotCam.rotation.x, basePreviewRotation.x + previewOffset.targetRotationOffset.x, 0.1);
    hotspotCam.rotation.y = THREE.MathUtils.lerp(hotspotCam.rotation.y, basePreviewRotation.y + previewOffset.targetRotationOffset.y, 0.1);
}

    renderer.render(scene, activeCamera);
    requestAnimationFrame(loop);
};
loop();













/*

           
    const littleSofaLight = gui.addFolder('LittleSofaLights');
            littleSofaLight.add(littleSofa_Lights[0], 'intensity', 0.01, 50, 0.01).name('Light intensity').onChange((v) =>  (littleSofa_Lights[0].intensity = v)).listen();
            littleSofaLight.add(littleSofa_Lights[1], 'intensity', 0.01, 50, 0.01).name('Light1 intensity').onChange((v) => (littleSofa_Lights[1].intensity = v)).listen();
            littleSofaLight.add(littleSofa_Lights[2], 'intensity', 0.01, 50, 0.01).name('Light2 intensity').onChange((v) => (littleSofa_Lights[2].intensity = v)).listen();
    const littleSofaLightx = gui.addFolder('LittleSofaLights0');
            littleSofaLightx.add(littleSofa_Lights[0].position, 'x', -50, 50, 0.01).name('Light').onChange((v) =>  (littleSofa_Lights[0].position.x = v)).listen();
            littleSofaLightx.add(littleSofa_Lights[0].position, 'y', -50, 50, 0.01).name('Light1').onChange((v) => (littleSofa_Lights[0].position.y = v)).listen();
            littleSofaLightx.add(littleSofa_Lights[0].position, 'z', -50, 50, 0.01).name('Light2').onChange((v) => (littleSofa_Lights[0].position.z = v)).listen();
    const littleSofaLighty = gui.addFolder('LittleSofaLights1');
            littleSofaLighty.add(littleSofa_Lights[1].position, 'x', -50, 50, 0.01).name('Light intensity').onChange((v) =>  (littleSofa_Lights[1].position.x = v)).listen();
            littleSofaLighty.add(littleSofa_Lights[1].position, 'y', -50, 50, 0.01).name('Light1 intensity').onChange((v) => (littleSofa_Lights[1].position.y = v)).listen();
            littleSofaLighty.add(littleSofa_Lights[1].position, 'z', -50, 50, 0.01).name('Light2 intensity').onChange((v) => (littleSofa_Lights[1].position.z = v)).listen();
    const littleSofaLightz = gui.addFolder('LittleSofaLights2');
            littleSofaLightz.add(littleSofa_Lights[2].position, 'x', -50, 50, 0.01).name('Light intensity').onChange((v) =>  (littleSofa_Lights[2].position.x= v)).listen();
            littleSofaLightz.add(littleSofa_Lights[2].position, 'y', -50, 50, 0.01).name('Light1 intensity').onChange((v) => (littleSofa_Lights[2].position.y= v)).listen();
            littleSofaLightz.add(littleSofa_Lights[2].position, 'z', -50, 50, 0.01).name('Light2 intensity').onChange((v) => (littleSofa_Lights[2].position.z= v)).listen();

            const bigSofaLight = gui.addFolder('BigSofaLights');
            bigSofaLight.add(bigSofa_Lights[0], 'intensity', 0.01, 50, 0.01).name('Light intensity').onChange((v) =>  (bigSofa_Lights[0].intensity = v)).listen();
            bigSofaLight.add(bigSofa_Lights[1], 'intensity', 0.01, 50, 0.01).name('Light1 intensity').onChange((v) => (bigSofa_Lights[1].intensity = v)).listen();
            bigSofaLight.add(bigSofa_Lights[2], 'intensity', 0.01, 50, 0.01).name('Light2 intensity').onChange((v) => (bigSofa_Lights[2].intensity = v)).listen();
            bigSofaLight.add(bigSofa_Lights[3], 'intensity', 0.01, 50, 0.01).name('Light3 intensity').onChange((v) => (bigSofa_Lights[3].intensity = v)).listen();

            const poolLights = gui.addFolder('poolLights');
            poolLights.add(pool_Lights[0].position, 'z',0.01, 50, 0.01).name('Light Z').onChange((v) => (interiorModel.children[38].position.z = v)).listen();
            poolLights.add(pool_Lights[1], 'intensity', 0.01, 50, 0.01).name('Light1 intensity').onChange((v) => (interiorModel.children[39].intensity = v)).listen();




const cameraPositionControlls = gui.addFolder('cameraPositions');
cameraPositionControlls.add(parameters.cameraPosition, 'x', -100, 100, 0.01).name('X').onChange((v) => (mainCamera.position.x = v)).listen();
cameraPositionControlls.add(parameters.cameraPosition, 'y', -100, 100, 0.01).name('Y').onChange((v) => (mainCamera.position.y = v)).listen();
cameraPositionControlls.add(parameters.cameraPosition, 'z', -100, 100, 0.01).name('Z').onChange((v) => (mainCamera.position.z = v)).listen();

const cameraRotationControlls = gui.addFolder('cameraRotation');
cameraRotationControlls.add(parameters.cameraRotation, 'x', 0, Math.PI * 3, 0.01).name('X').onChange((v) => (mainCamera.rotation.x = v)).listen();
cameraRotationControlls.add(parameters.cameraRotation, 'y', 0, Math.PI * 3, 0.01).name('Y').onChange((v) => (mainCamera.rotation.y = v)).listen();
cameraRotationControlls.add(parameters.cameraRotation, 'z', 0, Math.PI * 3, 0.01).name('Z').onChange((v) => (mainCamera.rotation.z = v)).listen();




*/