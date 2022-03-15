import { t } from "shared";
import crypto from "crypto";

export const entities = {
    course: "api::course.course",
    user: "plugin::users-permissions.user",
};

export async function getCourseByID(id: string | number, options = {}) {
    const course: t.ID<t.Course> = await strapi.entityService.findOne(
        entities.course,
        id,
        options
    );
    return course;
}

export async function getUserByEmail(email: string) {
    const user: t.ID<t.UsersPermissionsUser> = await strapi
        .query(entities.user)
        .findOne({ where: { email } });
    return user;
}

export function generateSecureString(length: number): string {
    return crypto.randomBytes(length).toString("hex");
}
