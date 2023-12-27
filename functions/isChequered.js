import Figure from "@/classes/Figure"

export default function isChequered(){
    this.setState({kingAttacked:Figure.isKingChequered?.(!this.state.whiteTure).value})
}