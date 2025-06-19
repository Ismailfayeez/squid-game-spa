export const gameReducer = (state = {}, { data = {} }) => {
    const { action, value } = data
    const { gameStat = {} } = state
    const { players = {} } = gameStat

    if (action === 'PLAYER_JOINED' && !players[data.name]) {
        return {
            ...state,
            gameStat: {
                ...gameStat,
                players: {
                    ...players,
                    [data.name]: data.stat,
                },
            },
        }
    }
    if (action === 'MOVE' || action === 'FINISHED') {
        return {
            ...state,
            gameStat: {
                ...gameStat,
                players: { ...players, ...data.player },
            },
        }
    }
    if (action === 'DOLLWATCHING')
        return {
            ...state,
            gameStat: {
                ...gameStat,
                dollWatching: value,
            },
        }
    else return { ...state, ...data }
}
