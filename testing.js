        // document.querySelector(".end-menu").classList.add("after")
        // let newMainBox = document.createElement("div")
        // newMainBox.setAttribute("id","main-box")

        // let newTime = document.createElement("h1")
        // newTime.setAttribute("id","time")
        // let timeBox = document.createElement("div")
        // timeBox.setAttribute("id","time-and-score")
        // newTime.innerHTML = `10` //${difficulty}
        // timeBox.appendChild(newTime)
        // setTimeout(() => {
        //     document.querySelector("body").removeChild(document.querySelector(".end-menu"))
        //     document.querySelector("body").insertBefore(timeBox, document.querySelector("body").firstChild)
        //     document.querySelector("body").insertBefore(newMainBox, document.querySelector("body").firstChild)
        //     document.querySelector('#main-box').style.display = 'flex'
        //     document.querySelector('#main-box').style.backgroundColor = 'red'
        //     document.querySelector('#time').style.display = 'flex'
        //     this.gameStart()
        // }, 1000); 

        let rotation = Math.random() * 520;

        pop () {
            let amount = 30;
              for (let i = 0; i < amount; i++) {
                this.createParticle(this.mainBox.offsetLeft,this.mainBox.offsetTop);
              }
          }
        createParticle (x, y) {
            const particle = document.createElement('particle');
            document.body.appendChild(particle);
            let width = Math.floor(Math.random() * 30 + 8);
            let height = width;
            let destinationX = (Math.random() - 0.5) * 300;
            let destinationY = (Math.random() - 0.5) * 300;
            let rotation = Math.random() * 520;
            let delay = Math.random() * 200;
            particle.style.background = `hsl(${Math.random() * 90 + 270}, 70%, 60%)`;
            particle.style.border = '1px solid white';
          }
        removeParticle (e) {
            e.srcElement.effect.target.remove();
          }