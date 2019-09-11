import React, {Component} from 'react'
import "./Cell.css"


/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    // call up to the Board to flip the cell and cells around this cell
    this.props.handleCellClick(evt.target.getAttribute('pos'));
  }

  render() {
    let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");
    let computedWidth = Math.floor(100 / this.props.width)
    let styles = {
        width: `${computedWidth}%`,
        paddingBottom: `${computedWidth}%`
    }

    return (
        <td 
        className={classes} 
        style={styles}
        onClick={this.handleClick} 
        pos={this.props.pos} 
        />
    )
  }
}


export default Cell