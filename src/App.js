import React from 'react';
import Board from './components/board/board';
import Menu from './components/menu/menu';
import Ai from './components/AI';
import './App.css'



class App extends React.Component {
    constructor() {
        super();
        this.Ai = new Ai();
        this.state = {
            player1: '',
            player2: 'CPU',
            isDuel: false,
            player1Score: 0,
            player2Score: 0,
            tied: 0,
            tossedPlayer: 'player1',
            currentPlayer: undefined,
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            coOrdinates: {
                0: [4.3, 4],
                1: [8.3, 4],
                2: [12.3, 4],
                3: [4.3, 8],
                4: [8.3, 8],
                5: [12.3, 8],
                6: [4.3, 12],
                7: [8.3, 12],
                8: [12.3, 12]
            },
            isDark: false
        }
    }

    onChange = (name, value) => {
        this.setState({[name]: value});
    }

    newGame = () => {
        this.setState({
            player1Score: 0,
            player2Score: 0,
            tied: 0,
            tossedPlayer: 'player1',
            currentPlayer: 'player1',
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        })
        
        document.getElementById('board').style.pointerEvents = 'visible';
    }

    makeMove = (player, x1, y1) =>  {
        let currentPlayerSign = player === this.state.player1 ? 'x' : 'o';
        
        document.getElementById('board').style.pointerEvents = 'none';
        
        this.drawShape(currentPlayerSign, x1, y1);

        let tempBoard = this.state.board;
        
        Object.keys(this.state.coOrdinates).forEach(arr => {
            arr = parseInt(arr);
            if(this.state.coOrdinates[arr][0] === x1 && this.state.coOrdinates[arr][1] === y1)
                tempBoard[arr] = currentPlayerSign;
        })
        this.Ai.board = [...tempBoard];
        this.setState({
            board: [...tempBoard]
        })

        let result = this.Ai.check();

        if(result === true) {
            this.setState({
                currentPlayer: player === this.state.player1 ? this.state.player2 : this.state.player1
            })
            this.nextPlayer(player);

        }
        else if (result === 0) {
            this.setState({
                tied: this.state.tied + 1
            })
            this.winnerBoard('Tie game');
        }
        else {
            let player = result > 0 ? 'player2Score' : 'player1Score';
            this.setState({
                [player]: this.state[player] + 1
            })
            this.winnerBoard(`${result > 0 ? this.state.player2 : this.state.player1} wins`);
        }
            
    } 

    nextPlayer = (player) => {
        
        if(this.state.isDuel) 
            document.getElementById('board').style.pointerEvents = 'visible';
        else {
            if(player === this.state.player1) {
                let coOrdinate = this.Ai.bestMove();
                this.makeMove( this.state.player2, this.state.coOrdinates[coOrdinate][0], this.state.coOrdinates[coOrdinate][1]);
                document.getElementById(`box-${coOrdinate + 1}`).style.pointerEvents='none';
            }
            else
                document.getElementById('board').style.pointerEvents = 'visible';
        }
    }

    winnerBoard = (message) => {
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect'), text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        rect.id = 'winner-board'; text.id = 'winner-board-text';
        rect.classList.add('winner-board'); text.classList.add('winner-board-text');
        rect.setAttribute('x', '0'); rect.setAttribute('y', '7');
        rect.setAttribute('height', '6'); rect.setAttribute('width', '20');
        text.setAttribute('x', '50%'); text.setAttribute('y', '50%');
        text.setAttribute('dominant-baseline', "middle"); text.setAttribute('text-anchor', "middle");
        text.innerHTML = message;
        document.getElementById('svg-board').appendChild(rect);
        document.getElementById('svg-board').appendChild(text);
        setTimeout(() => {
            document.getElementById('winner-board').style.transform = 'translateX(0%) scale(1, 1)';
            Object.values(document.getElementsByClassName('after-result-decision')).forEach(arr => {
                arr.style.display = 'block';
            })
            setTimeout(() => {
                document.getElementById('winner-board-text').style.fillOpacity = 1;
                Object.values(document.getElementsByClassName('after-result-decision')).forEach(arr => {
                    arr.style.opacity = 1;
                })
            }, 400);
        }, 50);
    }

    onClickNextRound = () => {
        let tossedPlayer = this.state.tossedPlayer;
        this.setState({
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            currentPlayer: this.state.currentPlayer === this.state.player1 ? this.state.player2 : this.state.player1,
            tossedPlayer: tossedPlayer === this.state.player1 ? this.state.player2 : this.state.player1
        });
        this.refreshBoard();
        setTimeout(() => {
            this.nextPlayer(tossedPlayer);
        }, 1000);
    }

    onClickEndGame = () => {
        document.getElementById('board').style.filter = 'blur(5px)';
        document.getElementById('board').style.opacity = '.3';
        let htmlCollections = [...Object.values(document.getElementsByClassName('svg-text-player1')), ...document.getElementsByClassName('svg-text-player2')];

        htmlCollections.forEach(arr => {
            arr.style.display = 'none';
        })
        document.getElementById('svg-board').style.display = 'none';

        this.setState({
            player1: '',
            player2: '',
            isDuel: false,
            player1Score: 0,
            player2Score: 0,
            tied: 0,
            tossedPlayer: 'player1',
            currentPlayer: undefined,
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        })

        this.refreshBoard();
        let menu = document.getElementById('menu');
        menu.style.display = 'flex';
        document.getElementById('not-duel').click();
        setTimeout(() => {
            menu.style.transform = 'scale(1)';
        }, 250)
    }

    refreshBoard = () => {
        this.Ai.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        Object.values(document.getElementsByClassName('after-result-decision')).forEach(arr => {
            arr.style.opacity = 0;
        })
        document.getElementById('winner-board-text').style.fillOpacity = 0;
        setTimeout(() => {
            Object.values(document.getElementsByClassName('after-result-decision')).forEach(arr => {
                arr.style.display = 'none';
            })
            document.getElementById('winner-board').style.transform = 'translateX(110%) scale(0, 1)';
            setTimeout(() => {
                let htmlCollections = [...Object.values(document.getElementsByClassName('cross')),
                            ...document.getElementsByClassName('circle'), 
                            ...document.getElementsByClassName('winner-board'),
                            ...document.getElementsByClassName('winner-board-text')
                            ];

                let svgBoard = document.getElementById('svg-board');
                htmlCollections.forEach(arr => {
                    arr.style.animation = 'smooth-out .3s linear forwards';
                })
                setTimeout(() => {
                    htmlCollections.forEach(arr => {
                        svgBoard.removeChild(arr);
                    })
                    Object.values(document.getElementsByClassName('box')).forEach(arr => {
                        arr.style.pointerEvents = 'inherit';
                    })
                    document.getElementById('board').style.pointerEvents = 'initial'
                }, 200);
            }, 300);
        }, 300);
    }

    drawCross = (x1, y1) => {
        let elem, elem1;
        elem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        elem1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        elem.classList.add('cross'); elem1.classList.add('cross');
        elem.style.animationDelay = '.2s';
        elem.setAttribute('d', `M${x1}, ${y1} L${x1 + 2.3}, ${y1 + 2.1}`);
        elem1.setAttribute('d', `M${x1 + 2.3}, ${y1} L${x1}, ${y1 + 2.1}`);
        let documentFragment = document.createDocumentFragment();
        documentFragment.appendChild(elem);
        documentFragment.appendChild(elem1);
        document.getElementById('svg-board').appendChild(documentFragment);
        return 'cross';
    }

    drawCircle = (x1, y1) => {
        let elem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        elem.classList.add('circle');
        elem.setAttribute('cx', x1);
        elem.setAttribute('cy', y1);
        elem.setAttribute('r', 1.1);
        document.getElementById('svg-board').appendChild(elem);
        return 'circle';
    }

    drawShape = (player, x1, y1) => {
        if(player === 'x')
            return this.drawCross(x1 + 0.55, y1 + .9);
        else    
            return this.drawCircle(x1 + 1.7, y1 + 2);
        
    }

    onClickTheme = (isDark) => {
        
        let app = document.getElementById('app');
            app.animate([{filter: 'brightness(1)'}, {filter: 'brightness(0)'}, {filter: 'brightness(1)'}], {duration: 1000});
        
        if (isDark)
        {            
            setTimeout(() => {
                app.style.backgroundColor = '#c8beac'; let header = document.getElementById('header').style;
                document.getElementById('board').style.backgroundColor = header.backgroundColor = 'rgb(255, 255, 255)';
                document.getElementById('menu').style.color = 'black';
                header.boxShadow = '0px 3px 10px rgb(97, 97, 97)';
                document.getElementById('svg-board').style.fill = 'black';
            }, 500);
        }
        else
        {
            setTimeout(() => {
                app.style.backgroundColor = 'black';let header = document.getElementById('header').style;
                document.getElementById('board').style.backgroundColor = header.backgroundColor = 'rgb(60, 60, 60)';
                document.getElementById('menu').style.color = 'white';
                header.boxShadow = '0px 3px 10px rgb(0, 0, 0)';
                document.getElementById('svg-board').style.fill = '#dfd4d4';
            }, 500);
        }

        setTimeout(() => {
            this.setState({isDark: !isDark})
        }, 500)
    }
    
    render() {
        return (
            <div id='app'>
            <div id='header' >
                <span><span style={{color: '#f83157'}} >Tic</span> | <span style={{color: '#3ba8d7'}}>Tac</span> | <span style={{color: '#f83157'}}>Toe</span></span>
                <div id='dark-mode' onClick={() => {this.onClickTheme(this.state.isDark)}} >
                        {this.state.isDark ? 
                            <svg height='30px' width='30px' id='light-mode-svg' >
                            <circle cx='15' cy='15' r='6.5' fill='white' id='sun-circle'/>
                            <line id='line1' x1='1' y1='15' x2='6' y2='15' stroke='white' strokeWidth='2' strokeLinecap='round' />
                            <line id='line2' x1='15' y1='1' x2='15' y2='6' stroke='white' strokeWidth='2' strokeLinecap='round' />
                            <line id='line3' x1='24' y1='15' x2='29' y2='15' stroke='white' strokeWidth='2'strokeLinecap='round' />
                            <line id='line4' x1='15' y1='29' x2='15' y2='24' stroke='white' strokeWidth='2'strokeLinecap='round' />
                            <line id='line5' x1='5' y1='6' x2='9' y2='9' stroke='white' strokeWidth='2' strokeLinecap='round' />
                            <line id='line6' x1='25' y1='6' x2='21' y2='9' stroke='white' strokeWidth='2' strokeLinecap='round'/>
                            <line id='line7' x1='5' y1='25' x2='9' y2='21' stroke='white' strokeWidth='2' strokeLinecap='round'/>
                            <line id='line8' x1='21' y1='21' x2='25' y2='25' stroke='white' strokeWidth='2' strokeLinecap='round'/>
                            </svg>:
                            <svg id='moon' height='30px' width='30px' >
                            <circle cx='15' cy='15' r='15' fill='black'/>
                            <circle cx='20' cy='10' r='12' fill='white' />
                            </svg> 
                        }
                </div>
            </div>
            <div id='fill-space' />
            <Menu onChange={this.onChange} newGame={this.newGame} player1={this.state.player1} player2={this.state.player2} isDuel={this.state.isDuel} />

            <Board 
                makeMove={this.makeMove} 
                currentPlayer={this.state.currentPlayer} 
                player1={this.state.player1} 
                player2={this.state.player2}
                player1Score={this.state.player1Score}
                player2Score={this.state.player2Score}
                tied={this.state.tied}
                onClickNextRound={this.onClickNextRound}
                onClickEndGame={this.onClickEndGame}
            />
            </div>
        );
    }
    
}

export default App;