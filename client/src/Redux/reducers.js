/* eslint-disable no-undef */

import { combineReducers } from 'redux'

const user = (state = null) => state
const height = (state = null) => state
const weight = (state = null) => state
const age = (state = null) => state
const workout = (state = []) => state



import { CastRounded } from '@material-ui/icons'
import { combineReducers } from 'redux'

const user = (state = null) => state

const cars = (state = [], action) => {
    switch(action.type) {
        case 'ADD_CAR':
            return [ ...state, action.value ]
        case 'REMOVE_CAR':
            const cars = [ ...state ]
            cars.splice(action.value, 1)
            return cars
        default:
            return state
    }
}

const makes = (state = [], action) => {
    switch(action.type) {
        case 'FETCH_MAKES':
            return [ action.value ]
        case 'REMOVE_MAKE':
            return [ ...state ]
            makes.splice(action.value, 1)
            return makes    
        default:
            return state
    }
}

export default combineReducers({ user, cars, makes })



export default combineReducers({ user, height, weight, age, workout })