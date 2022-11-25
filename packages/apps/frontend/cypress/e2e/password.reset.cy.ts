/// <reference types="cypress" />
import { get } from '../utils';
import paths from '../../src/lib/constants/paths';

describe('when the user wants to reset password', () => {
	it('should clear previous cookies', () => {
		cy.clearCookies();
		cy.getCookie('jwt').should('not.exist');
	});

	it('should go to login', () => {
		cy.visit(paths.login);
		cy.wait(1000);
	});

	it('should click the reset password link', () => {
		get('forgot-password').click();
	});

	it('should be in forgot password page', () => {
		cy.url().should('include', paths.password.forgot.index);
	});

	it('should fill the form and submit', () => {
		get('email').type('bbt.gnn@gmail.com');
		get('submit').click();
	});
});
