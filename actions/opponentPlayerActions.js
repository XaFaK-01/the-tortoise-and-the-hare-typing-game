import {
  OPPONENT_PLAYER_CHARACTER_SELECT,
  OPPONENT_PLAYER_POINT_INCREASE,
  OPPONENT_PLAYER_POINT_INCREASE_MULTIPLAYER,
  SET_OPPONENT_PLAYER_NAME,
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

export const addAPointToOpponentPlayerMultiplayer = (difficultyValue) => (
  dispatch,
  getState
) => {
  const { opponentPlayerInfo } = getState()
  dispatch({
    type: OPPONENT_PLAYER_POINT_INCREASE_MULTIPLAYER,
    payload: {
      opponentPlayerPosition:
        opponentPlayerInfo.opponentPlayerPosition + difficultyValue,
    },
  })
}

export const setOpponentPlayerName = (name) => (dispatch) => {
  dispatch({
    type: SET_OPPONENT_PLAYER_NAME,
    payload: name,
  })
}
