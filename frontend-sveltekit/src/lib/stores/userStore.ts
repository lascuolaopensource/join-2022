import { writable } from 'svelte/store';
import type { User } from '../requestUtils/types';

const user = writable<User | null>(null);

export default user;
