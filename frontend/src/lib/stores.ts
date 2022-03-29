import { writable } from 'svelte/store';
import type { t } from 'shared';

//

export const user = writable<t.UsersPermissionsMe | null>(null);
export const userInfo = writable<t.UserInfo | null>(null);

export const course = writable<t.CourseEntity | null>(null);
