import Creenv from '@creenv/core';

import HUD from "@creenv/hud";
import GUI from "@creenv/gui";
import Stats from "@creenv/stats";

import Controls from "./user-controls";
import Renderer from './renderer';

import AudioSource from "@creenv/audio/source/library";
import AudioStream from "@creenv/audio/stream";
import AudioAnalyser from "@creenv/audio/analyser";

import AudioManager from "@creenv/audio/manager";

import Capture from "@creenv/capture";



class MyProject extends Creenv {
  init() {
    super.init();
    super.framerate(30);

    this.renderer = new Renderer();

    this.manager = new AudioManager(AudioManager.SOURCE_TYPE.FILE, {
      filepath: "./angy-kore-do-you-know.mp3",
      analyserOptions: {
        peakDetection: {
          options: {
            threshold: 1.1,
            energyPersistence: 150
          }
        }
      },
      offset: 120 // when to start the music, to be added !
    }, false);

    this.hud = new HUD();
    this.stats = new Stats();
    this.hud.add(new GUI(Controls));
    this.hud.add(this.stats);

    return new Promise(resolve => {
      this.renderer.init().then(() => {
        this.manager.init().then(() => {
          // this.manager.play()
          resolve();
        });
      });
    });
  }

  render() {
    this.stats.begin();
    let analysedData = this.manager.getAnalysedAudioData(this.deltaT, this.elapsedTime);
    this.renderer.render(this.deltaT, this.elapsedTime, analysedData);
    this.stats.end();
  }
}

let project = new MyProject();
project.bootstrap(); 


/*let capture = new Capture(project, {
  framerate: 30,
  export: {
    type: "webm",
    options: {
      quality: 0.95,
      framerate: 30, 
      filename: "boooo.webm"
    }
  },
});*/