// L'URL base, importato dall'.env
export const baseUrl = <string>import.meta.env.VITE_BACKEND_URL;

// La lista di tutti gli endpoints
const baseEndpoints = {
	me: 'users/me',
	login: 'auth/local',
	register: 'auth/local/register',
	forgotPassword: 'auth/forgot-password',
	resetPassword: 'auth/reset-password',
	checkLoginEmail: 'loginemail',
	checkUserExists: 'userexists',
	graphql: 'graphql'
};

/* --- */

// Questa funzione aggiunge 'baseUrl' a tutti gli endpoint
function buildEndpoints(
	baseUrl: string,
	baseEndpoints: Record<string, string>
): Record<string, string> {
	// Create empty endpoints object
	const endpoints: Record<string, string> = {};
	// For each endpoint, we add 'baseUrl'
	Object.keys(baseEndpoints).forEach((key) => {
		endpoints[key] = baseUrl + '/' + baseEndpoints[key];
	});
	//
	return endpoints;
}

// Ci creiamo un tipo per 'castarlo' sul risultato della funzione
// In modo tale da avere a disposizione i suggerimenti negli altri file
type Endpoints = typeof baseEndpoints;

/* --- */

export const endpoints = <Endpoints>buildEndpoints(baseUrl, baseEndpoints);

/**
 * TO REVIEW
 * -
 * Ho pensato di raggruppare gli endpoint in un oggetto,
 * e di costruire in automatico gli endpoint
 * anzichè specificare ogni volta nelle query
 * baseUrl + "/endpoint/name"
 */
