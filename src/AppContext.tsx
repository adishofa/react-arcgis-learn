import React, { createContext, useEffect, useReducer } from 'react'
import { shopLocator } from './data/locator'
import { addShop, showMap } from './utils/actionConstant'

const initialState: any = {
    shops: [],
    showMap: false,
    shop: null,
    container: null
}

export const AppContext = createContext(initialState)

function reducer(state: any, {type, payload}: any) {
    switch(type) {
        case addShop:
            return {...state, shops: payload}
        case showMap:
            return {
                ...state,
                showMap: payload.showMap,
                shop: payload.shop,
                container: payload.container
            }
        default:
            return state
    }
}

const AppContextProvider = (props: any) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = {state, dispatch}


    useEffect(() => {
        shopLocator()
        .then((result) => {
            dispatch({type: addShop, payload: result})
        })
    }, [])

    useEffect(() => {
        const loadMap = async () => {
            const {initialize, showLocation} = await import('./data/webmap')
            const {container, shop} = state
            await initialize(container)
            showLocation(shop)
        }

        if (state.showMap) {
            loadMap()
        }
    }, [state])

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}

export default AppContextProvider
