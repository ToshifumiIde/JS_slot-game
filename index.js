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

      this.stop.addEventListener("click" , ()=>{
        clearTimeout(this.timeoutId);
      })

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
  }

  const panels = [new Panel(), new Panel(), new Panel()];

  //
  const spin = document.getElementById("js-spin");
  spin.addEventListener("click", () => {
    panels.forEach((panel) => {
      panel.spin();
    });
  });
}
