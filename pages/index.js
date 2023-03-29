import Row from './Row';
import Board from './Board';
import OnMove from './OnMove';
import React,{Component} from 'react';
import PromotionModal from './PromotionModal';
import {figure, positions} from './_document';
import Timers from './Timers';
import ChessNotation from './ChessNotation';
import {TbRotate} from 'react-icons/tb';
import {homePositions} from './_document';
import Surrender from "./Surrender";
import Remis from "./Remis";

export const PositionsContext=React.createContext();

const history=[];

const whiteActualTimerRef=React.createRef();
const blackActualTimerRef=React.createRef();

export default class App extends Component{
  state={
    from:{},
    to:{},
    figureState:{...JSON.parse(JSON.stringify(homePositions))},
    whiteOnMove:true,
    showPromotionModal:false,
    lastPawn:'',
    lastMoveColor:'black',
    checkAttacksState:false,
    moveID:1,
    notation:[],
    whiteOnBottom:true,
    movesWithoutBeat:0,
    historyState:history,
    resetTimers:false,
  }
  componentDidMount(){
    this.downloadFromLocalStorage(this)
  }
  saveInLocalStorage=(component)=>{
    let actTm={
      white:whiteActualTimerRef.current.getAttribute('time'),
      black:blackActualTimerRef.current.getAttribute('time'),
    };
    localStorage.setItem('data', JSON.stringify({
      checkAttacksState:!component.state.checkAttacksState,
      board:component.state.figureState,
      move:!component.state.whiteOnMove,
      notation:component.state.notation,
      moveID:component.state.moveID+1,
      history:component.state.historyState,
      time:actTm,
    }));
  }
  downloadFromLocalStorage=(component)=>{
    const downloadedData=localStorage.getItem('data');
    const parsed=downloadedData && JSON.parse(downloadedData);
    parsed && component.setState({
      figureState:parsed.board,
      whiteOnMove:parsed.move,
      notation:parsed.notation,
      checkAttacksState:parsed.checkAttacksState,
      moveID:parsed.moveID,
      historyState:parsed.history,
    })
  }
  render(){
    const {figureState, to, from, whiteOnMove, showPromotionModal, lastPawn, checkAttacksState, moveID, notation, whiteOnBottom, movesWithoutBeat, resetTimers}=this.state;
    const styles={
      container:{
        display:'grid',
        gridTemplateColumns:'1fr 1fr 1fr',
        gridTemplateColumns:'1fr auto auto',
        gridTemplateColumns:'1fr auto auto',
        width:'fit-content',
      },
      rightControlPanel:{
        display:'grid',
        gridTemplateColumns:'auto auto auto auto',
        height:'100%',
        alignItems:'center',
      },
      rotateButton:{
        position:'absolute',
        right:'-25px',
        height:'25px',
        width:'25px',
      },
      buttons:{
        display:'grid',
        gridTemplateRows:'1fr 1fr',
        gridTemplateColumns:'1fr',
      },
    }
    const changeState=(newState, callback)=>{
      this.setState(newState, callback)
    }
    const saveInContext=()=>this.saveInLocalStorage(this)
    const attackedField=(copyOf, fieldToAttack)=>{
      const dest=copyOf?.[fieldToAttack.field]?.[fieldToAttack.rowName];
      if(dest){
        if(dest.figure==='King' && dest.color==='black') copyOf[fieldToAttack.field][fieldToAttack.rowName].attackedField = true;
        else if(dest.figure==='King' && dest.color==='white') copyOf[fieldToAttack.field][fieldToAttack.rowName].attackedField = true;
        else if(dest.figure!=='King') copyOf[fieldToAttack.field][fieldToAttack.rowName].attackedField = true;
      }
      return copyOf
    }
    const copyOf=this.state.figureState;
    const allAtacks={
      Knight:(data)=>{
        const {field, rowName}=data;
        const shortedAttackedField=(chField, chRow)=>attackedField(copyOf, {field:String.fromCharCode(field.charCodeAt()+chField), rowName:rowName+chRow})
        const upper=()=>{
          shortedAttackedField(-1,2)
          shortedAttackedField(1,2)
        }
        const lower=()=>{
          shortedAttackedField(-1,-2)
          shortedAttackedField(1,-2)
        }
        const right=()=>{
          shortedAttackedField(2,-1)
          shortedAttackedField(2,1)
        }
        const left=()=>{
          shortedAttackedField(-2,-1)
          shortedAttackedField(-2,1)
        }
        upper()
        lower()
        right()
        left()
      },
      Pawn:(data)=>{
        const {field, rowName}=data;
        const shortedAttackedField=(chField, chRow)=>attackedField(copyOf, {field:String.fromCharCode(field.charCodeAt()+chField), rowName:rowName+chRow})
        if(whiteOnMove){
          shortedAttackedField(1, 1)
          shortedAttackedField(-1, 1)
        }
        else if (!whiteOnMove){
          shortedAttackedField(1, -1)
          shortedAttackedField(-1, -1)
        }
      },
      King:(data)=>{
        const {field, rowName}=data;
        const shortedAttackedField=(chField, chRow)=>attackedField(copyOf, {field:String.fromCharCode(field.charCodeAt()+chField), rowName:rowName+chRow})
        const vertical=()=>{
          shortedAttackedField(0,-1)
          shortedAttackedField(0,1)
        }
        const horisontal=()=>{
          const left=()=>{
            shortedAttackedField(-1,0)
            shortedAttackedField(-1,-1)
            shortedAttackedField(-1,1)
          }
          const right=()=>{
            shortedAttackedField(1,0)
            shortedAttackedField(1,-1)
            shortedAttackedField(1,1)
          }
          left()
          right()
        }
        vertical()
        horisontal()
      },
      Bishop:(data)=>{
        const {field, rowName}=data;
        const shortedAttackedField=(chField, chRow)=>attackedField(copyOf, {field:String.fromCharCode(field.charCodeAt()+chField), rowName:rowName+chRow})
        const bottom=()=>{
          const left=()=>{
            let canAttack=true;
            for(let i=1;i<8;i++){
              canAttack && shortedAttackedField(-i, -i)
              if(copyOf?.[String.fromCharCode(field.charCodeAt()-i)]?.[rowName-i]?.figure!==''
              && copyOf?.[String.fromCharCode(field.charCodeAt()-i)]?.[rowName-i]?.figure!=='King')
              canAttack=false
            }
          }
          const right=()=>{
            let canAttack=true;
            for(let i=1;i<8;i++){
              canAttack && shortedAttackedField(i, -i)
              if(copyOf?.[String.fromCharCode(field.charCodeAt()+i)]?.[rowName-i]?.figure!=='' && copyOf?.[String.fromCharCode(field.charCodeAt()+i)]?.[rowName-i]?.figure!=='King') canAttack=false
            }
          }
          left()
          right()
        }
        const top=()=>{
          const right=()=>{
            let canAttack=true;
            for(let i=1;i<8;i++){
              canAttack && shortedAttackedField(i, i)
              if(copyOf?.[String.fromCharCode(field.charCodeAt()+i)]?.[rowName+i]?.figure!=='') canAttack=false
            }
          }
          const left=()=>{
            let canAttack=true;
            for(let i=1;i<8;i++){
              canAttack && shortedAttackedField(-i, i)
              if(copyOf?.[String.fromCharCode(field.charCodeAt()-i)]?.[rowName+i]?.figure!=='' && copyOf?.[String.fromCharCode(field.charCodeAt()-i)]?.[rowName+i]?.figure!=='King') canAttack=false
            }
          }
          right()
          left()
        }
    
        bottom()
        top()
      },
      Rook:(data)=>{
        const {field, rowName}=data;
        const shortedAttackedField=(chField, chRow)=>attackedField(copyOf, {field:String.fromCharCode(field.charCodeAt()+chField), rowName:rowName+chRow})
    
        const horisontal=()=>{
          const left=()=>{
            let canAttack=true;
            for(let i=1;i<8;i++){
              canAttack && shortedAttackedField(-i, 0)
              if(copyOf?.[String.fromCharCode(field.charCodeAt()-i)]?.[rowName]?.figure!==''&&copyOf?.[String.fromCharCode(field.charCodeAt()-i)]?.[rowName]?.figure!=='King') canAttack=false
            }
          }
          const right=()=>{
            let canAttack=true;
            for(let i=1;i<8;i++){
              canAttack && shortedAttackedField(i, 0)
              if(copyOf?.[String.fromCharCode(field.charCodeAt()+i)]?.[rowName]?.figure!==''&&copyOf?.[String.fromCharCode(field.charCodeAt()+i)]?.[rowName]?.figure!=='King') canAttack=false
            }
          }
          left()
          right()
        }
        const vertical=()=>{
          const top=()=>{
            let canAttack=true;
            for(let i=1;i<8;i++){
              canAttack && shortedAttackedField(0, +i)
              if(copyOf?.[field]?.[rowName+i]?.figure!==''&&copyOf?.[field]?.[rowName+i]?.figure!=='King') canAttack=false
            }
          }
          const bottom=()=>{
            let canAttack=true;
            for(let i=1;i<8;i++){
              canAttack && shortedAttackedField(0, -i)
              if(copyOf?.[field]?.[rowName-i]?.figure!==''&&copyOf?.[field]?.[rowName-i]?.figure!=='King') canAttack=false
            }
          }
          top()
          bottom()
        }
        horisontal()
        vertical()
      },
      Queen:(data)=>{
        allAtacks.Rook(data)
        allAtacks.Bishop(data)
        this.setState({figureState:copyOf})
      },
    }
    const pat=()=>{
      alert('Remis');
      localStorage.removeItem('data');
      this.setState({
        notation:[],
        figureState:homePositions,
        whiteOnMove:true,
        checkAttacksState:false,
      });
      // this.setState({moveID:1, movesWithoutBeat:0, historyState:[]});
      // this.setState({resetTimers:!resetTimers});

      this.setState({moveID:1, movesWithoutBeat:0, historyState:[], resetTimers:!this.state.resetTimers});
    }
    const addToHistry=(newMoveInHistory)=>{
      let stringed=JSON.stringify(newMoveInHistory);
      let historyStateCopy=this.state.historyState;

      historyStateCopy.push(stringed);
      this.setState({historyState:historyStateCopy});
    }
    const showHistoricalMove=(IDofMoveFromHistory)=>{
      let stateHistory=this.state.historyState;
      const travelInTime=JSON.parse(stateHistory[IDofMoveFromHistory]);

      if((IDofMoveFromHistory+1)%2===0) this.setState({whiteOnMove:true});
      else this.setState({whiteOnMove:false});
      
      this.setState({figureState:travelInTime});
    }
    const attackingStaticTest=(allAtacks, copyOf, actualMove)=>{
      let copycopy=copyOf;

      const test=()=>{
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(x=>
          copycopy?.[x].map((y, i)=>{
            const figureAttack=()=>allAtacks[copycopy[x][i].figure]({field:x, rowName:i});
            ((actualMove===false && copycopy[x][i]?.color==='black')||(actualMove===true && copycopy[x][i]?.color==='white')) && figureAttack();
          })
        );
      }
      const removeAttackingAttribute=()=>{
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(x=>copycopy?.[x].map((y, i)=>{
          copycopy[x][i].attackedField=false
        }));
      }
      removeAttackingAttribute()
      test(copycopy)
      this.setState({figureState:copycopy})
      // console.log(copycopy)
      return test
    }
    const fiftyMovesRule=()=>{
      if(movesWithoutBeat>=50){
        alert('50 moves without beat figure or move pawn');
        pat();
      }
    }
    const treeMovesRule=()=>{
      let actualMoveID=moveID-1;

      let stateHistory=this.state.historyState;
      if(actualMoveID>=9){
        if(((stateHistory?.[moveID-1])===(stateHistory?.[moveID-5])) &&
        ((stateHistory?.[moveID-5])===(stateHistory?.[moveID-9]))){
          pat()
          return true
        }
      }
 
    }
    const move=(from=this.state.from, to=this.state.to)=>{
      let copyOf={...figureState};
      if(to?.field && to?.rowName && from?.field && from?.rowName){
        const destinationField=copyOf[to.field][to.rowName-1];
        const previousField=copyOf[from.field][from.rowName-1];

        const fromColor=previousField.color;
        const toColor=destinationField.color;

        const tryToMove=(fromColor, toColor)=>{
          if (fromColor!==toColor){
            const fromChar=from.field.charCodeAt();
            const toChar=to.field.charCodeAt();

            const moveFigure=()=>{
              let actualMovesWithoutBeat=movesWithoutBeat;
              const shouldImove=()=>{
                // const isCheckMate=()=>{}

                const kopy=JSON.parse(JSON.stringify(copyOf));
                let whoAttacks=this.state.checkAttacksState;
  
                copyOf[to.field][to.rowName-1]=copyOf[from.field][from.rowName-1];
                copyOf[to.field][to.rowName-1].moved=true;
                copyOf[from.field][from.rowName-1]={figure:''};

                attackingStaticTest(allAtacks, copyOf, whoAttacks);
                ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(x=>copyOf[x].map((y, i)=>{
                  const short=copyOf[x][i];
                  if(short.figure==='King' && short.attackedField===true && short.color==='black' && checkAttacksState){
                    attackingStaticTest(allAtacks, copyOf, true);
                    this.setState({figureState:kopy, whiteOnMove:false, checkAttacksState:true});
                  }
                  else if(short.field==='King' && short.attackedField===false && short.color==='black' && checkAttacksState){
                    this.setState({figureState:copyOf, whiteOnMove:true, checkAttacksState:true});
                    attackingStaticTest(allAtacks, copyOf, true);
                    this.saveInLocalStorage(this);
                    addToNotation(from, to);
                    addToHistry(copyOf);
                  }
                  else if(short.figure==='King' && short.attackedField===true && short.color==='white' && !checkAttacksState){
                    attackingStaticTest(allAtacks, copyOf, false);
                    this.setState({figureState:kopy, whiteOnMove:true, checkAttacksState:false});
                  }
                  else if(short.field==='King' && short.attackedField===false && short.color==='white' && !checkAttacksState){
                    this.setState({figureState:copyOf, whiteOnMove:true, checkAttacksState:true});
                    attackingStaticTest(allAtacks, copyOf, true);
                    this.saveInLocalStorage(this);
  
                    addToNotation(from, to);
                    addToHistry(copyOf);
                  }
                  else if(whiteOnMove && short.figure==='King' && short.color==='white' && short.attackedField===false){
                    this.setState({figureState:copyOf, whiteOnMove:false, checkAttacksState:true});
                    attackingStaticTest(allAtacks, copyOf, true);
                    this.saveInLocalStorage(this);
                    addToNotation(from, to);
                    addToHistry(copyOf);
                  }
                  else if(!whiteOnMove && short.figure==='King' && short.color==='black' && short.attackedField===false){
                    this.setState({figureState:copyOf, whiteOnMove:true, checkAttacksState:false});
                    attackingStaticTest(allAtacks, copyOf, false);
                    this.saveInLocalStorage(this);
                    addToNotation(from, to);
                    addToHistry(copyOf);
                  }
                }));
                // isCheckMate();


              if(treeMovesRule()) this.setState({figureState:homePositions});
              }

              let actualColor=copyOf[to.field][to.rowName-1].color;
              let fromFigure=copyOf[from.field][from.rowName-1].figure;
              let toFigure=copyOf[to.field][to.rowName-1].figure;

              if(fromFigure!=='Pawn'){
                if(toFigure!=='' && ((whiteOnMove && actualColor==='black')||(!whiteOnMove && actualColor==='white'))){
                  this.setState({movesWithoutBeat:0}, shouldImove());
                }
                else{
                  actualMovesWithoutBeat++;
                  shouldImove();
                  this.setState({movesWithoutBeat:actualMovesWithoutBeat}, fiftyMovesRule());
                }
              }
              else{
                this.setState({movesWithoutBeat:0}, shouldImove());
              }
            }
            const rookMove=()=>{
              let didntJump=true;
              if(from.rowName-1===to.rowName-1){
                let steps=fromChar-toChar
                for(let i=1;i<Math.abs(steps);i++){
                  const condition1=(change)=>copyOf?.[String.fromCharCode(fromChar+change)]?.[from.rowName-1].figure!==''
                  if(steps>0 && condition1(-i)) didntJump=false
                  else if(steps<0 && condition1(+i)) didntJump=false
                }
                if(didntJump){
                  moveFigure()
                  this.setState({lastPawn:''})
                }
              }
              if(from.field===to.field){
                let steps=from.rowName-to.rowName;
                const condition1=(change)=>copyOf?.[from.field]?.[from.rowName-1+change].figure!=='';
                for(let i=1;i<Math.abs(steps);i++){
                  if(steps<0 && condition1(+i)) didntJump=false
                  else if(steps>0 && condition1(-i)) didntJump=false
                }
                if(didntJump){
                  moveFigure()
                  this.setState({lastPawn:''})
                }
              }
            }
            const pawnMove=()=>{
              let steps=from.rowName-to.rowName;
              const waitForTrueState=()=>{
                return new Promise(resolve=>{
                  const checkState=()=>{
                    if(this.state.showPromotionModal === false) resolve()
                    else
                    setTimeout(()=>{
                      checkState()
                    }, 10)
                  };
                  checkState();
                });
              }

              const pawnPromotion=()=>{
                const checkNewAttackingFieldsBeforePromotion=()=>{
                  console.log('check new attacking')
                  return this.setState({showPromotionModal:true},()=>{
                    waitForTrueState()
                    .then(()=>{
                      // const checkNewAttackingFields=attackingStaticTest(allAtacks, figureState, whiteOnMove);
                      const checkNewAttackingFields=attackingStaticTest(allAtacks, copyOf, true);
                      // console.log(copyOf)
                      checkNewAttackingFields()
                    })
                  });
                }

                if((whiteOnMove && to.rowName===8) || (!whiteOnMove && to.rowName===1)){
                  if((Math.abs(to.field.charCodeAt()-from.field.charCodeAt())<1) &&
                  copyOf?.[to.field]?.[to.rowName-1]?.figure===''){
                    checkNewAttackingFieldsBeforePromotion();
                    this.setState({movesWithoutBeat:0});
                  }
  
                  if((Math.abs(to.field.charCodeAt()-from.field.charCodeAt())>0) &&
                  copyOf?.[to.field]?.[to.rowName-1]?.figure!==''){
                    checkNewAttackingFieldsBeforePromotion();
                    this.setState({movesWithoutBeat:0});
                  }
                }
              }
              pawnPromotion()

              const attack=(attackTarget)=>{
                const condition1=(change)=>{return to?.field===String.fromCharCode(fromChar+change)}
                const condition2=(to.rowName-from.rowName)===attackTarget;
                const condition3=destinationField.figure!=='';

                const beatingInFlight=()=>{
                  const beat=()=>{
                    copyOf[lastPawn.field][lastPawn.rowName]={figure:''};
                    moveFigure();
                    this.setState({movesWithoutBeat:0});
                  }

                  if(Math.abs(fromChar-toChar)===1 && toChar===lastPawn?.field?.charCodeAt()){
                    if(fromColor==='white' && to.rowName-2===lastPawn.rowName && from.rowName===5) beat()
                    else if(fromColor==='black' && to.rowName===lastPawn.rowName && from.rowName===4) beat()
                  }
                }

                beatingInFlight();

                (condition1(-1) || condition1(1)) &&
                condition2 && condition3 && moveFigure();
              }
              if(steps<0 && fromColor!=='black') attack(1)
              else if(steps>0 && fromColor!=='white') attack(-1)

              if(from.field===to.field){
                let didntJump=true;
                const canMovePawn=()=>{
                  const cpField=copyOf[from.field];

                  for(let i=0;i<Math.abs(steps);i++){
                    if(steps<0 && (fromColor==='black' || cpField[from.rowName+i].figure!=='')) didntJump=false
                    else if(steps>0 && (fromColor==='white' || cpField[from.rowName-2-i].figure!=='')) didntJump=false
                  }

                  if(didntJump){
                    moveFigure()
                    this.setState({lastPawn:{field:to.field, rowName:to.rowName-1}, movesWithoutBeat:0});
                  }
                }

                if(previousField.moved===false && Math.abs(steps)<=2) canMovePawn()
                else if(previousField.moved===true && Math.abs(steps)===1) canMovePawn()
              }
              this.saveInLocalStorage(this);
            }
            const knightMove=()=>{
              const condition1=(change)=>Math.abs(toChar-fromChar)===change
              const condition2=(change)=>to.rowName-1 === from.rowName+change
              const steps=Math.abs(from.rowName-to.rowName)

              condition1(2) && (condition2(-2) || condition2(0)) &&
              moveFigure();

              condition1(1) && (steps)===2 &&
              moveFigure();
            }
            const bishopMove=()=>{
              const verticalSteps=(from.rowName-1)-(to.rowName-1)
              const horisontalSteps=fromChar-toChar

              const condition1=Math.abs(verticalSteps)
              const condition2=Math.abs(horisontalSteps)

              if(condition1===condition2){
                let didntJump=true;

                for(let i=1;i<Math.abs(condition1);i++){
                  const moveToRight=horisontalSteps<0;
                  const moveToLeft=horisontalSteps>0;

                  const rightField=copyOf?.[String.fromCharCode(fromChar+i)];
                  const leftField=copyOf?.[String.fromCharCode(fromChar-i)];

                  const upperField=()=>[from.rowName-1+i];
                  const lowerField=()=>[from.rowName-1-i];

                  if(verticalSteps<0){
                    if(moveToRight && rightField?.[upperField()].figure!=='') didntJump=false
                    else if(moveToLeft && leftField?.[upperField()].figure!=='') didntJump=false
                  }

                  if(verticalSteps>0){
                    if(moveToRight && rightField?.[lowerField()].figure!=='') didntJump=false
                    else if(moveToLeft && leftField?.[lowerField()].figure!=='') didntJump=false
                  }
                }
                if(didntJump){
                  moveFigure();
                  this.setState({lastPawn:''});
                }
              }
            }
            const kingMove=()=>{
              const condition1=Math.abs(fromChar-toChar)<2
              const condition2=Math.abs((from.rowName-1)-(to.rowName-1))<2

              if(previousField.moved===false){
                if(Math.abs(fromChar-toChar)===2 && ((from.rowName-1)-(to.rowName-1))===0 && copyOf[from.field][from.rowName-1].moved===false && copyOf[from.field][from.rowName-1].attackedField===false){

                  const returnVertField=(change)=>{return copyOf[String.fromCharCode(from.field.charCodeAt()+change)][from.rowName-1]}

                  const shortCastling=()=>{
                    let didntJump=true;
                    // console.log(fromChar-toChar)
                    if(fromChar-toChar===-2 && returnVertField(3).moved===false){
                      for(let i=1;i<3;i++){
                        if(returnVertField(i).attackedField===true || returnVertField(i).figure!=='') didntJump=false
                      
                        if(didntJump){
                          copyOf[String.fromCharCode(from.field.charCodeAt()+3)][from.rowName-1].moved=true;
                          copyOf[String.fromCharCode(from.field.charCodeAt()+1)][from.rowName-1]=returnVertField(3);
                          copyOf[String.fromCharCode(from.field.charCodeAt()+3)][from.rowName-1]={figure:''};
                          moveFigure();
                        }
                      }
                    
                    }
                  }
                  const longCastling=()=>{
                    let didntJump=true;
                    // console.log(fromChar-toChar)

                    if(fromChar-toChar===2 && returnVertField(-4).moved===false && returnVertField(-3).figure===''){
                      for(let i=1;i<3;i++){
                        if(returnVertField(-i).attackedField===true || returnVertField(-i).figure!=='') didntJump=false
                      }

                      if(didntJump){
                        copyOf[String.fromCharCode(from.field.charCodeAt()-4)][from.rowName-1].moved=true;
                        copyOf[String.fromCharCode(from.field.charCodeAt()-1)][from.rowName-1]=returnVertField(-4);
                        copyOf[String.fromCharCode(from.field.charCodeAt()-4)][from.rowName-1]={figure:''};
                        moveFigure();
                      }

                    }

                  
                  }
                  longCastling();
                  shortCastling();
                }
              }

              condition1 && condition2 &&
              copyOf[String.fromCharCode(toChar)][to.rowName-1].attackedField!==true &&
              moveFigure();
            }
            const queenMove=()=>{
              rookMove()
              bishopMove()
            }

            const allMoves={
              Rook:rookMove,
              Pawn:pawnMove,
              Knight:knightMove,
              Bishop:bishopMove,
              Queen:queenMove,
              King:kingMove,
            }
            allMoves[previousField?.figure]?.();
          }
        }

        if(fromColor==='white' && whiteOnMove) tryToMove(fromColor, toColor)
        else if(fromColor==='black' && !whiteOnMove) tryToMove(fromColor, toColor)
      }
    }
    const addToNotation=(from, to)=>{
      const fromField=`${from.field}${from.rowName}`;
      const toField=`${to.field}${to.rowName}`;

      const movedFigure=this.state.figureState?.[to.field]?.[to.rowName-1]?.figure;
      const addNewMoveToNotation=notation;
      addNewMoveToNotation.push({figureToDraw:movedFigure, moveID:moveID, color:`${whiteOnMove?'white':'black'}`, text:`${fromField}=>${toField}`});
      this.setState({moveID:moveID+1, notation:addNewMoveToNotation});
    }
    const turn=()=>this.setState({whiteOnBottom:!whiteOnBottom});
    const onSecoundClick=(to)=>{
      this.setState({to:to});
      move(this.state.from, to);
    }

    const oneTwoTree=[1, 2, 3, 4, 5, 6, 7, 8];
    const yAxis=whiteOnBottom?oneTwoTree.reverse():oneTwoTree;
    return(
      <div id='App'>
        <PositionsContext.Provider value={{figureState, figure, from, to, changeState, move, whiteOnMove, saveInContext, whiteOnBottom, onSecoundClick}}>
          <div style={styles.container} id='container'>
            <Board whiteOnBottom={whiteOnBottom}>
              {yAxis.map((x,i)=><Row key={x} whiteOnBottom={whiteOnBottom} rowName={x} evenRow={(i+1)%2!==0?false:true}/>)}
              <TbRotate onClick={turn} style={styles.rotateButton} id='rotateButton'/>
            </Board>
            <div style={styles.rightControlPanel}>
              <OnMove whiteOnMove={whiteOnMove} whiteOnBottom={whiteOnBottom} changeState={changeState} pat={pat}/>
              <Timers
              whiteActualTimerRef={whiteActualTimerRef}
              blackActualTimerRef={blackActualTimerRef}
              whiteOnMove={whiteOnMove} changeState={changeState} whiteOnBottom={whiteOnBottom} resetTimers={resetTimers}/>
              <div style={styles.buttons}>
                <Surrender whiteOnMove={whiteOnMove} changeState={changeState} resetTimers={resetTimers}/>
                <Remis changeState={changeState} pat={pat}/>
              </div>
            </div>
            <ChessNotation notation={notation} showHistoricalMove={showHistoricalMove}/>
          </div>
          {showPromotionModal && <PromotionModal color={whiteOnMove?'white':'black'}/>}
        </PositionsContext.Provider>
      </div>
    )
  }
}