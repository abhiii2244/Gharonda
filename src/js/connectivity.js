import collection from './collection.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(ScrollTrigger, SplitText);

let connectivityHeading=new SplitText('.connectivityText',{type:'chars',})
export const gallery = document.querySelector('.gallery');
const galleryContainer = document.querySelector('.gallery-container');
const titleContainer = document.querySelector('.title-container');
const cards = [];
const transformState = [];
let currentTitle = null;
let isPreviewActive = false;
let istransitioning = false;

export const config = {
imgCount: 7,
radius: 250,
sensitivity: 500,
effectFalloff: 250,
cardMoveAmount: 50,
lerpFactor: 0.15,
isMobile: true,
};

const parallaxState = {
targetX: 0,
targetY: 0,
targetZ: 0,
currentX: 0,
currentY: 0,
currentZ: 0,
};

const galllerry=[
{title:`Metro Station<br>500 Metrs`,background:' #08352E',
        img:'/connectivityIcons/asset1.webp',
        realImage:'https://images.unsplash.com/photo-1556695736-d287caebc48e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

},
{title:'Commercial Plaza<br>2 Kilometrs',background:'#08352E',
    img:'/connectivityIcons/building-solid.webp' ,
     realImage:'https://images.unsplash.com/photo-1721452438166-65304a906b76?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
},
{title:'Hospital<br>1 Kilometrs',background:'#08352E',
    img:'/connectivityIcons/hospital-solid.webp',
    realImage:'https://images.unsplash.com/photo-1564732005956-20420ebdab60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'   
},
{title:'School<br>300 Metrs',background:'#08352E',
    img:'/connectivityIcons/school-flag-solid.webp' ,
      realImage:'https://images.unsplash.com/photo-1581726690015-c9861fa5057f?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'   
},
{title:'AirPort<br>2 Kilometrs',background:'#08352E',
    img:'/connectivityIcons/plane-departure-solid.webp' ,
     realImage:'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'   
},
{title:'Highway<br>500 Metrs',background:'#08352E',
    img:'/connectivityIcons/road-solid.webp',
      realImage:'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'   

},
{title:'Cricket Stadium',background:'#08352E',
    img:'/connectivityIcons/stadium.webp',
      realImage:'https://images.unsplash.com/photo-1554187505-bf7114ee173c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'    
},

]

export default document.addEventListener('DOMContentLoaded', () => {

for (let i = 0; i < config.imgCount; i++) {
const angle = (i / config.imgCount) * Math.PI * 2;
const x = config.radius * Math.cos(angle);
const y = config.radius * Math.sin(angle);
const cardIndex = i % 10;

const card = document.createElement('div');
card.className = 'card';
card.dataset.index = i;
card.style.background = collection[cardIndex].background;
card.dataset.title = galllerry[cardIndex].title;

const img = document.createElement('img');
img.src=galllerry[cardIndex].img
img.classList.add('img')
card.appendChild(img);

const realImage = document.createElement('img');
realImage.src = galllerry[cardIndex].realImage || '';
realImage.classList.add('realImage');
card.appendChild(realImage);

gsap.set(card,{
  x,y,rotation:(angle*180)/Math.PI+90,
  transformPerspective:800,
  transformOrigin:'center center'
})

gallery.appendChild(card);
cards.push(card);

transformState.push({
currentRotation: 0,
targetRotation: 0,
currentX: 0,
targetX: 0,
currentY: 0,
targetY: 0,
currentScale: 1,
targetScale: 1,
angle,});


card.addEventListener('click', (e) => {
if (!isPreviewActive && !istransitioning) {
togglePreview(parseInt(card.dataset.index));
e.stopPropagation();}
});}


//need to change location
let circularRotation = { angle: 0 };
let circularTween = gsap.to(circularRotation, {
angle: Math.PI * 2,
duration: 30,
ease: "none",
repeat: -1,
onUpdate: () => {
cards.forEach((card, i) => {
const angle = transformState[i].angle + circularRotation.angle;
const x = config.radius * Math.cos(angle);
const y = config.radius * Math.sin(angle);
gsap.set(card, {
x,
y,});});
}
});

let originalGalleryState = {
x: 0,
y: 0,
rotation: 0,
scale: 1};





function togglePreview(index) {
isPreviewActive = true;
istransitioning = true;

// //not in video
circularTween.pause();

originalGalleryState = {
x: gsap.getProperty(gallery, "x"),
y: gsap.getProperty(gallery, "y"),
rotation: gsap.getProperty(gallery, "rotation"),
scale: gsap.getProperty(gallery, "scale")
};

const angle = transformState[index].angle;
const targetPosition = (Math.PI * 3) / 2;
let rotationRadians = targetPosition - angle;

if (rotationRadians > Math.PI) rotationRadians -= Math.PI * 2;
else if (rotationRadians < -Math.PI) rotationRadians += Math.PI * 2;

transformState.forEach((state) => {
state.currentRotation = state.targetRotation = 0;
state.currentScale = state.targetScale = 1;
state.currentX = state.targetX = state.currentY = state.targetY = 0;
});

gsap.to(gallery, {
onStart: () => {

gsap.to(connectivityHeading.chars,{
y:'100%',
duration:0.5,
stagger: 0.1,
ease: "power4.out"
})



cards.forEach((card, i) => {

  const img = card.querySelector('.img');
  const realImg = card.querySelector('.realImage');

  if (i === index && realImg) {
    img.style.display = 'none';
    realImg.style.display = 'block';
  }



gsap.to(card, {
x: config.radius * Math.cos(transformState[i].angle),
y: config.radius * Math.sin(transformState[i].angle),
rotateY: 0,
scale: 1,
duration: 1.25,
ease: "power4.out"});
})

;},
scale: 5,
y: 1250,
rotate: (rotationRadians * 180) / Math.PI + 360,
duration: 2,
ease: "power4.inOut",
onComplete: () => {
istransitioning = false;}
});

gsap.to(parallaxState,{
  currentX:0,
  currentY:0,
  currentZ:0,
  duration:0.5,
  ease:"power2.out",
  onUpdate:()=>{
    gsap.set(galleryContainer,{
     rotateX:parallaxState.currentX,
     rotateY:parallaxState.currentY, 
     rotateZ:parallaxState.currentZ,
     transformOrigin:'center center'
    })
  },
})

const titleText = cards[index].dataset.title;
const p = document.createElement("p");
p.innerHTML = titleText;
titleContainer.appendChild(p);

currentTitle = p;
const splitText = new SplitText(p, {
type: "words",
wordsClass: "word"
});

const words = splitText.words;
gsap.set(words, { y: "200%" });
gsap.to(words, {
y: "0%",
duration: 0.75,
delay: 1.25,
stagger: 0.1,
ease: "power4.out"
});



}




function resetGallery() {
if (istransitioning) return;
istransitioning = true;

if (currentTitle) {
const words = currentTitle.querySelectorAll('.word');
gsap.to(words, {
y: '-200%',
duration: 1,
delay: 0.5,
stagger: 0.1,
ease: 'power4.out',
onComplete: () => {
currentTitle.remove();
currentTitle = null;},
});
}
  cards.forEach((card) => {
    const img = card.querySelector('.img');
    const realImg = card.querySelector('.realImage');

    if (img) img.style.display = 'block';
    if (realImg) realImg.style.display = 'none';
  });


gsap.to(gallery, {
     onStart:()=>{
gsap.to(connectivityHeading.chars,{
y:'0%',
duration:0.5,
stagger: 0.1,
ease: "power4.out"})
},
x: originalGalleryState.x,
y: originalGalleryState.y,
rotation: originalGalleryState.rotation,
scale: originalGalleryState.scale,
duration: 2.5,
ease: 'power4.inOut',

onComplete: () => {
isPreviewActive = istransitioning = false;
Object.assign(parallaxState, {
targetX: 0,
targetY: 0,
targetZ: 0,
currentX: 0,
currentY: 0,
currentZ: 0})

  circularTween.restart(); // Resume from paused, not restart
}
});
}

document.addEventListener('click', () => {
if (isPreviewActive && !istransitioning) resetGallery();
});



function animate() {
  if (!isPreviewActive && !istransitioning) {
    cards.forEach((card, index) => {
      const state = transformState[index]; // ✅ This line was missing
      const angle = state.angle;
      const x = config.radius * Math.cos(angle);
      const y = config.radius * Math.sin(angle);

      gsap.set(card, {
        x: x + state.currentX,
        y: y + state.currentY,
        rotateY: state.currentRotation,
        scale: state.currentScale,
        rotation: (angle * 180) / Math.PI + 90,
        transformPerspective: 1000,
      });

      gsap.set(galleryContainer, {
        rotateX: parallaxState.currentX,
        rotateY: parallaxState.currentY,
        rotateZ: parallaxState.currentZ,
      });
    });
  }

  requestAnimationFrame(animate); 
}

});

