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
  scene.fog = new THREE.Fog( 0x000000, 4000, 8000 ); 

  // Create snowy field plane
  let planeGeom = new THREE.PlaneGeometry(10000,10000);
  let planeMesh = new THREE.MeshBasicMaterial( {color: 0xc2bfb8, side : THREE.DoubleSide })
  var plane = new THREE.Mesh(planeGeom, planeMesh);

  // Rotate to viewable angle
  plane.rotation.x = Math.PI / 2;




  scene.add(plane);


  const stars = [];
  let numstars = 500;
  for(var i = 0; i < numstars; i++) {

    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);
    
    stars.push(x,y,z);

  }

  const starGeom = new THREE.BufferGeometry();
  starGeom.setAttribute('position', new THREE.Float32BufferAttribute(stars, 3));

  const starMat = new THREE.PointsMaterial({ color: 0x888888 });

  const points = new THREE.Points(starGeom, starMat);

  scene.add(stars);


  // // Manually load in skybox images
  // const ft = new THREE.TextureLoader().load("/skybox/GTX_ft.png");
  // const bk = new THREE.TextureLoader().load("/skybox/GTX_bk.png");
  // const up = new THREE.TextureLoader().load("/skybox/GTX_up.png");
  // const dn = new THREE.TextureLoader().load("/skybox/GTX_dn.png");
  // const rt = new THREE.TextureLoader().load("/skybox/GTX_rt.png");
  // const lf = new THREE.TextureLoader().load("/skybox/GTX_lf.png");

  // // Create skybox
  // let skyGeom = new THREE.BoxGeometry(10000, 10000, 10000);
  // let textures = [ft,bk,up,dn,lf,rt];
  // let materials = [];

  // textures.forEach(d => {

  //     materials.push(new THREE.MeshBasicMaterial({ map: d, side: THREE.BackSide  }));

  // });

  // var skyMaterial = new THREE.MeshFaceMaterial(materials);
  // skybox = new THREE.Mesh(skyGeom, materials);

  scene.add(skybox);
  // skybox.position.x = 0;
  // skybox.position.y = 1000;
  // skybox.position.z = 0;

}
  


    const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 20000 );

    camera.position.set(0,1000,5000);
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