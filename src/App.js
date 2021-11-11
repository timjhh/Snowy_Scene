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
var planeLen = 8000;
var stars = [];
var snows = [];
var orbits = [];
let time = 0;


function initScene() {

  scene = new THREE.Scene();
  //scene.background = new THREE.Color( 0x222244 );
  scene.background = new THREE.Color( 0x222244 );
  //scene.add( new THREE.AmbientLight( 0x444444 ) );
  //scene.fog = new THREE.FogExp2(0xffffff)
  //scene.fog = new THREE.Fog( 0x222244, (100), (planeLen/2) ); 

  // Create snowy field plane
  let planeGeom = new THREE.PlaneGeometry(planeLen,planeLen);
  //let planeMesh = new THREE.MeshBasicMaterial( {color: 0xc2bfb8, side : THREE.DoubleSide })
  //let planeMesh = new THREE.MeshPhongMaterial({color: '#8AC', side : THREE.DoubleSide});
  let planeMesh = new THREE.MeshLambertMaterial({color: '#8AC', side : THREE.DoubleSide, reflectivity: 0.5});

  var plane = new THREE.Mesh(planeGeom, planeMesh);

  // Rotate to viewable angle
  plane.rotation.x = Math.PI / 2;

  scene.add(plane);




  let numStars = 4000;
  let numSnow = 1000;
  let numTrees = 30;
  let numOrbits = 10;

  // Maximum distance star can take
  var max = 10000;

  // Maximum distnace snow can take
  var maxSnow = 5000;

  var snowSize = 6;
  var minSnowSize = 0.05;

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


  // GENERATE A NUMBER OF ORBITING BODIES
  for(var i = 0; i < numOrbits; i++) {

    let orbitGeom = new THREE.SphereGeometry(400, 0);
    let orbitMat = new THREE.MeshBasicMaterial({color: 0xF4F6F0});
    let orbit = new THREE.Mesh(orbitGeom, orbitMat);

    let color = "0xffffff";
    let intensity = 1;

    // let moonLight = new THREE.DirectionalLight(color,intensity);
    // moonLight.position.set(planeLen,planeLen,planeLen);
    // moonLight.target.position.set(0,0,0);

    orbit.position.x = (Math.random() * planeLen) - (planeLen/2);
    orbit.position.y = planeLen;
    orbit.position.z = (Math.random() * planeLen) - (planeLen/2);


    scene.add(orbit);
    orbits.push(orbit);

  }

  //let moonGeom = new THREE.SphereGeometry(400, 100, 100);
  let moonGeom = new THREE.IcosahedronGeometry(400, 0);
  let moonMat = new THREE.MeshBasicMaterial({color: 0xF4F6F0});
  //let moonMat = new THREE.MeshPhongMaterial({color: 0xF4F6F0});
  let moon = new THREE.Mesh(moonGeom, moonMat);

  let color = "0xffffff";
  let intensity = 1;

  let moonLight = new THREE.DirectionalLight(color,intensity);
  moonLight.position.set(planeLen,planeLen,planeLen);
  moonLight.target.position.set(0,0,0);

  moon.position.x = planeLen;
  moon.position.y = planeLen;
  moon.position.z = planeLen;

  scene.add(moon);
  scene.add(moonLight);
  scene.add(moonLight.target);

  for(var i = 0 ; i < numSnow; i++) {



    let size = Math.random()*snowSize+minSnowSize;
    let snowGeom = new THREE.IcosahedronGeometry(size, 0);
    let snowMat = new THREE.MeshBasicMaterial({color: 0xffffff});
    let snow = new THREE.Mesh(snowGeom, snowMat);

    snow.size = size;

    snow.position.x = ((maxSnow/2) - (Math.random() * maxSnow));

    // Only positive values allowed
    snow.position.y = (Math.random() * max);
    

    snow.position.z = ((maxSnow/2) - (Math.random() * maxSnow));


    snows.push(snow);
    scene.add(snow);

  }


  // Create a pretty pine tree :)
  function genTree(x, z, size, leaves) {

    const tree = new THREE.Group();

    for(var i = leaves; i >= 1; i--) {

      let leafGeom = new THREE.OctahedronGeometry(i*(size/2), 0);
      let leafMat = new THREE.MeshLambertMaterial({color: "#015045"});

      let leaf = new THREE.Mesh(leafGeom, leafMat);

      leaf.position.x = x;
      leaf.position.y = ((i/leaves) * size) + ((leaves-i) * size) - size/2;
      leaf.position.z = z;


      tree.add(leaf);
    }

    return tree;
  }

  // Leaf color: #015045
  let treeBase = new THREE.CylinderGeometry(5, 80, 2000, 32);
  let treeMat = new THREE.MeshBasicMaterial( {color: "#3b3429", side : THREE.DoubleSide });
  //let treeMat = new THREE.MeshPhongMaterial({color: "#015045", side : THREE.DoubleSide});
  let tree = new THREE.Mesh(treeBase, treeMat);



  for(var i = 0; i < numTrees; i++) {
    let x = (planeLen/2) - (Math.random() * planeLen);
    let z = (planeLen/2) - (Math.random() * planeLen);
    scene.add(genTree(x, z, 100, 5));    
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

    camera.position.set(0,200,0);
    camera.lookAt(5000,3000,5000);

    const clock = new THREE.Clock();



    

    initScene();




    function animate() {


    snows.forEach(d => {

      
      d.position.y <= 0 ? d.position.y = 3000 : d.position.y-=d.size;


    });

    orbits.forEach(d => {

      // Period = Time taken for orbit
      // Angular frequency = 2*pi   /  Period

      // Uniform Circular Motion can be modeled by
      // r(t) = position vector
      // A = |r(t)| = magnitude of position vector = radius of circle
      // w = Angular frequency - radians of space passed through per second(velocity)
      // r(t) = [Acos(w)], [Asin(wtj)];
      d.position.x = (planeLen*Math.cos((2*Math.PI)/2000));
      d.position.z = (planeLen*Math.sin(((2*Math.PI)/2000)*time));
      time++;


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