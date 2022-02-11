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

        // Add event listener to color square on mouse enter
        gridSquare.addEventListener('mouseenter', () => {
            gridSquare.classList.add('inked')
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

createGrid(16)
