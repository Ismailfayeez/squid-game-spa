export class InputHandler {
    constructor(game, inputMode, handleInput) {
        this.game = game
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

            const { dollUpdating } = this.game.doll
            const currentTime = Date.now()
            const nextInputTime = currentTime - this.timeStamp > 100
            if (
                game.data.status === 'STARTED' &&
                playerStatus === 'ALIVE' &&
                nextInputTime &&
                frameX === posX + x * fpm &&
                !dollUpdating
            ) {
                handleInput(this.inputMode)
                this.timeStamp = currentTime
            }
        }

        if (inputMode === 'keys')
            addEventListener('keydown', () => this.triggerAction())
    }

    validate() {
        if (this.inputMode === 'camera') this.triggerAction()
    }
}
