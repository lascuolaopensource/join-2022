import { gql } from 'graphql-request';

export const GET_CORSI = gql`
	query get_corsi {
		courses {
			data {
				attributes {
					title
					enrollmentDeadline
					meetings {
						date
					}
				}
			}
		}
	}
`;

export const GET_CORSO = gql`
	query get_corso($id: ID!) {
		corso(id: $id) {
			titolo
		}
	}
`;

export const POST_ISCRIZIONE = gql`
	mutation post_iscrizione(
		$userID: ID!
		$corsoID: ID!
		$lettera_motivazionale: String!
	) {
		createIscrizione(
			input: {
				data: {
					user: $userID
					corso: $corsoID
					lettera_motivazionale: $lettera_motivazionale
				}
			}
		) {
			iscrizione {
				user {
					username
				}
				corso {
					titolo
				}
			}
		}
	}
`;

export const GET_ISCRIZIONI = gql`
	query {
		me {
			iscrizioni {
				corso {
					titolo
				}
				lettera_motivazionale
			}
		}
	}
`;
