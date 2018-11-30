import { REHYDRATE } from 'redux-persist/lib/constants'


const initState = function(){
  return {
    global: true
  }
}()

const global = (state = initState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      return state
    }
  }

  return state
}

export default global
