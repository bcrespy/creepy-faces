/**
 * This file just draws a moving rectangle
 * A better example will be added in the future 
 */

import Canvas from '@creenv/canvas';
import Vector2 from "@creenv/vector/vector2";
import Color from '@creenv/color';
import AudioData from "@creenv/audio/audio-analysed-data";
import config from "./config";


const BLENDING = [
  "source-over",
  "multiply",
  "screen",
  "hard-light", // creepy as fuck
  "difference", // omg c'est parfait 
  "luminosity" // b&w
];

const HARD_BLENDING = [
  "source-out", // special fx stroboscope
  "xor", // same
];

const IMAGES = [
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "8.jpeg",
  "5.png",
  "14.png",
  "9.jpeg",
  "10.jpeg",
  "11.jpeg",
  "12.jpeg",
  "13.jpeg",
  "14.jpeg",
  "15.jpeg",
  "16.jpeg"
];


class Renderer {
  
  // called before the first render() call 
  init () {
    this.canvas = new Canvas();
    this.canvas.background(config.background.string);
    this.canvas.save();

    /**
     * @type {Array.<Image>}
     */
    this.images = [];

    /**
     * @type {Image}
     */
    this.currentImage = null;

    this.transform = this.generateTransform();
    this.currentSize = new Vector2();
    this.currentPos = new Vector2();

    this.currentMode = "source-over";

    this.cycle = 0;

    this.lastRegisteredEnergy = false;

    this.hardMode = false;
    this.hardModeDuration = 0;


    return new Promise(resolve => {
      let load = IMAGES.length;
      IMAGES.forEach(image => {
        let img = new Image();
        img.onload = () => {
          this.images.push(img);
          load--;
          if (load <= 0) {
            this.randomCurrent();
            resolve();
          }
        }
        img.src = `faces/${image}`;
      });
    });
  }

  /**
   * 
   * @param {number} deltaT 
   * @param {number} time 
   * @param {AudioData} audioData 
   */
  render (deltaT, time, audioData) {
    console.log(audioData.peak);
    this.canvas.context.transform(...this.transform);

    if (audioData.peak.value == 1) {
      console.log("peak");
      if (this.lastRegisteredEnergy) {
        if (audioData.peak.energy / this.lastRegisteredEnergy > 3) {
          this.hardMode = true;
        }
      }
      this.lastRegisteredEnergy = audioData.peak.energy;
      this.transform = this.generateTransform();
      this.canvas.context.setTransform(1,0,0,1,0,0);
      this.randomCurrent();
      this.currentSize.x = Math.random() * this.currentImage.width + this.currentImage.width/2;
      this.currentSize.y = Math.random() * this.currentImage.height + this.currentImage.height/2;
      this.currentPos = this.generateRandomPos();
      this.canvas.context.globalCompositeOperation = this.hardMode ? "xor" : this.currentMode;
    }

    this.canvas.context.drawImage(this.currentImage, this.currentPos.x, this.currentPos.y, this.currentSize.x, this.currentSize.y);

    if (this.hardMode) {
      this.hardModeDuration+= deltaT;
      if (this.hardModeDuration > config.hardModeLength) {
        this.hardMode = false;
        this.hardModeDuration = 0;
      }
    }

    this.cycle+= deltaT;
    if (this.cycle > 4500) {
      this.cycle = 0;
      this.randomMode();
    }
  }

  generateTransform(distorsion = 0.02) {
    return [
      1,
      Math.random()*distorsion - distorsion/2,
      0,
      1 + Math.random()*distorsion - distorsion/2,
      0,
      0
    ];
  }

  randomMode () {
    this.currentMode = BLENDING[BLENDING.indexOf(this.currentMode)+1];
  }

  generateRandomPos () {
    return new Vector2(Math.random()*this.canvas.width/2 - this.canvas.width/3, Math.random()*this.canvas.height/2 - this.canvas.height/3);
  }

  randomCurrent () {
    this.currentImage = this.images[Math.floor(Math.random()*this.images.length)];
  }
}

export default Renderer;