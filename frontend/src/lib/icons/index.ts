import Close24 from './Close24.svelte';
import Email24 from './Email24.svelte';
import Password24 from './Password24.svelte';
import User24 from './User24.svelte';
import WarningAlt24 from './WarningAlt24.svelte';
import WarningAltFilled16 from './WarningAltFilled16.svelte';
import WarningAltFilled24 from './WarningAltFilled24.svelte';
import ArrowDown24 from './ArrowDown24.svelte';
import ArrowUp24 from './ArrowUp24.svelte';
import Menu24 from './Menu24.svelte';

export const icons = {
	fields: {
		password: Password24,
		email: Email24,
		error: WarningAltFilled16,
		username: User24
	},
	close: Close24,
	alert: WarningAltFilled24,
	form: {
		error: WarningAltFilled24,
		close: Close24
	},
	arrows: {
		up: ArrowUp24,
		down: ArrowDown24
	},
	menu: Menu24
};
