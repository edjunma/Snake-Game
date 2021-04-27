import React, {useState, useRef, useEffect} from 'react';
import { randomIntFromInterval, reverseLinkedList, useInterval } from '../lib/utils.js';
import './Board.css';

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor(value) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}


const Direction = {
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
};

const BOARD_SIZE = 10;
const PROBABILITY_OF_DIRECTION_REVERSAL_FOOD = 0.3;

const getStartingSnakeLLValue = board => {
  const rowSize = board.length;
  const colSize = board[0].length;
  const startingRow = Math.round(rowSize / 3);
  const startingCol = Math.round(colSize / 3);
  const startingCell = board[startingRow][startingCol];
  return {
    row: startingRow,
    col: startingCol,
    cell: startingCell,
  };
};

const Board = () => {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [snakeCells, setSnakeCells] = useState(new Set([44]));
  const [snake, setSnake] = useState(new SinglyLinkedList(44));
  const [direction, setDirection] = useState(Direction.RIGHT);

  useEffect(() => {
    setInterval(() => {
      // function test() {
      //   moveSnake();
      // }

      // test();
    }, 1000);

    window.addEventListener('keydown', e => {
      const newDirection = getDirectionFromKey(e.key);
      const isValidDirection = newDirection !== '';
      if (isValidDirection) setDirection(newDirection);
    })
  }, []);

  function moveSnake() {
    const currentHeadCoords = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    };
  };

  const nextHeadCoords = getNextHeadCoords(currentHeadCoords, direction);
  const nextHeadValue = board[nextHeadCoords.row][nextHeadCoords.col];

  if (nextHeadValue === foodCell) handleFoodConsumption();

  const newHead = new LinkedListNode(
    new Cell(nextHeadCoords.row, nextHeadCoords.col, nextHeadValue),
  );

  const newSnakeCells = new Set(snakeCells);
  newSnakeCells.delete(snake.tail.value.value);
  newSnakeCells.add(nextHeadValue);

  snake.head = newHead;
  snake.tail = snake.tail.next;
  if (snake.tail === null) snake.tail = snake.head;

  setSnakeCells(newSnakeCells);

  const getNextHeadCoords = (currentHeadCoords, direction) => {
    if (direction === Direction.UP) {
      return {
        row: currentHeadCoords.row - 1,
        col: currentHeadCoords.col,
      }
    }
  }

  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cell, cellIdx) => (
            <div 
            key={cellIdx} 
            className={`cell $true ? 'snake-cell' : ''}`}></div>  
          ))}
          </div>
      ))}
    </div>
  )
};

const createBoard = BOARD_SIZE => {
  let counter = 1;
  const board = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const currentRow = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }
  return board;
}

const getDirectionFromKey = key => {
  if (key === 'ArrowUp') return Direction.UP;
  if (key === 'ArrowRight') return Direction.RIGHT;
  if (key === 'ArrowDown') return Direction.DOWN;
  if (key === 'ArrowLeft') return Direction.LEFT;
  return '';
}

export default Board;