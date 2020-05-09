const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  
} = Matter;
//width and height of the canvas
 const width= 600;
 const height = 600;
 //cells--number of cells per row and column as the canvas is square
 const cells = 3;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
   wireframes:true,
    width,
    height
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Boundar Walls
const walls = [
  Bodies.rectangle(width/2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width/2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height/2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height/2, 40, height, { isStatic: true })
];
World.add(world, walls);

//the grids array 2-d areay......every value will be false as the purpose of the grid array is to
//keep track if we have visited the particular cell or not
//maze generation
//const grid = [];

//for (let i=0;i<3;i++){
  //grid.push([])
  //for(let j=0;j<3;j++){
   // grid[i].push(false);
  //}
//}
//console.log(grid);

//more efficent way of creating the nested arrays
const grid = Array(3).fill(null).map(()=>Array(3).fill(false));
//console.log(grid);

//generation if verticals and horizontals array
//verticals- keep track of all the vertical walls -false if it closed,lly horixontal array
//the diemensions are different from the grid array ....

const verticals = Array(cells)
.fill(null)
.map(()=> Array(cells-1).fill(false));


const horizontals = Array(cells-1)
.fill(null)
.map(()=> Array(cells).fill(false));
console.log(horizontals);

//algorithm
//picking a random cell

const startRow = Math.floor(Math.random()*cells);
const startColumn = Math.floor(Math.random()*cells);
//logs the index of the cell
//console.log(startRow,startColumn);

//shuffle --randomaises the conetent of an array
const shuffle = (arr)=>{
  let counter = arr.length;
   while(counter > 0){
     const index = Math.floor(Math.random()*counter);
     counter--;
     const temp = arr[counter];
     arr[counter] = arr[index];
     arr[index] = temp;
   }
   return arr;
}

const stepThroughCell = () =>{
  //if i have visited the cell at [row,column],then return
  if(grid[row][column]){
    return;
  }

  //mark this cell as being visited---that is go the grid array mark it as true
grid[row][column]= true;

  //assemble randomly ordered list of arrays
  const neighbours =shuffle([
    [row-1,column,,'up'],//above right down ,left etc cell neighbour
    [row,column+1,'right'],
    [row+1,column, 'down'],
    [row,column-1,'left']
  ]) 
 
  //for each neighbour
for (let neighbour of neighbours){
  const [nextRow,nextColumn,direction] = neighbour;
 //see if neighbour is outofbound--that is no place to go on a side
  if(nextRow<0 || nextRow>=cells ||nextColumn < 0 || nextColumn >= cells){
        continue;//skip this neighbour and continue with the next lines of code continue is a keyword search mdn
  }
  //if we have visited the neighbour,continue  to next neighbour
if(grid[nextRow,nextColumn]){
  continue;
}
//Remove a wall from the horozontal or vertical array
if(direction==='left'){
  verticals[row][column-1]=true;
} else if (direction === 'right'){
  verticals[row][column]= true;
}else if (direction === 'up'){
  horizontals[row-1][column]= true;
}else if (direction === 'down'){
  horizontals[row][column]= true;
}

}
  //visit the next cell

};

stepThroughCell(startCell,startColumn)