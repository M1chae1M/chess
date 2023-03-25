import Row from './Row';
import Board from './Board';
import OnMove from './OnMove';
import React,{Component} from 'react';
import PromotionModal from './PromotionModal';
import {figure, positions} from './_document';
import Timers from './Timers';
import ChessNotation from './ChessNotation';

export const PositionsContext=React.createContext();

export default class App extends Component{
  state={
    from:{},
    to:{},
    figureState:{...positions},
    whiteOnMove:true,
    showPromotionModal:false,
    lastPawn:'',
    lastMoveColor:'black',
    checkAttacksState:false,
    moveID:1,
    notation:[],
  }
  componentDidMount(){
    this.downloadFromLocalStorage(this)
  }
  saveInLocalStorage=(component)=>{
    localStorage.setItem('data', JSON.stringify({board:component.state.figureState, move:!component.state.whiteOnMove}))
  }
  downloadFromLocalStorage=(component)=>{
    const downloadedData=localStorage.getItem('data');
    const parsed=downloadedData && JSON.parse(downloadedData);
    console.log(parsed)
    parsed && component.setState({figureState:parsed.board, whiteOnMove:parsed.move})
  }
  render(){
    const {figureState, to, from, whiteOnMove, showPromotionModal, lastPawn, checkAttacksState, moveID, notation}=this.state;
    const xAxis=[1, 2, 3, 4, 5, 6, 7, 8].reverse();
    const styles={
      container:{
        display:'grid',
        gridTemplateColumns:'1fr 1fr 1fr',
        gridTemplateColumns:'1fr auto auto',
        width:'fit-content',
      },
    }
    const changeState=(newState)=>this.setState(newState)
    const attackedField=(copyOf, fieldToAttack)=>{
      const dest=copyOf?.[fieldToAttack.field]?.[fieldToAttack.rowName]
      if(dest){
        
        // dest.attackedField=false;

        // if(whiteOnMove){
        //   if(dest.figure==='King' && dest.color==='black'){
        //     copyOf[fieldToAttack.field][fieldToAttack.rowName].attackedField = true;
        //   }else if(dest.figure!=='King'){
        //     copyOf[fieldToAttack.field][fieldToAttack.rowName].attackedField = true;
        //   }
        // // }
        // // else if(!whiteOnMove){
        //   if(dest.figure==='King' && dest.color==='white'){
        //     copyOf[fieldToAttack.field][fieldToAttack.rowName].attackedField = true;
        //   }
        //   else if(dest.figure!=='King'){
        //     copyOf[fieldToAttack.field][fieldToAttack.rowName].attackedField = true;
        //   }
        // }


        if(dest.figure==='King' && dest.color==='black'
        // && copyOf[fieldToAttack.field][fieldToAttack.rowName].color==='black'
        // && checkAttacksState
        ){
          copyOf[fieldToAttack.field][fieldToAttack.rowName].attackedField = true;

        }
      // }
      // else if(!whiteOnMove){
        else if(dest.figure==='King' && dest.color==='white'
        // && copyOf[fieldToAttack.field][fieldToAttack.rowName].color==='white'
        // && !checkAttacksState
        ){
          copyOf[fieldToAttack.field][fieldToAttack.rowName].attackedField = true;
        }
        else if(dest.figure!=='King'){
          copyOf[fieldToAttack.field][fieldToAttack.rowName].attackedField = true;
        }


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
      return test
    }

    const move=()=>{
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

                  addToNotation();
                }
                else if(short.figure==='King' && short.attackedField===true && short.color==='white' && !checkAttacksState){
                  attackingStaticTest(allAtacks, copyOf, false);
                  this.setState({figureState:kopy, whiteOnMove:true, checkAttacksState:false});
                }
                else if(short.field==='King' && short.attackedField===false && short.color==='white' && !checkAttacksState){
                  this.setState({figureState:copyOf, whiteOnMove:true, checkAttacksState:true});
                  attackingStaticTest(allAtacks, copyOf, true);
                  this.saveInLocalStorage(this);

                  addToNotation();
                }
                else if(whiteOnMove && short.figure==='King' && short.color==='white' && short.attackedField===false){
                  this.setState({figureState:copyOf, whiteOnMove:false, checkAttacksState:true});
                  attackingStaticTest(allAtacks, copyOf, true);
                  this.saveInLocalStorage(this);

                  addToNotation()
                }else if(!whiteOnMove && short.figure==='King' && short.color==='black' && short.attackedField===false){
                  this.setState({figureState:copyOf, whiteOnMove:true, checkAttacksState:false});
                  attackingStaticTest(allAtacks, copyOf, false);
                  this.saveInLocalStorage(this);

                  addToNotation();
                }
              }));
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
                    else setTimeout(checkState, 10);
                  };
                  checkState();
                });
              }

              const pawnPromotion=()=>{
                const checkNewAttackingFieldsBeforePromotion=()=>{
                  return this.setState({showPromotionModal:true},()=>{
                    waitForTrueState()
                    .then(()=>{
                      const checkNewAttackingFields=attackingStaticTest(allAtacks, figureState, whiteOnMove)
                      checkNewAttackingFields()
                    })
                  });
                }

                if((whiteOnMove && to.rowName===8) || (!whiteOnMove && to.rowName===1)){
                  (Math.abs(to.field.charCodeAt()-from.field.charCodeAt())<1) &&
                  copyOf?.[to.field]?.[to.rowName-1]?.figure==='' &&
                  checkNewAttackingFieldsBeforePromotion();
  
                  (Math.abs(to.field.charCodeAt()-from.field.charCodeAt())>0) &&
                  copyOf?.[to.field]?.[to.rowName-1]?.figure!=='' &&
                  checkNewAttackingFieldsBeforePromotion();
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
                  }

                  if(Math.abs(fromChar-toChar)===1 && toChar===lastPawn?.field?.charCodeAt()){
                    if(fromColor==='white' && to.rowName-2===lastPawn.rowName) beat()
                    else if(fromColor==='black' && to.rowName===lastPawn.rowName) beat()
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
                    this.setState({lastPawn:{field:to.field, rowName:to.rowName-1}})
                  }
                }

                if(previousField.moved===false && Math.abs(steps)<=2) canMovePawn()
                else if(previousField.moved===true && Math.abs(steps)===1) canMovePawn()
              }
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
                  moveFigure()
                  this.setState({lastPawn:''})
                }
              }
            }
            const kingMove=()=>{
              const condition1=Math.abs(fromChar-toChar)<2
              const condition2=Math.abs((from.rowName-1)-(to.rowName-1))<2

              if(previousField.moved===false){
                if(Math.abs(fromChar-toChar)===2 && ((from.rowName-1)-(to.rowName-1))===0 && copyOf[from.field][from.rowName-1].moved===false){
                  const returnRookPosition=(change)=>{return copyOf?.[String.fromCharCode(fromChar+change)]?.[from.rowName-1]}

                  const longCastling=()=>{
                    let didntJump=true;
                    if((fromChar-toChar)<0 && returnRookPosition(+3).moved===false && destinationField.attackedField!==true){
                      for(let i=1;i<3;i++){
                        if(copyOf[String.fromCharCode(fromChar+i)][from.rowName-1].figure!==''
                        && copyOf[String.fromCharCode(toChar+i)][to.rowName-1].attackedField!==true) didntJump=false
                      }

                      if(didntJump){
                        copyOf[String.fromCharCode(fromChar+1)][from.rowName-1]=returnRookPosition(+3);
                        copyOf[String.fromCharCode(fromChar+3)][from.rowName-1]={figure:''};
                        moveFigure()
                      }
                    }
                  }
                  const shortCastling=()=>{
                    let didntJump=true;
                    if((fromChar-toChar)>0 && returnRookPosition(-4)?.moved===false && destinationField.attackedField!==true){
                      for(let i=1;i<4;i++){
                        if(copyOf[String.fromCharCode(fromChar-i)][from.rowName-1].figure!==''&&
                        copyOf[String.fromCharCode(toChar+i)][to.rowName-1].attackedField!==true) didntJump=false
                      }

                      if(didntJump){
                        copyOf[String.fromCharCode(fromChar-1)][from.rowName-1]=returnRookPosition(-4);
                        copyOf[String.fromCharCode(fromChar-4)][from.rowName-1]={figure:''};
                        moveFigure()
                      }
                    }
                  }
                  shortCastling()
                  longCastling()
                }
              }

              condition1 && condition2 &&
              copyOf[String.fromCharCode(toChar)][to.rowName-1].attackedField!==true &&
              moveFigure()
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

    const addToNotation=()=>{
      const fromField=`${from.field}${from.rowName}`;
      const toField=`${to.field}${to.rowName}`;

      const movedFigure=this.state.figureState[to.field][to.rowName-1].figure;
      console.log(whiteOnMove)
      console.log(fromField)
  
      const addNewMoveToNotation=notation;
      console.log(toField)
      console.log(movedFigure);

      console.log(
        `${moveID}. ${movedFigure} ${fromField}=>${toField}`
      );
      addNewMoveToNotation.push(`${moveID}. ${movedFigure} ${fromField}=>${toField}`)
      this.setState({moveID:moveID+1,
        notation:addNewMoveToNotation
      });

      // let movedFigure=figureState[from.field][from.rowName-1].figure;
      // let movedFigure2=figureState[to.field][to.rowName-1].figure;

      // console.log(movedFigure);
      // console.log(movedFigure2);
    }
    return(
      <div id='App'>
        <PositionsContext.Provider value={{figureState, figure, from, to, changeState, move, whiteOnMove}}>
          <div style={styles.container}>
            <Board>
              {xAxis.map((x,i)=><Row key={x} rowName={x} evenRow={(i+1)%2!==0?false:true}/>)}
            </Board>
            <OnMove whiteOnMove={whiteOnMove} changeState={changeState}/>
            {/* <Timers whiteOnMove={whiteOnMove}/> */}
            <ChessNotation notation={notation}/>
          </div>
          {showPromotionModal && <PromotionModal color={whiteOnMove?'white':'black'}/>}
        </PositionsContext.Provider>
      </div>
    )
  }
}