import Creenv from '@creenv/core';

import HUD from "@creenv/hud";
import GUI from "@creenv/gui";
import Stats from "@creenv/stats";

import Controls from "./user-controls";
import Renderer from './renderer';

import AudioSource from "@creenv/audio/source/library";
import AudioStream from "@creenv/audio/stream";
import AudioAnalyser from "@creenv/audio/analyser";

import Capture from "@creenv/capture";



class MyProject extends Creenv {
  init() {
    super.init();
    super.framerate(30);

    this.renderer = new Renderer();
    this.audioSource = new AudioSource("./angy-kore-do-you-know.mp3");
    this.audioStream = new AudioStream(this.audioSource);
    this.analyser = new AudioAnalyser(this.audioStream, {
      peakDetection: {
        options: {
          threshold: 1.4,
          energyPersistence: 50
        }
      }
    });

    this.hud = new HUD();
    this.stats = new Stats();
    this.hud.add(new GUI(Controls));
    this.hud.add(this.stats);

    return new Promise(resolve => {
      this.audioSource.load().then(() => {
        this.audioStream.init();
        this.renderer.init().then(() => {
          this.audioSource.play(0, 140);
          resolve();
        });
      });
    });
  }

  render() {
    this.stats.begin();
    // for the example
    this.renderer.render(this.deltaT, this.elapsedTime, this.analyser.analyse(this.deltaT, this.elapsedTime));
    this.stats.end();
  }
}

let project = new MyProject();
//project.bootstrap(); 

let capture = new Capture(project, {
  framerate: 30,
  export: {
    type: "webm",
    options: {
      quality: 0.95,
      framerate: 30, 
      filename: "haloween.webm"
    }
  },
})