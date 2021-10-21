import './App.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import * as Tone from 'tone';
import React, { useEffect } from 'react';

function Cube(props) {



function main() {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // L/W/H of the box - how far does a cube travel before resetting
  const max = 8;

  // Create standard box geometry
  var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );


  var bb = new THREE.BoxGeometry(max*Math.E,max*Math.E,max*Math.E);
  // var bb = new THREE.SphereGeometry(max*Math.E*2,max*Math.E,max*Math.E);
  //var bb = new THREE.SphereGeometry();


var sphere = new THREE.SphereGeometry(max+0.25);
var object = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 }) );
var box = new THREE.BoxHelper( object );
scene.add(box);
scene.add(object);

const clock = new THREE.Clock();

  // Create bounding box render
  const bound = new THREE.BoxHelper(new THREE.Mesh(bb, new THREE.MeshBasicMaterial( 0xff0000 )), 0xffffff);

  scene.add(bound);

  const controls = new OrbitControls( camera, renderer.domElement );

  camera.position.z = 15;


  var dx = 0.05;
  var dy = 0.05;
  var dz = 0.05;

  // scale_len = the length of any major or minor scale
  var scale_len = props.scaleRef.current.length;
  //var max_speed = 0.002;

  // Define base and max speed
  // Then, generate a scalar up to max to multiply the base by
  var max_mult = 5;
  var min_speed = props.speed;
  
  // Each note timing can range from 1-256
  // This can be represented as a random power of 2 as
  // 2**8 == 256 and 2**0 == 1
  const max_note_len = 8;
  // What is the maximum pitch notes can play at
  const max_pitch = 4;
  // What is the minimum pitch notes can play at
  const min_pitch = 2;

  // Notes can be represented by:
  // n - regular note
  // t - triplet
  // n. - dotted note
  // e.g. 4n. is a dotted quarter note
  const note_types = ['n','t'];
  

  var cubes = [];

  const reverb = new Tone.Reverb(2);
  const delay = new Tone.PingPongDelay("8n", 0.2);
  const env = new Tone.Envelope(0.4);
  const vibrato = new Tone.Vibrato();
  const compressor = new Tone.Compressor(-30, 2);

  env.attackCurve = 'sine';
  //env.triggerAttack();

  for(var i = 0; i < props.numCubes; i++) {


    const material = new THREE.MeshBasicMaterial( { 
      color: props.color(i) } );

    const cube = new THREE.Mesh( geometry, material );
    cubes[i] = cube;


    // Random note, pitch and length generation
    let randNote = Math.floor(Math.random() * scale_len);
    let randPitch = Math.floor(Math.random() * max_pitch) + min_pitch;
    let randLen = 2 ** Math.floor(Math.random() * max_note_len);
    let type_idx = Math.floor(Math.random() * note_types.length);
    
    cubes[i].minSpeed = props.speedRef.current;

    cubes[i].note = (props.scaleRef.current[randNote] + randPitch);

    cubes[i].note_len = (randLen + note_types[type_idx]);

    cubes[i].synth = new Tone.MembraneSynth();
    //cubes[i].synth = new Tone.FMSynth();
    //cubes[i].synth = new Tone.Synth();

    //cubes[i].synth.chain(vibrato, reverb, compressor, Tone.Destination);
    cubes[i].synth.chain(compressor, Tone.Destination);

    // Define more random values :)
    // Once the cube's counter reaches an arbitrary maximum, switch notes
    cubes[i].counter = 0;

    // How many times can a note repeat before changing
    //cubes[i].max_repeats = (Math.ceil((Math.random() * 8))+1);
    cubes[i].max_repeats = 6;

    cubes[i].dx = cubes[i].minSpeed * (2**(Math.ceil((Math.random() * max_mult))+1));
    cubes[i].dy = 0;
    cubes[i].dz = 0;


    const center = new THREE.Vector3();
    cubes[i].dist = new THREE.Vector3(cubes[i].dx,cubes[i].dy,cubes[i].dz);

    scene.add(cube);  

  }


  function animate() {

    // Check for start button to be pressed before allowing animation
    if(props.startRef.current) {

      cubes.forEach(function(d,idx) {

      d.rotation.x += dx;
      d.rotation.y += dx;

      //const synth = new Tone.Synth().toDestination();

      // if(Math.abs(d.position.x) >= max) {
      //   d.counter++;
      //   d.position.x = 0;
      //   d.position.y = 0;
      //   d.position.z = 0;
      //   d.synth.triggerAttackRelease(d.note, d.note_len);

      // }
      if(d.dist.length() >= max) {
        d.counter++;
        d.position.x = 0;
        d.position.y = 0;
        d.position.z = 0;
        d.synth.triggerAttackRelease(d.note, d.note_len);

      }


      // Trigger a note re-association after a number of repeats
      if(d.counter >= d.max_repeats) {
        d.note = (props.scaleRef.current[i % scale_len] + (Math.floor(Math.random() * max_pitch) + min_pitch)).toString();
        d.counter = 0;
      }
      if(d.minSpeed != props.speedRef.current) {
        d.position.x = 0;
        d.minSpeed = props.speedRef.current;
        d.dx = d.minSpeed * (2**(Math.ceil((Math.random() * max_mult))+1));
      }

      d.position.x += d.dx;
      d.position.y += d.dy;
      d.position.z += d.dz;

      d.dist.x = d.position.x;
      d.dist.y = d.position.y;
      d.dist.z = d.position.z;



      //sphere.material.opacity = 0.5 * (1 + Math.sin( clock.getElapsedTime() ) );


    });

    }
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

  }

  animate();

}

window.onload = main;


  return (

    <div>
    </div> 
  
  );
}

export default React.memo(Cube);