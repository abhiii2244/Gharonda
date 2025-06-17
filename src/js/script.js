
import '../css/style.css';
import '../css/responsive.css';
import * as conn from './connectivity.js'
import './customerreview.js'
import './nav.js'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from "gsap/Draggable";
import { SplitText } from 'gsap/SplitText';
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, Draggable, SplitText,ScrollSmoother);

let smoother = ScrollSmoother.create({
  smooth: 2,
  wrapper:'.smooth-wrapper',
  content:'.container',
  effects: true,
  speed:.5,
  normalizeScroll: true,
});

let preloaderHeading=document.querySelector('.preloaderText h2')
let preloaderpara=document.querySelector('.preloaderText h3')
let preloaderHeadingSplit=new SplitText(preloaderHeading,{type:'chars',charsClass:'char'})
let preloaderparaSplit=new SplitText(preloaderpara,{type:'chars',charsClass:'char'})
console.log(preloaderHeadingSplit);

let preLoaderTimeline=gsap.timeline()

preLoaderTimeline.from('#preloaderImg',{
  bottom:'-150%',
  duration:1,
})
preLoaderTimeline.from('#preloaderLogo',{
  scale:0,
  duration:2,
},'b')

preLoaderTimeline.from(preloaderHeadingSplit.chars,{
  y:100,
  duration:2,stagger:0.1
},'b')
preLoaderTimeline.from(preloaderparaSplit.chars,{
  y:-100,
  duration:2,stagger:0.1,
  onComplete:()=>{
    gsap.delayedCall(0.5,()=>{

      preLoaderTimeline.to(preloaderparaSplit.chars,{
      y:-100,
      duration:2,stagger:0.1,},'a')


      preLoaderTimeline.to(preloaderHeadingSplit.chars,{
      y:100,
      duration:2,stagger:0.1,},'a')

      preLoaderTimeline.to('#preloaderLogo',{
      scale:0,
      duration:1,
      },'a')
      
      preLoaderTimeline.to('#preloaderImg',{
        bottom:'-150%',
        delay:0,
      duration:0.5,})

      preLoaderTimeline.to('.preloader',{
      height:'0%',
      duration:1,})

    })
  }
},'b')






let pc_list=document.querySelectorAll('.pc-list ul li')
let scrollSections=['#header','#ourProjects','#vr3d','#picturegallery',0,'#footer','#form']
pc_list[0].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[0],true)
})
pc_list[1].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[1],true)
})
pc_list[2].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[2],true)
})
pc_list[3].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[3],true)
})
pc_list[4].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[4],true)
})
pc_list[5].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[5],true)
})

let mnavlinks=document.querySelectorAll('.mnavLinks li')
mnavlinks[0].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[0],true)
})
mnavlinks[1].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[1],true)
})
mnavlinks[2].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[2],true)
})
mnavlinks[3].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[3],true)
})
mnavlinks[4].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[4],true)
})
mnavlinks[5].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[5],true)
})

let formbtns=[document.querySelector('.whatsapp'),document.querySelector('.form'),document.querySelector('.whatsapp')]
formbtns[0].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[6],true)
})
formbtns[1].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[6],true)
})
formbtns[2].addEventListener('click',()=>{
  smoother.scrollTo(scrollSections[6],true)
})

const sec1Cards = document.querySelectorAll('.cardWrapper li');
const mm = gsap.matchMedia();




document.querySelector('#header button').addEventListener('mouseenter',()=>{
gsap.to('.buttonText :nth-child(1)',{
  top:'-150%',
  duration:1,
  ease:'power4.inOut',
})
gsap.to('.buttonText :nth-child(2)',{
  top:'50%',
  duration:1,
  ease:'power4.inOut',
})
})
document.querySelector('#header button').addEventListener('mouseleave',()=>{
gsap.to('.buttonText :nth-child(1)',{
  top:'50%',
  duration:1,
  ease:'power4.inOut'
})
gsap.to('.buttonText :nth-child(2)',{
  top:'150%',
  duration:1,
  ease:'power4.inOut'
})
})




document.querySelector('.plus i').addEventListener('click',()=>{

  document.querySelector('.plus i').classList.toggle('active')


  if(  document.querySelector('.plus i').classList.contains('active') ){

  gsap.to('.plus i',{
    rotate:'45deg',
    duration:.2,
    ease:'circ'
  })
  gsap.to('.whatsapp ',{
    opacity:1,
    duration:.5,
    ease:'circ'
  })
  gsap.to('.form ',{
     opacity:1,
    duration:.5,
    ease:'circ'
  })

  gsap.to('.phone',{
     opacity:1,
    duration:.5,
    ease:'circ'
  })
  }
else{  gsap.to('.plus i',{
    rotate:'0deg',
    duration:.2,
    ease:'circ'
  })
  gsap.to('.whatsapp ',{
         opacity:0,
    duration:.5,
    ease:'circ'
  })
  gsap.to('.form ',{
         opacity:0,
    duration:.5,
    ease:'circ'
  })

  gsap.to('.phone',{
         opacity:0,
    duration:.5,
    ease:'circ'
  })

}

})


//Vr Section
let vrSectionHeading=document.querySelector('.overalyHeading h3')
let vrSectionHeadingCursive=document.querySelector('.overalyHeading h4')
let vrSectionHeadingSplitTextH2=new SplitText(vrSectionHeading,{
    type:'chars',wordsClass:'chars'
})
let vrSectionHeadingSplitTextCursive=new SplitText(vrSectionHeadingCursive,{
    type:'chars',wordsClass:'chars'
})
let vrbutton=document.querySelector('.cTNbtn button')
let vrbuttonHREF=document.querySelector('.cTNbtn button a')



let vrTimeline=gsap.timeline({paused:true})

vrbuttonHREF.addEventListener('click',(e)=>{
let targetLink=vrbuttonHREF.getAttribute('href')
      e.preventDefault()

vrTimeline.to(vrSectionHeadingSplitTextH2.chars,{
   y:'-100%',
   duration:0.5,
    stagger:0.1
})
vrTimeline.to(vrSectionHeadingSplitTextCursive.chars,{
   y:'100%',
   duration:0.5,
    stagger:0.1
})

vrTimeline.to('.cTNbtn button',{
    y:'200%'
})

vrTimeline.to('#keyholeImg',{
    // scale:'1000%',
    height:'10000%',
    duration:1,
    ease:'power4.inOut',
    onComplete:()=>{gsap.delayedCall(0.02,()=>{
      window.location.assign(targetLink)

    })
}
})

vrTimeline.play()
})

let vrbuttonspans=document.querySelectorAll('.vrOverley .buttonText span')
vrbutton.addEventListener('mouseenter',()=>{
gsap.to(vrbuttonspans[0],{
  top:'-150%',
  duration:1,
  ease:'power4.inOut',
})
gsap.to(vrbuttonspans[1],{
  top:'50%',
  duration:1,
  ease:'power4.inOut',
})
})
vrbutton.addEventListener('mouseleave',()=>{
gsap.to(vrbuttonspans[0],{
  top:'50%',
  duration:1,
  ease:'power4.inOut'
})
gsap.to(vrbuttonspans[1],{
  top:'150%',
  duration:1,
  ease:'power4.inOut'
})
})







// PictureGallery Section
const gallery=[
 'https://delf2iyv2crlj.cloudfront.net/Images/c6e72f15-c74d-44ec-9610-79e9fc058b82.webp',
  'https://delf2iyv2crlj.cloudfront.net/Images/47cb373a-44dc-4919-9ade-285e7a4aa08c.webp',
  'https://delf2iyv2crlj.cloudfront.net/Images/7a97d6ba-5782-446c-b6c5-355a4816c3e1.webp',
  'https://delf2iyv2crlj.cloudfront.net/Images/b61fd64f-ee95-4863-bb23-8feae13d21e7.webp',
  'https://delf2iyv2crlj.cloudfront.net/Images/c6f69397-781c-4d09-8b64-374db944d0e7.webp',
  'https://delf2iyv2crlj.cloudfront.net/Images/d0a020b0-e835-49e5-bcc5-0dc4504b830a.webp',
  'https://delf2iyv2crlj.cloudfront.net/Images/b61fd64f-ee95-4863-bb23-8feae13d21e7.webp',
]
 

  let currentImageIndex=0;
  let lastX=0;
  let lastY=0;
  let distanceThreshold=150;
  const pictureGallery=document.querySelector('#picturegallery')


window.addEventListener('mousemove',(e)=>{
  const dx=e.clientX-lastX
  const dy=e.clientY-lastY
  const distance=Math.sqrt(dx*dx+dy*dy)
  if(distance>distanceThreshold){
    createTrail(e.clientX,e.clientY)
  lastX=e.clientX
  lastY=e.clientY

}
})

function createTrail(x,y) {
  const img=document.createElement('img')
  img.classList.add('image-trail')
  img.src = gallery[currentImageIndex];

  pictureGallery.appendChild(img)
  
  currentImageIndex=(currentImageIndex+1)%gallery.length   //10 will be replace with imgobj .length

gsap.set(img,{
  x:x,y:y,
  scale:0,
  opacity:0,
  rotation:gsap.utils.random(-20,20)
})
gsap.to(img,{
  scale:1,
  opacity:1,
duration:0.4,
ease:'power2.out'
})
gsap.to(img,{
  scale:0.2,
  opacity:0,
duration:1,
delay:0.3,
ease:'power2.in',
onComplete:()=>{
  img.remove()}
})
}


let tabs_links = document.querySelectorAll('.tab');
let tabs_Content = document.querySelectorAll('.tabsContent');
let tabs_text = document.querySelectorAll('.tabText');


// Animate only the text inside the hovered tab
tabs_Content.forEach((elem, index) => {
  elem.addEventListener('mouseenter', () => {
    const txt = tabs_text[index]; // Assuming matching index
    if (txt) {
      gsap.to(txt, {
        top: '0%'
      });
    }
  });
});
tabs_Content.forEach((elem, index) => {
  elem.addEventListener('mouseleave', () => {
    const txt = tabs_text[index]; // Assuming matching index
    if (txt) {
      gsap.to(txt, {
        top: '100%'
      });
    }
  });
});



// Function to show tab
function showTab(tabClass) {
  // Hide all tabs
  tabs_Content.forEach((tab) => {
    if (tab.classList.contains('active')) {
      gsap.to(tab, {
        scale: 0,
        autoAlpha: 0,
        duration: 0.5,
         ease: 'circ',
        onComplete: () => {
          tab.classList.remove('active');
          tab.style.display = 'none';
        }
      });
    }
  });

  // Show selected tab
  tabs_Content.forEach((tab) => {
    if (tab.classList.contains(tabClass)) {
      tab.style.display = 'flex'; // required before animating
      gsap.fromTo(tab,
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'circ',
          onStart: () => tab.classList.add('active')
        }
      );
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const currentTab = document.querySelectorAll('.tabsContent.current');
  currentTab.forEach((val)=>{
  val.classList.add('active');
    val.style.display = 'flex';
    gsap.fromTo(val,{ scale: 0, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'circ' }
    )
  })  

});

// Tab click handlers
tabs_links[0].addEventListener('click', () =>{ showTab('current')
  tabs_links[0].classList.add('active')
  tabs_links[1].classList.remove('active')
  tabs_links[2].classList.remove('active')
});
tabs_links[1].addEventListener('click', () => {showTab('ongoing')
    tabs_links[1].classList.add('active')
  tabs_links[0].classList.remove('active')
  tabs_links[2].classList.remove('active')
});
tabs_links[2].addEventListener('click', () => {showTab('upcoming')
    tabs_links[2].classList.add('active')
  tabs_links[1].classList.remove('active')
  tabs_links[0].classList.remove('active')
});


let advVideo=document.querySelector('#advVideo')
let video=document.querySelector('#Video')
gsap.to(video,{
  scrollTrigger:{
    trigger:advVideo,
    start:'10% 50%',
    end:'50% 50%',
    scrub:true, },

  width:'100%',
  height:'100%',
  duration:2,
  ease:'power1.inOut',

})

//Costomer reviews
let reviewItem=document.querySelectorAll('.reviewItem')
console.log(reviewItem);
// random sizes
reviewItem.forEach((item,index) => {
  let randomHeight = Math.floor(Math.random() * 50) + 250; // height between 200–350px
  item.style.height = `${randomHeight}px`;
});


mm.add('(max-width:600px)', () => {



  
  gsap.set(conn.gallery, { scale: 0.7 });
  conn.config.isMobile = true;
});

mm.add('(min-width:601px)', () => {


});

mm.add('(min-width:769px)', () => {
VanillaTilt.init([...tabs_Content], {
  max: 25,
  speed: 400
});



  //Aminities
  const aminitiestl = gsap.timeline({
    scrollTrigger: {
      trigger: '#amenities',
      start: 'clamp(top top)',
      end: 'clamp(+=500)',
      scrub: true,
      pin:'#amenities'
    },
  });

  sec1Cards.forEach((card, index) => {
    card.style.transform = `rotate(${2.5 * index}deg)`;
    aminitiestl.from(card, {
      bottom: '-100%',
      stagger: 0.1,
    });
  });

  gsap.set(conn.gallery, { scale: 0.9 });
  conn.config.isMobile = false;

  return () => {
    aminitiestl.scrollTrigger?.kill();
    aminitiestl.kill();
    gsap.set(sec1Cards, { transform: 'rotate(0deg)' });
  };
});

mm.add('(min-width:991px)', () => {
gsap.set(conn.gallery, { scale: 1 });
conn.config.isMobile = false;
});


