import { useEffect } from "react"
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(key, correctAction, incorrectAction) {
  useEffect(() => {
    function onKeyup(e) {
      if (e.key == key) correctAction()
      if (e.key !== key) incorrectAction()
    }
    window.addEventListener("keyup", onKeyup)
    return () => window.removeEventListener("keyup", onKeyup)
  })
}
