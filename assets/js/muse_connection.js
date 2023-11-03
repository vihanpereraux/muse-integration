const connectorbutton = document.getElementById('connector');
import { MuseClient } from 'muse-js';

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
    console.log(acceleration);
  });
}

connectorbutton.addEventListener('click', function(){
  // console.log('connected');
  main();
})