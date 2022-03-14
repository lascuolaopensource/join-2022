import { t } from "shared";

export async function getCourseByID(id: string | number, options = {}) {
    const course: t.ID<t.Course> = await strapi.entityService.findOne(
        "api::course.course",
        id,
        options
    );
    return course;
}

export async function getUserByEmail(email: string) {
    const user: t.ID<t.UsersPermissionsUser> = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { email } });
    return user;
}
