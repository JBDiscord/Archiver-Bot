import { getGuildFirestoreDoc } from "../../bot/utils/apiUtils"
import { request, response } from "express"

export default async (res: typeof response, req) => {
    const guildID = req.params.guild

    const resJSON = await getGuildFirestoreDoc(guildID)

    res.shouldKeepAlive = false
    if (resJSON == "NOGUILD") {
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
}