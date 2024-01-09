import _ from 'lodash'
import start from "./different_boards/start";
import castling from "./different_boards/castling";
import castling_with_chequered_fields from "./different_boards/castling_with_chequered_fields";
import promotion from "./different_boards/promotion";
import en_passant from './different_boards/en_passant'
import cheq from './different_boards/cheq'

const test_boards={
  start,
  castling,
  castling_with_chequered_fields,
  promotion,
  cheq,
  en_passant,
}['start']

export default test_boards
export const boardStartStateCopy=_.cloneDeep(test_boards);