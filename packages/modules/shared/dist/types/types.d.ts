export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    BillingDataDataDynamicZoneInput: any;
    DateTime: any;
    JSON: any;
    Upload: any;
};
export type BillingData = {
    __typename?: 'BillingData';
    address: ComponentSpaceAddress;
    createdAt?: Maybe<Scalars['DateTime']>;
    data: Array<Maybe<BillingDataDataDynamicZone>>;
    owner?: Maybe<UsersPermissionsUserEntityResponse>;
    payment?: Maybe<PaymentEntityResponse>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export type BillingDataDataDynamicZone = ComponentBillingCompany | ComponentBillingOwner | ComponentBillingPerson | Error;
export type BillingDataEntity = {
    __typename?: 'BillingDataEntity';
    attributes?: Maybe<BillingData>;
    id?: Maybe<Scalars['ID']>;
};
export type BillingDataEntityResponse = {
    __typename?: 'BillingDataEntityResponse';
    data?: Maybe<BillingDataEntity>;
};
export type BillingDataEntityResponseCollection = {
    __typename?: 'BillingDataEntityResponseCollection';
    data: Array<BillingDataEntity>;
    meta: ResponseCollectionMeta;
};
export type BillingDataFiltersInput = {
    address?: InputMaybe<ComponentSpaceAddressFiltersInput>;
    and?: InputMaybe<Array<InputMaybe<BillingDataFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<BillingDataFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<BillingDataFiltersInput>>>;
    owner?: InputMaybe<UsersPermissionsUserFiltersInput>;
    payment?: InputMaybe<PaymentFiltersInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export type BillingDataInput = {
    address?: InputMaybe<ComponentSpaceAddressInput>;
    data?: InputMaybe<Array<Scalars['BillingDataDataDynamicZoneInput']>>;
    owner?: InputMaybe<Scalars['ID']>;
    payment?: InputMaybe<Scalars['ID']>;
};
export type BillingDataRelationResponseCollection = {
    __typename?: 'BillingDataRelationResponseCollection';
    data: Array<BillingDataEntity>;
};
export type BooleanFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
    contains?: InputMaybe<Scalars['Boolean']>;
    containsi?: InputMaybe<Scalars['Boolean']>;
    endsWith?: InputMaybe<Scalars['Boolean']>;
    eq?: InputMaybe<Scalars['Boolean']>;
    eqi?: InputMaybe<Scalars['Boolean']>;
    gt?: InputMaybe<Scalars['Boolean']>;
    gte?: InputMaybe<Scalars['Boolean']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
    lt?: InputMaybe<Scalars['Boolean']>;
    lte?: InputMaybe<Scalars['Boolean']>;
    ne?: InputMaybe<Scalars['Boolean']>;
    not?: InputMaybe<BooleanFilterInput>;
    notContains?: InputMaybe<Scalars['Boolean']>;
    notContainsi?: InputMaybe<Scalars['Boolean']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
    notNull?: InputMaybe<Scalars['Boolean']>;
    null?: InputMaybe<Scalars['Boolean']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
    startsWith?: InputMaybe<Scalars['Boolean']>;
};
export type ComponentBillingCompany = {
    __typename?: 'ComponentBillingCompany';
    certifiedEmail: Scalars['String'];
    id: Scalars['ID'];
    name: Scalars['String'];
    sdiCode: Scalars['String'];
    vatNumber: Scalars['String'];
};
export type ComponentBillingOwner = {
    __typename?: 'ComponentBillingOwner';
    fiscalCode: Scalars['String'];
    id: Scalars['ID'];
};
export type ComponentBillingPerson = {
    __typename?: 'ComponentBillingPerson';
    email: Scalars['String'];
    fiscalCode: Scalars['String'];
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    surname: Scalars['String'];
};
export type ComponentPeopleCredits = {
    __typename?: 'ComponentPeopleCredits';
    id: Scalars['ID'];
    position?: Maybe<PositionEntityResponse>;
    userInfo?: Maybe<UserInfoEntityResponse>;
};
export type ComponentPeopleCreditsFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<ComponentPeopleCreditsFiltersInput>>>;
    not?: InputMaybe<ComponentPeopleCreditsFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<ComponentPeopleCreditsFiltersInput>>>;
    position?: InputMaybe<PositionFiltersInput>;
    userInfo?: InputMaybe<UserInfoFiltersInput>;
};
export type ComponentPeopleCreditsInput = {
    id?: InputMaybe<Scalars['ID']>;
    position?: InputMaybe<Scalars['ID']>;
    userInfo?: InputMaybe<Scalars['ID']>;
};
export type ComponentSpaceAddress = {
    __typename?: 'ComponentSpaceAddress';
    administrativeArea: Scalars['String'];
    city: Scalars['String'];
    country: Scalars['String'];
    id: Scalars['ID'];
    number: Scalars['String'];
    postCode: Scalars['String'];
    street: Scalars['String'];
};
export type ComponentSpaceAddressFiltersInput = {
    administrativeArea?: InputMaybe<StringFilterInput>;
    and?: InputMaybe<Array<InputMaybe<ComponentSpaceAddressFiltersInput>>>;
    city?: InputMaybe<StringFilterInput>;
    country?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<ComponentSpaceAddressFiltersInput>;
    number?: InputMaybe<StringFilterInput>;
    or?: InputMaybe<Array<InputMaybe<ComponentSpaceAddressFiltersInput>>>;
    postCode?: InputMaybe<StringFilterInput>;
    street?: InputMaybe<StringFilterInput>;
};
export type ComponentSpaceAddressInput = {
    administrativeArea?: InputMaybe<Scalars['String']>;
    city?: InputMaybe<Scalars['String']>;
    country?: InputMaybe<Scalars['String']>;
    id?: InputMaybe<Scalars['ID']>;
    number?: InputMaybe<Scalars['String']>;
    postCode?: InputMaybe<Scalars['String']>;
    street?: InputMaybe<Scalars['String']>;
};
export type ComponentTimeMeetings = {
    __typename?: 'ComponentTimeMeetings';
    end: Scalars['DateTime'];
    id: Scalars['ID'];
    start: Scalars['DateTime'];
};
export type ComponentTimeMeetingsFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<ComponentTimeMeetingsFiltersInput>>>;
    end?: InputMaybe<DateTimeFilterInput>;
    not?: InputMaybe<ComponentTimeMeetingsFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<ComponentTimeMeetingsFiltersInput>>>;
    start?: InputMaybe<DateTimeFilterInput>;
};
export type ComponentTimeMeetingsInput = {
    end?: InputMaybe<Scalars['DateTime']>;
    id?: InputMaybe<Scalars['ID']>;
    start?: InputMaybe<Scalars['DateTime']>;
};
export type Course = {
    __typename?: 'Course';
    confirmed: Scalars['Boolean'];
    createdAt?: Maybe<Scalars['DateTime']>;
    cvNeeded: Scalars['Boolean'];
    description: Scalars['String'];
    enrollmentDeadline: Scalars['DateTime'];
    enrollmentMax?: Maybe<Scalars['Int']>;
    enrollmentMin?: Maybe<Scalars['Int']>;
    enrollments?: Maybe<EnrollmentRelationResponseCollection>;
    fields?: Maybe<FieldRelationResponseCollection>;
    gallery?: Maybe<UploadFileRelationResponseCollection>;
    meetings: Array<Maybe<ComponentTimeMeetings>>;
    motivationalLetterNeeded: Scalars['Boolean'];
    name: Scalars['String'];
    places?: Maybe<PlaceRelationResponseCollection>;
    portfolioNeeded: Scalars['Boolean'];
    preconditionsNeeded: Scalars['Boolean'];
    price: Scalars['Int'];
    publishedAt?: Maybe<Scalars['DateTime']>;
    roles: Array<Maybe<ComponentPeopleCredits>>;
    slug: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export type CourseEnrollmentsArgs = {
    filters?: InputMaybe<EnrollmentFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type CourseFieldsArgs = {
    filters?: InputMaybe<FieldFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type CourseGalleryArgs = {
    filters?: InputMaybe<UploadFileFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type CourseMeetingsArgs = {
    filters?: InputMaybe<ComponentTimeMeetingsFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type CoursePlacesArgs = {
    filters?: InputMaybe<PlaceFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type CourseRolesArgs = {
    filters?: InputMaybe<ComponentPeopleCreditsFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type CourseEntity = {
    __typename?: 'CourseEntity';
    attributes?: Maybe<Course>;
    id?: Maybe<Scalars['ID']>;
};
export type CourseEntityResponse = {
    __typename?: 'CourseEntityResponse';
    data?: Maybe<CourseEntity>;
};
export type CourseEntityResponseCollection = {
    __typename?: 'CourseEntityResponseCollection';
    data: Array<CourseEntity>;
    meta: ResponseCollectionMeta;
};
export type CourseFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<CourseFiltersInput>>>;
    confirmed?: InputMaybe<BooleanFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    cvNeeded?: InputMaybe<BooleanFilterInput>;
    description?: InputMaybe<StringFilterInput>;
    enrollmentDeadline?: InputMaybe<DateTimeFilterInput>;
    enrollmentMax?: InputMaybe<IntFilterInput>;
    enrollmentMin?: InputMaybe<IntFilterInput>;
    enrollments?: InputMaybe<EnrollmentFiltersInput>;
    fields?: InputMaybe<FieldFiltersInput>;
    id?: InputMaybe<IdFilterInput>;
    meetings?: InputMaybe<ComponentTimeMeetingsFiltersInput>;
    motivationalLetterNeeded?: InputMaybe<BooleanFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<CourseFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<CourseFiltersInput>>>;
    places?: InputMaybe<PlaceFiltersInput>;
    portfolioNeeded?: InputMaybe<BooleanFilterInput>;
    preconditionsNeeded?: InputMaybe<BooleanFilterInput>;
    price?: InputMaybe<IntFilterInput>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    roles?: InputMaybe<ComponentPeopleCreditsFiltersInput>;
    slug?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export type CourseInput = {
    confirmed?: InputMaybe<Scalars['Boolean']>;
    cvNeeded?: InputMaybe<Scalars['Boolean']>;
    description?: InputMaybe<Scalars['String']>;
    enrollmentDeadline?: InputMaybe<Scalars['DateTime']>;
    enrollmentMax?: InputMaybe<Scalars['Int']>;
    enrollmentMin?: InputMaybe<Scalars['Int']>;
    enrollments?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    fields?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    gallery?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    meetings?: InputMaybe<Array<InputMaybe<ComponentTimeMeetingsInput>>>;
    motivationalLetterNeeded?: InputMaybe<Scalars['Boolean']>;
    name?: InputMaybe<Scalars['String']>;
    places?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    portfolioNeeded?: InputMaybe<Scalars['Boolean']>;
    preconditionsNeeded?: InputMaybe<Scalars['Boolean']>;
    price?: InputMaybe<Scalars['Int']>;
    publishedAt?: InputMaybe<Scalars['DateTime']>;
    roles?: InputMaybe<Array<InputMaybe<ComponentPeopleCreditsInput>>>;
    slug?: InputMaybe<Scalars['String']>;
};
export type CourseRelationResponseCollection = {
    __typename?: 'CourseRelationResponseCollection';
    data: Array<CourseEntity>;
};
export type DateTimeFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
    contains?: InputMaybe<Scalars['DateTime']>;
    containsi?: InputMaybe<Scalars['DateTime']>;
    endsWith?: InputMaybe<Scalars['DateTime']>;
    eq?: InputMaybe<Scalars['DateTime']>;
    eqi?: InputMaybe<Scalars['DateTime']>;
    gt?: InputMaybe<Scalars['DateTime']>;
    gte?: InputMaybe<Scalars['DateTime']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
    lt?: InputMaybe<Scalars['DateTime']>;
    lte?: InputMaybe<Scalars['DateTime']>;
    ne?: InputMaybe<Scalars['DateTime']>;
    not?: InputMaybe<DateTimeFilterInput>;
    notContains?: InputMaybe<Scalars['DateTime']>;
    notContainsi?: InputMaybe<Scalars['DateTime']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
    notNull?: InputMaybe<Scalars['Boolean']>;
    null?: InputMaybe<Scalars['Boolean']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
    startsWith?: InputMaybe<Scalars['DateTime']>;
};
export declare enum Enum_Enrollment_State {
    Approved = "approved",
    AwaitingPayment = "awaitingPayment",
    Pending = "pending",
    Rejected = "rejected"
}
export type Enrollment = {
    __typename?: 'Enrollment';
    course?: Maybe<CourseEntityResponse>;
    createdAt?: Maybe<Scalars['DateTime']>;
    cvUrl?: Maybe<Scalars['String']>;
    motivationalLetter?: Maybe<Scalars['String']>;
    owner?: Maybe<UsersPermissionsUserEntityResponse>;
    payment?: Maybe<PaymentEntityResponse>;
    phoneNumber: Scalars['String'];
    portfolioUrl?: Maybe<Scalars['String']>;
    state: Enum_Enrollment_State;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export type EnrollmentEntity = {
    __typename?: 'EnrollmentEntity';
    attributes?: Maybe<Enrollment>;
    id?: Maybe<Scalars['ID']>;
};
export type EnrollmentEntityResponse = {
    __typename?: 'EnrollmentEntityResponse';
    data?: Maybe<EnrollmentEntity>;
};
export type EnrollmentEntityResponseCollection = {
    __typename?: 'EnrollmentEntityResponseCollection';
    data: Array<EnrollmentEntity>;
    meta: ResponseCollectionMeta;
};
export type EnrollmentFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<EnrollmentFiltersInput>>>;
    course?: InputMaybe<CourseFiltersInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    cvUrl?: InputMaybe<StringFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    motivationalLetter?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<EnrollmentFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<EnrollmentFiltersInput>>>;
    owner?: InputMaybe<UsersPermissionsUserFiltersInput>;
    payment?: InputMaybe<PaymentFiltersInput>;
    phoneNumber?: InputMaybe<StringFilterInput>;
    portfolioUrl?: InputMaybe<StringFilterInput>;
    state?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export type EnrollmentInput = {
    course?: InputMaybe<Scalars['ID']>;
    cvUrl?: InputMaybe<Scalars['String']>;
    motivationalLetter?: InputMaybe<Scalars['String']>;
    owner?: InputMaybe<Scalars['ID']>;
    payment?: InputMaybe<Scalars['ID']>;
    phoneNumber?: InputMaybe<Scalars['String']>;
    portfolioUrl?: InputMaybe<Scalars['String']>;
    state?: InputMaybe<Enum_Enrollment_State>;
};
export type EnrollmentRelationResponseCollection = {
    __typename?: 'EnrollmentRelationResponseCollection';
    data: Array<EnrollmentEntity>;
};
export type Error = {
    __typename?: 'Error';
    code: Scalars['String'];
    message?: Maybe<Scalars['String']>;
};
export type Field = {
    __typename?: 'Field';
    courses?: Maybe<CourseRelationResponseCollection>;
    createdAt?: Maybe<Scalars['DateTime']>;
    name: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export type FieldCoursesArgs = {
    filters?: InputMaybe<CourseFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type FieldEntity = {
    __typename?: 'FieldEntity';
    attributes?: Maybe<Field>;
    id?: Maybe<Scalars['ID']>;
};
export type FieldEntityResponse = {
    __typename?: 'FieldEntityResponse';
    data?: Maybe<FieldEntity>;
};
export type FieldEntityResponseCollection = {
    __typename?: 'FieldEntityResponseCollection';
    data: Array<FieldEntity>;
    meta: ResponseCollectionMeta;
};
export type FieldFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<FieldFiltersInput>>>;
    courses?: InputMaybe<CourseFiltersInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<FieldFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<FieldFiltersInput>>>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export type FieldInput = {
    courses?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    name?: InputMaybe<Scalars['String']>;
};
export type FieldRelationResponseCollection = {
    __typename?: 'FieldRelationResponseCollection';
    data: Array<FieldEntity>;
};
export type FileInfoInput = {
    alternativeText?: InputMaybe<Scalars['String']>;
    caption?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
};
export type FloatFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
    contains?: InputMaybe<Scalars['Float']>;
    containsi?: InputMaybe<Scalars['Float']>;
    endsWith?: InputMaybe<Scalars['Float']>;
    eq?: InputMaybe<Scalars['Float']>;
    eqi?: InputMaybe<Scalars['Float']>;
    gt?: InputMaybe<Scalars['Float']>;
    gte?: InputMaybe<Scalars['Float']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
    lt?: InputMaybe<Scalars['Float']>;
    lte?: InputMaybe<Scalars['Float']>;
    ne?: InputMaybe<Scalars['Float']>;
    not?: InputMaybe<FloatFilterInput>;
    notContains?: InputMaybe<Scalars['Float']>;
    notContainsi?: InputMaybe<Scalars['Float']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
    notNull?: InputMaybe<Scalars['Boolean']>;
    null?: InputMaybe<Scalars['Boolean']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
    startsWith?: InputMaybe<Scalars['Float']>;
};
export type GenericMorph = BillingData | ComponentBillingCompany | ComponentBillingOwner | ComponentBillingPerson | ComponentPeopleCredits | ComponentSpaceAddress | ComponentTimeMeetings | Course | Enrollment | Field | I18NLocale | Payment | Place | Position | UploadFile | UploadFolder | UserInfo | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;
export type I18NLocale = {
    __typename?: 'I18NLocale';
    code?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    name?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export type I18NLocaleEntity = {
    __typename?: 'I18NLocaleEntity';
    attributes?: Maybe<I18NLocale>;
    id?: Maybe<Scalars['ID']>;
};
export type I18NLocaleEntityResponse = {
    __typename?: 'I18NLocaleEntityResponse';
    data?: Maybe<I18NLocaleEntity>;
};
export type I18NLocaleEntityResponseCollection = {
    __typename?: 'I18NLocaleEntityResponseCollection';
    data: Array<I18NLocaleEntity>;
    meta: ResponseCollectionMeta;
};
export type I18NLocaleFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
    code?: InputMaybe<StringFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<I18NLocaleFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export type IdFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    contains?: InputMaybe<Scalars['ID']>;
    containsi?: InputMaybe<Scalars['ID']>;
    endsWith?: InputMaybe<Scalars['ID']>;
    eq?: InputMaybe<Scalars['ID']>;
    eqi?: InputMaybe<Scalars['ID']>;
    gt?: InputMaybe<Scalars['ID']>;
    gte?: InputMaybe<Scalars['ID']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    lt?: InputMaybe<Scalars['ID']>;
    lte?: InputMaybe<Scalars['ID']>;
    ne?: InputMaybe<Scalars['ID']>;
    not?: InputMaybe<IdFilterInput>;
    notContains?: InputMaybe<Scalars['ID']>;
    notContainsi?: InputMaybe<Scalars['ID']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    notNull?: InputMaybe<Scalars['Boolean']>;
    null?: InputMaybe<Scalars['Boolean']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    startsWith?: InputMaybe<Scalars['ID']>;
};
export type IntFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
    contains?: InputMaybe<Scalars['Int']>;
    containsi?: InputMaybe<Scalars['Int']>;
    endsWith?: InputMaybe<Scalars['Int']>;
    eq?: InputMaybe<Scalars['Int']>;
    eqi?: InputMaybe<Scalars['Int']>;
    gt?: InputMaybe<Scalars['Int']>;
    gte?: InputMaybe<Scalars['Int']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
    lt?: InputMaybe<Scalars['Int']>;
    lte?: InputMaybe<Scalars['Int']>;
    ne?: InputMaybe<Scalars['Int']>;
    not?: InputMaybe<IntFilterInput>;
    notContains?: InputMaybe<Scalars['Int']>;
    notContainsi?: InputMaybe<Scalars['Int']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
    notNull?: InputMaybe<Scalars['Boolean']>;
    null?: InputMaybe<Scalars['Boolean']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
    startsWith?: InputMaybe<Scalars['Int']>;
};
export type JsonFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
    contains?: InputMaybe<Scalars['JSON']>;
    containsi?: InputMaybe<Scalars['JSON']>;
    endsWith?: InputMaybe<Scalars['JSON']>;
    eq?: InputMaybe<Scalars['JSON']>;
    eqi?: InputMaybe<Scalars['JSON']>;
    gt?: InputMaybe<Scalars['JSON']>;
    gte?: InputMaybe<Scalars['JSON']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
    lt?: InputMaybe<Scalars['JSON']>;
    lte?: InputMaybe<Scalars['JSON']>;
    ne?: InputMaybe<Scalars['JSON']>;
    not?: InputMaybe<JsonFilterInput>;
    notContains?: InputMaybe<Scalars['JSON']>;
    notContainsi?: InputMaybe<Scalars['JSON']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
    notNull?: InputMaybe<Scalars['Boolean']>;
    null?: InputMaybe<Scalars['Boolean']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
    startsWith?: InputMaybe<Scalars['JSON']>;
};
export type Mutation = {
    __typename?: 'Mutation';
    /** Change user password. Confirm with the current password. */
    changePassword?: Maybe<UsersPermissionsLoginPayload>;
    createBillingData?: Maybe<BillingDataEntityResponse>;
    createCourse?: Maybe<CourseEntityResponse>;
    createEnrollment?: Maybe<EnrollmentEntityResponse>;
    createField?: Maybe<FieldEntityResponse>;
    createPayment?: Maybe<PaymentEntityResponse>;
    createPlace?: Maybe<PlaceEntityResponse>;
    createPosition?: Maybe<PositionEntityResponse>;
    createUploadFile?: Maybe<UploadFileEntityResponse>;
    createUploadFolder?: Maybe<UploadFolderEntityResponse>;
    createUserInfo?: Maybe<UserInfoEntityResponse>;
    /** Create a new role */
    createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
    /** Create a new user */
    createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    deleteBillingData?: Maybe<BillingDataEntityResponse>;
    deleteCourse?: Maybe<CourseEntityResponse>;
    deleteEnrollment?: Maybe<EnrollmentEntityResponse>;
    deleteField?: Maybe<FieldEntityResponse>;
    deletePayment?: Maybe<PaymentEntityResponse>;
    deletePlace?: Maybe<PlaceEntityResponse>;
    deletePosition?: Maybe<PositionEntityResponse>;
    deleteUploadFile?: Maybe<UploadFileEntityResponse>;
    deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
    deleteUserInfo?: Maybe<UserInfoEntityResponse>;
    /** Delete an existing role */
    deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
    /** Delete an existing user */
    deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    /** Confirm an email users email address */
    emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
    /** Request a reset password token */
    forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
    login: UsersPermissionsLoginPayload;
    multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
    /** Register a user */
    register: UsersPermissionsLoginPayload;
    removeFile?: Maybe<UploadFileEntityResponse>;
    /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
    resetPassword?: Maybe<UsersPermissionsLoginPayload>;
    updateBillingData?: Maybe<BillingDataEntityResponse>;
    updateCourse?: Maybe<CourseEntityResponse>;
    updateEnrollment?: Maybe<EnrollmentEntityResponse>;
    updateField?: Maybe<FieldEntityResponse>;
    updateFileInfo: UploadFileEntityResponse;
    updatePayment?: Maybe<PaymentEntityResponse>;
    updatePlace?: Maybe<PlaceEntityResponse>;
    updatePosition?: Maybe<PositionEntityResponse>;
    updateUploadFile?: Maybe<UploadFileEntityResponse>;
    updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
    updateUserInfo?: Maybe<UserInfoEntityResponse>;
    /** Update an existing role */
    updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
    /** Update an existing user */
    updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    upload: UploadFileEntityResponse;
};
export type MutationChangePasswordArgs = {
    currentPassword: Scalars['String'];
    password: Scalars['String'];
    passwordConfirmation: Scalars['String'];
};
export type MutationCreateBillingDataArgs = {
    data: BillingDataInput;
};
export type MutationCreateCourseArgs = {
    data: CourseInput;
};
export type MutationCreateEnrollmentArgs = {
    data: EnrollmentInput;
};
export type MutationCreateFieldArgs = {
    data: FieldInput;
};
export type MutationCreatePaymentArgs = {
    data: PaymentInput;
};
export type MutationCreatePlaceArgs = {
    data: PlaceInput;
};
export type MutationCreatePositionArgs = {
    data: PositionInput;
};
export type MutationCreateUploadFileArgs = {
    data: UploadFileInput;
};
export type MutationCreateUploadFolderArgs = {
    data: UploadFolderInput;
};
export type MutationCreateUserInfoArgs = {
    data: UserInfoInput;
};
export type MutationCreateUsersPermissionsRoleArgs = {
    data: UsersPermissionsRoleInput;
};
export type MutationCreateUsersPermissionsUserArgs = {
    data: UsersPermissionsUserInput;
};
export type MutationDeleteBillingDataArgs = {
    id: Scalars['ID'];
};
export type MutationDeleteCourseArgs = {
    id: Scalars['ID'];
};
export type MutationDeleteEnrollmentArgs = {
    id: Scalars['ID'];
};
export type MutationDeleteFieldArgs = {
    id: Scalars['ID'];
};
export type MutationDeletePaymentArgs = {
    id: Scalars['ID'];
};
export type MutationDeletePlaceArgs = {
    id: Scalars['ID'];
};
export type MutationDeletePositionArgs = {
    id: Scalars['ID'];
};
export type MutationDeleteUploadFileArgs = {
    id: Scalars['ID'];
};
export type MutationDeleteUploadFolderArgs = {
    id: Scalars['ID'];
};
export type MutationDeleteUserInfoArgs = {
    id: Scalars['ID'];
};
export type MutationDeleteUsersPermissionsRoleArgs = {
    id: Scalars['ID'];
};
export type MutationDeleteUsersPermissionsUserArgs = {
    id: Scalars['ID'];
};
export type MutationEmailConfirmationArgs = {
    confirmation: Scalars['String'];
};
export type MutationForgotPasswordArgs = {
    email: Scalars['String'];
};
export type MutationLoginArgs = {
    input: UsersPermissionsLoginInput;
};
export type MutationMultipleUploadArgs = {
    field?: InputMaybe<Scalars['String']>;
    files: Array<InputMaybe<Scalars['Upload']>>;
    ref?: InputMaybe<Scalars['String']>;
    refId?: InputMaybe<Scalars['ID']>;
};
export type MutationRegisterArgs = {
    input: UsersPermissionsRegisterInput;
};
export type MutationRemoveFileArgs = {
    id: Scalars['ID'];
};
export type MutationResetPasswordArgs = {
    code: Scalars['String'];
    password: Scalars['String'];
    passwordConfirmation: Scalars['String'];
};
export type MutationUpdateBillingDataArgs = {
    data: BillingDataInput;
    id: Scalars['ID'];
};
export type MutationUpdateCourseArgs = {
    data: CourseInput;
    id: Scalars['ID'];
};
export type MutationUpdateEnrollmentArgs = {
    data: EnrollmentInput;
    id: Scalars['ID'];
};
export type MutationUpdateFieldArgs = {
    data: FieldInput;
    id: Scalars['ID'];
};
export type MutationUpdateFileInfoArgs = {
    id: Scalars['ID'];
    info?: InputMaybe<FileInfoInput>;
};
export type MutationUpdatePaymentArgs = {
    data: PaymentInput;
    id: Scalars['ID'];
};
export type MutationUpdatePlaceArgs = {
    data: PlaceInput;
    id: Scalars['ID'];
};
export type MutationUpdatePositionArgs = {
    data: PositionInput;
    id: Scalars['ID'];
};
export type MutationUpdateUploadFileArgs = {
    data: UploadFileInput;
    id: Scalars['ID'];
};
export type MutationUpdateUploadFolderArgs = {
    data: UploadFolderInput;
    id: Scalars['ID'];
};
export type MutationUpdateUserInfoArgs = {
    data: UserInfoInput;
    id: Scalars['ID'];
};
export type MutationUpdateUsersPermissionsRoleArgs = {
    data: UsersPermissionsRoleInput;
    id: Scalars['ID'];
};
export type MutationUpdateUsersPermissionsUserArgs = {
    data: UsersPermissionsUserInput;
    id: Scalars['ID'];
};
export type MutationUploadArgs = {
    field?: InputMaybe<Scalars['String']>;
    file: Scalars['Upload'];
    info?: InputMaybe<FileInfoInput>;
    ref?: InputMaybe<Scalars['String']>;
    refId?: InputMaybe<Scalars['ID']>;
};
export type Pagination = {
    __typename?: 'Pagination';
    page: Scalars['Int'];
    pageCount: Scalars['Int'];
    pageSize: Scalars['Int'];
    total: Scalars['Int'];
};
export type PaginationArg = {
    limit?: InputMaybe<Scalars['Int']>;
    page?: InputMaybe<Scalars['Int']>;
    pageSize?: InputMaybe<Scalars['Int']>;
    start?: InputMaybe<Scalars['Int']>;
};
export type Payment = {
    __typename?: 'Payment';
    billingData?: Maybe<BillingDataEntityResponse>;
    createdAt?: Maybe<Scalars['DateTime']>;
    deadline: Scalars['DateTime'];
    enrollment?: Maybe<EnrollmentEntityResponse>;
    executed: Scalars['Boolean'];
    owner?: Maybe<UsersPermissionsUserEntityResponse>;
    uid: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export type PaymentEntity = {
    __typename?: 'PaymentEntity';
    attributes?: Maybe<Payment>;
    id?: Maybe<Scalars['ID']>;
};
export type PaymentEntityResponse = {
    __typename?: 'PaymentEntityResponse';
    data?: Maybe<PaymentEntity>;
};
export type PaymentEntityResponseCollection = {
    __typename?: 'PaymentEntityResponseCollection';
    data: Array<PaymentEntity>;
    meta: ResponseCollectionMeta;
};
export type PaymentFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<PaymentFiltersInput>>>;
    billingData?: InputMaybe<BillingDataFiltersInput>;
    confirmationCode?: InputMaybe<StringFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    deadline?: InputMaybe<DateTimeFilterInput>;
    enrollment?: InputMaybe<EnrollmentFiltersInput>;
    executed?: InputMaybe<BooleanFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<PaymentFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<PaymentFiltersInput>>>;
    owner?: InputMaybe<UsersPermissionsUserFiltersInput>;
    uid?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export type PaymentInput = {
    billingData?: InputMaybe<Scalars['ID']>;
    confirmationCode?: InputMaybe<Scalars['String']>;
    deadline?: InputMaybe<Scalars['DateTime']>;
    enrollment?: InputMaybe<Scalars['ID']>;
    executed?: InputMaybe<Scalars['Boolean']>;
    owner?: InputMaybe<Scalars['ID']>;
    uid?: InputMaybe<Scalars['String']>;
};
export type PaymentRelationResponseCollection = {
    __typename?: 'PaymentRelationResponseCollection';
    data: Array<PaymentEntity>;
};
export type Place = {
    __typename?: 'Place';
    address?: Maybe<ComponentSpaceAddress>;
    courses?: Maybe<CourseRelationResponseCollection>;
    createdAt?: Maybe<Scalars['DateTime']>;
    name: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export type PlaceCoursesArgs = {
    filters?: InputMaybe<CourseFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type PlaceEntity = {
    __typename?: 'PlaceEntity';
    attributes?: Maybe<Place>;
    id?: Maybe<Scalars['ID']>;
};
export type PlaceEntityResponse = {
    __typename?: 'PlaceEntityResponse';
    data?: Maybe<PlaceEntity>;
};
export type PlaceEntityResponseCollection = {
    __typename?: 'PlaceEntityResponseCollection';
    data: Array<PlaceEntity>;
    meta: ResponseCollectionMeta;
};
export type PlaceFiltersInput = {
    address?: InputMaybe<ComponentSpaceAddressFiltersInput>;
    and?: InputMaybe<Array<InputMaybe<PlaceFiltersInput>>>;
    courses?: InputMaybe<CourseFiltersInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<PlaceFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<PlaceFiltersInput>>>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export type PlaceInput = {
    address?: InputMaybe<ComponentSpaceAddressInput>;
    courses?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    name?: InputMaybe<Scalars['String']>;
};
export type PlaceRelationResponseCollection = {
    __typename?: 'PlaceRelationResponseCollection';
    data: Array<PlaceEntity>;
};
export type Position = {
    __typename?: 'Position';
    createdAt?: Maybe<Scalars['DateTime']>;
    name: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export type PositionEntity = {
    __typename?: 'PositionEntity';
    attributes?: Maybe<Position>;
    id?: Maybe<Scalars['ID']>;
};
export type PositionEntityResponse = {
    __typename?: 'PositionEntityResponse';
    data?: Maybe<PositionEntity>;
};
export type PositionEntityResponseCollection = {
    __typename?: 'PositionEntityResponseCollection';
    data: Array<PositionEntity>;
    meta: ResponseCollectionMeta;
};
export type PositionFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<PositionFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<PositionFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<PositionFiltersInput>>>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export type PositionInput = {
    name?: InputMaybe<Scalars['String']>;
};
export declare enum PublicationState {
    Live = "LIVE",
    Preview = "PREVIEW"
}
export type Query = {
    __typename?: 'Query';
    billingData?: Maybe<BillingDataEntityResponse>;
    billingDatas?: Maybe<BillingDataEntityResponseCollection>;
    course?: Maybe<CourseEntityResponse>;
    courses?: Maybe<CourseEntityResponseCollection>;
    enrollment?: Maybe<EnrollmentEntityResponse>;
    enrollments?: Maybe<EnrollmentEntityResponseCollection>;
    field?: Maybe<FieldEntityResponse>;
    fields?: Maybe<FieldEntityResponseCollection>;
    i18NLocale?: Maybe<I18NLocaleEntityResponse>;
    i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
    me?: Maybe<UsersPermissionsMe>;
    payment?: Maybe<PaymentEntityResponse>;
    payments?: Maybe<PaymentEntityResponseCollection>;
    place?: Maybe<PlaceEntityResponse>;
    places?: Maybe<PlaceEntityResponseCollection>;
    position?: Maybe<PositionEntityResponse>;
    positions?: Maybe<PositionEntityResponseCollection>;
    uploadFile?: Maybe<UploadFileEntityResponse>;
    uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
    uploadFolder?: Maybe<UploadFolderEntityResponse>;
    uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
    userInfo?: Maybe<UserInfoEntityResponse>;
    userInfos?: Maybe<UserInfoEntityResponseCollection>;
    usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
    usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
    usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
    usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};
export type QueryBillingDataArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export type QueryBillingDatasArgs = {
    filters?: InputMaybe<BillingDataFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type QueryCourseArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export type QueryCoursesArgs = {
    filters?: InputMaybe<CourseFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type QueryEnrollmentArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export type QueryEnrollmentsArgs = {
    filters?: InputMaybe<EnrollmentFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type QueryFieldArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export type QueryFieldsArgs = {
    filters?: InputMaybe<FieldFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type QueryI18NLocaleArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export type QueryI18NLocalesArgs = {
    filters?: InputMaybe<I18NLocaleFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type QueryPaymentArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export type QueryPaymentsArgs = {
    filters?: InputMaybe<PaymentFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type QueryPlaceArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export type QueryPlacesArgs = {
    filters?: InputMaybe<PlaceFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type QueryPositionArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export type QueryPositionsArgs = {
    filters?: InputMaybe<PositionFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type QueryUploadFileArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export type QueryUploadFilesArgs = {
    filters?: InputMaybe<UploadFileFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type QueryUploadFolderArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export type QueryUploadFoldersArgs = {
    filters?: InputMaybe<UploadFolderFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type QueryUserInfoArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export type QueryUserInfosArgs = {
    filters?: InputMaybe<UserInfoFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type QueryUsersPermissionsRoleArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export type QueryUsersPermissionsRolesArgs = {
    filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type QueryUsersPermissionsUserArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export type QueryUsersPermissionsUsersArgs = {
    filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type ResponseCollectionMeta = {
    __typename?: 'ResponseCollectionMeta';
    pagination: Pagination;
};
export type StringFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    contains?: InputMaybe<Scalars['String']>;
    containsi?: InputMaybe<Scalars['String']>;
    endsWith?: InputMaybe<Scalars['String']>;
    eq?: InputMaybe<Scalars['String']>;
    eqi?: InputMaybe<Scalars['String']>;
    gt?: InputMaybe<Scalars['String']>;
    gte?: InputMaybe<Scalars['String']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    lt?: InputMaybe<Scalars['String']>;
    lte?: InputMaybe<Scalars['String']>;
    ne?: InputMaybe<Scalars['String']>;
    not?: InputMaybe<StringFilterInput>;
    notContains?: InputMaybe<Scalars['String']>;
    notContainsi?: InputMaybe<Scalars['String']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    notNull?: InputMaybe<Scalars['Boolean']>;
    null?: InputMaybe<Scalars['Boolean']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    startsWith?: InputMaybe<Scalars['String']>;
};
export type UploadFile = {
    __typename?: 'UploadFile';
    alternativeText?: Maybe<Scalars['String']>;
    caption?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    ext?: Maybe<Scalars['String']>;
    formats?: Maybe<Scalars['JSON']>;
    hash: Scalars['String'];
    height?: Maybe<Scalars['Int']>;
    mime: Scalars['String'];
    name: Scalars['String'];
    previewUrl?: Maybe<Scalars['String']>;
    provider: Scalars['String'];
    provider_metadata?: Maybe<Scalars['JSON']>;
    related?: Maybe<Array<Maybe<GenericMorph>>>;
    size: Scalars['Float'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    url: Scalars['String'];
    width?: Maybe<Scalars['Int']>;
};
export type UploadFileEntity = {
    __typename?: 'UploadFileEntity';
    attributes?: Maybe<UploadFile>;
    id?: Maybe<Scalars['ID']>;
};
export type UploadFileEntityResponse = {
    __typename?: 'UploadFileEntityResponse';
    data?: Maybe<UploadFileEntity>;
};
export type UploadFileEntityResponseCollection = {
    __typename?: 'UploadFileEntityResponseCollection';
    data: Array<UploadFileEntity>;
    meta: ResponseCollectionMeta;
};
export type UploadFileFiltersInput = {
    alternativeText?: InputMaybe<StringFilterInput>;
    and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
    caption?: InputMaybe<StringFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    ext?: InputMaybe<StringFilterInput>;
    folder?: InputMaybe<UploadFolderFiltersInput>;
    folderPath?: InputMaybe<StringFilterInput>;
    formats?: InputMaybe<JsonFilterInput>;
    hash?: InputMaybe<StringFilterInput>;
    height?: InputMaybe<IntFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    mime?: InputMaybe<StringFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<UploadFileFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
    previewUrl?: InputMaybe<StringFilterInput>;
    provider?: InputMaybe<StringFilterInput>;
    provider_metadata?: InputMaybe<JsonFilterInput>;
    size?: InputMaybe<FloatFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
    url?: InputMaybe<StringFilterInput>;
    width?: InputMaybe<IntFilterInput>;
};
export type UploadFileInput = {
    alternativeText?: InputMaybe<Scalars['String']>;
    caption?: InputMaybe<Scalars['String']>;
    ext?: InputMaybe<Scalars['String']>;
    folder?: InputMaybe<Scalars['ID']>;
    folderPath?: InputMaybe<Scalars['String']>;
    formats?: InputMaybe<Scalars['JSON']>;
    hash?: InputMaybe<Scalars['String']>;
    height?: InputMaybe<Scalars['Int']>;
    mime?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
    previewUrl?: InputMaybe<Scalars['String']>;
    provider?: InputMaybe<Scalars['String']>;
    provider_metadata?: InputMaybe<Scalars['JSON']>;
    size?: InputMaybe<Scalars['Float']>;
    url?: InputMaybe<Scalars['String']>;
    width?: InputMaybe<Scalars['Int']>;
};
export type UploadFileRelationResponseCollection = {
    __typename?: 'UploadFileRelationResponseCollection';
    data: Array<UploadFileEntity>;
};
export type UploadFolder = {
    __typename?: 'UploadFolder';
    children?: Maybe<UploadFolderRelationResponseCollection>;
    createdAt?: Maybe<Scalars['DateTime']>;
    files?: Maybe<UploadFileRelationResponseCollection>;
    name: Scalars['String'];
    parent?: Maybe<UploadFolderEntityResponse>;
    path: Scalars['String'];
    pathId: Scalars['Int'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export type UploadFolderChildrenArgs = {
    filters?: InputMaybe<UploadFolderFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type UploadFolderFilesArgs = {
    filters?: InputMaybe<UploadFileFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type UploadFolderEntity = {
    __typename?: 'UploadFolderEntity';
    attributes?: Maybe<UploadFolder>;
    id?: Maybe<Scalars['ID']>;
};
export type UploadFolderEntityResponse = {
    __typename?: 'UploadFolderEntityResponse';
    data?: Maybe<UploadFolderEntity>;
};
export type UploadFolderEntityResponseCollection = {
    __typename?: 'UploadFolderEntityResponseCollection';
    data: Array<UploadFolderEntity>;
    meta: ResponseCollectionMeta;
};
export type UploadFolderFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
    children?: InputMaybe<UploadFolderFiltersInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    files?: InputMaybe<UploadFileFiltersInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<UploadFolderFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
    parent?: InputMaybe<UploadFolderFiltersInput>;
    path?: InputMaybe<StringFilterInput>;
    pathId?: InputMaybe<IntFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export type UploadFolderInput = {
    children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    name?: InputMaybe<Scalars['String']>;
    parent?: InputMaybe<Scalars['ID']>;
    path?: InputMaybe<Scalars['String']>;
    pathId?: InputMaybe<Scalars['Int']>;
};
export type UploadFolderRelationResponseCollection = {
    __typename?: 'UploadFolderRelationResponseCollection';
    data: Array<UploadFolderEntity>;
};
export type UserInfo = {
    __typename?: 'UserInfo';
    bio?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    name: Scalars['String'];
    owner?: Maybe<UsersPermissionsUserEntityResponse>;
    picture?: Maybe<UploadFileEntityResponse>;
    surname: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export type UserInfoEntity = {
    __typename?: 'UserInfoEntity';
    attributes?: Maybe<UserInfo>;
    id?: Maybe<Scalars['ID']>;
};
export type UserInfoEntityResponse = {
    __typename?: 'UserInfoEntityResponse';
    data?: Maybe<UserInfoEntity>;
};
export type UserInfoEntityResponseCollection = {
    __typename?: 'UserInfoEntityResponseCollection';
    data: Array<UserInfoEntity>;
    meta: ResponseCollectionMeta;
};
export type UserInfoFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<UserInfoFiltersInput>>>;
    bio?: InputMaybe<StringFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<UserInfoFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UserInfoFiltersInput>>>;
    owner?: InputMaybe<UsersPermissionsUserFiltersInput>;
    surname?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export type UserInfoInput = {
    bio?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
    owner?: InputMaybe<Scalars['ID']>;
    picture?: InputMaybe<Scalars['ID']>;
    surname?: InputMaybe<Scalars['String']>;
};
export type UsersPermissionsCreateRolePayload = {
    __typename?: 'UsersPermissionsCreateRolePayload';
    ok: Scalars['Boolean'];
};
export type UsersPermissionsDeleteRolePayload = {
    __typename?: 'UsersPermissionsDeleteRolePayload';
    ok: Scalars['Boolean'];
};
export type UsersPermissionsLoginInput = {
    identifier: Scalars['String'];
    password: Scalars['String'];
    provider?: Scalars['String'];
};
export type UsersPermissionsLoginPayload = {
    __typename?: 'UsersPermissionsLoginPayload';
    jwt?: Maybe<Scalars['String']>;
    user: UsersPermissionsMe;
};
export type UsersPermissionsMe = {
    __typename?: 'UsersPermissionsMe';
    blocked?: Maybe<Scalars['Boolean']>;
    confirmed?: Maybe<Scalars['Boolean']>;
    email?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    role?: Maybe<UsersPermissionsMeRole>;
    username: Scalars['String'];
};
export type UsersPermissionsMeRole = {
    __typename?: 'UsersPermissionsMeRole';
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    name: Scalars['String'];
    type?: Maybe<Scalars['String']>;
};
export type UsersPermissionsPasswordPayload = {
    __typename?: 'UsersPermissionsPasswordPayload';
    ok: Scalars['Boolean'];
};
export type UsersPermissionsPermission = {
    __typename?: 'UsersPermissionsPermission';
    action: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    role?: Maybe<UsersPermissionsRoleEntityResponse>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export type UsersPermissionsPermissionEntity = {
    __typename?: 'UsersPermissionsPermissionEntity';
    attributes?: Maybe<UsersPermissionsPermission>;
    id?: Maybe<Scalars['ID']>;
};
export type UsersPermissionsPermissionFiltersInput = {
    action?: InputMaybe<StringFilterInput>;
    and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
    role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export type UsersPermissionsPermissionRelationResponseCollection = {
    __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
    data: Array<UsersPermissionsPermissionEntity>;
};
export type UsersPermissionsRegisterInput = {
    email: Scalars['String'];
    password: Scalars['String'];
    username: Scalars['String'];
};
export type UsersPermissionsRole = {
    __typename?: 'UsersPermissionsRole';
    createdAt?: Maybe<Scalars['DateTime']>;
    description?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
    type?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};
export type UsersPermissionsRolePermissionsArgs = {
    filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type UsersPermissionsRoleUsersArgs = {
    filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type UsersPermissionsRoleEntity = {
    __typename?: 'UsersPermissionsRoleEntity';
    attributes?: Maybe<UsersPermissionsRole>;
    id?: Maybe<Scalars['ID']>;
};
export type UsersPermissionsRoleEntityResponse = {
    __typename?: 'UsersPermissionsRoleEntityResponse';
    data?: Maybe<UsersPermissionsRoleEntity>;
};
export type UsersPermissionsRoleEntityResponseCollection = {
    __typename?: 'UsersPermissionsRoleEntityResponseCollection';
    data: Array<UsersPermissionsRoleEntity>;
    meta: ResponseCollectionMeta;
};
export type UsersPermissionsRoleFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    description?: InputMaybe<StringFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
    permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
    type?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
    users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};
export type UsersPermissionsRoleInput = {
    description?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
    permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    type?: InputMaybe<Scalars['String']>;
    users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};
export type UsersPermissionsUpdateRolePayload = {
    __typename?: 'UsersPermissionsUpdateRolePayload';
    ok: Scalars['Boolean'];
};
export type UsersPermissionsUser = {
    __typename?: 'UsersPermissionsUser';
    billingDatas?: Maybe<BillingDataRelationResponseCollection>;
    blocked?: Maybe<Scalars['Boolean']>;
    confirmed?: Maybe<Scalars['Boolean']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    email: Scalars['String'];
    enrollments?: Maybe<EnrollmentRelationResponseCollection>;
    info?: Maybe<UserInfoEntityResponse>;
    payments?: Maybe<PaymentRelationResponseCollection>;
    provider?: Maybe<Scalars['String']>;
    role?: Maybe<UsersPermissionsRoleEntityResponse>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    username: Scalars['String'];
};
export type UsersPermissionsUserBillingDatasArgs = {
    filters?: InputMaybe<BillingDataFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type UsersPermissionsUserEnrollmentsArgs = {
    filters?: InputMaybe<EnrollmentFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type UsersPermissionsUserPaymentsArgs = {
    filters?: InputMaybe<PaymentFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export type UsersPermissionsUserEntity = {
    __typename?: 'UsersPermissionsUserEntity';
    attributes?: Maybe<UsersPermissionsUser>;
    id?: Maybe<Scalars['ID']>;
};
export type UsersPermissionsUserEntityResponse = {
    __typename?: 'UsersPermissionsUserEntityResponse';
    data?: Maybe<UsersPermissionsUserEntity>;
};
export type UsersPermissionsUserEntityResponseCollection = {
    __typename?: 'UsersPermissionsUserEntityResponseCollection';
    data: Array<UsersPermissionsUserEntity>;
    meta: ResponseCollectionMeta;
};
export type UsersPermissionsUserFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
    billingDatas?: InputMaybe<BillingDataFiltersInput>;
    blocked?: InputMaybe<BooleanFilterInput>;
    confirmationToken?: InputMaybe<StringFilterInput>;
    confirmed?: InputMaybe<BooleanFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    email?: InputMaybe<StringFilterInput>;
    enrollments?: InputMaybe<EnrollmentFiltersInput>;
    id?: InputMaybe<IdFilterInput>;
    info?: InputMaybe<UserInfoFiltersInput>;
    not?: InputMaybe<UsersPermissionsUserFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
    password?: InputMaybe<StringFilterInput>;
    payments?: InputMaybe<PaymentFiltersInput>;
    provider?: InputMaybe<StringFilterInput>;
    resetPasswordToken?: InputMaybe<StringFilterInput>;
    role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
    username?: InputMaybe<StringFilterInput>;
};
export type UsersPermissionsUserInput = {
    billingDatas?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    blocked?: InputMaybe<Scalars['Boolean']>;
    confirmationToken?: InputMaybe<Scalars['String']>;
    confirmed?: InputMaybe<Scalars['Boolean']>;
    email?: InputMaybe<Scalars['String']>;
    enrollments?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    info?: InputMaybe<Scalars['ID']>;
    password?: InputMaybe<Scalars['String']>;
    payments?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    provider?: InputMaybe<Scalars['String']>;
    resetPasswordToken?: InputMaybe<Scalars['String']>;
    role?: InputMaybe<Scalars['ID']>;
    username?: InputMaybe<Scalars['String']>;
};
export type UsersPermissionsUserRelationResponseCollection = {
    __typename?: 'UsersPermissionsUserRelationResponseCollection';
    data: Array<UsersPermissionsUserEntity>;
};
