import { Bullet } from './bullet'

export class PlayerDead {
    constructor(game) {
        this.game = game
        this.ctx = game.ctx
        this.shooters = game.shooters
        this.deadStatus = 'NOT_SHOT'
        this.frameX = 0
        this.size = 4
        this.bullet = new Bullet(this)
    }
    draw(x, y) {
        const img = document.getElementById('player-dead-v2')
        const headImg = document.getElementById('heads')
        const bloodImg = document.getElementById('blood')
        this.bullet.play()
        this.bullet.draw(x, y)

        const headWidth = 75 / this.size
        const headHeight = 100 / this.size
        const bodyWidth = 374 / this.size
        const bodyHeight = 336 / this.size
        const totalWidth = headHeight + bodyWidth
        const totalHeight = headHeight + bodyHeight

        // player head
        const headPos = {
            0: {
                x: totalWidth * 0.38,
                y: 0,
                angle: 0,
            },
            1: {
                x: totalWidth * 0.23,
                y: 0,
                angle: -15,
            },
            2: {
                x: totalWidth * 0.1,
                y: 0,
                angle: -45,
            },
            3: {
                x: totalWidth * 0.07,
                y: totalWidth * 0.07,
                angle: -45,
            },
            4: {
                x: 0,
                y: totalHeight * 0.38,
                angle: -90,
            },
            5: {
                x: 0,
                y: totalHeight * 0.43,
                angle: -90,
            },
            6: {
                x: 0,
                y: totalHeight * 0.68,
                angle: -90,
            },
            7: {
                x: 0,
                y: totalHeight * 0.68,
                angle: -90,
            },
        }

        const head = headPos[Math.floor(this.frameX)]

        this.ctx.save()
        this.ctx.translate(x, y)
        this.ctx.save()

        this.ctx.translate(
            headWidth / 2 + head.x,
            headHeight / 2 + head.y + headHeight * 0.2
        )
        this.ctx.rotate((head.angle * Math.PI) / 180)
        this.ctx.drawImage(
            headImg,
            0,
            0,
            150,
            200,
            -headHeight / 2,
            -headWidth / 2,
            headWidth,
            headHeight
        )
        this.ctx.restore()
        this.ctx.drawImage(
            img,
            374 * Math.floor(this.frameX),
            0,
            374,
            336,
            headWidth,
            headHeight,
            bodyWidth,
            bodyHeight
        )
        this.ctx.save()
        this.ctx.translate(
            headWidth / 2 + head.x - (91 / this.size) * 0.1,
            headHeight / 2 + head.y + (91 / this.size) * 0.3
        )
        this.ctx.rotate((head.angle * Math.PI) / 180)

        this.ctx.drawImage(
            bloodImg,
            91 * Math.floor(this.frameX),
            0,
            91,
            202,
            -headHeight / 2,
            -headWidth / 2,
            91 / this.size,
            202 / this.size
        )
        this.ctx.restore()
        this.ctx.restore()

        if (this.deadStatus === 'SHOTED' && this.frameX < 7) this.frameX += 0.5
    }
}
