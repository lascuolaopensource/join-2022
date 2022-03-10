import { gql } from "graphql-tag";

export const getCoursePageBySlug = gql`
	query getCoursePageBySlug($slug: String!) {
		courses(filters: { slug: { eq: $slug } }) {
			data {
				attributes {
					title
					description
					slug
					meetings {
						date
						timeSlots {
							startTime
							endTime
						}
					}
				}
			}
		}
	}
`;

// export const getCourseEnrollmentBySlug = gql`
// 	query getCourseEnrollmentBySlug($slug: String!) {
// 		courses(filters: { slug: { eq: $slug } }) {
// 			data {
// 				id
// 				attributes {
// 					title
// 					slug
// 					enrollmentDeadline
// 					motivationalLetterNeeded
// 					cvNeeded
// 					portfolioNeeded
// 					price
// 				}
// 			}
// 		}
// 	}
// `;
