import {Component} from 'react'
import styled from 'styled-components'
import ControlBTNs from '../panel/ControlBTNs'
import CONFIG from '@/config/config.json'
const {fieldSize, size}=CONFIG??{}

const ROW=styled.div`
    display:none;

    @media screen and (max-width: calc(${fieldSize} * 8 + 36px + ${size} * 4)){
        position:absolute;
        top:0%;
        margin:15px;
        display:flex;
    }
`

export default class Menu extends Component{
    render(){
        return(
            <ROW>
                <ControlBTNs/>
            </ROW>
        )
    }
}