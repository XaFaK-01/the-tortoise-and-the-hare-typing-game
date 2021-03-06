import {
  GAME_START,
  GAME_END,
  SET_OPPONENT_DIFFICULTY_LEVEL,
  SET_GAME_TYPE,
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

export const gameStateReducers = (state = {}, action) => {
  switch (action.type) {
    case GAME_START:
      return {
        ...state,
        gameStart: true,
      }

    case GAME_END:
      return {
        ...state,
        gameStart: false,
      }

    case SET_OPPONENT_DIFFICULTY_LEVEL:
      return {
        ...state,
        opponentDifficultyLevel: action.payload,
      }

    case SET_GAME_TYPE:
      return {
        ...state,
        gameType: action.payload,
      }

    case TOTAL_WORDS_TYPED_INCREASE:
      return {
        ...state,
        totalWordsTyped: action.payload,
      }

    case FLUENT_WORDS_TYPED_INCREASE:
      return {
        ...state,
        fluentWordsTyped: action.payload,
      }

    case ADD_WEAK_KEY_STROKE:
      return {
        ...state,
        weakKeyStrokes: action.payload,
      }

    case START_TYPING_COUNTDOWN:
      return {
        ...state,
        typingCountdown: state.typingCountdown + 1,
      }
    case INCREMENT_CHARACTER_TYPED:
      return {
        ...state,
        charactersTyped: state.charactersTyped + 1,
      }

    case SET_ROOM_NAME:
      return {
        ...state,
        roomName: action.payload,
      }

    case SET_MY_SOCKET_ID:
      return {
        ...state,
        mySocketId: action.payload,
      }

    case SET_OPPONENT_SOCKET_ID:
      return {
        ...state,
        opponentSocketId: action.payload,
      }

    case TOGGLE_VIRTUAL_KEYBOARD:
      return {
        ...state,
        showKeyboard: action.payload,
      }

    case RESET_GAME_STATE:
      return {
        showKeyboard: false,
        gameStart: false,
        gameWon: false,
        opponentDifficultyLevel: 3,
        gameType: "",
        totalWordsTyped: 0,
        fluentWordsTyped: 0,
        weakKeyStrokes: [],
        typingCountdown: 0,
        charactersTyped: 0,
        roomName: null,
        mySocketId: "",
        opponentSocketId: "",
      }
    default:
      return state
  }
}
