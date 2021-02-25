// this is basically where we connect all of our reducers and middleware stuff like that
// we're going to have many reducers and each reducer is going to handle a certain functionality
import { createStore, applyMiddleware, combineReducers } from "redux"
import { useMemo } from "react"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

// import of reducers from files
import { currentPlayerInfoReducer } from "./reducers/currentPlayerReducers"
import { opponentPlayerInfoReducer } from "./reducers/opponentPlayerReducers"
import { gameStateReducers } from "./reducers/gameStateReducers"

import randomWords from "random-words"

// combining reducers

const reducer = combineReducers({
  //  all the reducers will go over here
  //mentioning productList here is important because this is what's going to show as this piece of state, so it'll be productList part of state
  // orderDeliver: orderDeliverReducer,
  currentPlayerInfo: currentPlayerInfoReducer,
  opponentPlayerInfo: opponentPlayerInfoReducer,
  gameState: gameStateReducers,
})

let store

const initialState = {
  currentPlayerInfo: {
    currentPlayerCharacter: "",
    currentPlayerPosition: 0,
    randomlyGeneratedWord: randomWords(),
  },
  opponentPlayerInfo: {
    opponentPlayerCharacter: "",
    opponentPlayerPosition: 0,
  },
  gameState: {
    gameStart: false,
    gameWon: false,
    opponentDifficultyLevel: 3,
    gameType: "",
    totalWordsTyped: 0,
    fluentWordsTyped: 0,
    weakKeyStrokes: [],
    typingCountdown: 0,
    charactersTyped: 0,
  },
}

const middleware = [thunk]

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
