  class Movement {
      constructor(){
          this.up = false;
          this.down = false;
          this.right = false;
          this.left = false;
      }

      Handle(event) {
        if (event.key === "ArrowUp" && event.type == "keydown") {
          this.up = true;
        } else if (event.key === "ArrowUp" && event.type == "keyup") {
          this.up = false
        }
      
        if (event.key === "ArrowDown" && event.type == "keydown") {
          this.down = true;
        } else if (event.key === "ArrowDown" && event.type == "keyup") {
          this.down = false
        }
      
        if (event.key === "ArrowLeft" && event.type == "keydown") {
          this.left = true;
        } else if (event.key === "ArrowLeft" && event.type == "keyup") {
          this.left = false
        }
      
        if (event.key === "ArrowRight" && event.type == "keydown") {
          this.right = true;
        } else if (event.key === "ArrowRight" && event.type == "keyup") {
          this.right = false
        }
      }
  }