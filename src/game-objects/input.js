export class InputHandler {
    constructor(game, inputMode, handleInput) {
        console.log(inputMode, 'inputMode1')
        this.currentPlayer = game.players.players[game.data.me.name]
        this.handleInput = handleInput
        this.inputMode = inputMode
        this.timeStamp = 0

        this.triggerAction = () => {
            const {
                frameX,
                posX,
                x,
                fpm,
                status: playerStatus,
            } = this.currentPlayer || {}
            const currentTime = Date.now()
            const nextInputTime = currentTime - this.timeStamp > 100
            if (
                game.data.status === 'STARTED' &&
                playerStatus === 'ALIVE' &&
                nextInputTime &&
                frameX === posX + x * fpm
            ) {
                handleInput(this.inputMode)
                this.timeStamp = currentTime
            }
        }

        if (inputMode === 'keys')
            addEventListener('keydown', () => this.triggerAction())
    }

    validate() {
        console.log(this.inputMode, 'this.inputModevalida')
        if (this.inputMode === 'camera') this.triggerAction()
    }
}
