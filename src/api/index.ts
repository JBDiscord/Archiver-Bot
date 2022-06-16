import express, { Router } from 'express'

import { getGuildOwnerID, getGuildFirestoreDoc, getGuildMessages, getGuildInfo, getUserInfo } from "../bot/utils/apiUtils"
import config from '../../config.json'

export const app: express.Application = express()
const router = express.Router()

app.use(router)

router.get('/home', function (req, res) {
    res.shouldKeepAlive = false
    res.sendFile(config['api-home-file'])
})

router.get('/:guild/get', async (req, res) => {
    const guildID = req.params.guild

    const resJSON = await getGuildFirestoreDoc(guildID)

    res.shouldKeepAlive = false
    if(resJSON == "NOGUILD") {
        res.status(404).json({
            "code": 404,
            "reponse": {
                "guild": guildID,
                "reason": "Guild DB not intialized"
            }
        })
    } else {
        res.json({
            "code": 200,
            "reponse": resJSON
        })
    }
})

router.get('/:user', async (req, res) => {
    const userid = req.params.user

    const resJSON = await getUserInfo(userid)

    res.shouldKeepAlive = false
    if (resJSON == "NOUSER") {
        res.status(404).json({
            "code": 404,
            "reponse": {
                "guild": userid,
                "reason": "User not in bot DB"
            }
        })
    } else {
        res.json({
            "code": 200,
            "reponse": resJSON
        })
    }
})

// Takes the 'guild' param peram
router.get('/:guild/owner', function (req, res) {
    const guildID = req.params.guild
    const ownerID = getGuildOwnerID(guildID)
    
    res.shouldKeepAlive = false
    if(ownerID === "NOGUILD") {
        res.status(404).json({
            "code": 404,
            "reponse": {
                "guild": guildID,
                "reason": "Bot not in guild"
            }
        })
    } else {
        res.json({
            "code": 200,
            "reponse": {
                "guild": guildID,
                "ownerid": ownerID
            }
        })
    }
})

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