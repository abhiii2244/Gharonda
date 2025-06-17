import '../css/threejs.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

console.log(gsap);


let objectSelect=document.querySelector('.selectObject i')
let selectModel=document.querySelector('.selectModel')

export let modelScollTimeline=gsap.timeline({paused:true,defaults:{
    ease:'power4.inOut',
    
    stagger:0.1
}})
modelScollTimeline.to(selectModel,{
   top:'0%',
   duration:1
})
modelScollTimeline.from('.selectModelheading',{
    y:-50,
    opacity:0,
       duration:1
})
modelScollTimeline.from('.selectModel ul li ',{
    y:-50,
    opacity:0,
           duration:1
})


objectSelect.addEventListener('click',()=>{
selectModel.classList.toggle('active')
selectModel.classList.contains('active') ? modelScollTimeline.play():modelScollTimeline.reverse()
})


