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
        initializationRepeats: 5
    };

    constructor(props) {
        super(props);

        this.state = {
            board: this.constructBoard(this.props.nrows, this.props.ncols),
            clicks: 0,
            hasWon: false
        };
        this.handleCellClick = this.handleCellClick.bind(this);
    }

    // Suoritetaan constructorin toimien jälkeen boardin asettelu, ennen itse sisällön renderöimistä
    // https://reactjs.org/docs/react-component.html
    componentDidMount() {
        this.setBoard();
    }

    componentWillUnmount() {
        console.log("tuhotaan")
    }


    setBoardStage(number) {
        let coords = []

        let i = 0;
        do {
            let coord = `${getRandomInt(this.props.ncols)}-${getRandomInt(this.props.nrows)}`;
            coords.push(coord);
            this.flipCellsAround(coord);
            i++;
        } while (i < number);

        console.log(coords);
    }

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

    constructBoard(nrows, ncols) {

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
                // if the surrounding coord is in the board, flip it
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
        // TODO: determine if the game has been won

        this.setState({
            board: board,
            hasWon: checkWin(board)
        });

    }

    /**
     * @param {number} repeats (number of pre-made clicks before player interaction)
     */
    setBoard(repeats = 5) {
        console.log(typeof(repeats))
        this.setBoardStage(repeats);
    }

    handleCellClick(coord) {
        this.flipCellsAround(coord);
        this.setState(state => {
            return {
                clicks: state.clicks + 1
            }
        })
    }

    /** Render game board or winning message. */

    render() {
        return (
            <div>
                {this.state.hasWon ?
                    <h2>Hih hih, voitit pelin <button onClick={() => this.setBoard(5)}>Reset</button>
                    </h2>
                    :
                    <React.Fragment>
                        <h1>Lights out - {this.props.nrows + "x" + this.props.ncols}</h1>
                        <table className="Board">
                            <tbody>
                                {this.state.board.map((yitem, yindex) => {
                                    let trid = `tr${yindex}`
                                    return <tr key={trid}>
                                        {yitem.map((xitem, xindex) => {
                                            let coord = `${yindex}-${xindex}`;
                                            return <Cell
                                                key={coord}
                                                pos={coord}
                                                isLit={xitem}
                                                width={this.props.ncols}
                                                height={this.props.nrows}
                                                handleCellClick={this.handleCellClick}
                                            />
                                        })}
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </React.Fragment>
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
