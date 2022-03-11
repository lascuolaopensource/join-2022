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
    BillingInfoDataDynamicZoneInput: any;
    /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    Date: any;
    /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    DateTime: any;
    /** A string used to identify an i18n locale */
    I18NLocaleCode: any;
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: any;
    /** A time string with format HH:mm:ss.SSS */
    Time: any;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
};
export declare type Area = {
    __typename?: 'Area';
    courses?: Maybe<CourseRelationResponseCollection>;
    createdAt?: Maybe<Scalars['DateTime']>;
    locale?: Maybe<Scalars['String']>;
    localizations?: Maybe<AreaRelationResponseCollection>;
    name?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type AreaCoursesArgs = {
    filters?: InputMaybe<CourseFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type AreaLocalizationsArgs = {
    filters?: InputMaybe<AreaFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type AreaEntity = {
    __typename?: 'AreaEntity';
    attributes?: Maybe<Area>;
    id?: Maybe<Scalars['ID']>;
};
export declare type AreaEntityResponse = {
    __typename?: 'AreaEntityResponse';
    data?: Maybe<AreaEntity>;
};
export declare type AreaEntityResponseCollection = {
    __typename?: 'AreaEntityResponseCollection';
    data: Array<AreaEntity>;
    meta: ResponseCollectionMeta;
};
export declare type AreaFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<AreaFiltersInput>>>;
    courses?: InputMaybe<CourseFiltersInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    locale?: InputMaybe<StringFilterInput>;
    localizations?: InputMaybe<AreaFiltersInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<AreaFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<AreaFiltersInput>>>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export declare type AreaInput = {
    courses?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    name?: InputMaybe<Scalars['String']>;
};
export declare type AreaRelationResponseCollection = {
    __typename?: 'AreaRelationResponseCollection';
    data: Array<AreaEntity>;
};
export declare type BillingInfo = {
    __typename?: 'BillingInfo';
    address: ComponentLocationAddress;
    createdAt?: Maybe<Scalars['DateTime']>;
    data: Array<Maybe<BillingInfoDataDynamicZone>>;
    email?: Maybe<Scalars['String']>;
    payment?: Maybe<PaymentEntityResponse>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type BillingInfoDataDynamicZone = ComponentBillingCompany | ComponentBillingMe | ComponentBillingPerson | Error;
export declare type BillingInfoEntity = {
    __typename?: 'BillingInfoEntity';
    attributes?: Maybe<BillingInfo>;
    id?: Maybe<Scalars['ID']>;
};
export declare type BillingInfoEntityResponse = {
    __typename?: 'BillingInfoEntityResponse';
    data?: Maybe<BillingInfoEntity>;
};
export declare type BillingInfoEntityResponseCollection = {
    __typename?: 'BillingInfoEntityResponseCollection';
    data: Array<BillingInfoEntity>;
    meta: ResponseCollectionMeta;
};
export declare type BillingInfoFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<BillingInfoFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    email?: InputMaybe<StringFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<BillingInfoFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<BillingInfoFiltersInput>>>;
    payment?: InputMaybe<PaymentFiltersInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export declare type BillingInfoInput = {
    address?: InputMaybe<ComponentLocationAddressInput>;
    data?: InputMaybe<Array<Scalars['BillingInfoDataDynamicZoneInput']>>;
    email?: InputMaybe<Scalars['String']>;
    payment?: InputMaybe<Scalars['ID']>;
};
export declare type BooleanFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
    contains?: InputMaybe<Scalars['Boolean']>;
    containsi?: InputMaybe<Scalars['Boolean']>;
    endsWith?: InputMaybe<Scalars['Boolean']>;
    eq?: InputMaybe<Scalars['Boolean']>;
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
    id: Scalars['ID'];
    name: Scalars['String'];
    sdi: Scalars['String'];
    vat: Scalars['String'];
};
export declare type ComponentBillingMe = {
    __typename?: 'ComponentBillingMe';
    cf: Scalars['String'];
    id: Scalars['ID'];
};
export declare type ComponentBillingPerson = {
    __typename?: 'ComponentBillingPerson';
    cf: Scalars['String'];
    id: Scalars['ID'];
    name: Scalars['String'];
    surname: Scalars['String'];
};
export declare type ComponentLocationAddress = {
    __typename?: 'ComponentLocationAddress';
    cap: Scalars['String'];
    id: Scalars['ID'];
    province: Scalars['String'];
    street: Scalars['String'];
    town: Scalars['String'];
};
export declare type ComponentLocationAddressInput = {
    cap?: InputMaybe<Scalars['String']>;
    id?: InputMaybe<Scalars['ID']>;
    province?: InputMaybe<Scalars['String']>;
    street?: InputMaybe<Scalars['String']>;
    town?: InputMaybe<Scalars['String']>;
};
export declare type ComponentTimeMeeting = {
    __typename?: 'ComponentTimeMeeting';
    date?: Maybe<Scalars['Date']>;
    id: Scalars['ID'];
    timeSlots?: Maybe<Array<Maybe<ComponentTimeTimeSlot>>>;
};
export declare type ComponentTimeMeetingTimeSlotsArgs = {
    filters?: InputMaybe<ComponentTimeTimeSlotFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type ComponentTimeMeetingFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<ComponentTimeMeetingFiltersInput>>>;
    date?: InputMaybe<DateFilterInput>;
    not?: InputMaybe<ComponentTimeMeetingFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<ComponentTimeMeetingFiltersInput>>>;
};
export declare type ComponentTimeMeetingInput = {
    date?: InputMaybe<Scalars['Date']>;
    id?: InputMaybe<Scalars['ID']>;
    timeSlots?: InputMaybe<Array<InputMaybe<ComponentTimeTimeSlotInput>>>;
};
export declare type ComponentTimeTimeSlot = {
    __typename?: 'ComponentTimeTimeSlot';
    endTime?: Maybe<Scalars['Time']>;
    id: Scalars['ID'];
    startTime?: Maybe<Scalars['Time']>;
};
export declare type ComponentTimeTimeSlotFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<ComponentTimeTimeSlotFiltersInput>>>;
    endTime?: InputMaybe<TimeFilterInput>;
    not?: InputMaybe<ComponentTimeTimeSlotFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<ComponentTimeTimeSlotFiltersInput>>>;
    startTime?: InputMaybe<TimeFilterInput>;
};
export declare type ComponentTimeTimeSlotInput = {
    endTime?: InputMaybe<Scalars['Time']>;
    id?: InputMaybe<Scalars['ID']>;
    startTime?: InputMaybe<Scalars['Time']>;
};
export declare type Course = {
    __typename?: 'Course';
    areas?: Maybe<AreaRelationResponseCollection>;
    confirmed?: Maybe<Scalars['Boolean']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    cvNeeded?: Maybe<Scalars['Boolean']>;
    description?: Maybe<Scalars['String']>;
    enrollmentDeadline?: Maybe<Scalars['DateTime']>;
    enrollmentMax?: Maybe<Scalars['Int']>;
    enrollmentMin?: Maybe<Scalars['Int']>;
    enrollments?: Maybe<EnrollmentRelationResponseCollection>;
    gallery?: Maybe<UploadFileRelationResponseCollection>;
    meetings?: Maybe<Array<Maybe<ComponentTimeMeeting>>>;
    motivationalLetterNeeded?: Maybe<Scalars['Boolean']>;
    portfolioNeeded?: Maybe<Scalars['Boolean']>;
    preconditionsNeeded?: Maybe<Scalars['Boolean']>;
    price?: Maybe<Scalars['Int']>;
    publishedAt?: Maybe<Scalars['DateTime']>;
    slug?: Maybe<Scalars['String']>;
    teachers?: Maybe<UserInfoRelationResponseCollection>;
    title: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type CourseAreasArgs = {
    filters?: InputMaybe<AreaFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type CourseEnrollmentsArgs = {
    filters?: InputMaybe<EnrollmentFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type CourseGalleryArgs = {
    filters?: InputMaybe<UploadFileFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type CourseMeetingsArgs = {
    filters?: InputMaybe<ComponentTimeMeetingFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type CourseTeachersArgs = {
    filters?: InputMaybe<UserInfoFiltersInput>;
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
    areas?: InputMaybe<AreaFiltersInput>;
    confirmed?: InputMaybe<BooleanFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    cvNeeded?: InputMaybe<BooleanFilterInput>;
    description?: InputMaybe<StringFilterInput>;
    enrollmentDeadline?: InputMaybe<DateTimeFilterInput>;
    enrollmentMax?: InputMaybe<IntFilterInput>;
    enrollmentMin?: InputMaybe<IntFilterInput>;
    enrollments?: InputMaybe<EnrollmentFiltersInput>;
    id?: InputMaybe<IdFilterInput>;
    motivationalLetterNeeded?: InputMaybe<BooleanFilterInput>;
    not?: InputMaybe<CourseFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<CourseFiltersInput>>>;
    portfolioNeeded?: InputMaybe<BooleanFilterInput>;
    preconditionsNeeded?: InputMaybe<BooleanFilterInput>;
    price?: InputMaybe<IntFilterInput>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    slug?: InputMaybe<StringFilterInput>;
    teachers?: InputMaybe<UserInfoFiltersInput>;
    title?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export declare type CourseInput = {
    areas?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    confirmed?: InputMaybe<Scalars['Boolean']>;
    cvNeeded?: InputMaybe<Scalars['Boolean']>;
    description?: InputMaybe<Scalars['String']>;
    enrollmentDeadline?: InputMaybe<Scalars['DateTime']>;
    enrollmentMax?: InputMaybe<Scalars['Int']>;
    enrollmentMin?: InputMaybe<Scalars['Int']>;
    enrollments?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    gallery?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    meetings?: InputMaybe<Array<InputMaybe<ComponentTimeMeetingInput>>>;
    motivationalLetterNeeded?: InputMaybe<Scalars['Boolean']>;
    portfolioNeeded?: InputMaybe<Scalars['Boolean']>;
    preconditionsNeeded?: InputMaybe<Scalars['Boolean']>;
    price?: InputMaybe<Scalars['Int']>;
    publishedAt?: InputMaybe<Scalars['DateTime']>;
    slug?: InputMaybe<Scalars['String']>;
    teachers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    title?: InputMaybe<Scalars['String']>;
};
export declare type CourseRelationResponseCollection = {
    __typename?: 'CourseRelationResponseCollection';
    data: Array<CourseEntity>;
};
export declare type DateFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
    contains?: InputMaybe<Scalars['Date']>;
    containsi?: InputMaybe<Scalars['Date']>;
    endsWith?: InputMaybe<Scalars['Date']>;
    eq?: InputMaybe<Scalars['Date']>;
    gt?: InputMaybe<Scalars['Date']>;
    gte?: InputMaybe<Scalars['Date']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
    lt?: InputMaybe<Scalars['Date']>;
    lte?: InputMaybe<Scalars['Date']>;
    ne?: InputMaybe<Scalars['Date']>;
    not?: InputMaybe<DateFilterInput>;
    notContains?: InputMaybe<Scalars['Date']>;
    notContainsi?: InputMaybe<Scalars['Date']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
    notNull?: InputMaybe<Scalars['Boolean']>;
    null?: InputMaybe<Scalars['Boolean']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
    startsWith?: InputMaybe<Scalars['Date']>;
};
export declare type DateTimeFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
    contains?: InputMaybe<Scalars['DateTime']>;
    containsi?: InputMaybe<Scalars['DateTime']>;
    endsWith?: InputMaybe<Scalars['DateTime']>;
    eq?: InputMaybe<Scalars['DateTime']>;
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
    phoneNumber: PhoneNumberEntityResponse;
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
    phoneNumber?: InputMaybe<PhoneNumberFiltersInput>;
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
    phoneNumber?: InputMaybe<Scalars['ID']>;
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
export declare type GenericMorph = Area | BillingInfo | ComponentBillingCompany | ComponentBillingMe | ComponentBillingPerson | ComponentLocationAddress | ComponentTimeMeeting | ComponentTimeTimeSlot | Course | Enrollment | I18NLocale | Payment | PhoneNumber | UploadFile | UserInfo | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;
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
    createArea?: Maybe<AreaEntityResponse>;
    createAreaLocalization?: Maybe<AreaEntityResponse>;
    createBillingInfo?: Maybe<BillingInfoEntityResponse>;
    createCourse?: Maybe<CourseEntityResponse>;
    createEnrollment?: Maybe<EnrollmentEntityResponse>;
    createPayment?: Maybe<PaymentEntityResponse>;
    createPhoneNumber?: Maybe<PhoneNumberEntityResponse>;
    createUploadFile?: Maybe<UploadFileEntityResponse>;
    createUserInfo?: Maybe<UserInfoEntityResponse>;
    /** Create a new role */
    createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
    /** Create a new user */
    createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    deleteArea?: Maybe<AreaEntityResponse>;
    deleteBillingInfo?: Maybe<BillingInfoEntityResponse>;
    deleteCourse?: Maybe<CourseEntityResponse>;
    deleteEnrollment?: Maybe<EnrollmentEntityResponse>;
    deletePayment?: Maybe<PaymentEntityResponse>;
    deletePhoneNumber?: Maybe<PhoneNumberEntityResponse>;
    deleteUploadFile?: Maybe<UploadFileEntityResponse>;
    deleteUserInfo?: Maybe<UserInfoEntityResponse>;
    /** Delete an existing role */
    deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
    /** Update an existing user */
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
    updateArea?: Maybe<AreaEntityResponse>;
    updateBillingInfo?: Maybe<BillingInfoEntityResponse>;
    updateCourse?: Maybe<CourseEntityResponse>;
    updateEnrollment?: Maybe<EnrollmentEntityResponse>;
    updateFileInfo: UploadFileEntityResponse;
    updatePayment?: Maybe<PaymentEntityResponse>;
    updatePhoneNumber?: Maybe<PhoneNumberEntityResponse>;
    updateUploadFile?: Maybe<UploadFileEntityResponse>;
    updateUserInfo?: Maybe<UserInfoEntityResponse>;
    /** Update an existing role */
    updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
    /** Update an existing user */
    updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    upload: UploadFileEntityResponse;
};
export declare type MutationCreateAreaArgs = {
    data: AreaInput;
    locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};
export declare type MutationCreateAreaLocalizationArgs = {
    data?: InputMaybe<AreaInput>;
    id?: InputMaybe<Scalars['ID']>;
    locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};
export declare type MutationCreateBillingInfoArgs = {
    data: BillingInfoInput;
};
export declare type MutationCreateCourseArgs = {
    data: CourseInput;
};
export declare type MutationCreateEnrollmentArgs = {
    data: EnrollmentInput;
};
export declare type MutationCreatePaymentArgs = {
    data: PaymentInput;
};
export declare type MutationCreatePhoneNumberArgs = {
    data: PhoneNumberInput;
};
export declare type MutationCreateUploadFileArgs = {
    data: UploadFileInput;
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
export declare type MutationDeleteAreaArgs = {
    id: Scalars['ID'];
    locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};
export declare type MutationDeleteBillingInfoArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteCourseArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteEnrollmentArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeletePaymentArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeletePhoneNumberArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteUploadFileArgs = {
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
export declare type MutationUpdateAreaArgs = {
    data: AreaInput;
    id: Scalars['ID'];
    locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};
export declare type MutationUpdateBillingInfoArgs = {
    data: BillingInfoInput;
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
export declare type MutationUpdateFileInfoArgs = {
    id: Scalars['ID'];
    info?: InputMaybe<FileInfoInput>;
};
export declare type MutationUpdatePaymentArgs = {
    data: PaymentInput;
    id: Scalars['ID'];
};
export declare type MutationUpdatePhoneNumberArgs = {
    data: PhoneNumberInput;
    id: Scalars['ID'];
};
export declare type MutationUpdateUploadFileArgs = {
    data: UploadFileInput;
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
    billing?: Maybe<BillingInfoEntityResponse>;
    confirmCode: Scalars['String'];
    confirmed?: Maybe<Scalars['Boolean']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    enrollment?: Maybe<EnrollmentEntityResponse>;
    hash: Scalars['String'];
    owner?: Maybe<UsersPermissionsUserEntityResponse>;
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
    billing?: InputMaybe<BillingInfoFiltersInput>;
    confirmCode?: InputMaybe<StringFilterInput>;
    confirmed?: InputMaybe<BooleanFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    enrollment?: InputMaybe<EnrollmentFiltersInput>;
    hash?: InputMaybe<StringFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<PaymentFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<PaymentFiltersInput>>>;
    owner?: InputMaybe<UsersPermissionsUserFiltersInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export declare type PaymentInput = {
    billing?: InputMaybe<Scalars['ID']>;
    confirmCode?: InputMaybe<Scalars['String']>;
    confirmed?: InputMaybe<Scalars['Boolean']>;
    enrollment?: InputMaybe<Scalars['ID']>;
    hash?: InputMaybe<Scalars['String']>;
    owner?: InputMaybe<Scalars['ID']>;
};
export declare type PaymentRelationResponseCollection = {
    __typename?: 'PaymentRelationResponseCollection';
    data: Array<PaymentEntity>;
};
export declare type PhoneNumber = {
    __typename?: 'PhoneNumber';
    createdAt?: Maybe<Scalars['DateTime']>;
    number: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type PhoneNumberEntity = {
    __typename?: 'PhoneNumberEntity';
    attributes?: Maybe<PhoneNumber>;
    id?: Maybe<Scalars['ID']>;
};
export declare type PhoneNumberEntityResponse = {
    __typename?: 'PhoneNumberEntityResponse';
    data?: Maybe<PhoneNumberEntity>;
};
export declare type PhoneNumberEntityResponseCollection = {
    __typename?: 'PhoneNumberEntityResponseCollection';
    data: Array<PhoneNumberEntity>;
    meta: ResponseCollectionMeta;
};
export declare type PhoneNumberFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<PhoneNumberFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<PhoneNumberFiltersInput>;
    number?: InputMaybe<StringFilterInput>;
    or?: InputMaybe<Array<InputMaybe<PhoneNumberFiltersInput>>>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};
export declare type PhoneNumberInput = {
    number?: InputMaybe<Scalars['String']>;
};
export declare enum PublicationState {
    Live = "LIVE",
    Preview = "PREVIEW"
}
export declare type Query = {
    __typename?: 'Query';
    area?: Maybe<AreaEntityResponse>;
    areas?: Maybe<AreaEntityResponseCollection>;
    billingInfo?: Maybe<BillingInfoEntityResponse>;
    billingInfos?: Maybe<BillingInfoEntityResponseCollection>;
    course?: Maybe<CourseEntityResponse>;
    courses?: Maybe<CourseEntityResponseCollection>;
    enrollment?: Maybe<EnrollmentEntityResponse>;
    enrollments?: Maybe<EnrollmentEntityResponseCollection>;
    i18NLocale?: Maybe<I18NLocaleEntityResponse>;
    i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
    me?: Maybe<UsersPermissionsMe>;
    payment?: Maybe<PaymentEntityResponse>;
    payments?: Maybe<PaymentEntityResponseCollection>;
    phoneNumber?: Maybe<PhoneNumberEntityResponse>;
    phoneNumbers?: Maybe<PhoneNumberEntityResponseCollection>;
    uploadFile?: Maybe<UploadFileEntityResponse>;
    uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
    userInfo?: Maybe<UserInfoEntityResponse>;
    userInfos?: Maybe<UserInfoEntityResponseCollection>;
    usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
    usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
    usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
    usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};
export declare type QueryAreaArgs = {
    id?: InputMaybe<Scalars['ID']>;
    locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};
export declare type QueryAreasArgs = {
    filters?: InputMaybe<AreaFiltersInput>;
    locale?: InputMaybe<Scalars['I18NLocaleCode']>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
export declare type QueryBillingInfoArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryBillingInfosArgs = {
    filters?: InputMaybe<BillingInfoFiltersInput>;
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
export declare type QueryPhoneNumberArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type QueryPhoneNumbersArgs = {
    filters?: InputMaybe<PhoneNumberFiltersInput>;
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
export declare type TimeFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>;
    contains?: InputMaybe<Scalars['Time']>;
    containsi?: InputMaybe<Scalars['Time']>;
    endsWith?: InputMaybe<Scalars['Time']>;
    eq?: InputMaybe<Scalars['Time']>;
    gt?: InputMaybe<Scalars['Time']>;
    gte?: InputMaybe<Scalars['Time']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>;
    lt?: InputMaybe<Scalars['Time']>;
    lte?: InputMaybe<Scalars['Time']>;
    ne?: InputMaybe<Scalars['Time']>;
    not?: InputMaybe<TimeFilterInput>;
    notContains?: InputMaybe<Scalars['Time']>;
    notContainsi?: InputMaybe<Scalars['Time']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>;
    notNull?: InputMaybe<Scalars['Boolean']>;
    null?: InputMaybe<Scalars['Boolean']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['Time']>>>;
    startsWith?: InputMaybe<Scalars['Time']>;
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
export declare type UserInfo = {
    __typename?: 'UserInfo';
    bio?: Maybe<Scalars['String']>;
    coursesHeld?: Maybe<CourseRelationResponseCollection>;
    createdAt?: Maybe<Scalars['DateTime']>;
    name?: Maybe<Scalars['String']>;
    owner?: Maybe<UsersPermissionsUserEntityResponse>;
    picture?: Maybe<UploadFileEntityResponse>;
    surname?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type UserInfoCoursesHeldArgs = {
    filters?: InputMaybe<CourseFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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
    coursesHeld?: InputMaybe<CourseFiltersInput>;
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
    coursesHeld?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    name?: InputMaybe<Scalars['String']>;
    owner?: InputMaybe<Scalars['ID']>;
    picture?: InputMaybe<Scalars['ID']>;
    surname?: InputMaybe<Scalars['String']>;
};
export declare type UserInfoRelationResponseCollection = {
    __typename?: 'UserInfoRelationResponseCollection';
    data: Array<UserInfoEntity>;
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
    blocked?: Maybe<Scalars['Boolean']>;
    confirmed?: Maybe<Scalars['Boolean']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    email: Scalars['String'];
    enrollments?: Maybe<EnrollmentRelationResponseCollection>;
    payments?: Maybe<PaymentRelationResponseCollection>;
    provider?: Maybe<Scalars['String']>;
    role?: Maybe<UsersPermissionsRoleEntityResponse>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    userInfo?: Maybe<UserInfoEntityResponse>;
    username: Scalars['String'];
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
    blocked?: InputMaybe<BooleanFilterInput>;
    confirmationToken?: InputMaybe<StringFilterInput>;
    confirmed?: InputMaybe<BooleanFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    email?: InputMaybe<StringFilterInput>;
    enrollments?: InputMaybe<EnrollmentFiltersInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<UsersPermissionsUserFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
    password?: InputMaybe<StringFilterInput>;
    payments?: InputMaybe<PaymentFiltersInput>;
    provider?: InputMaybe<StringFilterInput>;
    resetPasswordToken?: InputMaybe<StringFilterInput>;
    role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
    userInfo?: InputMaybe<UserInfoFiltersInput>;
    username?: InputMaybe<StringFilterInput>;
};
export declare type UsersPermissionsUserInput = {
    blocked?: InputMaybe<Scalars['Boolean']>;
    confirmationToken?: InputMaybe<Scalars['String']>;
    confirmed?: InputMaybe<Scalars['Boolean']>;
    email?: InputMaybe<Scalars['String']>;
    enrollments?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    password?: InputMaybe<Scalars['String']>;
    payments?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
    provider?: InputMaybe<Scalars['String']>;
    resetPasswordToken?: InputMaybe<Scalars['String']>;
    role?: InputMaybe<Scalars['ID']>;
    userInfo?: InputMaybe<Scalars['ID']>;
    username?: InputMaybe<Scalars['String']>;
};
export declare type UsersPermissionsUserRelationResponseCollection = {
    __typename?: 'UsersPermissionsUserRelationResponseCollection';
    data: Array<UsersPermissionsUserEntity>;
};
export declare type GetCoursePageBySlugQueryVariables = Exact<{
    slug: Scalars['String'];
}>;
export declare type GetCoursePageBySlugQuery = {
    __typename?: 'Query';
    courses?: {
        __typename?: 'CourseEntityResponseCollection';
        data: Array<{
            __typename?: 'CourseEntity';
            attributes?: {
                __typename?: 'Course';
                title: string;
                description?: string | null;
                slug?: string | null;
                meetings?: Array<{
                    __typename?: 'ComponentTimeMeeting';
                    date?: any | null;
                    timeSlots?: Array<{
                        __typename?: 'ComponentTimeTimeSlot';
                        startTime?: any | null;
                        endTime?: any | null;
                    } | null> | null;
                } | null> | null;
            } | null;
        }>;
    } | null;
};
