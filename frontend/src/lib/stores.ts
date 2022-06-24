import { writable } from 'svelte/store';
import { writable as writableLS } from 'svelte-local-storage-store';

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

export const toolNeeds = writableLS<Array<e.ToolNeedsDay>>('ToolNeeds', []);
export const toolDayRequest = writable<e.DayReq | null>(null);
export const toolDaysRequest = writable<Array<e.DayReq>>([]);
