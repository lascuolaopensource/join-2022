import { writable } from 'svelte/store';
import type { UsersPermissionsMe, CourseEntity } from './requestUtils/sdk';
import type { t } from 'shared';

//

export const user = writable<UsersPermissionsMe | null>(null);
export const userInfo = writable<t.UserInfo | null>(null);

export const course = writable<CourseEntity | null>(null);
