/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let start=0;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}
function checkwin(rowIdx,colIdx,val){
	let row=rowIdx;
	let flag=1;
	let flag2=1;
	let diagflag=1;
	let diagflag2=1;
	console.log('rowIdx=',rowIdx,'colIdx=',colIdx);
	console.log('grid value=',grid[rowIdx][colIdx]);
	for (var idx=0;idx<3;idx++){
		if(grid[row][idx]!=val){
			flag=0;
		}
		if(grid[idx][colIdx]!=val){
			flag2=0;
		}

		if(grid[idx][idx]!=val){
			diagflag=0;
		}

		if(grid[idx][2-idx]!=val){
			diagflag2=0;
		}

		
	}
if(flag==1 || flag2==1 || diagflag==1 || diagflag2==1)
		return true
	else
		return false
	
}

function checkDraw(){
	let counter=0;
	for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++){
		for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++){
			if(grid[colIdx][rowidx]==0)
				counter++;
		}
	}
	if(counter==0)
		return true;
	else
		return false;
}

function computerTurn(){
	do{
	row=Math.floor(Math.random()*3);
	col=Math.floor(Math.random()*3);
	}while(grid[col][row]!=0);
	let newValue = (start++)%2+1;
	grid[col][row] = newValue;
	renderMainGrid();
    addClickHandlers();
	if(checkwin(col,row,newValue)){
		alert('Computer win');
		initializeGrid();
		renderMainGrid();
		addClickHandlers();
	}
	else if(checkDraw())
		alert('Its a draw');
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = (start++)%2+1;
    grid[colIdx][rowIdx] = newValue;
	if(checkwin(colIdx,rowIdx,newValue)){
		renderMainGrid();
		addClickHandlers();
		alert('Player win');
	}
	else if(checkDraw())
		alert('Its a draw');
	else
		computerTurn()
	
	
    renderMainGrid();
    addClickHandlers();
	
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}
var i=0;
initializeGrid();
renderMainGrid();
addClickHandlers();
