AFRAME.registerComponent("player-movement",{
    init:function(){
        this.walk()
    },
    walk:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key==="ArrowUp" || e.key==="ArrowRight" || e.key==="ArrowDown" || e.key==="ArrowLeft" || e.key==="w" || e.key==="d" || e.key==="s" || e.key==="a" || e.key==="W" || e.key==="D" || e.key==="S" || e.key==="A"){
                var entity = document.querySelector("#sound2")
                entity.components.sound.playSound()
            }
        })
    }
})