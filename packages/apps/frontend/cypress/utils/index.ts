export function get(id: string) {
	return cy.get(`[data-test="${id}"]`);
}
