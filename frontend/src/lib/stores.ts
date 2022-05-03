import { writable } from 'svelte/store';
import type { types as t } from 'shared';

//

export const user = writable<t.UsersPermissionsMe | null>(null);
export const userInfo = writable<t.UserInfo | null>(null);
export const userRole = writable<t.UserPermissionRoles | null>(null);

export const course = writable<t.CourseEntity | null>(null);
export const tools = writable<Array<t.ToolEntity>>([]);
