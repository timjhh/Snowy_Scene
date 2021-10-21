import './App.css';
import * as Tone from 'tone'
import React, { useState } from 'react';
import * as d3 from 'd3';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Legend from './Legend.jsx';
import Cube from './Cube.jsx';
import Environment from './Environment.jsx';
function App() {


let scene;
let skybox;

function initScene() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x222244 );
  scene.add( new THREE.AmbientLight( 0x444444 ) );
  scene.fog = new THREE.Fog( 0x222244, 1600, 2000 ); 

  // Create snowy field plane
  let planeGeom = new THREE.PlaneGeometry(10000,10000);
  let planeMesh = new THREE.MeshBasicMaterial( {color: 0xc2bfb8, side : THREE.DoubleSide })
  var plane = new THREE.Mesh(planeGeom, planeMesh);

  // Rotate to viewable angle
  plane.rotation.x = Math.PI / 2;

  // Create skybox
  let skyGeom = new THREE.BoxGeometry(10000, 10000, 10000);
  skybox = new THREE.Mesh(skyGeom);

  scene.add(skybox);
  scene.add(plane);


  // Manually load in skybox images
  const ft = new THREE.TextureLoader().load("GTX_ft.jpg");
  const bk = new THREE.TextureLoader().load("purplenebula_bk.jpg");
  const up = new THREE.TextureLoader().load("purplenebula_up.jpg");
  const dn = new THREE.TextureLoader().load("purplenebula_dn.jpg");
  const rt = new THREE.TextureLoader().load("purplenebula_rt.jpg");
  const lf = new THREE.TextureLoader().load("purplenebula_lf.jpg");

  

}
  


    const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 20000 );

    camera.position.set(0,1000,5000);
    camera.lookAt(0,0,0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set( 0, 500, 0 );
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    controls.update();



    const clock = new THREE.Clock();



    camera.position.z = 15;
    initScene();
    function animate() {



    renderer.render( scene, camera );
    requestAnimationFrame( animate );

  }

  animate();

  return (
    <>
    <head>

      <title>Snowy Scene</title>

    </head>

    <div className="App">

{/*        <Cube 
          color={colorC}
          numCubes={numCubes}
          tone={Tone}
          scaleRef={scaleRef}
          startRef={startRef}
          speedRef={speedRef}

        />

        <Environment />*/}



    </div>

    </>
  );
}

export default App;