import { writable } from 'svelte/store';
import type { types as t, endpoints as e } from 'shared';

//

export const user = writable<t.UsersPermissionsMe | null>(null);
export const userInfo = writable<t.UserInfo | null>(null);
export const userRole = writable<t.UserPermissionRoles | null>(null);

export const course = writable<t.CourseEntity | null>(null);
export const tools = writable<Array<t.ToolEntity>>([]);

/**
 * Temporary
 */

export const toolDayRequest = writable<e.DayReq>(null);
export const toolDaysRequest = writable<Array<e.DayReq>>([]);
