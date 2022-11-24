/// <reference types="cypress" />
import { get } from '../utils';
import paths from '../../src/lib/constants/paths';

describe('when the user logs in', () => {
	it('should clear previous cookies', () => {
		cy.clearCookies();
		cy.getCookie('jwt').should('not.exist');
	});

	it('should go to login', () => {
		cy.visit(paths.login);
		cy.wait(1000);
	});

	it('should display the login and register buttons', () => {
		get('nav-btn-login').should('exist');
		get('nav-btn-register').should('exist');
	});

	it('should enter email and password, and submit', () => {
		get('email').type('bbt.gnn@gmail.com');
		get('password').type('Giovanni');
		get('submit').click();
	});

	it('should create a cookie', () => {
		cy.wait(1000);
		cy.getCookie('jwt').should('exist');
	});

	it('should redirect to homepage', () => {
		cy.url().should('eq', Cypress.config().baseUrl);
	});

	it('should display the logout button', () => {
		get('nav-btn-logout').should('exist');
	});

	it('should logout and check that cookie is removed', () => {
		cy.visit(paths.logout);
		cy.wait(1000);
		cy.getCookie('jwt').should('not.exist');
	});

	it('should display the login and register buttons', () => {
		get('nav-btn-login').should('exist');
		get('nav-btn-register').should('exist');
	});

	it('should redirect to login', () => {
		cy.url().should('include', paths.login);
	});
});
