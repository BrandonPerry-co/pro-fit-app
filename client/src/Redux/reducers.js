/* eslint-disable no-undef */

import { combineReducers } from 'redux'

const user = (state = null) => state
const height = (state = null) => state
const weight = (state = null) => state
const age = (state = null) => state
const workout = (state = []) => state



export default combineReducers({ user, height, weight, age, workout })