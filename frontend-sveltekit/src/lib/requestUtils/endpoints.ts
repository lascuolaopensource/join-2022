// L'URL base, importato dall'.env
export const baseUrl = <string>import.meta.env.VITE_BACKEND_URL;

// La lista di tutti gli endpoints
// Note: GraphQL endpoint is not here cause does not require /api before
const baseEndpoints = {
	me: 'users/me',
	login: 'auth/local',
	register: 'auth/local/register',
	forgotPassword: 'auth/forgot-password',
	resetPassword: 'auth/reset-password',
	checkLoginEmail: 'loginemail',
	checkUserExists: 'userexists',
	enroll: 'enroll',
	pay: 'pay'
};

/* --- */

// Questa funzione aggiunge 'baseUrl' e 'api' a tutti gli endpoint
function buildEndpoints(
	baseUrl: string,
	baseEndpoints: Record<string, string>
): Record<string, string> {
	// Create empty endpoints object
	const endpoints: Record<string, string> = {};
	// For each endpoint, we add 'baseUrl'
	Object.keys(baseEndpoints).forEach((key) => {
		endpoints[key] = baseUrl + '/api/' + baseEndpoints[key];
	});
	//
	return endpoints;
}

// Ci creiamo un tipo per 'castarlo' sul risultato della funzione
// In modo tale da avere a disposizione i suggerimenti negli altri file
type Endpoints = typeof baseEndpoints;

/* --- */

export const endpoints = <Endpoints>buildEndpoints(baseUrl, baseEndpoints);
