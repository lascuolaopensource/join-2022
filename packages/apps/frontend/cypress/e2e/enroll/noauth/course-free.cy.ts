/// <reference types="cypress" />
import { get } from '../../../utils';
import paths from '../../../../src/lib/constants/paths';

const COURSE = 'corsofichissimo';
const ENROLL_URL = paths.courses.enroll.index(COURSE);
const THANKS_URL = paths.courses.enroll.thanks(COURSE);

describe('empty spec', () => {
	it('should clear previous cookies', () => {
		cy.clearCookies();
		cy.getCookie('jwt').should('not.exist');
	});

	it('should enter data, and submit', () => {
		cy.visit(ENROLL_URL);
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

	// Funziona, ma bisogna aspettare che ci sia il loading.
	// it('should redirect to thanks page', () => {
	// 	cy.url().should('include', THANKS_URL);
	// });
});
