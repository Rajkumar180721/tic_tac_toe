import React, { Component } from 'react';
import './menu.css'

class menu extends Component {

    onclickNewGame = () => {
        let htmlCollections = [...Object.values(document.getElementsByClassName('svg-text-player1')), ...document.getElementsByClassName('svg-text-player2')];

        htmlCollections.forEach(arr => {
            arr.style.display = 'block';
        })
        
        if(!this.props.isDuel === true && this.props.player1 === '') {
            this.props.onChange('player1', 'player1');
            this.props.onChange('player2', 'CPU')
        }
        else if (this.props.isDuel) {
            if(this.props.player1 === '')
                this.props.onChange('player1', 'player1');
            if(this.props.player2 === '')
                this.props.onChange('player2', 'player2');
        }
            
        let menu = document.getElementById('menu'), board = document.getElementById('board'), svgBoard = document.getElementById('svg-board');
        let elem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        elem.id = 'newgame-strikeline';
        elem.setAttribute('x1', 8); elem.setAttribute('x2', 120);
        elem.setAttribute('y1', 20); elem.setAttribute('y2', 20);
        document.querySelector('#new-game-button > svg').appendChild(elem);
        setTimeout(() => {
            menu.style.transform = 'scale(0)';
            svgBoard.style.display = 'none';
            setTimeout(() => {
                menu.style.display = 'none';
                board.style.animation = 'fade-out .3s';
                setTimeout(() => {
                    svgBoard.style.display = 'block';
                    board.style.opacity = '1';
                    board.style.filter = 'none';
                    elem.remove();
                }, 200);
            }, 250);
        }, 300);
        this.props.newGame();
    }
    
    render () {

        const {onChange} = this.props;
        
        return (
        <div id='menu'>
            <div className='player-menu' id='playerX' >
                    <span id='playerX' className='player-name' >Player X</span><input className='playerNameInput' type='text' defaultValue='player1' onChange={(e) => {onChange('player1',e.target.value)}} />
                </div>
                <div className='player-menu' id='playerO'>
                    <span className='player-name' >Player Y</span><input className='playerNameInput'  id='player2' type='text' defaultValue='CPU' readOnly onChange={(e) => {onChange('player2',e.target.value)}} />
                </div>
                <div className='playing-mode-span'>
                    Play with
                </div>
                <div className='player-menu' style={{marginTop: '0px'}} >
                    <span style={{width: '0px'}}/><label><input id='not-duel' className='playing-mode' type='radio' name='mode' defaultChecked='true' onChange={() => {onChange('isDuel', false); let elem =  document.getElementById('player2'); elem.value = 'CPU'; onChange('player2', 'CPU'); elem.setAttribute('readOnly', true)}}/>Play with computer</label>
                    <span style={{width: '0px'}}/><label><input id='duel' className='playing-mode' type='radio' name='mode' onChange={() => {onChange('isDuel', true); let elem =  document.getElementById('player2'); elem.value = 'player2'; onChange('player2', 'player2'); elem.removeAttribute('readOnly', false)}}/>Duel</label>
                </div>
                <div style={{marginTop: '20px'}} id='new-game-button' >
                    <svg height='40px' width='130px' onClick={this.onclickNewGame}>
                    <rect x='0' y='0' rx='10' ry='10'   width='130' height='40' fill='#0066ff' />
                    <text x='14' y='27' id='svg-newgame' >New Game</text>
                    </svg>
                </div>
                <div style={{height: '100px'}} />
            </div>
        );
    }
}

export default menu;