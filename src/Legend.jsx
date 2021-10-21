import './App.css';
import React from 'react';
import Scale from './Scale.jsx'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


function Legend(props) {

  return (

    <div id="leg" className="legend">
      <Typography variant="h5" component="h2">Controls</Typography>

        <hr/>

      <InputLabel>Min Speed</InputLabel>
     <TextField
      // type="number"
      // value={props.speedRef.current.value}
      // placeholder={props.speedRef.current.value}
      // variant="outlined"
      // inputProps={{
      //   maxLength: 13,
      //   step: "0.0002"
      // }}
      // onChange={(event) => {props.speedRef.current = event.target.value}}
    />

        <hr/>
          <p>Note Range</p>
          <Box sx={{ width: 250 }}>
            <Slider
            // getAriaLabel={() => 'Note Range'}
            // value={props.rangeRef.current}
            // min={props.rangeRef.current[0]}
            // max={props.rangeRef.current[1]}
            // step={1}
            // style={{position: "relative"}}
            // onChange={(event) => {props.rangeRef.current = event.target.value}}
            // valueLabelDisplay="auto"
            />

          </Box>
{/*          <Scale {...props}/>*/}
{/*        <hr/>
          <Button variant="outlined" onClick={props.initAudio}>{props.startRef.current == true ? "Stop" : "Start"}</Button>*/}
        <hr/>

    </div> 
  );
}

export default Legend;