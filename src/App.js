import './App.css';
import * as Tone from 'tone'
import React, { useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import $ from 'jquery';

import Legend from './Legend.jsx';
import Cube from './Cube.jsx';
import Environment from './Environment.jsx';
class App extends React.Component {

constructor(props) {
  super(props);

}

componentDidMount() {





let scene;
let skybox;


function initScene() {

  scene = new THREE.Scene();
  //scene.background = new THREE.Color( 0x222244 );
  scene.add( new THREE.AmbientLight( 0x444444 ) );
  //scene.fog = new THREE.FogExp2(0xffffff)
  //scene.fog = new THREE.Fog( 0x000000, 4000, 8000 ); 

  // Create snowy field plane
  let planeGeom = new THREE.PlaneGeometry(5000,5000);
  let planeMesh = new THREE.MeshBasicMaterial( {color: 0xc2bfb8, side : THREE.DoubleSide })
  var plane = new THREE.Mesh(planeGeom, planeMesh);

  // Rotate to viewable angle
  plane.rotation.x = Math.PI / 2;

  scene.add(plane);



  let numstars = 500;


  // After rendering past the bounds of our scene, multiply by a conditional -1
  // To apply the stars symmetrically
  var neg = 1;

  // Minimum distance star can take
  var min = 0;

  // Maximum distance star can take
  var max = 10000;

  var range = 4;

  // GENERATE A RANDOM # OF STARS
  for(var i = 0; i < 4000; i++) {



    let starGeom = new THREE.BoxGeometry(1, 1, 1);
    let starMat = new THREE.MeshBasicMaterial({color: 0xffffff});
    let star = new THREE.Mesh(starGeom, starMat);

    
    star.position.x = ((max/2) - (Math.random() * max)) * range;

    // Only positive values allowed
    star.position.y = (Math.random() * max);
    

    star.position.z = ((max/2) - (Math.random() * max)) * range;
    

    star.scale.x = star.scale.y = 8;


    scene.add(star);

    // Apply the next star across the scene
    neg *= -1;

  }

  let moonGeom = new THREE.SphereGeometry(200, 100, 100)


}
  


    const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 20000 );

    camera.position.set(0,5000,0);
    camera.lookAt(0,0,0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setPixelRatio( window.devicePixelRatio );

    ///$(".App").append(renderer.domElement)



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

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Call animate method and get this gravy train rolling!
  window.addEventListener('resize', onWindowResize, false);
  animate();

    document.body.appendChild( renderer.domElement );















}





  render() {
  return (
    <>
    <head>

      <title>Snowy Scene</title>

    </head>

    
    <div className="App" id="App">

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
  )
}
}

export default App;