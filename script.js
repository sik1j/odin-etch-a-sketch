// Entry node for app
const entry = document.querySelector('.App')

// mode switch
const labelMode = document.createElement('label')
labelMode.textContent = "Sketching Mode"
const selectMode = document.createElement('select')
// mode select options
const optRegular = document.createElement('option')
optRegular.textContent = 'Regular'
optRegular.addEventListener('click', () => {
    mode = 'regular'
    removeGrid()
    createGrid()
})
const optShade = document.createElement('option')
optShade.textContent = 'Shade'
optShade.addEventListener('click', () => {
    mode = 'shade'
    removeGrid()
    createGrid()
})
const optLightShade = document.createElement('option')
optLightShade.textContent = 'Light Shade'
optLightShade.addEventListener('click', () => {
    mode = 'light-shade'
    removeGrid()
    createGrid()
})
const optRGB = document.createElement('option')
optRGB.textContent = 'Rainbow'
optRGB.addEventListener('click', () => {
    mode = 'rainbow'
    removeGrid()
    createGrid()
})
const optRainbowShade = document.createElement('option')
optRainbowShade.textContent = 'Rainbow Shade'
optRainbowShade.addEventListener('click', () => {
    mode = 'rainbow-shade'
    removeGrid()
    createGrid()
})

selectMode.appendChild(optRegular)
selectMode.appendChild(optShade)
selectMode.appendChild(optLightShade)
selectMode.appendChild(optRGB)
selectMode.appendChild(optRainbowShade)

// Clear button
const clearBtn = document.createElement('button')
clearBtn.textContent = "Clear"
clearBtn.addEventListener('click', () => promtNewGrid())

// container for grid
const gridContainer = document.createElement('div')
gridContainer.classList.add('container')

// Order of additions to app
entry.appendChild(labelMode)
entry.appendChild(selectMode)
entry.appendChild(clearBtn)
entry.appendChild(gridContainer)

// -----------------------
// globals
// -----------------------
let mode = 'regular'
let sideLength = 16

// creates grid
function createGrid() {
    let root = document.querySelector(':root')
    root.style.setProperty('--side-length', `${sideLength}`)

    for (let i = 0; i < sideLength * sideLength; i++) {
        createGridSquare()
    }
}

// Creates gridSquares with the corrent sketching mode properties
function createGridSquare() {
    const gridSquare = document.createElement('div')
    gridSquare.classList.add('grid-square')

    // Add event listener to color square on mouse enter
    gridSquare.addEventListener('mouseenter', () => {
        let bgGrid;
        switch (mode) {
            case 'regular':
                gridSquare.style.backgroundColor = 'gray'
                break;
            case 'shade':
                gridSquare.style.backgroundColor = gridSquare.style.backgroundColor == "" ? 'rgb(255, 255, 255)' : gridSquare.style.backgroundColor
                bgGrid = gridSquare.style.backgroundColor
                let rgb = getGrayVal(bgGrid)
                gridSquare.style.backgroundColor = `rgb(${rgb - 25.5},${rgb - 25.5},${rgb - 25.5})`
                break;
            case 'light-shade':
                bgGrid = gridSquare.style.backgroundColor
                gridSquare.style.backgroundColor = bgGrid == "" ? darkenRgb('rgb(255, 255, 255)') : darkenRgb(bgGrid)
                break;
            case 'rainbow':
                bgGrid = gridSquare.style.backgroundColor
                gridSquare.style.backgroundColor = bgGrid == ""  ? `rgb(${rndRgb()},${rndRgb()},${rndRgb()})`: bgGrid
                break;
            case 'rainbow-shade':
                bgGrid = gridSquare.style.backgroundColor
                gridSquare.style.backgroundColor = bgGrid == ""  ? `rgb(${rndRgb()},${rndRgb()},${rndRgb()})`: darkenRgb(bgGrid)
                break;
        }
    })

    gridContainer.appendChild(gridSquare)
}
// removes grid
function removeGrid() {
    let grids = gridContainer.querySelectorAll('div')
    grids.forEach(grid => {
        gridContainer.removeChild(grid)
    })
}

// Clear btn function
function promtNewGrid() {
    removeGrid()
    let gridSize = Number.parseInt(Math.round(Number.parseFloat(prompt("New grid size:"))))
    gridSize = gridSize <= 100 ? gridSize : 100
    sideLength = gridSize
    createGrid()
}

function getGrayVal(rgbVal) {
    if (rgbVal.length === 18) {
        return rgbVal.substring(4, 7)
    } else if (rgbVal.length === 15) {
        return rgbVal.substring(4, 6)
    }
    return rgbVal.substring(4, 5)
}


function rndRgb() {
    return Math.round(Math.random()*255)
}

function darkenRgb(rgbStr) {
    let red = Number.parseInt(rgbStr.substring(rgbStr.indexOf("(")+1, rgbStr.indexOf(',')))
    let blue =  Number.parseInt(rgbStr.substring(rgbStr.indexOf(" ")+1, rgbStr.lastIndexOf(',')))
    let green = Number.parseInt(rgbStr.substring(rgbStr.lastIndexOf(" ")+1, rgbStr.indexOf(')')))
    let darker = `rgb(${red*0.9}, ${blue*0.9}, ${green*0.9})`
    return darker
}

function getLightness(hslStr) {
    let lightnessStart = hslStr.lastIndexOf(" "); 
    let lightnessEnd = hslStr.lastIndexOf("%"); 
    return hslStr.substring(lightnessStart,lightnessEnd)
}
createGrid(16)

console.log(darkenRgb('rgb(100, 13, 235)'))
console.log(darkenRgb('rgb(20, 103, 5)'))
console.log(darkenRgb('rgb(220, 1, 53)'))