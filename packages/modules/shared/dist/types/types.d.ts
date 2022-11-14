export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
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
export declare type BillingData = {
    __typename?: 'BillingData';
    address: ComponentSpaceAddress;
    createdAt?: Maybe<Scalars['DateTime']>;
    data: Array<Maybe<BillingDataDataDynamicZone>>;
    owner?: Maybe<UsersPermissionsUserEntityResponse>;
    payment?: Maybe<PaymentEntityResponse>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type BillingDataDataDynamicZone = ComponentBillingCompany | ComponentBillingOwner | ComponentBillingPerson | Error;
export declare type BillingDataEntity = {
    __typename?: 'BillingDataEntity';
    attributes?: Maybe<BillingData>;
    id?: Maybe<Scalars['ID']>;
};
export declare type BillingDataEntityResponse = {
    __typename?: 'BillingDataEntityResponse';
    data?: Maybe<BillingDataEntity>;
};
export declare type BillingDataEntityResponseCollection = {
    __typename?: 'BillingDataEntityResponseCollection';
    data: Array<BillingDataEntity>;
    meta: ResponseCollectionMeta;
};
export declare type BillingDataFiltersInput = {
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
export declare type BillingDataInput = {
    address?: InputMaybe<ComponentSpaceAddressInput>;
    data?: InputMaybe<Array<Scalars['BillingDataDataDynamicZoneInput']>>;
    owner?: InputMaybe<Scalars['ID']>;
    payment?: InputMaybe<Scalars['ID']>;
};
export declare type BillingDataRelationResponseCollection = {
    __typename?: 'BillingDataRelationResponseCollection';
    data: Array<BillingDataEntity>;
};
export declare type BooleanFilterInput = {
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
export declare type ComponentBillingCompany = {
    __typename?: 'ComponentBillingCompany';
    certifiedEmail: Scalars['String'];
    id: Scalars['ID'];
    name: Scalars['String'];
    sdiCode: Scalars['String'];
    vatNumber: Scalars['String'];
};
export declare type ComponentBillingOwner = {
    __typename?: 'ComponentBillingOwner';
    fiscalCode: Scalars['String'];
    id: Scalars['ID'];
};
export declare type ComponentBillingPerson = {
    __typename?: 'ComponentBillingPerson';
    email: Scalars['String'];
    fiscalCode: Scalars['String'];
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    surname: Scalars['String'];
};
export declare type ComponentPeopleCredits = {
    __typename?: 'ComponentPeopleCredits';
    id: Scalars['ID'];
    position?: Maybe<PositionEntityResponse>;
    userInfo?: Maybe<UserInfoEntityResponse>;
};
export declare type ComponentPeopleCreditsFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<ComponentPeopleCreditsFiltersInput>>>;
    not?: InputMaybe<ComponentPeopleCreditsFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<ComponentPeopleCreditsFiltersInput>>>;
    position?: InputMaybe<PositionFiltersInput>;
    userInfo?: InputMaybe<UserInfoFiltersInput>;
};
export declare type ComponentPeopleCreditsInput = {
    id?: InputMaybe<Scalars['ID']>;
    position?: InputMaybe<Scalars['ID']>;
    userInfo?: InputMaybe<Scalars['ID']>;
};
export declare type ComponentSpaceAddress = {
    __typename?: 'ComponentSpaceAddress';
    administrativeArea: Scalars['String'];
    city: Scalars['String'];
    country: Scalars['String'];
    id: Scalars['ID'];
    number: Scalars['String'];
    postCode: Scalars['String'];
    street: Scalars['String'];
};
export declare type ComponentSpaceAddressFiltersInput = {
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
export declare type ComponentSpaceAddressInput = {
    administrativeArea?: InputMaybe<Scalars['String']>;
    city?: InputMaybe<Scalars['String']>;
    country?: InputMaybe<Scalars['String']>;
    id?: InputMaybe<Scalars['ID']>;
    number?: InputMaybe<Scalars['String']>;
    postCode?: InputMaybe<Scalars['String']>;
    street?: InputMaybe<Scalars['String']>;
};
export declare type ComponentTimeMeetings = {
    __typename?: 'ComponentTimeMeetings';
    end: Scalars['DateTime'];
    id: Scalars['ID'];
    start: Scalars['DateTime'];
};
export declare type ComponentTimeMeetingsFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<ComponentTimeMeetingsFiltersInput>>>;
    end?: InputMaybe<DateTimeFilterInput>;
    not?: InputMaybe<ComponentTimeMeetingsFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<ComponentTimeMeetingsFiltersInput>>>;
    start?: InputMaybe<DateTimeFilterInput>;
};
export declare type ComponentTimeMeetingsInput = {
    end?: InputMaybe<Scalars['DateTime']>;
    id?: InputMaybe<Scalars['ID']>;
    start?: InputMaybe<Scalars['DateTime']>;
};
export declare type Course = {
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
export declare type CourseEnrollmentsArgs = {
    filters?: InputMaybe<EnrollmentFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type CourseFieldsArgs = {
    filters?: InputMaybe<FieldFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type CourseGalleryArgs = {
    filters?: InputMaybe<UploadFileFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type CourseMeetingsArgs = {
    filters?: InputMaybe<ComponentTimeMeetingsFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type CoursePlacesArgs = {
    filters?: InputMaybe<PlaceFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type CourseRolesArgs = {
    filters?: InputMaybe<ComponentPeopleCreditsFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type CourseEntity = {
    __typename?: 'CourseEntity';
    attributes?: Maybe<Course>;
    id?: Maybe<Scalars['ID']>;
};
export declare type CourseEntityResponse = {
    __typename?: 'CourseEntityResponse';
    data?: Maybe<CourseEntity>;
};
export declare type CourseEntityResponseCollection = {
    __typename?: 'CourseEntityResponseCollection';
    data: Array<CourseEntity>;
    meta: ResponseCollectionMeta;
};
export declare type CourseFiltersInput = {
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
export declare type CourseInput = {
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
export declare type CourseRelationResponseCollection = {
    __typename?: 'CourseRelationResponseCollection';
    data: Array<CourseEntity>;
};
export declare type DateTimeFilterInput = {
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
export declare type Enrollment = {
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
export declare type EnrollmentEntity = {
    __typename?: 'EnrollmentEntity';
    attributes?: Maybe<Enrollment>;
    id?: Maybe<Scalars['ID']>;
};
export declare type EnrollmentEntityResponse = {
    __typename?: 'EnrollmentEntityResponse';
    data?: Maybe<EnrollmentEntity>;
};
export declare type EnrollmentEntityResponseCollection = {
    __typename?: 'EnrollmentEntityResponseCollection';
    data: Array<EnrollmentEntity>;
    meta: ResponseCollectionMeta;
};
export declare type EnrollmentFiltersInput = {
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
export declare type EnrollmentInput = {
    course?: InputMaybe<Scalars['ID']>;
    cvUrl?: InputMaybe<Scalars['String']>;
    motivationalLetter?: InputMaybe<Scalars['String']>;
    owner?: InputMaybe<Scalars['ID']>;
    payment?: InputMaybe<Scalars['ID']>;
    phoneNumber?: InputMaybe<Scalars['String']>;
    portfolioUrl?: InputMaybe<Scalars['String']>;
    state?: InputMaybe<Enum_Enrollment_State>;
};
export declare type EnrollmentRelationResponseCollection = {
    __typename?: 'EnrollmentRelationResponseCollection';
    data: Array<EnrollmentEntity>;
};
export declare type Error = {
    __typename?: 'Error';
    code: Scalars['String'];
    message?: Maybe<Scalars['String']>;
};
export declare type Field = {
    __typename?: 'Field';
    courses?: Maybe<CourseRelationResponseCollection>;
    createdAt?: Maybe<Scalars['DateTime']>;
    name: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type FieldCoursesArgs = {
    filters?: InputMaybe<CourseFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type FieldEntity = {
    __typename?: 'FieldEntity';
    attributes?: Maybe<Field>;
    id?: Maybe<Scalars['ID']>;
};
export declare type FieldEntityResponse = {
    __typename?: 'FieldEntityResponse';
    data?: Maybe<FieldEntity>;
};
export declare type FieldEntityResponseCollection = {
    __typename?: 'FieldEntityResponseCollection';
    data: Array<FieldEntity>;
    meta: ResponseCollectionMeta;
};
export declare type FieldFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<FieldFiltersInput>>>;
    courses?: InputMaybe<CourseFiltersInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<FieldFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<FieldFiltersInput>>>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export declare type FieldInput = {
    courses?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    name?: InputMaybe<Scalars['String']>;
};
export declare type FieldRelationResponseCollection = {
    __typename?: 'FieldRelationResponseCollection';
    data: Array<FieldEntity>;
};
export declare type FileInfoInput = {
    alternativeText?: InputMaybe<Scalars['String']>;
    caption?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
};
export declare type FloatFilterInput = {
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
export declare type GenericMorph = BillingData | ComponentBillingCompany | ComponentBillingOwner | ComponentBillingPerson | ComponentPeopleCredits | ComponentSpaceAddress | ComponentTimeMeetings | Course | Enrollment | Field | I18NLocale | Payment | Place | Position | UploadFile | UploadFolder | UserInfo | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;
export declare type I18NLocale = {
    __typename?: 'I18NLocale';
    code?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    name?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type I18NLocaleEntity = {
    __typename?: 'I18NLocaleEntity';
    attributes?: Maybe<I18NLocale>;
    id?: Maybe<Scalars['ID']>;
};
export declare type I18NLocaleEntityResponse = {
    __typename?: 'I18NLocaleEntityResponse';
    data?: Maybe<I18NLocaleEntity>;
};
export declare type I18NLocaleEntityResponseCollection = {
    __typename?: 'I18NLocaleEntityResponseCollection';
    data: Array<I18NLocaleEntity>;
    meta: ResponseCollectionMeta;
};
export declare type I18NLocaleFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
    code?: InputMaybe<StringFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<I18NLocaleFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export declare type IdFilterInput = {
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
export declare type IntFilterInput = {
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
export declare type JsonFilterInput = {
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
export declare type Mutation = {
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
export declare type MutationChangePasswordArgs = {
    currentPassword: Scalars['String'];
    password: Scalars['String'];
    passwordConfirmation: Scalars['String'];
};
export declare type MutationCreateBillingDataArgs = {
    data: BillingDataInput;
};
export declare type MutationCreateCourseArgs = {
    data: CourseInput;
};
export declare type MutationCreateEnrollmentArgs = {
    data: EnrollmentInput;
};
export declare type MutationCreateFieldArgs = {
    data: FieldInput;
};
export declare type MutationCreatePaymentArgs = {
    data: PaymentInput;
};
export declare type MutationCreatePlaceArgs = {
    data: PlaceInput;
};
export declare type MutationCreatePositionArgs = {
    data: PositionInput;
};
export declare type MutationCreateUploadFileArgs = {
    data: UploadFileInput;
};
export declare type MutationCreateUploadFolderArgs = {
    data: UploadFolderInput;
};
export declare type MutationCreateUserInfoArgs = {
    data: UserInfoInput;
};
export declare type MutationCreateUsersPermissionsRoleArgs = {
    data: UsersPermissionsRoleInput;
};
export declare type MutationCreateUsersPermissionsUserArgs = {
    data: UsersPermissionsUserInput;
};
export declare type MutationDeleteBillingDataArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteCourseArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteEnrollmentArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteFieldArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeletePaymentArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeletePlaceArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeletePositionArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteUploadFileArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteUploadFolderArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteUserInfoArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteUsersPermissionsRoleArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteUsersPermissionsUserArgs = {
    id: Scalars['ID'];
};
export declare type MutationEmailConfirmationArgs = {
    confirmation: Scalars['String'];
};
export declare type MutationForgotPasswordArgs = {
    email: Scalars['String'];
};
export declare type MutationLoginArgs = {
    input: UsersPermissionsLoginInput;
};
export declare type MutationMultipleUploadArgs = {
    field?: InputMaybe<Scalars['String']>;
    files: Array<InputMaybe<Scalars['Upload']>>;
    ref?: InputMaybe<Scalars['String']>;
    refId?: InputMaybe<Scalars['ID']>;
};
export declare type MutationRegisterArgs = {
    input: UsersPermissionsRegisterInput;
};
export declare type MutationRemoveFileArgs = {
    id: Scalars['ID'];
};
export declare type MutationResetPasswordArgs = {
    code: Scalars['String'];
    password: Scalars['String'];
    passwordConfirmation: Scalars['String'];
};
export declare type MutationUpdateBillingDataArgs = {
    data: BillingDataInput;
    id: Scalars['ID'];
};
export declare type MutationUpdateCourseArgs = {
    data: CourseInput;
    id: Scalars['ID'];
};
export declare type MutationUpdateEnrollmentArgs = {
    data: EnrollmentInput;
    id: Scalars['ID'];
};
export declare type MutationUpdateFieldArgs = {
    data: FieldInput;
    id: Scalars['ID'];
};
export declare type MutationUpdateFileInfoArgs = {
    id: Scalars['ID'];
    info?: InputMaybe<FileInfoInput>;
};
export declare type MutationUpdatePaymentArgs = {
    data: PaymentInput;
    id: Scalars['ID'];
};
export declare type MutationUpdatePlaceArgs = {
    data: PlaceInput;
    id: Scalars['ID'];
};
export declare type MutationUpdatePositionArgs = {
    data: PositionInput;
    id: Scalars['ID'];
};
export declare type MutationUpdateUploadFileArgs = {
    data: UploadFileInput;
    id: Scalars['ID'];
};
export declare type MutationUpdateUploadFolderArgs = {
    data: UploadFolderInput;
    id: Scalars['ID'];
};
export declare type MutationUpdateUserInfoArgs = {
    data: UserInfoInput;
    id: Scalars['ID'];
};
export declare type MutationUpdateUsersPermissionsRoleArgs = {
    data: UsersPermissionsRoleInput;
    id: Scalars['ID'];
};
export declare type MutationUpdateUsersPermissionsUserArgs = {
    data: UsersPermissionsUserInput;
    id: Scalars['ID'];
};
export declare type MutationUploadArgs = {
    field?: InputMaybe<Scalars['String']>;
    file: Scalars['Upload'];
    info?: InputMaybe<FileInfoInput>;
    ref?: InputMaybe<Scalars['String']>;
    refId?: InputMaybe<Scalars['ID']>;
};
export declare type Pagination = {
    __typename?: 'Pagination';
    page: Scalars['Int'];
    pageCount: Scalars['Int'];
    pageSize: Scalars['Int'];
    total: Scalars['Int'];
};
export declare type PaginationArg = {
    limit?: InputMaybe<Scalars['Int']>;
    page?: InputMaybe<Scalars['Int']>;
    pageSize?: InputMaybe<Scalars['Int']>;
    start?: InputMaybe<Scalars['Int']>;
};
export declare type Payment = {
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
export declare type PaymentEntity = {
    __typename?: 'PaymentEntity';
    attributes?: Maybe<Payment>;
    id?: Maybe<Scalars['ID']>;
};
export declare type PaymentEntityResponse = {
    __typename?: 'PaymentEntityResponse';
    data?: Maybe<PaymentEntity>;
};
export declare type PaymentEntityResponseCollection = {
    __typename?: 'PaymentEntityResponseCollection';
    data: Array<PaymentEntity>;
    meta: ResponseCollectionMeta;
};
export declare type PaymentFiltersInput = {
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
export declare type PaymentInput = {
    billingData?: InputMaybe<Scalars['ID']>;
    confirmationCode?: InputMaybe<Scalars['String']>;
    deadline?: InputMaybe<Scalars['DateTime']>;
    enrollment?: InputMaybe<Scalars['ID']>;
    executed?: InputMaybe<Scalars['Boolean']>;
    owner?: InputMaybe<Scalars['ID']>;
    uid?: InputMaybe<Scalars['String']>;
};
export declare type PaymentRelationResponseCollection = {
    __typename?: 'PaymentRelationResponseCollection';
    data: Array<PaymentEntity>;
};
export declare type Place = {
    __typename?: 'Place';
    address?: Maybe<ComponentSpaceAddress>;
    courses?: Maybe<CourseRelationResponseCollection>;
    createdAt?: Maybe<Scalars['DateTime']>;
    name: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type PlaceCoursesArgs = {
    filters?: InputMaybe<CourseFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type PlaceEntity = {
    __typename?: 'PlaceEntity';
    attributes?: Maybe<Place>;
    id?: Maybe<Scalars['ID']>;
};
export declare type PlaceEntityResponse = {
    __typename?: 'PlaceEntityResponse';
    data?: Maybe<PlaceEntity>;
};
export declare type PlaceEntityResponseCollection = {
    __typename?: 'PlaceEntityResponseCollection';
    data: Array<PlaceEntity>;
    meta: ResponseCollectionMeta;
};
export declare type PlaceFiltersInput = {
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
export declare type PlaceInput = {
    address?: InputMaybe<ComponentSpaceAddressInput>;
    courses?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    name?: InputMaybe<Scalars['String']>;
};
export declare type PlaceRelationResponseCollection = {
    __typename?: 'PlaceRelationResponseCollection';
    data: Array<PlaceEntity>;
};
export declare type Position = {
    __typename?: 'Position';
    createdAt?: Maybe<Scalars['DateTime']>;
    name: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type PositionEntity = {
    __typename?: 'PositionEntity';
    attributes?: Maybe<Position>;
    id?: Maybe<Scalars['ID']>;
};
export declare type PositionEntityResponse = {
    __typename?: 'PositionEntityResponse';
    data?: Maybe<PositionEntity>;
};
export declare type PositionEntityResponseCollection = {
    __typename?: 'PositionEntityResponseCollection';
    data: Array<PositionEntity>;
    meta: ResponseCollectionMeta;
};
export declare type PositionFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<PositionFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<PositionFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<PositionFiltersInput>>>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export declare type PositionInput = {
    name?: InputMaybe<Scalars['String']>;
};
export declare enum PublicationState {
    Live = "LIVE",
    Preview = "PREVIEW"
}
export declare type Query = {
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
export declare type QueryBillingDataArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryBillingDatasArgs = {
    filters?: InputMaybe<BillingDataFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type QueryCourseArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryCoursesArgs = {
    filters?: InputMaybe<CourseFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type QueryEnrollmentArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryEnrollmentsArgs = {
    filters?: InputMaybe<EnrollmentFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type QueryFieldArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryFieldsArgs = {
    filters?: InputMaybe<FieldFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type QueryI18NLocaleArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryI18NLocalesArgs = {
    filters?: InputMaybe<I18NLocaleFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type QueryPaymentArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryPaymentsArgs = {
    filters?: InputMaybe<PaymentFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type QueryPlaceArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryPlacesArgs = {
    filters?: InputMaybe<PlaceFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type QueryPositionArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryPositionsArgs = {
    filters?: InputMaybe<PositionFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type QueryUploadFileArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryUploadFilesArgs = {
    filters?: InputMaybe<UploadFileFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type QueryUploadFolderArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryUploadFoldersArgs = {
    filters?: InputMaybe<UploadFolderFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type QueryUserInfoArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryUserInfosArgs = {
    filters?: InputMaybe<UserInfoFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type QueryUsersPermissionsRoleArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryUsersPermissionsRolesArgs = {
    filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type QueryUsersPermissionsUserArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryUsersPermissionsUsersArgs = {
    filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type ResponseCollectionMeta = {
    __typename?: 'ResponseCollectionMeta';
    pagination: Pagination;
};
export declare type StringFilterInput = {
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
export declare type UploadFile = {
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
export declare type UploadFileEntity = {
    __typename?: 'UploadFileEntity';
    attributes?: Maybe<UploadFile>;
    id?: Maybe<Scalars['ID']>;
};
export declare type UploadFileEntityResponse = {
    __typename?: 'UploadFileEntityResponse';
    data?: Maybe<UploadFileEntity>;
};
export declare type UploadFileEntityResponseCollection = {
    __typename?: 'UploadFileEntityResponseCollection';
    data: Array<UploadFileEntity>;
    meta: ResponseCollectionMeta;
};
export declare type UploadFileFiltersInput = {
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
export declare type UploadFileInput = {
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
export declare type UploadFileRelationResponseCollection = {
    __typename?: 'UploadFileRelationResponseCollection';
    data: Array<UploadFileEntity>;
};
export declare type UploadFolder = {
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
export declare type UploadFolderChildrenArgs = {
    filters?: InputMaybe<UploadFolderFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type UploadFolderFilesArgs = {
    filters?: InputMaybe<UploadFileFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type UploadFolderEntity = {
    __typename?: 'UploadFolderEntity';
    attributes?: Maybe<UploadFolder>;
    id?: Maybe<Scalars['ID']>;
};
export declare type UploadFolderEntityResponse = {
    __typename?: 'UploadFolderEntityResponse';
    data?: Maybe<UploadFolderEntity>;
};
export declare type UploadFolderEntityResponseCollection = {
    __typename?: 'UploadFolderEntityResponseCollection';
    data: Array<UploadFolderEntity>;
    meta: ResponseCollectionMeta;
};
export declare type UploadFolderFiltersInput = {
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
export declare type UploadFolderInput = {
    children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    name?: InputMaybe<Scalars['String']>;
    parent?: InputMaybe<Scalars['ID']>;
    path?: InputMaybe<Scalars['String']>;
    pathId?: InputMaybe<Scalars['Int']>;
};
export declare type UploadFolderRelationResponseCollection = {
    __typename?: 'UploadFolderRelationResponseCollection';
    data: Array<UploadFolderEntity>;
};
export declare type UserInfo = {
    __typename?: 'UserInfo';
    bio?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    name: Scalars['String'];
    owner?: Maybe<UsersPermissionsUserEntityResponse>;
    picture?: Maybe<UploadFileEntityResponse>;
    surname: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type UserInfoEntity = {
    __typename?: 'UserInfoEntity';
    attributes?: Maybe<UserInfo>;
    id?: Maybe<Scalars['ID']>;
};
export declare type UserInfoEntityResponse = {
    __typename?: 'UserInfoEntityResponse';
    data?: Maybe<UserInfoEntity>;
};
export declare type UserInfoEntityResponseCollection = {
    __typename?: 'UserInfoEntityResponseCollection';
    data: Array<UserInfoEntity>;
    meta: ResponseCollectionMeta;
};
export declare type UserInfoFiltersInput = {
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
export declare type UserInfoInput = {
    bio?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
    owner?: InputMaybe<Scalars['ID']>;
    picture?: InputMaybe<Scalars['ID']>;
    surname?: InputMaybe<Scalars['String']>;
};
export declare type UsersPermissionsCreateRolePayload = {
    __typename?: 'UsersPermissionsCreateRolePayload';
    ok: Scalars['Boolean'];
};
export declare type UsersPermissionsDeleteRolePayload = {
    __typename?: 'UsersPermissionsDeleteRolePayload';
    ok: Scalars['Boolean'];
};
export declare type UsersPermissionsLoginInput = {
    identifier: Scalars['String'];
    password: Scalars['String'];
    provider?: Scalars['String'];
};
export declare type UsersPermissionsLoginPayload = {
    __typename?: 'UsersPermissionsLoginPayload';
    jwt?: Maybe<Scalars['String']>;
    user: UsersPermissionsMe;
};
export declare type UsersPermissionsMe = {
    __typename?: 'UsersPermissionsMe';
    blocked?: Maybe<Scalars['Boolean']>;
    confirmed?: Maybe<Scalars['Boolean']>;
    email?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    role?: Maybe<UsersPermissionsMeRole>;
    username: Scalars['String'];
};
export declare type UsersPermissionsMeRole = {
    __typename?: 'UsersPermissionsMeRole';
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    name: Scalars['String'];
    type?: Maybe<Scalars['String']>;
};
export declare type UsersPermissionsPasswordPayload = {
    __typename?: 'UsersPermissionsPasswordPayload';
    ok: Scalars['Boolean'];
};
export declare type UsersPermissionsPermission = {
    __typename?: 'UsersPermissionsPermission';
    action: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    role?: Maybe<UsersPermissionsRoleEntityResponse>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type UsersPermissionsPermissionEntity = {
    __typename?: 'UsersPermissionsPermissionEntity';
    attributes?: Maybe<UsersPermissionsPermission>;
    id?: Maybe<Scalars['ID']>;
};
export declare type UsersPermissionsPermissionFiltersInput = {
    action?: InputMaybe<StringFilterInput>;
    and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
    role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export declare type UsersPermissionsPermissionRelationResponseCollection = {
    __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
    data: Array<UsersPermissionsPermissionEntity>;
};
export declare type UsersPermissionsRegisterInput = {
    email: Scalars['String'];
    password: Scalars['String'];
    username: Scalars['String'];
};
export declare type UsersPermissionsRole = {
    __typename?: 'UsersPermissionsRole';
    createdAt?: Maybe<Scalars['DateTime']>;
    description?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
    type?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};
export declare type UsersPermissionsRolePermissionsArgs = {
    filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type UsersPermissionsRoleUsersArgs = {
    filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type UsersPermissionsRoleEntity = {
    __typename?: 'UsersPermissionsRoleEntity';
    attributes?: Maybe<UsersPermissionsRole>;
    id?: Maybe<Scalars['ID']>;
};
export declare type UsersPermissionsRoleEntityResponse = {
    __typename?: 'UsersPermissionsRoleEntityResponse';
    data?: Maybe<UsersPermissionsRoleEntity>;
};
export declare type UsersPermissionsRoleEntityResponseCollection = {
    __typename?: 'UsersPermissionsRoleEntityResponseCollection';
    data: Array<UsersPermissionsRoleEntity>;
    meta: ResponseCollectionMeta;
};
export declare type UsersPermissionsRoleFiltersInput = {
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
export declare type UsersPermissionsRoleInput = {
    description?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
    permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    type?: InputMaybe<Scalars['String']>;
    users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};
export declare type UsersPermissionsUpdateRolePayload = {
    __typename?: 'UsersPermissionsUpdateRolePayload';
    ok: Scalars['Boolean'];
};
export declare type UsersPermissionsUser = {
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
export declare type UsersPermissionsUserBillingDatasArgs = {
    filters?: InputMaybe<BillingDataFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type UsersPermissionsUserEnrollmentsArgs = {
    filters?: InputMaybe<EnrollmentFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type UsersPermissionsUserPaymentsArgs = {
    filters?: InputMaybe<PaymentFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type UsersPermissionsUserEntity = {
    __typename?: 'UsersPermissionsUserEntity';
    attributes?: Maybe<UsersPermissionsUser>;
    id?: Maybe<Scalars['ID']>;
};
export declare type UsersPermissionsUserEntityResponse = {
    __typename?: 'UsersPermissionsUserEntityResponse';
    data?: Maybe<UsersPermissionsUserEntity>;
};
export declare type UsersPermissionsUserEntityResponseCollection = {
    __typename?: 'UsersPermissionsUserEntityResponseCollection';
    data: Array<UsersPermissionsUserEntity>;
    meta: ResponseCollectionMeta;
};
export declare type UsersPermissionsUserFiltersInput = {
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
export declare type UsersPermissionsUserInput = {
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
export declare type UsersPermissionsUserRelationResponseCollection = {
    __typename?: 'UsersPermissionsUserRelationResponseCollection';
    data: Array<UsersPermissionsUserEntity>;
};
