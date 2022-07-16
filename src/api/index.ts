import express, { Router } from 'express'

import { getGuildMessages, getGuildInfo } from "../bot/utils/apiUtils"
import config from '../../config.json'

import guild_settings from './routes/guild_settings'

export const app: express.Application = express()
const router = express.Router()

app.use(router)
app.use(express.json())

router.get('/home', function (req, res) {
    res.shouldKeepAlive = false
    res.sendFile(config['api-home-file'])
})

router.get('/:guild/settings', guild_settings)

router.get('/:guild/messages', async (req, res) => {
    const guildID = req.params.guild

    const guildInfo = await getGuildInfo(guildID)
    const resJSON = await getGuildMessages(guildID)

    console.log("Messages get")

    res.shouldKeepAlive = false 
    if(guildInfo === "NOGUILD") {
        res.status(404).json({
            "code": 404,
            "response": {
                "guild": guildID,
                "reason": "Bot not in guild"
            }
        })
    } else {
        res.json({
            "code": 200,
            "response": {
                "guild": guildInfo,
                "archive": resJSON
            }
        })
    }

})