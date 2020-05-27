window.onload = () => {
    
    let game = new Game();
    document.getElementById('button').onclick = () => {
        game.preGame()
        game.gameStart()
        audio.play()
        audio3.play()
    };
  };
class Game{
    constructor(){
        this.mainbox = new MainBox
        this.intervalId = this.intervalId
        this.totalTime = 0
        this.gameEnd = this.gameEnd
        this.difficulty = this.difficulty
        
    }
    preGame(){
        let button = document.getElementById('button')
        let instructions =  document.getElementById('instructions')
        let title = document.getElementById('intro')
        button.className = "after"
        instructions.className = "after"
        title.className = "after"
        setTimeout(() => {
            title.parentNode.removeChild(title)
            button.parentNode.removeChild(button)
            instructions.parentNode.removeChild(instructions)
            document.querySelector('#main-box').style.display = 'flex'
            document.querySelector('#time').style.display = 'flex'
        }, 1000);
    }

    render(){
        this.intervalId = setInterval(()=> {
            this.rowDeleterLive()
            this.timer()
            this.totalTimeCounter()
        }, 1000)  
    }
    gameStart(){
        this.gameEnd = false
        this.mainbox.render()
        this.render()
    }
    rowDeleterLive(){
        let elements = this.mainbox.rows
        let row
        for (let i = 0; i < elements.length; i++) {
            if(this.mainbox.rowDeleter(elements[i].childNodes)){
                row = elements[i]
            }
        }
        let mainBox = document.querySelector('#main-box')
        if(!(row === undefined)){
            row.classList.add("after")
            mainBox.removeChild(row)
            audio2.play()
            let newRow = this.mainbox.rowGenerator()
            mainBox.insertBefore(newRow, mainBox.firstChild)
            let time = document.getElementById("time")
            let newTime = parseInt(time.innerHTML) + 2
            time.innerHTML = (`${newTime}`)
        }
    }
    timer(){
        let time = document.getElementById("time")
        let newTime = time.innerHTML - 1
        if(newTime > '-1'){
            time.innerHTML = (`${newTime}`)
        }else{
            this.endgame()
        }
    }
    totalTimeCounter(){
        this.totalTime++
        return this.totalTime
    }
    endgame(){
        clearInterval(this.intervalId)
        let rows = this.mainbox.rows
        for (let i = 0; i < rows.length; i++) {
            rows[i].classList.add('after')
        }
        document.querySelector('#time-and-score').className = 'after'
        setTimeout(() => {
            document.querySelector("body").removeChild(this.mainbox.mainBox)
            document.querySelector("body").removeChild(document.querySelector('#time-and-score'))
        }, 1000);
        this.gameEnd = true
        this.endMenu()
    }
    endMenu(){
        if(this.totalTime>30)confetti.start()
        let endMenu = document.createElement("div")
        endMenu.setAttribute("class","end-menu")

        let restart = document.createElement("button")
        restart.setAttribute("class","restart")
        restart.innerHTML = "RESTART"

        let score = document.createElement("span")
        score.innerHTML = `YOU LASTED ${this.totalTimeCounter()} SEC`

        endMenu.appendChild(restart,)
        endMenu.appendChild(score)

        setTimeout(() => {
            document.querySelector("body").appendChild(endMenu)
            this.buttons()
        }, 1000);
        
    }

    buttons(){
        if(this.gameEnd === true){
            document.querySelector('.restart').addEventListener('click',() =>{
                this.restart()
            }, false)
        }
    }
    restart(){
        audio.play()
        location.reload()
    }
    
}
