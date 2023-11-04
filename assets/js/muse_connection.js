var hydra = new Hydra({ detectAudio: false })
import { MuseClient } from 'muse-js';

let accelX = 0;
let accelY = 0;
let accelZ = 0;

let elec1 = 0;
let elec2 = 0;

const connectorbutton = document.getElementById('connector');

let getDataButtonClicked = false;
let getRequestInterval;

async function main() {
  let client = new MuseClient();
  await client.connect();
  await client.start();
  client.eegReadings.subscribe(reading => {
    // console.log(reading);
  });
  client.telemetryData.subscribe(telemetry => {
    // console.log(telemetry);
  });
  client.accelerometerData.subscribe(acceleration => {
    // console.log(acceleration.samples[0]);
    accelX = acceleration.samples[0].x;
    accelY = acceleration.samples[0].y;
    accelZ = acceleration.samples[0].z;
  });
}
connectorbutton.addEventListener('click', function(){
  main();
})

let mouseXCord = 0;
document.body.addEventListener('mousemove', function(e){
  mouseXCord = e.clientX/5;
})

osc(20, 0.01, 1.1)
	.kaleid(10)
	.color(10.83,0.91,0.39)
	.rotate(0, 0.1)
	.modulate(o0, () => (elec1 * 500) * 0.0003)
  // .modulate(o0, () => mouseXCord * 0.0003)
    .modulate(
      src(o0)
      .modulate(noise(3),() => (elec1 * 1000) * 0.0003)
    )
	  .scale(1.01)
  .out(o0)

  document.getElementById('get-data').addEventListener('click', function(){
    if(!getDataButtonClicked){
      getDataButtonClicked = true;
      getRequestInterval = setInterval(async () => {
        const response = await fetch('http://127.0.0.1:5000/');
        const myJson = await response.json(); //extract JSON from the http response

        elec1 = myJson.elec1
        elec2 = myJson.elec2
      }, 100);
    }
    else{
      getDataButtonClicked = false;
      clearInterval(getRequestInterval);
    }
  });