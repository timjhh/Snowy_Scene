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
var stars = [];
var snows = [];



function initScene() {

  scene = new THREE.Scene();
  //scene.background = new THREE.Color( 0x222244 );
  //scene.add( new THREE.AmbientLight( 0x444444 ) );
  //scene.fog = new THREE.FogExp2(0xffffff)
  //scene.fog = new THREE.Fog( 0x000000, 4000, 8000 ); 

  // Create snowy field plane
  let planeGeom = new THREE.PlaneGeometry(5000,5000);
  //let planeMesh = new THREE.MeshBasicMaterial( {color: 0xc2bfb8, side : THREE.DoubleSide })
  let planeMesh = new THREE.MeshPhongMaterial({color: '#8AC', side : THREE.DoubleSide});

  var plane = new THREE.Mesh(planeGeom, planeMesh);

  // Rotate to viewable angle
  plane.rotation.x = Math.PI / 2;

  scene.add(plane);




  let numStars = 4000;
  let numSnow = 1000;


  // Maximum distance star can take
  var max = 10000;

  // Maximum distnace snow can take
  var maxSnow = 5000;



  // Range to extend stars around plane
  // If we generate a # [-100,100], range=10 will
  // extend the # to [-1000,1000]
  var range = 4;

  // GENERATE A RANDOM # OF STARS
  for(var i = 0; i < numStars; i++) {


    let starGeom = new THREE.BoxGeometry(1, 1, 1);
    let starMat = new THREE.MeshBasicMaterial({color: 0xffffff});
    let star = new THREE.Mesh(starGeom, starMat);

    
    star.position.x = ((max/2) - (Math.random() * max)) * range;

    // Only positive values allowed
    star.position.y = (Math.random() * max) + 4000;
    

    star.position.z = ((max/2) - (Math.random() * max)) * range;
    

    star.scale.x = star.scale.y = 8;

    stars.push(star);
    scene.add(star);

  }

  //let moonGeom = new THREE.SphereGeometry(400, 100, 100);
  let moonGeom = new THREE.IcosahedronGeometry(400, 0);
  let moonMat = new THREE.MeshBasicMaterial({color: 0xF4F6F0});
  let moon = new THREE.Mesh(moonGeom, moonMat);

  let color = "0xffffff";
  let intensity = 1;

  let moonLight = new THREE.DirectionalLight(color,intensity);
  moonLight.position.set(5000,5000,5000);
  moonLight.target.position.set(0,0,0);

  moon.position.x = 5000;
  moon.position.y = 5000;
  moon.position.z = 5000;

  scene.add(moon);
  scene.add(moonLight);
  scene.add(moonLight.target);

  for(var i = 0 ; i < numSnow; i++) {

    let snowGeom = new THREE.IcosahedronGeometry(3, 0);
    let snowMat = new THREE.MeshBasicMaterial({color: 0xffffff});
    let snow = new THREE.Mesh(snowGeom, snowMat);


    snow.position.x = ((maxSnow/2) - (Math.random() * maxSnow));

    // Only positive values allowed
    snow.position.y = (Math.random() * max);
    

    snow.position.z = ((maxSnow/2) - (Math.random() * maxSnow));


    snows.push(snow);
    scene.add(snow);

  }


  // Leaf color: #015045
  let treeBase = new THREE.CylinderGeometry(5, 80, 2000, 32);
  let treeMat = new THREE.MeshBasicMaterial( {color: "#3b3429", side : THREE.DoubleSide });
  //let treeMat = new THREE.MeshPhongMaterial({color: "#015045", side : THREE.DoubleSide});
  let tree = new THREE.Mesh(treeBase, treeMat);

  let maxLeaves = 4;
  for(var i = 1; i <= maxLeaves; i++) {
    let leafGeom = new THREE.OctahedronGeometry(i*50, 0);
    let leafMat = new THREE.MeshLambertMaterial({color: "#015045"});

    let leaf = new THREE.Mesh(leafGeom, leafMat);

    leaf.position.x = 500;
    leaf.position.y = ((1-(1/i)) * 500) + 100;
    leaf.position.z = 300;


    scene.add(leaf);
  }

  tree.position.x = 500;
  tree.position.z = 300;

  //scene.add(tree);


  // Some additional geometry ??
  let sqGeom = new THREE.BoxGeometry(80, 80, 80);
  let sqMat = new THREE.MeshBasicMaterial({color: 0x000000});
  let sq = new THREE.Mesh(sqGeom, sqMat);

  sq.position.x = 500;
  sq.position.y = 0;
  sq.position.z = 0;

  scene.add(sq);

}
  


    const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 20000 );

    camera.position.set(0,5000,0);
    camera.lookAt(5000,5000,5000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setPixelRatio( window.devicePixelRatio );





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


    snows.forEach(d => {

      
      d.position.y <= 0 ? d.position.y = 1000 : d.position.y-=0.5; 

    });

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



    </div>

    </>
  )
}
}

export default App;