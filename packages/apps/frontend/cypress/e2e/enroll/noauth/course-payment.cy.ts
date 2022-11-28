/// <reference types="cypress" />
import { get } from '../../../utils';
import paths from '../../../../src/lib/constants/paths';

describe('empty spec', () => {
	it('should clear previous cookies', () => {
		cy.clearCookies();
		cy.getCookie('jwt').should('not.exist');
	});

	it('should enter data, and submit', () => {
		cy.visit(paths.courses.enroll.index('corsofichissimo'));
		cy.wait(1000);
		get('name').type('Giovanni');
		get('surname').type('Bianchi');
		get('email').type('bbt.gnn@gmail.com');
		get('phone').type('+39 123 456 7890');
		get('cv').type('https://ciao.com');
		get('portfolio').type('https://ciao.com');
		get('letter').type('ciao.com');
		get('submit').click();
	});

	it('should redirect to payment page', () => {
		cy.url().should('include', 'payments');
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
