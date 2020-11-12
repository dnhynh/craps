import cs from "../static/chip_sound.mp3"
import ms from "../static/money_sound.mp3"
import ls from "../static/sweep.mp3"
import rs from "../static/roll_sound.mp3"

const chipSound = new Audio(cs)
const moneySound = new Audio(ms)
const loseSound = new Audio(ls)
const rollSound = new Audio(rs)

export {chipSound, moneySound, loseSound, rollSound}