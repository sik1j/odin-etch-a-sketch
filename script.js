// Entry node for app
const entry = document.querySelector('.App')

// Clear button
const clearBtn = document.createElement('button')
clearBtn.textContent = "Clear"
clearBtn.addEventListener('click', () => promtNewGrid())
entry.appendChild(clearBtn)

// container for grid
const gridContainer = document.createElement('div')
gridContainer.classList.add('container')
entry.appendChild(gridContainer)

// creates grid
function createGrid(sideLength) {
    let root = document.querySelector(':root')
    console.log(root.style.setProperty('--side-length', `${sideLength}`))

    for (let i = 0; i < sideLength * sideLength; i++) {
        const gridSquare = document.createElement('div')
        gridSquare.classList.add('grid-square')
        gridSquare.style.backgroundColor = 'rgb(255, 255, 255)'

        // Add event listener to color square on mouse enter
        gridSquare.addEventListener('mouseenter', () => {
            // default
            // gridSquare.classList.add('inked')
            // increment darkness branch
            let bgGrid = gridSquare.style.backgroundColor
            let rgb = getGrayVal(bgGrid)
            gridSquare.style.backgroundColor = `rgb(${rgb - 51},${rgb - 51},${rgb - 51})`
        })

        gridContainer.appendChild(gridSquare)
    }
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
    createGrid(gridSize)
}

function getGrayVal(rgbVal) {
    if (rgbVal.length === 18) {
        return rgbVal.substring(4, 7)
    } else if (rgbVal.length === 15) {
        return rgbVal.substring(4, 6)
    }
    return rgbVal.substring(4, 5)
}
createGrid(16)
