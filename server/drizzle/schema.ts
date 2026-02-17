import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { time } from "node:console";



export const usersTable = pgTable("Users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	email: varchar({ length: 255 }),
	password: varchar({ length: 255 }),
	phonenumber: varchar({ length: 255 }),
	profilePicture: varchar("profile_picture", { length: 255 }),
	username: varchar({ length: 255 }),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow(),
});
