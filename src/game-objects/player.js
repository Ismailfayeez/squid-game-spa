import { COLORS } from '../constants'
import { PlayerDead } from './playerDead'

export class Player {
    constructor(game, { name, x = 0, y = 0, posX = 0, posY, status, id }) {
        // size per players
        this.ctx = game.ctx
        this.boundary = game.boundary
        this.me = game.data.me
        this.groundHeight = game.height - this.boundary
        this.rowCount = parseInt(game.data.rowCount)
        this.hpr = this.groundHeight / parseInt(this.rowCount)
        // player
        this.id = id
        this.name = name
        this.size = 4
        this.fontHeight = 15
        this.fontColor = COLORS[Math.floor(Math.random() * COLORS.length)]
        this.headWidth = 75 / this.size
        this.headHeight = 100 / this.size
        this.bodyWidth = 174 / this.size
        this.bodyHeight = 340 / this.size
        this.totalHeight = this.fontHeight + this.headHeight + this.bodyHeight
        // position
        this.fpm = 8
        this.x = parseInt(x)
        this.y = y * this.hpr
        this.posX = parseInt(posX)
        this.posY = parseInt(posY) + this.boundary
        this.frameX = this.posX + this.x * this.fpm
        this.frameY = this.posY + this.y
        this.status = status
        this.playerDead = new PlayerDead(game)

        if (this.frameY + this.totalHeight > game.height)
            this.frameY = game.height - this.totalHeight
        else if (this.frameY < this.boundary) this.frameY = this.boundary
    }
    draw() {
        console.log(this.frameX, this.frameY, '(this.frameX, this.frameY')
        if (this.status === 'DEAD')
            return this.playerDead.draw(this.frameX, this.frameY)

        const currentPosition = this.frameX - this.posX

        const heads1 = document.getElementById('heads1')
        const heads2 = document.getElementById('heads2')
        const body = document.getElementById('player')

        this.ctx.save()
        this.ctx.translate(this.frameX, this.frameY)

        // write player name

        const itsMe = this.name === this.me?.name
        const name = itsMe ? 'you' : this.name
        this.ctx.font = `${itsMe ? 14 : 12}px Verdana`

        this.ctx.fillStyle = itsMe ? '#02e63f' : this.fontColor
        this.ctx.textBaseline = 'top'
        this.ctx.textAlign = 'right'
        this.ctx.lineWidth = itsMe ? 0.4 : 0.3
        this.ctx.strokeStyle = 'black'

        this.ctx.fillText(name, this.bodyWidth, 0)
        this.ctx.strokeText(name, this.bodyWidth, 0)
        this.ctx.translate(0, this.fontHeight)

        // draw player head

        const imageId = this.id % 8
        const head = this.id < 8 ? heads1 : heads2
        const imageWidth = head.naturalWidth / 8
        const imageHeight = head.naturalHeight
        this.ctx.drawImage(
            head,
            imageId * imageWidth,
            0,
            imageWidth,
            imageHeight,
            this.bodyWidth - this.headWidth,
            0,
            this.headWidth,
            this.headHeight
        )
        this.ctx.translate(0, this.headWidth)

        // draw player body
        this.ctx.drawImage(
            body,
            174 * Math.floor((currentPosition % 8) / 4),
            0,
            174,
            393,
            0,
            -8 / this.size,
            this.bodyWidth,
            this.bodyHeight
        )
        this.ctx.restore()
    }
    update({ x, y, status }) {
        this.x = parseInt(x)
        this.y = parseInt(y)
        this.status = status
        if (this.frameX < this.posX + this.x * this.fpm) this.frameX += 1
    }
}
