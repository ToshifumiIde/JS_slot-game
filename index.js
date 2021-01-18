"use strict";

{
  class Panel {
    constructor() {
      const section = document.createElement("section");
      section.classList.add("panel");
      this.img = document.createElement("img");
      this.img.src = "./slot_js_v6/MySlotMachine/img/seven.png";
      this.stop = document.createElement("div");
      this.stop.classList.add("stop");
      this.stop.textContent = "STOP";

      this.timeoutId = undefined;

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector("main");
      main.appendChild(section);

      this.stop.addEventListener("click", () => {
        if (this.stop.classList.contains("inactive")) return;
        this.stop.classList.add("inactive");
        clearTimeout(this.timeoutId);
        panelLeft--;
        if (panelLeft === 0) {
          checkResult();
        }
      });
    }
    getRandomImage = () => {
      function imgRoot(img) {
        return `./slot_js_v6/MySlotMachine/img/${img}.png`;
      }
      const images = [imgRoot("seven"), imgRoot("bell"), imgRoot("cherry")];
      return images[Math.floor(Math.random() * images.length)];
    };

    spin = () => {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    };

    isUnmatched = (p1, p2) => {
      // if(this.img.src !== p1.img.src && this.img.src !== p2.img.src){
      //   return true;
      // } else {
      //   return false;
      // }
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    };
    unmatch = () => {
      this.img.classList.add("unmatched");
    };
  }
  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }

  const panels = [new Panel(), new Panel(), new Panel()];

  let panelLeft = 3;

  //
  const spin = document.getElementById("js-spin");
  spin.addEventListener("click", () => {
    if (spin.classList.contains("inactive")) return;
    spin.classList.add("inactive");
    panels.forEach((panel) => {
      panel.spin();
    });
  });
}
