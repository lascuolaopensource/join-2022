import { t } from "shared";

export async function getCourseByID(
    id: string | number
): Promise<t.ID<t.Course>> {
    const course: t.ID<t.Course> = await strapi.entityService.findOne(
        "api::course.course",
        id
    );
    return course;
}
