import {
  CURRENT_PLAYER_POINT_INCREASE,
  GENERATE_NEW_WORD_ON_SUCCESS,
  CURRENT_PLAYER_CHARACTER_SELECT,
} from "../constants/constants.js"

import randomWords from "random-words"

export const selectCurrentPlayerCharacter = (character) => (
  dispatch,
  getState
) => {
  dispatch({
    type: CURRENT_PLAYER_CHARACTER_SELECT,
    payload: {
      currentPlayerCharacter: character,
    },
  })
}

export const addAPointToCurrentPlayer = (difficultyValue) => (
  dispatch,
  getState
) => {
  const { currentPlayerInfo } = getState()
  dispatch({
    type: CURRENT_PLAYER_POINT_INCREASE,
    payload: {
      currentPlayerPosition:
        currentPlayerInfo.currentPlayerPosition + difficultyValue,
    },
  })
}

export const generateNewWordOnSuccess = () => (dispatch, getState) => {
  dispatch({
    type: GENERATE_NEW_WORD_ON_SUCCESS,
    payload: randomWords(),
  })
}
