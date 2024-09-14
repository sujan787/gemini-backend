import SeederInterface from "../../interfaces/seeder.interface";
import { DB } from "../db.connection";
import { users, UserInsertType } from "../schemas/user";


export default class UserSeeder implements SeederInterface {

    public users: Array<Omit<UserInsertType, "createdAt" | "updatedAt" | "id">> = [
        {
            name: "example",
            email: "example@gamil.com",
        },
    ]

    public async run() {
        for (const user of this.users) {
            await DB.insert(users).values(user).onConflictDoUpdate({
                target: users.email,
                set: user,
            });
        }
    }
}