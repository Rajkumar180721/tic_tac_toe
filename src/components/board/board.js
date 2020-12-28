import React, { Component, Fragment } from 'react';
import './board.css'

class board extends Component {
    

    initBox = (id, x1, y1) => {
        let path = `M${x1 + 0.3}, ${y1 + 0.3}  v3.4 h3.4 v-3.4 z`
        return <path className='box' id={id} x1={x1 + 0.3} y1={y1} d={path} onClick={(e) => {
            if(this.props.currentPlayer !== undefined) {
                this.props.makeMove(this.props.currentPlayer, Number(e.target.getAttribute('x1')), Number(e.target.getAttribute('y1')));
                e.target.style.pointerEvents = 'none';
            }}} />
    }

        
    render () {
        const {player1, player2, player1Score, player2Score, tied, onClickNextRound, onClickEndGame} = this.props;
        return (
            <div id='board'>

                <svg id='svg-board' height='100%' width='100%' viewBox='0 0 20 20' >
                <text className='svg-text-player1' x='2'  y='1.5' >{player1}</text>
                <text className='svg-text-player1' x='3.5' y='3'>{player1Score}</text>
                <text className='svg-text-tie' x='9.2' y='1.5' >Tied</text>
                <text className='svg-text-tie' x='9.7' y='3' >{tied}</text>
                <text className='svg-text-player2' x='15' y='1.5'>{player2}</text>
                <text className='svg-text-player2' x='16.5' y='3'>{player2Score}</text>
                <Fragment>
                    <path className='tic-tac-toe-table' d='M8, 4 v12'  />
                    <path className='tic-tac-toe-table' d='M12, 4 v12' style={{animationDelay: '.2s'}}/>
                    <path className='tic-tac-toe-table' d='M4, 8 h12' style={{animationDelay: '.4s'}}/>
                    <path className='tic-tac-toe-table' d='M4, 12 h12' style={{animationDelay: '.6s'}}/>
                </Fragment>
                {this.initBox('box-1', 4, 4)}
                {this.initBox('box-2', 8, 4)}
                {this.initBox('box-3', 12, 4)}
                {this.initBox('box-4', 4, 8)}
                {this.initBox('box-5', 8, 8)}
                {this.initBox('box-6', 12, 8)}
                {this.initBox('box-7', 4, 12)}
                {this.initBox('box-8', 8, 12)}
                {this.initBox('box-9', 12, 12)}

                <rect className='after-result-decision' x='3' y='17' height='1.2' width='3.4' rx='0.3' ry='0.3' />
                <text className='after-result-decision after-result-decision-text' x='3.35' y='17.76' onClick={onClickEndGame} >End game</text>
                <rect className='after-result-decision' x='14.8' y='17' height='1.2' width='3.4' rx='0.3' ry='0.3' />
                <text className='after-result-decision after-result-decision-text' x='14.99' y='17.76' onClick={onClickNextRound} >Next round</text>
                </svg>
            </div>
        );
    }
}

export default board;