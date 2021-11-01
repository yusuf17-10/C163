
AFRAME.registerComponent('bullets', {
    schema: {

    },

    init: function () {
        this.shoot_bullet()
    },

    shoot_bullet: function () {
        window.addEventListener("keydown", (e) => {
            if (e.key == "z") {
                var bullet = document.createElement("a-entity")
                bullet.setAttribute("geometry", { primitive: "sphere", radius: 0.5 })
                console.log("hello")
                bullet.setAttribute("material", "color", "black")
                bullet.setAttribute("dynamic-body",{shape:"sphere",mass:0})
                var cam = document.querySelector("#camera")
                pos = cam.getAttribute("position")
                bullet.setAttribute("position", {
                    x: pos.x, y: pos.y, z: pos.z
                })
                var cam2 = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()
                cam2.getWorldDirection(direction)
                bullet.setAttribute("velocity",direction.multiplyScalar(-10))
                var scene = document.querySelector("#scene")
                bullet.addEventListener("collide",this.removeBullet)
                scene.appendChild(bullet)
            }

        })
    },

    removeBullet:function(e){
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)
        var el_bullet = e.detail.target.el
        var el_hit = e.detail.body.el
        if(el_hit.id.includes("box")){
            el_hit.setAttribute("material",{
                opacity:0.6,
                transparent:true
            })
            var impulse = new CANNON.Vec3(-2,2,1)
            var worldPoint = new CANNON.Vec3().copy(el_hit.getAttribute("position"))
            el_hit.body.applyImpulse(impulse,worldPoint)
            el_bullet.removeEventListener("collide",this.shoot_bullet)
            var scene = document.querySelector("#scene")
            scene.removeChild(el_bullet)
        }
        
    }

});
