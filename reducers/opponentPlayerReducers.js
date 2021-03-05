import {
  OPPONENT_PLAYER_CHARACTER_SELECT,
  OPPONENT_PLAYER_POINT_INCREASE,
  RESET_OPPONENT_PLAYER_INFO,
  OPPONENT_PLAYER_POINT_INCREASE_MULTIPLAYER,
  SET_OPPONENT_SOCKET_ID,
  SET_OPPONENT_PLAYER_NAME,
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

    case SET_OPPONENT_PLAYER_NAME:
      return {
        ...state,
        opponentPlayerName: action.payload,
      }
    case RESET_OPPONENT_PLAYER_INFO:
      return {
        opponentPlayerCharacter: "",
        opponentPlayerPosition: 0,
        opponentPlayerName: "",
      }

    default:
      return state
  }
}
