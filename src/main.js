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

import AudioManager from "@creenv/audio/manager";

import Capture from "@creenv/capture";



class MyProject extends Creenv {
  init() {
    super.init();
    super.framerate(30);

    this.renderer = new Renderer();

    this.manager = new AudioManager(AudioManager.SOURCE_TYPE.FILE, {
<<<<<<< HEAD
      filepath: "angy-kore-do-you-know.mp3",
      analyser: {
        peakDetection: {
          options: {
            threshold: 1.05
          }
        }
      }
    }, true);
=======
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
>>>>>>> 52d6d69f1244280f9e54fc7365e21954be93bfb1

    this.hud = new HUD();
    this.stats = new Stats();
    this.hud.add(new GUI(Controls));
    this.hud.add(this.stats);

    return new Promise(resolve => {
<<<<<<< HEAD
      this.manager.init().then(() => {
        this.renderer.init().then(() => {
=======
      this.renderer.init().then(() => {
        this.manager.init().then(() => {
          // this.manager.play()
>>>>>>> 52d6d69f1244280f9e54fc7365e21954be93bfb1
          resolve();
        });
      });
    });
  }

  render() {
    this.stats.begin();
<<<<<<< HEAD
    // for the example
    console.log(this.elapsedTime);
    this.renderer.render(this.deltaT, this.elapsedTime, this.manager.getAnalysedAudioData(this.deltaT, this.elapsedTime+138000));
=======
    let analysedData = this.manager.getAnalysedAudioData(this.deltaT, this.elapsedTime);
    this.renderer.render(this.deltaT, this.elapsedTime, analysedData);
>>>>>>> 52d6d69f1244280f9e54fc7365e21954be93bfb1
    this.stats.end();
  }
}

let project = new MyProject();
project.bootstrap(); 


<<<<<<< HEAD

let capture = new Capture(project, {
=======
/*let capture = new Capture(project, {
>>>>>>> 52d6d69f1244280f9e54fc7365e21954be93bfb1
  framerate: 30,
  export: {
    type: "png-sequence",
    options: {
      quality: 0.95,
      framerate: 30, 
<<<<<<< HEAD
      filename: "sequence.zip"
    }
  },
});
=======
      filename: "boooo.webm"
    }
  },
});*/
>>>>>>> 52d6d69f1244280f9e54fc7365e21954be93bfb1
