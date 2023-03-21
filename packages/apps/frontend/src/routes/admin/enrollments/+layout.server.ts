import type { LayoutServerLoad } from './$types';
import { types as t } from 'join-shared';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.user?.role.type === t.UserPermissionRoles.AdminEnrollments) {
		return {};
	}
	throw redirect(307, '/');
};
