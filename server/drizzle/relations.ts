import { relations } from "drizzle-orm/relations";
import { usersTable, p2cTable, UserToUser } from "./schema.ts";

export const p2cRelations = relations(p2cTable, ({ one }) => ({
    user: one(usersTable, {
        references: [usersTable.id],
        fields: [p2cTable.uid]
    })
}));

export const UserToUserRelations = relations(UserToUser, ({one}) => ({
	friend: one(usersTable, { fields: [UserToUser.friend_id], references: [usersTable.id] }),
	befriended_id: one(usersTable, { fields: [UserToUser.friend_id], references: [usersTable.id] })
}));

export const usersRelations = relations(usersTable, ({ many }) => ({
    p2c: many(p2cTable),
    friends: many(UserToUser)
}));