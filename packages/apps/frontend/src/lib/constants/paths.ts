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
		enroll: {
			index: (course: string) => `/courses/${course}/enroll`,
			thanks: (course: string) => `/courses/${course}/enroll/thanks`
		}
	},
	payment: {
		index: (id: string) => `/payments/${id}`
	}
};
