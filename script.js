function loco(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}
loco()



function page1(){
    var h1s = document.querySelectorAll("#change h1")
    var index = 0
    
    setInterval(() => {
    
        gsap.to(h1s[index],{
            top:"-100%",
            duration:1,
            onComplete:function(){
                gsap.set(this._targets[0],{top:"100%"})
            }
        })
        
        index === h1s.length - 1 ?index = 0 : index++
        
        gsap.to(h1s[index],{
            top:"0%",
            duration:1,
        })
    }, 4000);
}
page1()



var tl = gsap.timeline({
    scrollTrigger:{
        trigger:"#page3",
        scroller:"#main",
        start:"top top",
        end:"top -200%",
        scrub:1,
        pin:true,
    }
})
tl
.to("#page3 #over",{
    top:0,
    duration:1
},"a")
.to("#page3 #pg3-overlay",{
    backgroundColor:"rgba(0, 0, 0, 0.888)",
    duration:1

},"a")
.to("#page3 #pg3-overlay h2",{
    color:"#ffffff78",
    duration:1

},"a")
.from("#page3 #container",{
    backgroundColor:"rgba(0, 0, 0, 0.999)",
    duration:1
},"a")
.to("#page3 #over2",{
    top:0,
    duration:1,
    delay:1
})



var arr = [
    "https://cms-bat.zorraquino.info/default/imagenes/2023/11/1590_en-work-spaces-Real.jpg",
    "https://cms-bat.zorraquino.info/default/imagenes/2023/11/1584_en-homedesign-Real.jpg",
    "https://cms-bat.zorraquino.info/default/imagenes/2023/10/746_en-hospitality-Real.jpg",
    "https://cms-bat.zorraquino.info/default/imagenes/2023/11/1582_en-consultancy-Real.jpg",
    "https://cms-bat.zorraquino.info/default/imagenes/2023/10/746_en-hospitality-Real.jpg"
]

var card = document.querySelectorAll("#card .inner")


var idx = 0
setInterval(function(){
    gsap.to(card[idx],{
        clipPath:`polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)`,
        duration:.5,
        onComplete:function(){
            gsap.set(this._targets[0],{
            clipPath:`polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)`,
            })
        }
    })
    idx === arr.length - 1 ? idx = 0 : idx++
    gsap.to(card[idx],{
        clipPath:`polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)`,
        duration:.5
    })
    document.querySelector("#over>img").setAttribute("src",arr[idx])
    gsap.from("#over>img",{
        scale:1.5,
    })
},5000)
