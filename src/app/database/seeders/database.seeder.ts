
import SeederInterface from "../../interfaces/seeder.interface";
import UserSeeder from "./user.seeder";

class DatabaseSeeder implements SeederInterface {
    public async run() {
        await (new UserSeeder()).run();
    }
}

console.info("seeding...");
(new DatabaseSeeder()).run().then(() => console.info("data has been seeded"))
    .catch((error: any) => console.error(error)).finally(() => process.exit(0));