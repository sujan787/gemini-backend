import { pgTable, timestamp, varchar, serial } from "drizzle-orm/pg-core";
import { InferInsertModel ,InferSelectModel} from "drizzle-orm"

export const users = pgTable("users", {
    id: serial('id').primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 300 }),
    googleId: varchar('google_id', { length: 300 }),
    githubId: varchar('github_id', { length: 300 }),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    verifyToken: varchar('verify_token', { length: 300 }),
    resetPasswordToken: varchar('reset_password_token', { length: 300 }),
    resetPasswordExpires: timestamp('reset_password_expires', { mode: "date" }),
    image: varchar("image", { length: 255 }),
    createdAt: timestamp("created_at", { mode: "date", }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow()
});

export type UserType = InferSelectModel<typeof users>;
export type UserInsertType = InferInsertModel<typeof users>;
