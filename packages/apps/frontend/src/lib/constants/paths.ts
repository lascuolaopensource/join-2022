export default {
	login: '/account/login',
	logout: '/account/logout',
	register: {
		index: '/account/register',
		thanks: '/account/register/thanks',
		confirm: '/account/register/confirm'
	},
	password: {
		forgot: {
			index: '/account/password/forgot',
			confirm: '/account/password/forgot/confirm'
		}
	},
	courses: {
		index: '/courses',
		archive: '/courses?archive=true',
		enroll: (course: string) => `/courses/${course}/enroll`
	}
};
