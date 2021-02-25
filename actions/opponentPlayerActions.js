import {
  OPPONENT_PLAYER_CHARACTER_SELECT,
  OPPONENT_PLAYER_POINT_INCREASE,
  INITIALIZE_GAME,
} from "../constants/constants.js"

export const selectOpponentPlayerCharacter = () => (dispatch, getState) => {
  const { currentPlayerInfo } = getState()
  const { currentPlayerCharacter } = currentPlayerInfo

  let opponentCharacter
  if (currentPlayerCharacter === "hare") {
    opponentCharacter = "tortoise"
  } else if (currentPlayerCharacter === "tortoise") {
    opponentCharacter = "hare"
  }
  dispatch({
    type: OPPONENT_PLAYER_CHARACTER_SELECT,
    payload: {
      opponentPlayerCharacter: opponentCharacter,
    },
  })
}

export const addAPointToOpponentPlayer = () => (dispatch, getState) => {
  const { opponentPlayerInfo } = getState()

  dispatch({
    type: OPPONENT_PLAYER_POINT_INCREASE,
    payload: {
      opponentPlayerPosition:
        opponentPlayerInfo.opponentPlayerPosition +
        Math.floor(Math.random() * 8),
    },
  })
}
