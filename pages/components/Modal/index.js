import PromotionModal from "./PromotionModal"

export const ModalContext=React.createContext()

const Modal=({isModalOpened,closeModalF,whiteTure})=>(
    <ModalContext.Provider value={{closeModalF}}>
      {isModalOpened && <PromotionModal whiteTure={whiteTure}/>}
    </ModalContext.Provider>
)

export default Modal