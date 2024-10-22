import {
  GAME_START,
  SET_OPPONENT_DIFFICULTY_LEVEL,
  OPPONENT_PLAYER_POINT_INCREASE,
  SET_GAME_TYPE,
  RESET_CURRENT_PLAYER_INFO,
  RESET_OPPONENT_PLAYER_INFO,
  RESET_GAME_STATE,
  TOTAL_WORDS_TYPED_INCREASE,
  FLUENT_WORDS_TYPED_INCREASE,
  ADD_WEAK_KEY_STROKE,
  START_TYPING_COUNTDOWN,
  INCREMENT_CHARACTER_TYPED,
  SET_ROOM_NAME,
  SET_MY_SOCKET_ID,
  SET_OPPONENT_SOCKET_ID,
  TOGGLE_VIRTUAL_KEYBOARD,
} from "../constants/constants.js"

var opponentPointIncrease
var currentPlayerTypingCountdown

export const startOpponentRun = () => (dispatch, getState) => {
  const { gameState } = getState()
  const { opponentDifficultyLevel } = gameState

  opponentPointIncrease = setInterval(() => {
    dispatch({
      type: OPPONENT_PLAYER_POINT_INCREASE,
      payload: opponentDifficultyLevel,
    })
  }, 1000)
}

export const endOpponentRun = () => () => {
  clearInterval(opponentPointIncrease)
}

export const startGame = () => (dispatch) => {
  dispatch({
    type: GAME_START,
  })
}

export const setOpponentDifficultyLevel = (difficultyValue) => (dispatch) => {
  dispatch({
    type: SET_OPPONENT_DIFFICULTY_LEVEL,
    payload: difficultyValue,
  })
}

export const setGameType = (gameType) => (dispatch) => {
  dispatch({
    type: SET_GAME_TYPE,
    payload: gameType,
  })
}

export const resetFullGame = () => (dispatch) => {
  dispatch({
    type: RESET_CURRENT_PLAYER_INFO,
  })

  dispatch({
    type: RESET_OPPONENT_PLAYER_INFO,
  })

  dispatch({
    type: RESET_GAME_STATE,
  })
}

export const incrementTotalWordsTyped = () => (dispatch, getState) => {
  const { gameState } = getState()
  const { totalWordsTyped } = gameState
  dispatch({
    type: TOTAL_WORDS_TYPED_INCREASE,
    payload: totalWordsTyped + 1,
  })
}

export const incrementFluentWordsTyped = () => (dispatch, getState) => {
  const { gameState } = getState()
  const { fluentWordsTyped } = gameState
  dispatch({
    type: FLUENT_WORDS_TYPED_INCREASE,
    payload: fluentWordsTyped + 1,
  })
}

export const addWeakKeyStroke = (alphabet) => (dispatch, getState) => {
  const { gameState } = getState()
  const { weakKeyStrokes } = gameState

  let keyStrokes = weakKeyStrokes

  keyStrokes.push(alphabet)

  dispatch({
    type: ADD_WEAK_KEY_STROKE,
    payload: keyStrokes,
  })
}

export const startTypingCountdown = () => (dispatch) => {
  currentPlayerTypingCountdown = setInterval(() => {
    dispatch({
      type: START_TYPING_COUNTDOWN,
    })
  }, 1000)
}

export const endTypingCountdown = () => () => {
  clearInterval(currentPlayerTypingCountdown)
}

export const incrementCharactersTyped = () => (dispatch) => {
  dispatch({
    type: INCREMENT_CHARACTER_TYPED,
  })
}

export const setRoomName = (nameOfRoom) => (dispatch) => {
  dispatch({
    type: SET_ROOM_NAME,
    payload: nameOfRoom,
  })
}

export const setMySocketId = (socketId) => (dispatch) => {
  dispatch({
    type: SET_MY_SOCKET_ID,
    payload: socketId,
  })
}

export const setOpponentSocketId = (socketId) => (dispatch) => {
  dispatch({
    type: SET_OPPONENT_SOCKET_ID,
    payload: socketId,
  })
}

export const toggleVirtualKeyboard = () => (dispatch, getState) => {
  const { gameState } = getState()
  const { showKeyboard } = gameState

  dispatch({
    type: TOGGLE_VIRTUAL_KEYBOARD,
    payload: !showKeyboard,
  })
}
