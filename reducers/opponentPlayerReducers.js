import {
  OPPONENT_PLAYER_CHARACTER_SELECT,
  OPPONENT_PLAYER_POINT_INCREASE,
  RESET_OPPONENT_PLAYER_INFO,
  OPPONENT_PLAYER_POINT_INCREASE_MULTIPLAYER,
} from "../constants/constants.js"

export const opponentPlayerInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case OPPONENT_PLAYER_CHARACTER_SELECT:
      return {
        ...state,
        opponentPlayerCharacter: action.payload.opponentPlayerCharacter,
      }

    case OPPONENT_PLAYER_POINT_INCREASE:
      return {
        ...state,
        opponentPlayerPosition:
          state.opponentPlayerPosition +
          Math.floor(Math.random() * action.payload),
      }

    case OPPONENT_PLAYER_POINT_INCREASE_MULTIPLAYER:
      return {
        ...state,
        opponentPlayerPosition: action.payload.opponentPlayerPosition,
      }

    case RESET_OPPONENT_PLAYER_INFO:
      return { opponentPlayerCharacter: "", opponentPlayerPosition: 0 }

    // case OPPONENT_PLAYER_POINT_INCREASE:
    // return {
    //   ...state,
    //   opponentPlayerPosition: action.payload.opponentPlayerPosition,
    // }
    default:
      return state
  }
}
