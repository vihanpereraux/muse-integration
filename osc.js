const socket = new osc.WebSocketPort({
    url: 'ws://192.168.1.223:5000', // Change the port as required
    metadata: true
});

socket.on("message", function(oscMessage) {
    console.log("Received OSC message:", oscMessage);
    // Process your OSC messages here
});

socket.open();