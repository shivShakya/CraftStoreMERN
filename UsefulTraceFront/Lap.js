import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Lap(){
    const canvasRef = useRef(null);


  

    useEffect(()=>{
        //scene and camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        

        //renderer
        const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
        renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild( renderer.domElement );


        //control
        const controls = new OrbitControls( camera, renderer.domElement );


        //plane geopmetry
        const geometry = new THREE.PlaneGeometry();
        const material = new THREE.MeshBasicMaterial({color:0x00ffff});
        const plane = new THREE.Mesh(geometry,material);
        scene.add(plane);
               
        //box1
        const geometry1 = new THREE.BoxGeometry();
        const material1= new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube1 = new THREE.Mesh(geometry1,material1);
        scene.add(cube1);
        cube1.position.x = -1;

        //box2
        const geometry2 = new THREE.BoxGeometry();
        const material2 = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube2 = new THREE.Mesh(geometry2,material2);
        scene.add(cube2); 
        cube2.position.x = 1;

        camera.position.z = 5;


        


        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

    
    
        function onMouseClick(event) {
          // Calculate mouse position in normalized device coordinates
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

          // Cast a ray from the camera to the mouse position
          raycaster.setFromCamera(mouse, camera);
    
          // Check for intersections with the boxes
          const intersects = raycaster.intersectObjects([cube1, cube2]);
          
    
          if (intersects.length > 0) {
            
            // An intersection occurred - change the color of the clicked object to yellow
            intersects.forEach(intersection => {
             
              intersection.object.material.color.set(0xffff00);
               
            
             
            });
          }
        }
    
        window.addEventListener('click', onMouseClick);





        const animate = ()=>{
           requestAnimationFrame(animate);

          //plane animation
           plane.rotation.x = -1.5;
           plane.position.y = -0.5;
           plane.scale.x = 7;
           plane.scale.y = 7;

          //controls
           controls.update();

           renderer.render(scene,camera);

        };

        animate();
    },[]);

    return <canvas ref={canvasRef} />;
}

export default Lap;