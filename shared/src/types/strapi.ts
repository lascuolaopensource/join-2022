export type Maybe<T> = T | null;
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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A time string with format HH:mm:ss.SSS */
  Time: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  BillingInfoDataDynamicZoneInput: any;
  /** A string used to identify an i18n locale */
  I18NLocaleCode: any;
};






export type Error = {
  __typename?: 'Error';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  total: Scalars['Int'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  pageCount: Scalars['Int'];
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type IdFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['ID']>>>;
  or?: Maybe<Array<Maybe<Scalars['ID']>>>;
  not?: Maybe<IdFilterInput>;
  eq?: Maybe<Scalars['ID']>;
  ne?: Maybe<Scalars['ID']>;
  startsWith?: Maybe<Scalars['ID']>;
  endsWith?: Maybe<Scalars['ID']>;
  contains?: Maybe<Scalars['ID']>;
  notContains?: Maybe<Scalars['ID']>;
  containsi?: Maybe<Scalars['ID']>;
  notContainsi?: Maybe<Scalars['ID']>;
  gt?: Maybe<Scalars['ID']>;
  gte?: Maybe<Scalars['ID']>;
  lt?: Maybe<Scalars['ID']>;
  lte?: Maybe<Scalars['ID']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['ID']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
  between?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type BooleanFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  or?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  not?: Maybe<BooleanFilterInput>;
  eq?: Maybe<Scalars['Boolean']>;
  ne?: Maybe<Scalars['Boolean']>;
  startsWith?: Maybe<Scalars['Boolean']>;
  endsWith?: Maybe<Scalars['Boolean']>;
  contains?: Maybe<Scalars['Boolean']>;
  notContains?: Maybe<Scalars['Boolean']>;
  containsi?: Maybe<Scalars['Boolean']>;
  notContainsi?: Maybe<Scalars['Boolean']>;
  gt?: Maybe<Scalars['Boolean']>;
  gte?: Maybe<Scalars['Boolean']>;
  lt?: Maybe<Scalars['Boolean']>;
  lte?: Maybe<Scalars['Boolean']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  between?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
};

export type StringFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['String']>>>;
  or?: Maybe<Array<Maybe<Scalars['String']>>>;
  not?: Maybe<StringFilterInput>;
  eq?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  notContains?: Maybe<Scalars['String']>;
  containsi?: Maybe<Scalars['String']>;
  notContainsi?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  between?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IntFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['Int']>>>;
  or?: Maybe<Array<Maybe<Scalars['Int']>>>;
  not?: Maybe<IntFilterInput>;
  eq?: Maybe<Scalars['Int']>;
  ne?: Maybe<Scalars['Int']>;
  startsWith?: Maybe<Scalars['Int']>;
  endsWith?: Maybe<Scalars['Int']>;
  contains?: Maybe<Scalars['Int']>;
  notContains?: Maybe<Scalars['Int']>;
  containsi?: Maybe<Scalars['Int']>;
  notContainsi?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
  between?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type FloatFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['Float']>>>;
  or?: Maybe<Array<Maybe<Scalars['Float']>>>;
  not?: Maybe<FloatFilterInput>;
  eq?: Maybe<Scalars['Float']>;
  ne?: Maybe<Scalars['Float']>;
  startsWith?: Maybe<Scalars['Float']>;
  endsWith?: Maybe<Scalars['Float']>;
  contains?: Maybe<Scalars['Float']>;
  notContains?: Maybe<Scalars['Float']>;
  containsi?: Maybe<Scalars['Float']>;
  notContainsi?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Float']>>>;
  between?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type DateFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['Date']>>>;
  or?: Maybe<Array<Maybe<Scalars['Date']>>>;
  not?: Maybe<DateFilterInput>;
  eq?: Maybe<Scalars['Date']>;
  ne?: Maybe<Scalars['Date']>;
  startsWith?: Maybe<Scalars['Date']>;
  endsWith?: Maybe<Scalars['Date']>;
  contains?: Maybe<Scalars['Date']>;
  notContains?: Maybe<Scalars['Date']>;
  containsi?: Maybe<Scalars['Date']>;
  notContainsi?: Maybe<Scalars['Date']>;
  gt?: Maybe<Scalars['Date']>;
  gte?: Maybe<Scalars['Date']>;
  lt?: Maybe<Scalars['Date']>;
  lte?: Maybe<Scalars['Date']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['Date']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Date']>>>;
  between?: Maybe<Array<Maybe<Scalars['Date']>>>;
};

export type TimeFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['Time']>>>;
  or?: Maybe<Array<Maybe<Scalars['Time']>>>;
  not?: Maybe<TimeFilterInput>;
  eq?: Maybe<Scalars['Time']>;
  ne?: Maybe<Scalars['Time']>;
  startsWith?: Maybe<Scalars['Time']>;
  endsWith?: Maybe<Scalars['Time']>;
  contains?: Maybe<Scalars['Time']>;
  notContains?: Maybe<Scalars['Time']>;
  containsi?: Maybe<Scalars['Time']>;
  notContainsi?: Maybe<Scalars['Time']>;
  gt?: Maybe<Scalars['Time']>;
  gte?: Maybe<Scalars['Time']>;
  lt?: Maybe<Scalars['Time']>;
  lte?: Maybe<Scalars['Time']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['Time']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Time']>>>;
  between?: Maybe<Array<Maybe<Scalars['Time']>>>;
};

export type DateTimeFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  or?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  not?: Maybe<DateTimeFilterInput>;
  eq?: Maybe<Scalars['DateTime']>;
  ne?: Maybe<Scalars['DateTime']>;
  startsWith?: Maybe<Scalars['DateTime']>;
  endsWith?: Maybe<Scalars['DateTime']>;
  contains?: Maybe<Scalars['DateTime']>;
  notContains?: Maybe<Scalars['DateTime']>;
  containsi?: Maybe<Scalars['DateTime']>;
  notContainsi?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  between?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
};

export type JsonFilterInput = {
  and?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  or?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  not?: Maybe<JsonFilterInput>;
  eq?: Maybe<Scalars['JSON']>;
  ne?: Maybe<Scalars['JSON']>;
  startsWith?: Maybe<Scalars['JSON']>;
  endsWith?: Maybe<Scalars['JSON']>;
  contains?: Maybe<Scalars['JSON']>;
  notContains?: Maybe<Scalars['JSON']>;
  containsi?: Maybe<Scalars['JSON']>;
  notContainsi?: Maybe<Scalars['JSON']>;
  gt?: Maybe<Scalars['JSON']>;
  gte?: Maybe<Scalars['JSON']>;
  lt?: Maybe<Scalars['JSON']>;
  lte?: Maybe<Scalars['JSON']>;
  null?: Maybe<Scalars['Boolean']>;
  notNull?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  between?: Maybe<Array<Maybe<Scalars['JSON']>>>;
};

export type ComponentBillingCompany = {
  __typename?: 'ComponentBillingCompany';
  id: Scalars['ID'];
  name: Scalars['String'];
  vat: Scalars['String'];
  sdi: Scalars['String'];
};

export type ComponentBillingPerson = {
  __typename?: 'ComponentBillingPerson';
  id: Scalars['ID'];
  name: Scalars['String'];
  surname: Scalars['String'];
  cf: Scalars['String'];
};

export type ComponentLocationAddressInput = {
  id?: Maybe<Scalars['ID']>;
  cap?: Maybe<Scalars['String']>;
  town?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

export type ComponentLocationAddress = {
  __typename?: 'ComponentLocationAddress';
  id: Scalars['ID'];
  cap: Scalars['String'];
  town: Scalars['String'];
  province: Scalars['String'];
  street: Scalars['String'];
};

export type ComponentTimeMeetingFiltersInput = {
  date?: Maybe<DateFilterInput>;
  and?: Maybe<Array<Maybe<ComponentTimeMeetingFiltersInput>>>;
  or?: Maybe<Array<Maybe<ComponentTimeMeetingFiltersInput>>>;
  not?: Maybe<ComponentTimeMeetingFiltersInput>;
};

export type ComponentTimeMeetingInput = {
  id?: Maybe<Scalars['ID']>;
  date?: Maybe<Scalars['Date']>;
  timeSlots?: Maybe<Array<Maybe<ComponentTimeTimeSlotInput>>>;
};

export type ComponentTimeMeeting = {
  __typename?: 'ComponentTimeMeeting';
  id: Scalars['ID'];
  date?: Maybe<Scalars['Date']>;
  timeSlots?: Maybe<Array<Maybe<ComponentTimeTimeSlot>>>;
};


export type ComponentTimeMeetingTimeSlotsArgs = {
  filters?: Maybe<ComponentTimeTimeSlotFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ComponentTimeTimeSlotFiltersInput = {
  startTime?: Maybe<TimeFilterInput>;
  endTime?: Maybe<TimeFilterInput>;
  and?: Maybe<Array<Maybe<ComponentTimeTimeSlotFiltersInput>>>;
  or?: Maybe<Array<Maybe<ComponentTimeTimeSlotFiltersInput>>>;
  not?: Maybe<ComponentTimeTimeSlotFiltersInput>;
};

export type ComponentTimeTimeSlotInput = {
  id?: Maybe<Scalars['ID']>;
  startTime?: Maybe<Scalars['Time']>;
  endTime?: Maybe<Scalars['Time']>;
};

export type ComponentTimeTimeSlot = {
  __typename?: 'ComponentTimeTimeSlot';
  id: Scalars['ID'];
  startTime?: Maybe<Scalars['Time']>;
  endTime?: Maybe<Scalars['Time']>;
};

export type UploadFileFiltersInput = {
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  alternativeText?: Maybe<StringFilterInput>;
  caption?: Maybe<StringFilterInput>;
  width?: Maybe<IntFilterInput>;
  height?: Maybe<IntFilterInput>;
  formats?: Maybe<JsonFilterInput>;
  hash?: Maybe<StringFilterInput>;
  ext?: Maybe<StringFilterInput>;
  mime?: Maybe<StringFilterInput>;
  size?: Maybe<FloatFilterInput>;
  url?: Maybe<StringFilterInput>;
  previewUrl?: Maybe<StringFilterInput>;
  provider?: Maybe<StringFilterInput>;
  provider_metadata?: Maybe<JsonFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<UploadFileFiltersInput>>>;
  or?: Maybe<Array<Maybe<UploadFileFiltersInput>>>;
  not?: Maybe<UploadFileFiltersInput>;
};

export type UploadFileInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash?: Maybe<Scalars['String']>;
  ext?: Maybe<Scalars['String']>;
  mime?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
  previewUrl?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_metadata?: Maybe<Scalars['JSON']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  name: Scalars['String'];
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<UploadFile>;
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

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type I18NLocaleFiltersInput = {
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  code?: Maybe<StringFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<I18NLocaleFiltersInput>>>;
  or?: Maybe<Array<Maybe<I18NLocaleFiltersInput>>>;
  not?: Maybe<I18NLocaleFiltersInput>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<I18NLocale>;
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

export type UsersPermissionsPermissionFiltersInput = {
  id?: Maybe<IdFilterInput>;
  action?: Maybe<StringFilterInput>;
  role?: Maybe<UsersPermissionsRoleFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<UsersPermissionsPermissionFiltersInput>>>;
  or?: Maybe<Array<Maybe<UsersPermissionsPermissionFiltersInput>>>;
  not?: Maybe<UsersPermissionsPermissionFiltersInput>;
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<UsersPermissionsPermission>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRoleFiltersInput = {
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  description?: Maybe<StringFilterInput>;
  type?: Maybe<StringFilterInput>;
  permissions?: Maybe<UsersPermissionsPermissionFiltersInput>;
  users?: Maybe<UsersPermissionsUserFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<UsersPermissionsRoleFiltersInput>>>;
  or?: Maybe<Array<Maybe<UsersPermissionsRoleFiltersInput>>>;
  not?: Maybe<UsersPermissionsRoleFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: Maybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: Maybe<UsersPermissionsUserFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<UsersPermissionsRole>;
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

export type UsersPermissionsUserFiltersInput = {
  id?: Maybe<IdFilterInput>;
  username?: Maybe<StringFilterInput>;
  email?: Maybe<StringFilterInput>;
  provider?: Maybe<StringFilterInput>;
  password?: Maybe<StringFilterInput>;
  resetPasswordToken?: Maybe<StringFilterInput>;
  confirmationToken?: Maybe<StringFilterInput>;
  confirmed?: Maybe<BooleanFilterInput>;
  blocked?: Maybe<BooleanFilterInput>;
  role?: Maybe<UsersPermissionsRoleFiltersInput>;
  enrollments?: Maybe<EnrollmentFiltersInput>;
  userInfo?: Maybe<UserInfoFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<UsersPermissionsUserFiltersInput>>>;
  or?: Maybe<Array<Maybe<UsersPermissionsUserFiltersInput>>>;
  not?: Maybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsUserInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['ID']>;
  enrollments?: Maybe<Array<Maybe<Scalars['ID']>>>;
  userInfo?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  username: Scalars['String'];
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  enrollments?: Maybe<EnrollmentRelationResponseCollection>;
  userInfo?: Maybe<UserInfoEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UsersPermissionsUserEnrollmentsArgs = {
  filters?: Maybe<EnrollmentFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<UsersPermissionsUser>;
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

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type AreaFiltersInput = {
  id?: Maybe<IdFilterInput>;
  name?: Maybe<StringFilterInput>;
  courses?: Maybe<CourseFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  localizations?: Maybe<AreaFiltersInput>;
  locale?: Maybe<StringFilterInput>;
  and?: Maybe<Array<Maybe<AreaFiltersInput>>>;
  or?: Maybe<Array<Maybe<AreaFiltersInput>>>;
  not?: Maybe<AreaFiltersInput>;
};

export type AreaInput = {
  name?: Maybe<Scalars['String']>;
  courses?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type Area = {
  __typename?: 'Area';
  name?: Maybe<Scalars['String']>;
  courses?: Maybe<CourseRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<AreaRelationResponseCollection>;
  locale?: Maybe<Scalars['String']>;
};


export type AreaCoursesArgs = {
  filters?: Maybe<CourseFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  publicationState?: Maybe<PublicationState>;
};


export type AreaLocalizationsArgs = {
  filters?: Maybe<AreaFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AreaEntity = {
  __typename?: 'AreaEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<Area>;
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

export type AreaRelationResponseCollection = {
  __typename?: 'AreaRelationResponseCollection';
  data: Array<AreaEntity>;
};

export type BillingInfoDataDynamicZone = ComponentBillingCompany | ComponentBillingPerson | Error;


export type BillingInfoFiltersInput = {
  id?: Maybe<IdFilterInput>;
  email?: Maybe<StringFilterInput>;
  payment?: Maybe<PaymentFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<BillingInfoFiltersInput>>>;
  or?: Maybe<Array<Maybe<BillingInfoFiltersInput>>>;
  not?: Maybe<BillingInfoFiltersInput>;
};

export type BillingInfoInput = {
  address?: Maybe<ComponentLocationAddressInput>;
  email?: Maybe<Scalars['String']>;
  data?: Maybe<Array<Scalars['BillingInfoDataDynamicZoneInput']>>;
  payment?: Maybe<Scalars['ID']>;
};

export type BillingInfo = {
  __typename?: 'BillingInfo';
  address: ComponentLocationAddress;
  email: Scalars['String'];
  data: Array<Maybe<BillingInfoDataDynamicZone>>;
  payment?: Maybe<PaymentEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BillingInfoEntity = {
  __typename?: 'BillingInfoEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<BillingInfo>;
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

export type CourseFiltersInput = {
  id?: Maybe<IdFilterInput>;
  title?: Maybe<StringFilterInput>;
  description?: Maybe<StringFilterInput>;
  preconditionsNeeded?: Maybe<BooleanFilterInput>;
  price?: Maybe<IntFilterInput>;
  confirmed?: Maybe<BooleanFilterInput>;
  enrollmentDeadline?: Maybe<DateFilterInput>;
  enrollmentMin?: Maybe<IntFilterInput>;
  enrollmentMax?: Maybe<IntFilterInput>;
  teachers?: Maybe<UserInfoFiltersInput>;
  enrollments?: Maybe<EnrollmentFiltersInput>;
  cvNeeded?: Maybe<BooleanFilterInput>;
  portfolioNeeded?: Maybe<BooleanFilterInput>;
  motivationalLetterNeeded?: Maybe<BooleanFilterInput>;
  areas?: Maybe<AreaFiltersInput>;
  slug?: Maybe<StringFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  publishedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<CourseFiltersInput>>>;
  or?: Maybe<Array<Maybe<CourseFiltersInput>>>;
  not?: Maybe<CourseFiltersInput>;
};

export type CourseInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  preconditionsNeeded?: Maybe<Scalars['Boolean']>;
  price?: Maybe<Scalars['Int']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  enrollmentDeadline?: Maybe<Scalars['Date']>;
  enrollmentMin?: Maybe<Scalars['Int']>;
  enrollmentMax?: Maybe<Scalars['Int']>;
  meetings?: Maybe<Array<Maybe<ComponentTimeMeetingInput>>>;
  gallery?: Maybe<Array<Maybe<Scalars['ID']>>>;
  teachers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  enrollments?: Maybe<Array<Maybe<Scalars['ID']>>>;
  cvNeeded?: Maybe<Scalars['Boolean']>;
  portfolioNeeded?: Maybe<Scalars['Boolean']>;
  motivationalLetterNeeded?: Maybe<Scalars['Boolean']>;
  areas?: Maybe<Array<Maybe<Scalars['ID']>>>;
  slug?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
};

export type Course = {
  __typename?: 'Course';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  preconditionsNeeded?: Maybe<Scalars['Boolean']>;
  price?: Maybe<Scalars['Int']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  enrollmentDeadline?: Maybe<Scalars['Date']>;
  enrollmentMin?: Maybe<Scalars['Int']>;
  enrollmentMax?: Maybe<Scalars['Int']>;
  meetings?: Maybe<Array<Maybe<ComponentTimeMeeting>>>;
  gallery?: Maybe<UploadFileRelationResponseCollection>;
  teachers?: Maybe<UserInfoRelationResponseCollection>;
  enrollments?: Maybe<EnrollmentRelationResponseCollection>;
  cvNeeded?: Maybe<Scalars['Boolean']>;
  portfolioNeeded?: Maybe<Scalars['Boolean']>;
  motivationalLetterNeeded?: Maybe<Scalars['Boolean']>;
  areas?: Maybe<AreaRelationResponseCollection>;
  slug?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
};


export type CourseMeetingsArgs = {
  filters?: Maybe<ComponentTimeMeetingFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type CourseGalleryArgs = {
  filters?: Maybe<UploadFileFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type CourseTeachersArgs = {
  filters?: Maybe<UserInfoFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type CourseEnrollmentsArgs = {
  filters?: Maybe<EnrollmentFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type CourseAreasArgs = {
  filters?: Maybe<AreaFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CourseEntity = {
  __typename?: 'CourseEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<Course>;
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

export type CourseRelationResponseCollection = {
  __typename?: 'CourseRelationResponseCollection';
  data: Array<CourseEntity>;
};

export enum Enum_Enrollment_State {
  AwaitingPayment = 'awaitingPayment',
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}

export type EnrollmentFiltersInput = {
  id?: Maybe<IdFilterInput>;
  owner?: Maybe<UsersPermissionsUserFiltersInput>;
  state?: Maybe<StringFilterInput>;
  cvUrl?: Maybe<StringFilterInput>;
  portfolioUrl?: Maybe<StringFilterInput>;
  motivationalLetter?: Maybe<StringFilterInput>;
  course?: Maybe<CourseFiltersInput>;
  phoneNumber?: Maybe<PhoneNumberFiltersInput>;
  payment?: Maybe<PaymentFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<EnrollmentFiltersInput>>>;
  or?: Maybe<Array<Maybe<EnrollmentFiltersInput>>>;
  not?: Maybe<EnrollmentFiltersInput>;
};

export type EnrollmentInput = {
  owner?: Maybe<Scalars['ID']>;
  state?: Maybe<Enum_Enrollment_State>;
  cvUrl?: Maybe<Scalars['String']>;
  portfolioUrl?: Maybe<Scalars['String']>;
  motivationalLetter?: Maybe<Scalars['String']>;
  course?: Maybe<Scalars['ID']>;
  phoneNumber?: Maybe<Scalars['ID']>;
  payment?: Maybe<Scalars['ID']>;
};

export type Enrollment = {
  __typename?: 'Enrollment';
  owner?: Maybe<UsersPermissionsUserEntityResponse>;
  state: Enum_Enrollment_State;
  cvUrl?: Maybe<Scalars['String']>;
  portfolioUrl?: Maybe<Scalars['String']>;
  motivationalLetter?: Maybe<Scalars['String']>;
  course?: Maybe<CourseEntityResponse>;
  phoneNumber: PhoneNumberEntityResponse;
  payment?: Maybe<PaymentEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EnrollmentEntity = {
  __typename?: 'EnrollmentEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<Enrollment>;
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

export type EnrollmentRelationResponseCollection = {
  __typename?: 'EnrollmentRelationResponseCollection';
  data: Array<EnrollmentEntity>;
};

export type PaymentFiltersInput = {
  id?: Maybe<IdFilterInput>;
  hash?: Maybe<StringFilterInput>;
  billing?: Maybe<BillingInfoFiltersInput>;
  enrollment?: Maybe<EnrollmentFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<PaymentFiltersInput>>>;
  or?: Maybe<Array<Maybe<PaymentFiltersInput>>>;
  not?: Maybe<PaymentFiltersInput>;
};

export type PaymentInput = {
  hash?: Maybe<Scalars['String']>;
  billing?: Maybe<Scalars['ID']>;
  enrollment?: Maybe<Scalars['ID']>;
};

export type Payment = {
  __typename?: 'Payment';
  hash: Scalars['String'];
  billing?: Maybe<BillingInfoEntityResponse>;
  enrollment?: Maybe<EnrollmentEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PaymentEntity = {
  __typename?: 'PaymentEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<Payment>;
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

export type PhoneNumberFiltersInput = {
  id?: Maybe<IdFilterInput>;
  number?: Maybe<StringFilterInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<PhoneNumberFiltersInput>>>;
  or?: Maybe<Array<Maybe<PhoneNumberFiltersInput>>>;
  not?: Maybe<PhoneNumberFiltersInput>;
};

export type PhoneNumberInput = {
  number?: Maybe<Scalars['String']>;
};

export type PhoneNumber = {
  __typename?: 'PhoneNumber';
  number: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PhoneNumberEntity = {
  __typename?: 'PhoneNumberEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<PhoneNumber>;
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

export type UserInfoFiltersInput = {
  id?: Maybe<IdFilterInput>;
  surname?: Maybe<StringFilterInput>;
  name?: Maybe<StringFilterInput>;
  bio?: Maybe<StringFilterInput>;
  coursesHeld?: Maybe<CourseFiltersInput>;
  owner?: Maybe<UsersPermissionsUserFiltersInput>;
  createdAt?: Maybe<DateTimeFilterInput>;
  updatedAt?: Maybe<DateTimeFilterInput>;
  and?: Maybe<Array<Maybe<UserInfoFiltersInput>>>;
  or?: Maybe<Array<Maybe<UserInfoFiltersInput>>>;
  not?: Maybe<UserInfoFiltersInput>;
};

export type UserInfoInput = {
  surname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['ID']>;
  coursesHeld?: Maybe<Array<Maybe<Scalars['ID']>>>;
  owner?: Maybe<Scalars['ID']>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  surname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  picture?: Maybe<UploadFileEntityResponse>;
  coursesHeld?: Maybe<CourseRelationResponseCollection>;
  owner?: Maybe<UsersPermissionsUserEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UserInfoCoursesHeldArgs = {
  filters?: Maybe<CourseFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  publicationState?: Maybe<PublicationState>;
};

export type UserInfoEntity = {
  __typename?: 'UserInfoEntity';
  id?: Maybe<Scalars['ID']>;
  attributes?: Maybe<UserInfo>;
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

export type UserInfoRelationResponseCollection = {
  __typename?: 'UserInfoRelationResponseCollection';
  data: Array<UserInfoEntity>;
};

export type GenericMorph = ComponentBillingCompany | ComponentBillingPerson | ComponentLocationAddress | ComponentTimeMeeting | ComponentTimeTimeSlot | UploadFile | I18NLocale | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | Area | BillingInfo | Course | Enrollment | Payment | PhoneNumber | UserInfo;

export type FileInfoInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};


export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  id: Scalars['ID'];
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<UsersPermissionsMeRole>;
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type PaginationArg = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  area?: Maybe<AreaEntityResponse>;
  areas?: Maybe<AreaEntityResponseCollection>;
  billingInfo?: Maybe<BillingInfoEntityResponse>;
  billingInfos?: Maybe<BillingInfoEntityResponseCollection>;
  course?: Maybe<CourseEntityResponse>;
  courses?: Maybe<CourseEntityResponseCollection>;
  enrollment?: Maybe<EnrollmentEntityResponse>;
  enrollments?: Maybe<EnrollmentEntityResponseCollection>;
  payment?: Maybe<PaymentEntityResponse>;
  payments?: Maybe<PaymentEntityResponseCollection>;
  phoneNumber?: Maybe<PhoneNumberEntityResponse>;
  phoneNumbers?: Maybe<PhoneNumberEntityResponseCollection>;
  userInfo?: Maybe<UserInfoEntityResponse>;
  userInfos?: Maybe<UserInfoEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
};


export type QueryUploadFileArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: Maybe<UploadFileFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryI18NLocaleArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: Maybe<I18NLocaleFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: Maybe<UsersPermissionsRoleFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: Maybe<UsersPermissionsUserFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryAreaArgs = {
  id?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type QueryAreasArgs = {
  filters?: Maybe<AreaFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type QueryBillingInfoArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryBillingInfosArgs = {
  filters?: Maybe<BillingInfoFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryCourseArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryCoursesArgs = {
  filters?: Maybe<CourseFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryEnrollmentArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryEnrollmentsArgs = {
  filters?: Maybe<EnrollmentFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryPaymentArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPaymentsArgs = {
  filters?: Maybe<PaymentFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryPhoneNumberArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPhoneNumbersArgs = {
  filters?: Maybe<PhoneNumberFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryUserInfoArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUserInfosArgs = {
  filters?: Maybe<UserInfoFiltersInput>;
  pagination?: Maybe<PaginationArg>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  createArea?: Maybe<AreaEntityResponse>;
  updateArea?: Maybe<AreaEntityResponse>;
  deleteArea?: Maybe<AreaEntityResponse>;
  createBillingInfo?: Maybe<BillingInfoEntityResponse>;
  updateBillingInfo?: Maybe<BillingInfoEntityResponse>;
  deleteBillingInfo?: Maybe<BillingInfoEntityResponse>;
  createCourse?: Maybe<CourseEntityResponse>;
  updateCourse?: Maybe<CourseEntityResponse>;
  deleteCourse?: Maybe<CourseEntityResponse>;
  createEnrollment?: Maybe<EnrollmentEntityResponse>;
  updateEnrollment?: Maybe<EnrollmentEntityResponse>;
  deleteEnrollment?: Maybe<EnrollmentEntityResponse>;
  createPayment?: Maybe<PaymentEntityResponse>;
  updatePayment?: Maybe<PaymentEntityResponse>;
  deletePayment?: Maybe<PaymentEntityResponse>;
  createPhoneNumber?: Maybe<PhoneNumberEntityResponse>;
  updatePhoneNumber?: Maybe<PhoneNumberEntityResponse>;
  deletePhoneNumber?: Maybe<PhoneNumberEntityResponse>;
  createUserInfo?: Maybe<UserInfoEntityResponse>;
  updateUserInfo?: Maybe<UserInfoEntityResponse>;
  deleteUserInfo?: Maybe<UserInfoEntityResponse>;
  upload: UploadFileEntityResponse;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  updateFileInfo: UploadFileEntityResponse;
  removeFile?: Maybe<UploadFileEntityResponse>;
  createAreaLocalization?: Maybe<AreaEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Update an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  login: UsersPermissionsLoginPayload;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationUpdateUploadFileArgs = {
  id: Scalars['ID'];
  data: UploadFileInput;
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationCreateAreaArgs = {
  data: AreaInput;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateAreaArgs = {
  id: Scalars['ID'];
  data: AreaInput;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteAreaArgs = {
  id: Scalars['ID'];
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateBillingInfoArgs = {
  data: BillingInfoInput;
};


export type MutationUpdateBillingInfoArgs = {
  id: Scalars['ID'];
  data: BillingInfoInput;
};


export type MutationDeleteBillingInfoArgs = {
  id: Scalars['ID'];
};


export type MutationCreateCourseArgs = {
  data: CourseInput;
};


export type MutationUpdateCourseArgs = {
  id: Scalars['ID'];
  data: CourseInput;
};


export type MutationDeleteCourseArgs = {
  id: Scalars['ID'];
};


export type MutationCreateEnrollmentArgs = {
  data: EnrollmentInput;
};


export type MutationUpdateEnrollmentArgs = {
  id: Scalars['ID'];
  data: EnrollmentInput;
};


export type MutationDeleteEnrollmentArgs = {
  id: Scalars['ID'];
};


export type MutationCreatePaymentArgs = {
  data: PaymentInput;
};


export type MutationUpdatePaymentArgs = {
  id: Scalars['ID'];
  data: PaymentInput;
};


export type MutationDeletePaymentArgs = {
  id: Scalars['ID'];
};


export type MutationCreatePhoneNumberArgs = {
  data: PhoneNumberInput;
};


export type MutationUpdatePhoneNumberArgs = {
  id: Scalars['ID'];
  data: PhoneNumberInput;
};


export type MutationDeletePhoneNumberArgs = {
  id: Scalars['ID'];
};


export type MutationCreateUserInfoArgs = {
  data: UserInfoInput;
};


export type MutationUpdateUserInfoArgs = {
  id: Scalars['ID'];
  data: UserInfoInput;
};


export type MutationDeleteUserInfoArgs = {
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  info?: Maybe<FileInfoInput>;
  file: Scalars['Upload'];
};


export type MutationMultipleUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  files: Array<Maybe<Scalars['Upload']>>;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: Maybe<FileInfoInput>;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationCreateAreaLocalizationArgs = {
  id?: Maybe<Scalars['ID']>;
  data?: Maybe<AreaInput>;
  locale?: Maybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
  data: UsersPermissionsRoleInput;
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationUpdateUsersPermissionsUserArgs = {
  id: Scalars['ID'];
  data: UsersPermissionsUserInput;
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  code: Scalars['String'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};
