import dotenv from "dotenv"
import { connect } from "mongoose"
import userMetadata from "../app/models/mongo-models/user-metadata"
import { logger } from "../app/utils/logger"

async function main() {
  dotenv.config()

  try {
    logger.info("connect to db ...")
    const db = await connect(process.env.MONGO_URI!)
    const users = await userMetadata.find({})
    for (let i = 0; i < users.length; i++) {
      const u = users[i]
      logger.info(u.displayName, u.language)
      u.language = ""
      await u.save()
    }
    await db.disconnect()
  } catch (e) {
    logger.error("Parsing error:", e)
  }
}

main()
