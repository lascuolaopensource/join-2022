import { writable } from 'svelte/store';
import type { UsersPermissionsMe } from '../requestUtils/sdk';

const user = writable<UsersPermissionsMe | null>(null);

export default user;
