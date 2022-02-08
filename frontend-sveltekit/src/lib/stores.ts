import { writable } from 'svelte/store';
import type { UsersPermissionsMe, CourseEntity } from './requestUtils/sdk';

//

export const user = writable<UsersPermissionsMe | null>(null);

export const course = writable<CourseEntity | null>(null);
