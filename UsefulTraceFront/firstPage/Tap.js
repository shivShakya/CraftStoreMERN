import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function ThreeScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });


    renderer.setSize(400, 400);
    renderer.setClearColor(0xffffff);

    const controls = new OrbitControls(camera, renderer.domElement);


    controls.enableRotate = true; // Enables rotation
    controls.enablePan = false; // Disables panning
    controls.enableZoom = false; // Disables zooming
    controls.maxPolarAngle = Math.PI / 2; // Limits rotation to the X-Z plane
    controls.enableDamping = true; // Adds inertia to the rotation
    controls.dampingFactor = 0.05; // Sets the damping factor for the rotation
    controls.rotateSpeed = 0.5; // Sets the rotation speed
    controls.minPolarAngle = Math.PI / 4; // Limits rotation to the Y-Z plane
    controls.maxAzimuthAngle = Math.PI / 2; // Limits rotation to the positive X-axis
    controls.minAzimuthAngle = -Math.PI / 2; // Limits rotation to the negative X-axis

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    cube.scale.x = 4;
    cube.scale.y = 4;
    camera.position.z = 5;



    renderer.domElement.addEventListener('pointermove', (event) => {
      // Get the mouse position in normalized device coordinates
     
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
      // Cast a ray from the camera to the mouse position
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
    
      // Check if the ray intersects with the cube
      const intersects = raycaster.intersectObject(cube);
    
      if (intersects.length > 0) {
        // Change the color of the cube to yellow
        intersects[0].object.material.color.set(0xff0000);
      }
   
    });
    

    const animate = () => {
      requestAnimationFrame(animate);

      controls.update();

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} />;
}

export default ThreeScene;
