
import { DB } from "../database/db.connection"
import { users } from "../database/schemas/user";

const getAllUsers = async () => {
    return await DB.select().from(users);
}

const planRepository = {
    getAllUsers,
}

export default planRepository;