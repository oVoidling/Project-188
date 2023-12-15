let player = {
  currentGun: "pistol",
  currentCash: 1000
};

let a = player.currentGun;
let b = {
  ak47: [
    { interval: 100, automatic: true, magSize: 30, totalBullets: 120,rotationX:0,rotationY:-90,rotationZ:0,positionY:-0.3,gltf:"#Ak47",prize:450 }
  ],
  sniper: [
    { interval: 400, automatic: false, magSize: 6, totalBullets: 24,rotationX:0,rotationY:-90,rotationZ:0,positionY:-0.3,gltf:"#Sniper Rifle",prize:600 }
  ],
  MP5: [
    { interval: 85, automatic: true, magSize: 35, totalBullets: 140,rotationX:0,rotationY:90,rotationZ:0,positionY:-0.5,gltf:"#MP5",prize:300 }
  ],
  pistol: [
    { interval: 200, automatic: false, magSize: 12, totalBullets: 48,rotationX:0,rotationY:0,rotationZ:0,positionY:-0.3,gltf:"#pistol" }
  ]
};

let bullets = b[a][0]["magSize"];
let interval = b[a][0]["interval"];
let automatic = b[a][0]["automatic"];
let totalBullets = b[a][0]["totalBullets"];
let rotationX = b[a][0]["rotationX"]
let rotationY = b[a][0]["rotationY"]
let rotationZ = b[a][0]["rotationZ"]
let positionY = b[a][0]["positionY"]
let gltf = b[a][0]["gltf"]

AFRAME.registerComponent("gun",{
  init:function(){
    const a1 = a
    const gun1 = document.querySelector(`#${a1}`)
    gun1.setAttribute("visible",false)
    const gun = document.querySelector(`#${a}`)
    gun.setAttribute("visible",true)
    this.store()
  },
  store:function(){
    document.addEventListener("keydown",(e)=>{
      if(e.key==="K" || e.key==="k"){
        const storeText = document.querySelector("#store")
        storeText.setAttribute("visible",true)
        document.addEventListener("keydown",(f)=>{
          if(f.key==="1" && player.currentCash >= 300){
            const a1 = a
            const gun1 = document.querySelector(`#${a1}`)
            gun1.setAttribute("visible",false)
            console.log("Attempting to purchase MP5...");
            console.log("Current cash:", player.currentCash);
            player.currentGun = "MP5";
            player.currentCash -= 300;
            console.log("Updated current gun:", player.currentGun);
            console.log("Remaining cash:", player.currentCash);
            storeText.setAttribute("visible", false);
            const gun = document.querySelector(`#${a}`)
            gun.setAttribute("visible",true)
            
          }
          else if(f.key==="2" && player.currentCash >= 450){
            const a1 = a
            const gun1 = document.querySelector(`#${a1}`)
            gun1.setAttribute("visible",false)
            console.log("Attempting to purchase ak47...");
            console.log("Current cash:", player.currentCash);
            player.currentGun = "ak47";
            player.currentCash -= 450;
            console.log("Updated current gun:", player.currentGun);
            console.log("Remaining cash:", player.currentCash);
            storeText.setAttribute("visible", false);
            const gun = document.querySelector(`#${a}`)
            gun.setAttribute("visible",true)
          }
          else if (f.key === "3" && player.currentCash >= 600) {
            const a1 = a
            const gun1 = document.querySelector(`#${a1}`)
            gun1.setAttribute("visible",false)
            console.log("Attempting to purchase sniper rifle...");
            console.log("Current cash:", player.currentCash);
            player.currentGun = "sniper";
            player.currentCash -= 600;
            console.log("Updated current gun:", player.currentGun);
            console.log("Remaining cash:", player.currentCash);
            storeText.setAttribute("visible", false);
            const gun = document.querySelector(`#${a}`)
            gun.setAttribute("visible",true)
          }
        })
      }
    })
  }
})
AFRAME.registerComponent("shoot", {
  
  init: function () {
      console.log("loaded")
      this.playerEntity = document.querySelector("#camera-rig");
      const magSizeText = document.querySelector("#magSizeText")
      const totalBulletsText = document.querySelector("#totalBulletsText")
      magSizeText.setAttribute("text",{value:`${bullets}`})
      totalBulletsText.setAttribute("text",{value:`${totalBullets}`})
      this.shoot();
  },
  shoot: function () {
    const clickHandler = () => {
      if (bullets > 0) {
        this.fireBullet();
        const magSizeText = document.querySelector("#magSizeText")
        const totalBulletsText = document.querySelector("#totalBulletsText")
        magSizeText.setAttribute("text",{value:`${bullets}`})
        totalBulletsText.setAttribute("text",{value:`${totalBullets}`})
        window.removeEventListener("click", clickHandler);
        setTimeout(() => {
          window.addEventListener("click", clickHandler);
        }, interval);
      } else {
        this.showReloadText();
      }
    };

    window.addEventListener("click", clickHandler);

    window.addEventListener("keydown", (e) => {
      if (e.key === "r" || e.key === "R") {
        this.reload();
      }
    });
  },
  fireBullet: function () {
    const bullet = document.createElement("a-entity");
    bullet.setAttribute("geometry", { primitive: "sphere", radius: 0.1 });
    bullet.setAttribute("material", "color", "black");

    const camera = document.querySelector("#camera-rig").object3D;
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    const playerPosition = this.playerEntity.getAttribute("position");
    bullet.setAttribute("position", {
      x: playerPosition.x + -0.1 + direction.x * 1.5,
      y: playerPosition.y + 1.25 + direction.y * 1.5,
      z: playerPosition.z + direction.z * 1.5
    });

    bullet.setAttribute("velocity", direction.clone().multiplyScalar(-10));

    const scene = document.querySelector("#scene");

    bullet.setAttribute("dynamic-body", { mass: "0", shape: "sphere" });
    scene.appendChild(bullet);
    this.playSound();
    bullets -= 1;

    setTimeout(() => {
      this.shooting = false;
    }, interval);
  },
  playSound: function () {
    var entity = document.getElementById("sound1");
    if (entity && entity.components && entity.components.sound) {
      entity.components.sound.playSound();
    } else {
      console.error("Sound entity or sound component not found.");
    }
  },
  showReloadText: function () {
    this.reloadText = document.querySelector("#reloadText");
   /* this.reloadText.setAttribute("position", { x: 0, y: 2, z: -5 });
    this.reloadText.setAttribute("text", { value: "Press \"R\" to reload", align: "center", color: "red", width: 8 });
    this.reloadText.setAttribute("visible",true)*/
    this.reloadText.setAttribute("visible",true)
  },
  reload: function () {
    if (totalBullets > 0) {
      console.log("Reloading");
      const bullets2 = b[a][0]["magSize"] - bullets
      totalBullets -= bullets2;
      bullets = b[a][0]["magSize"];
      this.reloadText.setAttribute("visible",false)

    } else {
      console.log("You've lost, we reset your guns and money and filled your ammo and started over again");
      player.currentCash = 0;
      player.currentGun = "pistol";
      totalBullets = b[a][0]["totalBullets"];
      bullets = b[a][0]["magSize"];
      const magSizeText = document.querySelector("#magSizeText")
      const totalBulletsText = document.querySelector("#totalBulletsText")
      magSizeText.setAttribute("text",{value:`${bullets}`})
      totalBulletsText.setAttribute("text",{value:`${totalBullets}`})
    }
  },
});
