  // Define base and max speed
  // Then, generate a scalar up to max to multiply the base by
  var max_mult = 5;
  //var min_speed = props.speed;
  
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

  // async function initAudio() {

//   if(startRef.current) {
//     startRef.current = startRef.current;
//   } else {
//   await Tone.start();
//   startRef.current = true;
//   console.log("Audio initialized");
//   }
// }


//   var options = {
//     note: 'A',
//     mode: "Major",
//     tempo: 90,
//     scale: [],
//     speed: 0.002,
//   };


//   const [mode, setMode] = useState(options.mode);
//   const [note, setNote] = useState(options.note);
//   const [tempo, setTempo] = useState(options.tempo);
//   let [scale, setScale] = useState(options.scale);
//   let start = false;
//   let range = [0,9];

//   // Control the current scale we're playing in
//   const scaleRef = React.useRef(options.scale);
//   // Correctly start the simulation/audio
//   const startRef = React.useRef(start);
//   // Control the minimum speed of cubes
//   const speedRef = React.useRef(options.speed);
//   // Control the range of notes available to modify
//   const rangeRef = React.useRef(range);



//   let numCubes = 6;

//   // Define some music theory terms
//   // Starting at 'C0' and ending at 'G#9'
//   const min = 1;
//   const max = 9;

//   const midpoint = (max-min)/2;

//   const modes = ['Major', 'Minor'];
//   const notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];

//   // W - Whole step
//   // H - Half step
//   // 'Final' notes are omitted to avoid duplicates i.e. C major ends at B, not C

//   // Major scales follow the pattern of W-W-H-W-W-W-H
//   const major = [0,2,4,5,7,9,11];

//   // Minor scales follow the pattern of W-H-W-W-H-W-W
//   const minor = [0,2,3,5,7,8,10]; 

  
//   // On change, calculate a new scale with input values
//   function appOnChange() {
//   options.scale = [];
//   let arr = (mode === "Major") ? major : minor;
//   let start = notes.indexOf(note);

//   arr.forEach(function(d) {

//     options.scale.push(notes[((d + start) % notes.length)]);
//      });

//   scaleRef.current = options.scale;

// }