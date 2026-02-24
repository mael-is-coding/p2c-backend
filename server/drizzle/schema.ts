import { pgTable, serial, varchar, timestamp, integer, primaryKey, doublePrecision } from "drizzle-orm/pg-core"

export const usersTable = pgTable("Users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	username: varchar({ length: 255 }),
	email: varchar({ length: 255 }),
	password: varchar({ length: 255 }),
	phonenumber: varchar({ length: 255 }),
	profile_picture: varchar("profile_picture", { length: 255 }),
	
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow(),
});

export const p2cTable = pgTable("P2C", {
	id: serial().primaryKey().notNull(),
	uid: integer().notNull()
	.references(() => usersTable.id)
	.notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }),
	longitude: doublePrecision().notNull(),
	latitude: doublePrecision().notNull()
});

export const UserToUser = pgTable("UserToUser", {
	friend_id: integer().references(() => usersTable.id).unique().notNull(),
	befriended_id: integer().references(() => usersTable.id).unique().notNull(),
}, (t) => ({
	pk: primaryKey({ columns: [t.friend_id, t.befriended_id] })
}));