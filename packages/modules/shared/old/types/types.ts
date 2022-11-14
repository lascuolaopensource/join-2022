export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
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

export type Area = {
  __typename?: 'Area';
  courses?: Maybe<CourseRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<AreaRelationResponseCollection>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type AreaCoursesArgs = {
  filters?: InputMaybe<CourseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type AreaLocalizationsArgs = {
  filters?: InputMaybe<AreaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type AreaEntity = {
  __typename?: 'AreaEntity';
  attributes?: Maybe<Area>;
  id?: Maybe<Scalars['ID']>;
};

export type AreaEntityResponse = {
  __typename?: 'AreaEntityResponse';
  data?: Maybe<AreaEntity>;
};

export type AreaEntityResponseCollection = {
  __typename?: 'AreaEntityResponseCollection';
  data: Array<AreaEntity>;
  meta: ResponseCollectionMeta;
};

export type AreaFiltersInput = {
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

export type AreaInput = {
  courses?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
};

export type AreaRelationResponseCollection = {
  __typename?: 'AreaRelationResponseCollection';
  data: Array<AreaEntity>;
};

export type BillingInfo = {
  __typename?: 'BillingInfo';
  address: ComponentLocationAddress;
  createdAt?: Maybe<Scalars['DateTime']>;
  data: Array<Maybe<BillingInfoDataDynamicZone>>;
  payment?: Maybe<PaymentEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BillingInfoDataDynamicZone = ComponentBillingCompany | ComponentBillingMe | ComponentBillingPerson | Error;

export type BillingInfoEntity = {
  __typename?: 'BillingInfoEntity';
  attributes?: Maybe<BillingInfo>;
  id?: Maybe<Scalars['ID']>;
};

export type BillingInfoEntityResponse = {
  __typename?: 'BillingInfoEntityResponse';
  data?: Maybe<BillingInfoEntity>;
};

export type BillingInfoEntityResponseCollection = {
  __typename?: 'BillingInfoEntityResponseCollection';
  data: Array<BillingInfoEntity>;
  meta: ResponseCollectionMeta;
};

export type BillingInfoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BillingInfoFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<BillingInfoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BillingInfoFiltersInput>>>;
  payment?: InputMaybe<PaymentFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BillingInfoInput = {
  address?: InputMaybe<ComponentLocationAddressInput>;
  data?: InputMaybe<Array<Scalars['BillingInfoDataDynamicZoneInput']>>;
  payment?: InputMaybe<Scalars['ID']>;
};

export type BooleanFilterInput = {
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

export type ComponentBillingCompany = {
  __typename?: 'ComponentBillingCompany';
  id: Scalars['ID'];
  name: Scalars['String'];
  pec: Scalars['String'];
  sdi: Scalars['String'];
  vat: Scalars['String'];
};

export type ComponentBillingMe = {
  __typename?: 'ComponentBillingMe';
  cf: Scalars['String'];
  id: Scalars['ID'];
};

export type ComponentBillingPerson = {
  __typename?: 'ComponentBillingPerson';
  cf: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  surname: Scalars['String'];
};

export type ComponentLocationAddress = {
  __typename?: 'ComponentLocationAddress';
  cap: Scalars['String'];
  id: Scalars['ID'];
  province: Scalars['String'];
  street: Scalars['String'];
  town: Scalars['String'];
};

export type ComponentLocationAddressInput = {
  cap?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  province?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  town?: InputMaybe<Scalars['String']>;
};

export type ComponentTimeMeeting = {
  __typename?: 'ComponentTimeMeeting';
  date?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  timeSlots?: Maybe<Array<Maybe<ComponentTimeTimeSlot>>>;
};


export type ComponentTimeMeetingTimeSlotsArgs = {
  filters?: InputMaybe<ComponentTimeTimeSlotFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentTimeMeetingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTimeMeetingFiltersInput>>>;
  date?: InputMaybe<DateFilterInput>;
  not?: InputMaybe<ComponentTimeMeetingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTimeMeetingFiltersInput>>>;
};

export type ComponentTimeMeetingInput = {
  date?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  timeSlots?: InputMaybe<Array<InputMaybe<ComponentTimeTimeSlotInput>>>;
};

export type ComponentTimeTimeSlot = {
  __typename?: 'ComponentTimeTimeSlot';
  endTime?: Maybe<Scalars['Time']>;
  id: Scalars['ID'];
  startTime?: Maybe<Scalars['Time']>;
};

export type ComponentTimeTimeSlotFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTimeTimeSlotFiltersInput>>>;
  endTime?: InputMaybe<TimeFilterInput>;
  not?: InputMaybe<ComponentTimeTimeSlotFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTimeTimeSlotFiltersInput>>>;
  startTime?: InputMaybe<TimeFilterInput>;
};

export type ComponentTimeTimeSlotInput = {
  endTime?: InputMaybe<Scalars['Time']>;
  id?: InputMaybe<Scalars['ID']>;
  startTime?: InputMaybe<Scalars['Time']>;
};

export type Course = {
  __typename?: 'Course';
  areas?: Maybe<AreaRelationResponseCollection>;
  confirmed: Scalars['Boolean'];
  createdAt?: Maybe<Scalars['DateTime']>;
  cvNeeded?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  enrollmentDeadline?: Maybe<Scalars['DateTime']>;
  enrollmentMax?: Maybe<Scalars['Int']>;
  enrollmentMin: Scalars['Int'];
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


export type CourseAreasArgs = {
  filters?: InputMaybe<AreaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CourseEnrollmentsArgs = {
  filters?: InputMaybe<EnrollmentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CourseGalleryArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CourseMeetingsArgs = {
  filters?: InputMaybe<ComponentTimeMeetingFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CourseTeachersArgs = {
  filters?: InputMaybe<UserInfoFiltersInput>;
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

export type CourseInput = {
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

export type CourseRelationResponseCollection = {
  __typename?: 'CourseRelationResponseCollection';
  data: Array<CourseEntity>;
};

export type DateFilterInput = {
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

export type DateTimeFilterInput = {
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

export enum Enum_Enrollment_State {
  Approved = 'approved',
  AwaitingPayment = 'awaitingPayment',
  Pending = 'pending',
  Rejected = 'rejected'
}

export enum Enum_Toolslot_Type {
  Availability = 'availability',
  Booking = 'booking'
}

export type Enrollment = {
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
  phoneNumber?: InputMaybe<PhoneNumberFiltersInput>;
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
  phoneNumber?: InputMaybe<Scalars['ID']>;
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

export type GenericMorph = Area | BillingInfo | ComponentBillingCompany | ComponentBillingMe | ComponentBillingPerson | ComponentLocationAddress | ComponentTimeMeeting | ComponentTimeTimeSlot | Course | Enrollment | I18NLocale | Payment | PhoneNumber | Tool | ToolSlot | ToolsBooking | UploadFile | UserInfo | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

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
  createArea?: Maybe<AreaEntityResponse>;
  createAreaLocalization?: Maybe<AreaEntityResponse>;
  createBillingInfo?: Maybe<BillingInfoEntityResponse>;
  createCourse?: Maybe<CourseEntityResponse>;
  createEnrollment?: Maybe<EnrollmentEntityResponse>;
  createPayment?: Maybe<PaymentEntityResponse>;
  createPhoneNumber?: Maybe<PhoneNumberEntityResponse>;
  createTool?: Maybe<ToolEntityResponse>;
  createToolLocalization?: Maybe<ToolEntityResponse>;
  createToolSlot?: Maybe<ToolSlotEntityResponse>;
  createToolsBooking?: Maybe<ToolsBookingEntityResponse>;
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
  deleteTool?: Maybe<ToolEntityResponse>;
  deleteToolSlot?: Maybe<ToolSlotEntityResponse>;
  deleteToolsBooking?: Maybe<ToolsBookingEntityResponse>;
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
  updateTool?: Maybe<ToolEntityResponse>;
  updateToolSlot?: Maybe<ToolSlotEntityResponse>;
  updateToolsBooking?: Maybe<ToolsBookingEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUserInfo?: Maybe<UserInfoEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationCreateAreaArgs = {
  data: AreaInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateAreaLocalizationArgs = {
  data?: InputMaybe<AreaInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateBillingInfoArgs = {
  data: BillingInfoInput;
};


export type MutationCreateCourseArgs = {
  data: CourseInput;
};


export type MutationCreateEnrollmentArgs = {
  data: EnrollmentInput;
};


export type MutationCreatePaymentArgs = {
  data: PaymentInput;
};


export type MutationCreatePhoneNumberArgs = {
  data: PhoneNumberInput;
};


export type MutationCreateToolArgs = {
  data: ToolInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateToolLocalizationArgs = {
  data?: InputMaybe<ToolInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateToolSlotArgs = {
  data: ToolSlotInput;
};


export type MutationCreateToolsBookingArgs = {
  data: ToolsBookingInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
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


export type MutationDeleteAreaArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteBillingInfoArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCourseArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteEnrollmentArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePaymentArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePhoneNumberArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteToolArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteToolSlotArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteToolsBookingArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFileArgs = {
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


export type MutationUpdateAreaArgs = {
  data: AreaInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateBillingInfoArgs = {
  data: BillingInfoInput;
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


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdatePaymentArgs = {
  data: PaymentInput;
  id: Scalars['ID'];
};


export type MutationUpdatePhoneNumberArgs = {
  data: PhoneNumberInput;
  id: Scalars['ID'];
};


export type MutationUpdateToolArgs = {
  data: ToolInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateToolSlotArgs = {
  data: ToolSlotInput;
  id: Scalars['ID'];
};


export type MutationUpdateToolsBookingArgs = {
  data: ToolsBookingInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
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
  billing?: Maybe<BillingInfoEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  enrollment?: Maybe<EnrollmentEntityResponse>;
  expiration: Scalars['DateTime'];
  hash: Scalars['String'];
  owner?: Maybe<UsersPermissionsUserEntityResponse>;
  paid: Scalars['Boolean'];
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
  billing?: InputMaybe<BillingInfoFiltersInput>;
  confirmCode?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  enrollment?: InputMaybe<EnrollmentFiltersInput>;
  expiration?: InputMaybe<DateTimeFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PaymentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PaymentFiltersInput>>>;
  owner?: InputMaybe<UsersPermissionsUserFiltersInput>;
  paid?: InputMaybe<BooleanFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PaymentInput = {
  billing?: InputMaybe<Scalars['ID']>;
  confirmCode?: InputMaybe<Scalars['String']>;
  enrollment?: InputMaybe<Scalars['ID']>;
  expiration?: InputMaybe<Scalars['DateTime']>;
  hash?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['ID']>;
  paid?: InputMaybe<Scalars['Boolean']>;
};

export type PaymentRelationResponseCollection = {
  __typename?: 'PaymentRelationResponseCollection';
  data: Array<PaymentEntity>;
};

export type PhoneNumber = {
  __typename?: 'PhoneNumber';
  createdAt?: Maybe<Scalars['DateTime']>;
  number: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PhoneNumberEntity = {
  __typename?: 'PhoneNumberEntity';
  attributes?: Maybe<PhoneNumber>;
  id?: Maybe<Scalars['ID']>;
};

export type PhoneNumberEntityResponse = {
  __typename?: 'PhoneNumberEntityResponse';
  data?: Maybe<PhoneNumberEntity>;
};

export type PhoneNumberEntityResponseCollection = {
  __typename?: 'PhoneNumberEntityResponseCollection';
  data: Array<PhoneNumberEntity>;
  meta: ResponseCollectionMeta;
};

export type PhoneNumberFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PhoneNumberFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PhoneNumberFiltersInput>;
  number?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<PhoneNumberFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PhoneNumberInput = {
  number?: InputMaybe<Scalars['String']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
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
  tool?: Maybe<ToolEntityResponse>;
  toolSlot?: Maybe<ToolSlotEntityResponse>;
  toolSlots?: Maybe<ToolSlotEntityResponseCollection>;
  tools?: Maybe<ToolEntityResponseCollection>;
  toolsBooking?: Maybe<ToolsBookingEntityResponse>;
  toolsBookings?: Maybe<ToolsBookingEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  userInfo?: Maybe<UserInfoEntityResponse>;
  userInfos?: Maybe<UserInfoEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryAreaArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryAreasArgs = {
  filters?: InputMaybe<AreaFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryBillingInfoArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryBillingInfosArgs = {
  filters?: InputMaybe<BillingInfoFiltersInput>;
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


export type QueryPhoneNumberArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryPhoneNumbersArgs = {
  filters?: InputMaybe<PhoneNumberFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryToolArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryToolSlotArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryToolSlotsArgs = {
  filters?: InputMaybe<ToolSlotFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryToolsArgs = {
  filters?: InputMaybe<ToolFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryToolsBookingArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryToolsBookingsArgs = {
  filters?: InputMaybe<ToolsBookingFiltersInput>;
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

export type TimeFilterInput = {
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

export type Tool = {
  __typename?: 'Tool';
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ToolRelationResponseCollection>;
  name: Scalars['String'];
  slots?: Maybe<ToolSlotRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ToolLocalizationsArgs = {
  filters?: InputMaybe<ToolFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ToolSlotsArgs = {
  filters?: InputMaybe<ToolSlotFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ToolEntity = {
  __typename?: 'ToolEntity';
  attributes?: Maybe<Tool>;
  id?: Maybe<Scalars['ID']>;
};

export type ToolEntityResponse = {
  __typename?: 'ToolEntityResponse';
  data?: Maybe<ToolEntity>;
};

export type ToolEntityResponseCollection = {
  __typename?: 'ToolEntityResponseCollection';
  data: Array<ToolEntity>;
  meta: ResponseCollectionMeta;
};

export type ToolFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ToolFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ToolFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ToolFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ToolFiltersInput>>>;
  slots?: InputMaybe<ToolSlotFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ToolInput = {
  name?: InputMaybe<Scalars['String']>;
  slots?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type ToolRelationResponseCollection = {
  __typename?: 'ToolRelationResponseCollection';
  data: Array<ToolEntity>;
};

export type ToolSlot = {
  __typename?: 'ToolSlot';
  booking?: Maybe<ToolsBookingEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
  tool?: Maybe<ToolEntityResponse>;
  type: Enum_Toolslot_Type;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ToolSlotEntity = {
  __typename?: 'ToolSlotEntity';
  attributes?: Maybe<ToolSlot>;
  id?: Maybe<Scalars['ID']>;
};

export type ToolSlotEntityResponse = {
  __typename?: 'ToolSlotEntityResponse';
  data?: Maybe<ToolSlotEntity>;
};

export type ToolSlotEntityResponseCollection = {
  __typename?: 'ToolSlotEntityResponseCollection';
  data: Array<ToolSlotEntity>;
  meta: ResponseCollectionMeta;
};

export type ToolSlotFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ToolSlotFiltersInput>>>;
  booking?: InputMaybe<ToolsBookingFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  end?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ToolSlotFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ToolSlotFiltersInput>>>;
  start?: InputMaybe<DateTimeFilterInput>;
  tool?: InputMaybe<ToolFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ToolSlotInput = {
  booking?: InputMaybe<Scalars['ID']>;
  end?: InputMaybe<Scalars['DateTime']>;
  start?: InputMaybe<Scalars['DateTime']>;
  tool?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<Enum_Toolslot_Type>;
};

export type ToolSlotRelationResponseCollection = {
  __typename?: 'ToolSlotRelationResponseCollection';
  data: Array<ToolSlotEntity>;
};

export type ToolsBooking = {
  __typename?: 'ToolsBooking';
  createdAt?: Maybe<Scalars['DateTime']>;
  owner?: Maybe<UsersPermissionsUserEntityResponse>;
  slots?: Maybe<ToolSlotRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ToolsBookingSlotsArgs = {
  filters?: InputMaybe<ToolSlotFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ToolsBookingEntity = {
  __typename?: 'ToolsBookingEntity';
  attributes?: Maybe<ToolsBooking>;
  id?: Maybe<Scalars['ID']>;
};

export type ToolsBookingEntityResponse = {
  __typename?: 'ToolsBookingEntityResponse';
  data?: Maybe<ToolsBookingEntity>;
};

export type ToolsBookingEntityResponseCollection = {
  __typename?: 'ToolsBookingEntityResponseCollection';
  data: Array<ToolsBookingEntity>;
  meta: ResponseCollectionMeta;
};

export type ToolsBookingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ToolsBookingFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ToolsBookingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ToolsBookingFiltersInput>>>;
  owner?: InputMaybe<UsersPermissionsUserFiltersInput>;
  slots?: InputMaybe<ToolSlotFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ToolsBookingInput = {
  owner?: InputMaybe<Scalars['ID']>;
  slots?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type ToolsBookingRelationResponseCollection = {
  __typename?: 'ToolsBookingRelationResponseCollection';
  data: Array<ToolsBookingEntity>;
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

export type UserInfo = {
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


export type UserInfoCoursesHeldArgs = {
  filters?: InputMaybe<CourseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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

export type UserInfoInput = {
  bio?: InputMaybe<Scalars['String']>;
  coursesHeld?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['ID']>;
  picture?: InputMaybe<Scalars['ID']>;
  surname?: InputMaybe<Scalars['String']>;
};

export type UserInfoRelationResponseCollection = {
  __typename?: 'UserInfoRelationResponseCollection';
  data: Array<UserInfoEntity>;
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
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  enrollments?: Maybe<EnrollmentRelationResponseCollection>;
  payments?: Maybe<PaymentRelationResponseCollection>;
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  tools_bookings?: Maybe<ToolsBookingRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userInfo?: Maybe<UserInfoEntityResponse>;
  username: Scalars['String'];
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


export type UsersPermissionsUserTools_BookingsArgs = {
  filters?: InputMaybe<ToolsBookingFiltersInput>;
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
  tools_bookings?: InputMaybe<ToolsBookingFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  userInfo?: InputMaybe<UserInfoFiltersInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
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
  tools_bookings?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  userInfo?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type GetCoursePageBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetCoursePageBySlugQuery = { __typename?: 'Query', courses?: { __typename?: 'CourseEntityResponseCollection', data: Array<{ __typename?: 'CourseEntity', attributes?: { __typename?: 'Course', title: string, description?: string | null, slug?: string | null, meetings?: Array<{ __typename?: 'ComponentTimeMeeting', date?: any | null, timeSlots?: Array<{ __typename?: 'ComponentTimeTimeSlot', startTime?: any | null, endTime?: any | null } | null> | null } | null> | null } | null }> } | null };
