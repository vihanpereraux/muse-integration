var hydra = new Hydra({ detectAudio: false })

osc(20, 0.01, 1.1)
	.kaleid(10)
	.color(10.83,0.91,0.39)
	.rotate(0, 1.1)
	.modulate(o0, () => mouse.x * 0.0003)
	.scale(1.01)
  	.out(o0)