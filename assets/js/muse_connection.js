var hydra = new Hydra({ detectAudio: false })
import { MuseClient } from 'muse-js';

let accelX = 0;
let accelY = 0;
let accelZ = 0;
const connectorbutton = document.getElementById('connector');

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

// document.body.addEventListener('mousemove', function(e){
//   console.log(e.clientX);
// })

osc(20, 0.01, 1.1)
	.kaleid(10)
	.color(10.83,0.91,0.39)
	.rotate(0, 0.1)
	.modulate(o0, () => (accelX * 1000) * 0.0003)
	.scale(1.01)
  	.out(o0)