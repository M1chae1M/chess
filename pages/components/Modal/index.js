import React from 'react';
import PromotionModal from "./PromotionModal"
import {GameProvider} from '../..';

export const ModalContext=React.createContext()

const Modal=()=>(
    <GameProvider.Consumer>
    {value=>{
        const {isModalOpened,closeModalF}=value??{}
        return(
            <ModalContext.Provider value={{closeModalF}}>
                {isModalOpened && <PromotionModal/>}
            </ModalContext.Provider>
        )
    }}
    </GameProvider.Consumer>
)

export default Modal