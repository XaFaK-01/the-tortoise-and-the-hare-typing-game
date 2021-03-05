import {
  CURRENT_PLAYER_POINT_INCREASE,
  GENERATE_NEW_WORD_ON_SUCCESS,
  CURRENT_PLAYER_CHARACTER_SELECT,
  RESET_CURRENT_PLAYER_INFO,
  SET_CURRENT_PLAYER_NAME,
} from "../constants/constants.js"

export const currentPlayerInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_PLAYER_CHARACTER_SELECT:
      return {
        ...state,
        currentPlayerCharacter: action.payload.currentPlayerCharacter,
      }

    case CURRENT_PLAYER_POINT_INCREASE:
      return {
        ...state,
        currentPlayerPosition: action.payload.currentPlayerPosition,
      }

    case GENERATE_NEW_WORD_ON_SUCCESS:
      return {
        ...state,
        randomlyGeneratedWord: action.payload,
      }

    case SET_CURRENT_PLAYER_NAME:
      return {
        ...state,
        currentPlayerName: action.payload,
      }

    case RESET_CURRENT_PLAYER_INFO:
      return {
        ...state,
        currentPlayerName: "",
        currentPlayerCharacter: "",
        currentPlayerPosition: 0,
      }
    default:
      return state
  }
}
