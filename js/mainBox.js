let audio = new Audio("./sounds/water-drop.wav")
let audio2 = new Audio("./sounds/water-click.wav")
let audio3 = new Audio("./sounds/heavyRain.wav")
let errorAudio = new Audio("./sounds/wood.wav")
audio.volume = 0.1
audio2.volume = 0.2
audio3.volume = 0.1

class MainBox{
    constructor(rows){
        this.mainBox = document.querySelector('#main-box');
        this.rows = document.getElementsByClassName('row')
    }
    render(){
        for (let i = 0; i < 3; i++) {
            let newRow = this.rowGenerator()
            this.mainBox.appendChild(newRow)
            this.assignActive()
        }
    }
    column(matrix, col){
        var column = [];
        var columnArray = matrix.childNodes;
        column.push(matrix.childNodes[col]);
        return column;
    }
    rowGenerator(){
        let newRow = []
        let classArray = ['red','yellow','blue']
        let $newRowDiv = document.createElement("div")
        $newRowDiv.setAttribute("class", "row");
        for (let i = 0; i < 3 ; i++) {
            let element = document.createElement("div")
            element.setAttribute("class", `box ${classArray[Math.floor(Math.random() * 3)]}`) 
            if (newRow.length > 1 && newRow[0].className === element.className){//making sure no 3 boxes in a row are the same
                element.setAttribute("class", `box ${classArray[Math.floor(Math.random() * 3)]}`)
                if (newRow.length > 1 && newRow[0].className === element.className) {
                    element.setAttribute("class", `box ${classArray[Math.floor(Math.random() * 3)]}`)
                    if (newRow.length > 1 && newRow[0].className === element.className) {
                        element.setAttribute("class", `box ${classArray[Math.floor(Math.random() * 3)]}`)
                    }
                }
            }
            newRow.push(element)
            $newRowDiv.appendChild(element)
        }
        if(!(this.rowDeleter.newRow))return $newRowDiv
    }
    rowDeleter(row){
          let classArray = []
        for (let i = 0; i < row.length; i++) {
            let element = row[i]
            let classItem = element.className
            classArray.push(classItem)
        }
        if (classArray[0] === classArray[1] && classArray[0] === classArray[2]) {
            return true
        }else{
            return false
        }
    }
   
    assignActive(){
        let boxArray = []
        document.getElementById('main-box').onclick = () => {
            if(!(event.target.classList.contains("box"))){
               errorAudio.play()
            }else{
                audio.play()
                let box = event.target
                boxArray.push(box)
                let parentRow = box.closest(".row")
                let parentRowArray = parentRow.childNodes;
                this.mainBox.classList.remove("shake")
                if (box.classList.contains("active")) {
                    box.classList.remove("active")
                    boxArray = []
                }

                if (boxArray.length < 2) {
                    box.classList.add("active")
                }

                if (document.querySelectorAll(".active").length < 2){
                    if (box.nextSibling === boxArray[0] || box.previousSibling === boxArray[0] ) {//ensuring active sibling is adjacent across the row
                        box.classList.add("active")
                    }else{ // ensuring active sibling is adjacent along a column
                        let position = []
                        let positionRow = []
                        let positionColumn = []
                        let columnArray = []
                        let mainBoxChildren = this.mainBox.childNodes
                        for (let i = 0; i < parentRowArray.length; i++) {
                            if(parentRowArray[i] === box) position.push(i)
                        }
                        for (let i = 0; i < mainBoxChildren.length; i++) {
                            if(mainBoxChildren[i].childNodes === parentRowArray) positionRow.push(i)  
                            let rows = mainBoxChildren[i]
                            let column = this.column(rows, position[0])
                            columnArray.push(column)
                        }
                        for (let i = 0; i < 3; i++) {
                            if(columnArray[i][0] === undefined) columnArray.splice(i,1)
                        }
                        for (let i = 0; i < columnArray.length; i++) {
                            if(columnArray[i][0] === box) positionColumn.push(i)
                        }
                        
                        let rangeBack = columnArray[positionColumn[0] + 1]
                        if(rangeBack === undefined){
                            rangeBack = [[0]]
                        }
                        let rangeForward = columnArray[positionColumn[0] - 1]
                        if(rangeForward === undefined){
                            rangeForward = [[0]]
                        }
                        if (rangeBack[0] === boxArray[0] || rangeForward[0] === boxArray[0] ) {
                            box.classList.add("active")
                    }  
                }
            }   if (document.querySelectorAll(".active").length===2){
                boxArray = []
                this.switchColor(document.querySelectorAll(".active")[0],document.querySelectorAll(".active")[1])   
        }
        }
    };
}
    switchColor(box1, box2){
        let class1 = box1.className
        let class2 = box2.className
        box2.setAttribute(`class`, ``)
        box2.setAttribute(`class`, `${class1}`)
        box1.setAttribute(`class`, ``)
        box1.setAttribute(`class`, `${class2}`)
        box1.classList.remove(`active`)
        box2.classList.remove(`active`)
    }
   
}