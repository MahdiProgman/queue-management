import { Op } from "sequelize"
import RefreshTokenModel from "../models/refreshToken"

export default async function deleteExpiredTokenTask () {
    const now = new Date();

    await RefreshTokenModel.destroy({
        where: {
            expiresAt: {
                [Op.lt]: now
            }
        }
    });
}