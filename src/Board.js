import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off (false), and O is on(true))
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

// Miten statea kannattaa käyttää:
// https://www.freecodecamp.org/news/get-pro-with-react-setstate-in-10-minutes-d38251d1c781/

class Board extends Component {

    static defaultProps = {
        nrows: 4,
        ncols: 4,
        initializationRepeats: 5,
        chanceLightStartsOn: 0.25
    };

    constructor(props) {
        super(props);

        this.state = {
            board: this.constructBoard(this.props.nrows, this.props.ncols, this.props.chanceLightStartsOn),
            clicks: 0,
            hasWon: false
        };
        this.handleCellClick = this.handleCellClick.bind(this);
        this.flipCellsAround = this.flipCellsAround.bind(this);
        this.setBoard = this.setBoard.bind(this);
    }

    // Suoritetaan constructorin toimien jälkeen boardin asettelu, ennen itse sisällön renderöimistä
    // https://reactjs.org/docs/react-component.html
    componentDidMount() {
        this.setBoard(this.props.initializationRepeats);
    }


    setBoardStage(number) {

        let i = 0;
        do {
            let coord = `${getRandomInt(this.props.ncols)}-${getRandomInt(this.props.nrows)}`;
            this.flipCellsAround(coord);
            i++;
        } while (i < number);
    }

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

    constructBoard(nrows, ncols) {

        // let board = [];
        // for (let i = 0; i < nrows; i++) {
        //     let row = [];
        //     for (let o = 0; o < ncols; o++) {
        //         row.push(Math.random() > chanceLightStartsOn ? false : true);
        //     }
        //     board.push(row);
        // }

        let board = [];
        for (let i = 0; i < nrows; i++) {
            let row = [];
            for (let o = 0; o < ncols; o++) {
                row.push(false);
            }
            board.push(row);
        }

        return board
    }

    /** handle changing a cell: update board & determine if winner */

    /**
     * Handles changing of cells to opposites
     * Determines if the board has been cleared (Victory)
     * Updates the board
     * @param {string} coord (e.g. "2-3", "0-1") 
     */
    flipCellsAround(coord) {

        let { ncols, nrows } = this.props;
        // let ncols = this.props.ncols;
        // let nrows = this.props.nrows;
        let board = this.state.board;
        let [y, x] = coord.split("-").map(Number);

        function flipCell(y, x) {
            // if this coord is actually on board, flip it
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                board[y][x] = !board[y][x];
            }
        }
        function flipCellSurroundings(y, x) {

            let top = [y + 1, x];
            let bottom = [y - 1, x];
            let right = [y, x + 1];
            let left = [y, x - 1];
            let sArray = [top, bottom, right, left];

            for (let i of sArray) {
                // if the surrounding coord os in the board, flip it
                if (i[1] >= 0 && i[1] < ncols && i[0] >= 0 && i[0] < nrows) {
                    board[i[0]][i[1]] = !board[i[0]][i[1]];
                }
            }
        }

        flipCell(y, x);
        flipCellSurroundings(y, x);

        function checkWin(board) {
            // toinen tapa tehdä loop-break, nimeämällä eri for-loopin tasot
            // loop1:
            // for (let i of board) {
            //     for (let u of i) {
            //         if (u === true) { break loop1};
            //     }
            //     ...
            // }

            for (let i of board) {
                for (let u of i) {
                    if (u === true) { return false };
                }
            }
            return true;
        }

        // win when every cell is turned off
        // TODO: determine is the game has been won

        this.setState({
            board: board,
            hasWon: checkWin(board)
        });

    }

    /**
     * @param {number} repeats (number of clicks pre-made before player interaction)
     */
    setBoard(repeats = 5) {
        this.setBoardStage(repeats);
    }

    /** Render game board or winning message. */

    render() {
        return (
            <div>
                <h1>Lights out</h1>
                {this.state.hasWon ?
                    <h2>Hih hih, voitit pelin <button onClick={this.setBoard}>Reset</button>
                    </h2>
                    :
                    <table className="Board">
                        <tbody>
                            {this.state.board.map((i, yindex) => {
                                let trid = `tr${yindex}`
                                return <tr key={trid}>
                                    {i.map((u, xindex) => {
                                        let coord = `${yindex}-${xindex}`;
                                        return <Cell
                                            key={coord}
                                            pos={coord}
                                            isLit={u}
                                            flipCellsAroundMe={this.flipCellsAround}
                                        />
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                }
            </div>
        );

        // if the game is won, just show a winning msg & render nothing else

        // TODO

        // make table board

        // TODO
    }
}


export default Board;
