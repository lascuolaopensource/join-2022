/// <reference types="cypress" />
import { get } from '../../../utils';
import paths from '../../../../src/lib/constants/paths';

describe('empty spec', () => {
	it('should login', () => {
		cy.visit(paths.login);
		cy.wait(1000);
		get('email').type('bbt.gnn@gmail.com');
		get('password').type('Giovanni');
		get('submit').click();

		cy.visit(paths.courses.enroll.index('corsofichissimo'));
	});

	// it('should create a cookie', () => {
	// 	cy.wait(1000);
	// 	cy.getCookie('jwt').should('exist');
	// });

	// it('should redirect to homepage', () => {
	// 	cy.url().should('eq', Cypress.config().baseUrl);
	// });

	// it('should logout and check that cookie is removed', () => {
	// 	cy.visit(paths.logout);
	// 	cy.wait(1000);
	// 	cy.getCookie('jwt').should('not.exist');
	// });

	// it('should redirect to login', () => {
	// 	cy.url().should('include', paths.login);
	// });
});
