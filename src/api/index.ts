import express, { Router } from 'express'

import { getGuildOwnerID, getGuildFirestoreDoc } from "../utils/apiUtils"
import config from '../../config.json'

export const app: express.Application = express()
const router = express.Router()

router.get('/home', function (req, res) {
    const authHeader = req.get("X-Auth")
    
    let authed

    if (authHeader == undefined) { authed=false }
    if (authHeader == '12345') { authed=true } else { authed = false }

    console.log(authed)

    res.shouldKeepAlive = false
    res.sendFile(config['api-home-file'])
})

// Takes the 'guild' query peram
router.get('/server/getowner', function (req, res) {
    const guildID = req.query['guild'] as string 
    const ownerID = getGuildOwnerID(guildID)
    
    res.shouldKeepAlive = false
    if(ownerID === "NOGUILD") {
        res.json({
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

router.get('/:guild', async (req, res) => {
    const guildID = req.params.guild

    const resJSON = await getGuildFirestoreDoc(guildID)

    res.shouldKeepAlive = false
    res.json({
        "code": 200,
        "reponse": resJSON
    })
})

app.use(router)