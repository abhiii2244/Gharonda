import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from "gsap/Draggable";
import { SplitText } from 'gsap/SplitText';
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, Draggable, SplitText,ScrollSmoother);




//Nav
const ham=document.querySelector('.hamburger')
const mnav=document.querySelector('.mnav')

let navTimeline=gsap.timeline({paused:true,defaults:{ease:'power4.inOut'}})
navTimeline.from('.mnav',{
  height:'0%',duration:1
},'a')
navTimeline.from('.mnavLinks',{
  height:'0%',duration:1,
  stagger:0.1
},'a')
navTimeline.from('.mnavLinks li',{
  y:-500,duration:1,
  stagger:0.1
})
navTimeline.from('.mnavSocial li',{
  y:100,duration:1,
  stagger:0.1
})

  ham.addEventListener('click',()=>{
mnav.classList.toggle('active')
if(mnav.classList.contains('active')){navTimeline.restart()}
else{navTimeline.reverse()}
})



let askAcallbtn=document.querySelectorAll('.askAcallbtn .asktocalltext span')
document.querySelector('.askAcallbtn').addEventListener('mouseenter',()=>{
gsap.to(askAcallbtn[0],{
  top:'-200%',
  duration:1,
  ease:'power4.inOut',
})
gsap.to(askAcallbtn[1],{
  top:'100%',
  duration:1,
  ease:'power4.inOut',
})
})
document.querySelector('.askAcallbtn').addEventListener('mouseleave',()=>{
gsap.to(askAcallbtn[0],{
  top:'100%',
  duration:1,
  ease:'power4.inOut'
})
gsap.to(askAcallbtn[1],{
  top:'200%',
  duration:1,
  ease:'power4.inOut'
})
})
