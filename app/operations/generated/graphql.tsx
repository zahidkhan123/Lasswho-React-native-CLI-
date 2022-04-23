import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
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
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: any;
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: any;
};

export type Attribute = {
  __typename?: 'Attribute';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['String'];
  values?: Maybe<Array<AttributeValue>>;
};

export type AttributeValue = {
  __typename?: 'AttributeValue';
  id: Scalars['ID'];
  attribute?: Maybe<Attribute>;
  name: Scalars['String'];
};

export type BookingSlots = {
  __typename?: 'BookingSlots';
  date: Scalars['Date'];
  slots?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Calendar = {
  __typename?: 'Calendar';
  start?: Maybe<Scalars['DateTime']>;
  end?: Maybe<Scalars['DateTime']>;
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
  timezone: Array<Timezone>;
};

/** A paginated list of Country items. */
export type CountryPaginator = {
  __typename?: 'CountryPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Country items. */
  data: Array<Country>;
};



export type EngagementRule = {
  __typename?: 'EngagementRule';
  id: Scalars['ID'];
  name: Scalars['String'];
  selected?: Maybe<Scalars['Boolean']>;
};

export type Industry = {
  __typename?: 'Industry';
  id: Scalars['ID'];
  name: Scalars['String'];
  path?: Maybe<Array<Maybe<Industry>>>;
  child?: Maybe<Array<Maybe<Industry>>>;
  attributes?: Maybe<Array<Maybe<Attribute>>>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Meeting = {
  __typename?: 'Meeting';
  id: Scalars['ID'];
  uuid: Scalars['String'];
  date: Scalars['DateTime'];
  duration: Scalars['Int'];
  speaker?: Maybe<Speaker>;
  meeting_date: Scalars['String'];
  meeting_time: Scalars['String'];
  agenda?: Maybe<Scalars['String']>;
  is_agenda?: Maybe<Scalars['Boolean']>;
  fee: Scalars['Float'];
  currency: Scalars['String'];
  currency_symbol: Scalars['String'];
  /** @deprecated Field no longer supported */
  completed?: Maybe<Scalars['Boolean']>;
  past?: Maybe<Scalars['Boolean']>;
  status: Scalars['String'];
  cta: Scalars['String'];
  meeting_link: Scalars['String'];
  pay_url?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Scalars['String']>;
  createUser?: Maybe<User>;
  resetUserPassword?: Maybe<Scalars['String']>;
  magicLogin?: Maybe<Scalars['String']>;
  sendMagicLink?: Maybe<SendLinkResponse>;
  updateUser?: Maybe<User>;
  updatePassword?: Maybe<User>;
  addSpeakerToFavourites?: Maybe<Speaker>;
  removeSpeakerFromFavourites?: Maybe<Speaker>;
  bookMeeting: Meeting;
  setMeetingAgenda: Meeting;
  rateMeeting: Meeting;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateUserArgs = {
  input: UserSignupInput;
};


export type MutationResetUserPasswordArgs = {
  email: Scalars['String'];
};


export type MutationMagicLoginArgs = {
  hash: Scalars['String'];
};


export type MutationSendMagicLinkArgs = {
  email?: Maybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['Int']>;
};


export type MutationUpdatePasswordArgs = {
  old_password?: Maybe<Scalars['String']>;
  new_password?: Maybe<Scalars['String']>;
  new_password_repeat?: Maybe<Scalars['String']>;
};


export type MutationAddSpeakerToFavouritesArgs = {
  speaker_id: Scalars['Int'];
};


export type MutationRemoveSpeakerFromFavouritesArgs = {
  speaker_id: Scalars['Int'];
};


export type MutationBookMeetingArgs = {
  speaker: Scalars['Int'];
  date: Scalars['Date'];
  duration: Scalars['Int'];
  slot: Scalars['String'];
};


export type MutationSetMeetingAgendaArgs = {
  meeting: Scalars['Int'];
  agenda: Scalars['String'];
};


export type MutationRateMeetingArgs = {
  meeting: Scalars['Int'];
  rate: Scalars['Int'];
  text: Scalars['String'];
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Pagination information about the corresponding list of items. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** Total number of node in connection. */
  total?: Maybe<Scalars['Int']>;
  /** Count of nodes in current request. */
  count?: Maybe<Scalars['Int']>;
  /** Current page of request. */
  currentPage?: Maybe<Scalars['Int']>;
  /** Last page in connection. */
  lastPage?: Maybe<Scalars['Int']>;
};

/** Pagination information about the corresponding list of items. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Total count of available items in the page. */
  count: Scalars['Int'];
  /** Current pagination page. */
  currentPage: Scalars['Int'];
  /** Index of first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** If collection has more pages. */
  hasMorePages: Scalars['Boolean'];
  /** Index of last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Last page number of the collection. */
  lastPage: Scalars['Int'];
  /** Number of items per page in the collection. */
  perPage: Scalars['Int'];
  /** Total items available in the collection. */
  total: Scalars['Int'];
};

export type PricingTier = {
  __typename?: 'PricingTier';
  duration: Scalars['Int'];
  fee: Scalars['Float'];
  currency: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  attributes?: Maybe<Array<Maybe<Attribute>>>;
  calendar?: Maybe<Array<Maybe<BookingSlots>>>;
  countries?: Maybe<CountryPaginator>;
  country?: Maybe<Country>;
  engagement_rules: Array<EngagementRule>;
  favouriteSpeakers?: Maybe<Array<Maybe<Speaker>>>;
  getAllCountries: Array<Country>;
  industries?: Maybe<Array<Maybe<Industry>>>;
  industry?: Maybe<Industry>;
  industryInfo?: Maybe<Industry>;
  isLoggedIn: Scalars['Boolean'];
  me?: Maybe<User>;
  meetings?: Maybe<Array<Meeting>>;
  pricingTier: Array<PricingTier>;
  speaker?: Maybe<Speaker>;
  /**
   * users: [User!]! @paginate(defaultCount: 10)
   * user(id: ID @eq): User @find(model: "App\\Models\\User")
   */
  speakers?: Maybe<Array<Maybe<Speaker>>>;
  timezone?: Maybe<Timezone>;
  timezones?: Maybe<TimezonePaginator>;
  timezonesByCountry: Array<Timezone>;
  timezonesByCountryCode: Array<Timezone>;
  userRating: Rating;
};


export type QueryAttributesArgs = {
  industry?: Maybe<Scalars['ID']>;
};


export type QueryCalendarArgs = {
  speaker?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
};


export type QueryCountriesArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryCountryArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryIndustriesArgs = {
  parent?: Maybe<Scalars['ID']>;
};


export type QueryIndustryArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryIndustryInfoArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPricingTierArgs = {
  speaker?: Maybe<Scalars['Int']>;
};


export type QuerySpeakerArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QuerySpeakersArgs = {
  industry?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<Maybe<SpeakerAttributeValue>>>;
};


export type QueryTimezoneArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryTimezonesArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryTimezonesByCountryArgs = {
  country_id: Scalars['ID'];
};


export type QueryTimezonesByCountryCodeArgs = {
  country_code: Scalars['String'];
};

export type Rate = {
  __typename?: 'Rate';
  id: Scalars['Int'];
  rating: Scalars['Int'];
  text: Scalars['String'];
  speaker_name: Scalars['String'];
  listing_image?: Maybe<Scalars['String']>;
};

export type Rating = {
  __typename?: 'Rating';
  rating?: Maybe<Scalars['Float']>;
  list?: Maybe<Array<Rate>>;
};

export type RefreshTokenInput = {
  refresh_token?: Maybe<Scalars['String']>;
};

export type SendLinkResponse = {
  __typename?: 'SendLinkResponse';
  success: Scalars['Boolean'];
  email: Scalars['String'];
};

/** The available directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export type Speaker = {
  __typename?: 'Speaker';
  id: Scalars['ID'];
  name: Scalars['String'];
  country: Country;
  invite_code: Scalars['String'];
  profile_image?: Maybe<Scalars['String']>;
  listing_image?: Maybe<Scalars['String']>;
  country_name?: Maybe<Scalars['String']>;
  country_code?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  skills?: Maybe<Scalars['String']>;
  achievements?: Maybe<Scalars['String']>;
  favourite?: Maybe<Scalars['Boolean']>;
  engagement_rules: Array<EngagementRule>;
  attributes?: Maybe<Array<Maybe<SpeakerAttribute>>>;
  price: Scalars['Float'];
  price_min: Scalars['Float'];
  currency: Scalars['String'];
  currency_symbol: Scalars['String'];
};

export type SpeakerAttribute = {
  __typename?: 'SpeakerAttribute';
  name: Scalars['String'];
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SpeakerAttributeValue = {
  id: Scalars['ID'];
  value: Scalars['ID'];
};

export type Timezone = {
  __typename?: 'Timezone';
  id: Scalars['ID'];
  country_code: Scalars['String'];
  timezone: Scalars['String'];
};

/** A paginated list of Timezone items. */
export type TimezonePaginator = {
  __typename?: 'TimezonePaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Timezone items. */
  data: Array<Timezone>;
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  country: Country;
  timezone: Timezone;
  phone_number?: Maybe<Scalars['String']>;
  invite_code: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type UserSignupInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type FullSpeakerFragment = (
  { __typename?: 'Speaker' }
  & Pick<Speaker, 'id' | 'name' | 'profile_image' | 'listing_image' | 'country_name' | 'favourite' | 'bio' | 'price' | 'price_min' | 'currency' | 'currency_symbol' | 'country_code' | 'skills' | 'achievements'>
  & { attributes?: Maybe<Array<Maybe<(
    { __typename?: 'SpeakerAttribute' }
    & Pick<SpeakerAttribute, 'name' | 'values'>
  )>>>, engagement_rules: Array<(
    { __typename?: 'EngagementRule' }
    & Pick<EngagementRule, 'name' | 'selected'>
  )> }
);

export type AddSpeakerToFavouriteMutationVariables = Exact<{
  speaker_id: Scalars['Int'];
}>;


export type AddSpeakerToFavouriteMutation = (
  { __typename?: 'Mutation' }
  & { addSpeakerToFavourites?: Maybe<(
    { __typename?: 'Speaker' }
    & FullSpeakerFragment
  )> }
);

export type BookMeetingMutationVariables = Exact<{
  speaker: Scalars['Int'];
  date: Scalars['Date'];
  duration: Scalars['Int'];
  slot: Scalars['String'];
}>;


export type BookMeetingMutation = (
  { __typename?: 'Mutation' }
  & { bookMeeting: (
    { __typename?: 'Meeting' }
    & Pick<Meeting, 'id' | 'uuid' | 'date' | 'duration'>
  ) }
);

export type CreateUserMutationVariables = Exact<{
  input: UserSignupInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'invite_code'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type MagicLoginMutationVariables = Exact<{
  hash: Scalars['String'];
}>;


export type MagicLoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'magicLogin'>
);

export type RateMeetingMutationVariables = Exact<{
  meeting: Scalars['Int'];
  rate: Scalars['Int'];
  text: Scalars['String'];
}>;


export type RateMeetingMutation = (
  { __typename?: 'Mutation' }
  & { rateMeeting: (
    { __typename?: 'Meeting' }
    & Pick<Meeting, 'id' | 'uuid'>
  ) }
);

export type RemoveSpeakerFromFavouritesMutationVariables = Exact<{
  speaker_id: Scalars['Int'];
}>;


export type RemoveSpeakerFromFavouritesMutation = (
  { __typename?: 'Mutation' }
  & { removeSpeakerFromFavourites?: Maybe<(
    { __typename?: 'Speaker' }
    & FullSpeakerFragment
  )> }
);

export type SendMagicLinkMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendMagicLinkMutation = (
  { __typename?: 'Mutation' }
  & { sendMagicLink?: Maybe<(
    { __typename?: 'SendLinkResponse' }
    & Pick<SendLinkResponse, 'success' | 'email'>
  )> }
);

export type SetMeetingAgendaMutationVariables = Exact<{
  meeting: Scalars['Int'];
  agenda: Scalars['String'];
}>;


export type SetMeetingAgendaMutation = (
  { __typename?: 'Mutation' }
  & { setMeetingAgenda: (
    { __typename?: 'Meeting' }
    & Pick<Meeting, 'id' | 'meeting_date' | 'meeting_time'>
    & { speaker?: Maybe<(
      { __typename?: 'Speaker' }
      & Pick<Speaker, 'name'>
    )> }
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  name: Scalars['String'];
  phone_number?: Maybe<Scalars['String']>;
  country: Scalars['Int'];
  timezone: Scalars['Int'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'phone_number'>
  )> }
);

export type FetchMeetingsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMeetingsQuery = (
  { __typename?: 'Query' }
  & { meetings?: Maybe<Array<(
    { __typename?: 'Meeting' }
    & Pick<Meeting, 'id' | 'uuid' | 'date' | 'duration' | 'meeting_date' | 'meeting_time' | 'meeting_link' | 'agenda' | 'fee' | 'currency' | 'currency_symbol' | 'completed' | 'status' | 'cta'>
    & { speaker?: Maybe<(
      { __typename?: 'Speaker' }
      & Pick<Speaker, 'id' | 'name' | 'profile_image' | 'listing_image' | 'bio'>
      & { country: (
        { __typename?: 'Country' }
        & Pick<Country, 'id' | 'name' | 'code'>
      ) }
    )> }
  )>> }
);

export type FetchRatingsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchRatingsQuery = (
  { __typename?: 'Query' }
  & { userRating: (
    { __typename?: 'Rating' }
    & Pick<Rating, 'rating'>
    & { list?: Maybe<Array<(
      { __typename?: 'Rate' }
      & Pick<Rate, 'rating' | 'text' | 'speaker_name' | 'listing_image'>
    )>> }
  ) }
);

export type FetchUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchUserQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'invite_code' | 'phone_number'>
    & { timezone: (
      { __typename?: 'Timezone' }
      & Pick<Timezone, 'id' | 'country_code' | 'timezone'>
    ), country: (
      { __typename?: 'Country' }
      & Pick<Country, 'id' | 'code' | 'name'>
    ) }
  )> }
);

export type GetAllCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCountriesQuery = (
  { __typename?: 'Query' }
  & { getAllCountries: Array<(
    { __typename?: 'Country' }
    & Pick<Country, 'id' | 'name' | 'code'>
  )> }
);

export type GetAllIndustriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllIndustriesQuery = (
  { __typename?: 'Query' }
  & { industries?: Maybe<Array<Maybe<(
    { __typename?: 'Industry' }
    & Pick<Industry, 'id' | 'name'>
    & { path?: Maybe<Array<Maybe<(
      { __typename?: 'Industry' }
      & Pick<Industry, 'id' | 'name'>
    )>>> }
  )>>> }
);

export type GetAllSpeakersQueryVariables = Exact<{
  industry?: Maybe<Scalars['Int']>;
  attributes?: Maybe<Array<Maybe<SpeakerAttributeValue>> | Maybe<SpeakerAttributeValue>>;
  name?: Maybe<Scalars['String']>;
}>;


export type GetAllSpeakersQuery = (
  { __typename?: 'Query' }
  & { speakers?: Maybe<Array<Maybe<(
    { __typename?: 'Speaker' }
    & Pick<Speaker, 'id' | 'name' | 'profile_image' | 'listing_image' | 'country_name' | 'country_code' | 'currency_symbol' | 'currency' | 'favourite' | 'price' | 'price_min'>
  )>>> }
);

export type GetAttributesFromIndustryQueryVariables = Exact<{
  industry: Scalars['ID'];
}>;


export type GetAttributesFromIndustryQuery = (
  { __typename?: 'Query' }
  & { attributes?: Maybe<Array<Maybe<(
    { __typename?: 'Attribute' }
    & Pick<Attribute, 'id' | 'name' | 'type'>
    & { values?: Maybe<Array<(
      { __typename?: 'AttributeValue' }
      & Pick<AttributeValue, 'id' | 'name'>
    )>> }
  )>>> }
);

export type GetFavouriteSpeakersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFavouriteSpeakersQuery = (
  { __typename?: 'Query' }
  & { favouriteSpeakers?: Maybe<Array<Maybe<(
    { __typename?: 'Speaker' }
    & FullSpeakerFragment
  )>>> }
);

export type GetIndustryInfoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetIndustryInfoQuery = (
  { __typename?: 'Query' }
  & { industryInfo?: Maybe<(
    { __typename?: 'Industry' }
    & Pick<Industry, 'id' | 'name'>
    & { attributes?: Maybe<Array<Maybe<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'name' | 'type'>
      & { values?: Maybe<Array<(
        { __typename?: 'AttributeValue' }
        & Pick<AttributeValue, 'id' | 'name'>
      )>> }
    )>>>, path?: Maybe<Array<Maybe<(
      { __typename?: 'Industry' }
      & Pick<Industry, 'id' | 'name'>
    )>>>, child?: Maybe<Array<Maybe<(
      { __typename?: 'Industry' }
      & Pick<Industry, 'id' | 'name'>
    )>>> }
  )> }
);

export type GetSpeakerQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSpeakerQuery = (
  { __typename?: 'Query' }
  & { speaker?: Maybe<(
    { __typename?: 'Speaker' }
    & FullSpeakerFragment
  )> }
);

export type GetSpeakerCalendarQueryVariables = Exact<{
  speaker?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
}>;


export type GetSpeakerCalendarQuery = (
  { __typename?: 'Query' }
  & { calendar?: Maybe<Array<Maybe<(
    { __typename?: 'BookingSlots' }
    & Pick<BookingSlots, 'date' | 'slots'>
  )>>> }
);

export type GetTimeZoneByCountryQueryVariables = Exact<{
  country_id: Scalars['ID'];
}>;


export type GetTimeZoneByCountryQuery = (
  { __typename?: 'Query' }
  & { timezonesByCountry: Array<(
    { __typename?: 'Timezone' }
    & Pick<Timezone, 'id' | 'country_code' | 'timezone'>
  )> }
);

export type IsUserLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsUserLoggedInQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isLoggedIn'>
);

export const FullSpeakerFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullSpeaker"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Speaker"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image"}},{"kind":"Field","name":{"kind":"Name","value":"listing_image"}},{"kind":"Field","name":{"kind":"Name","value":"country_name"}},{"kind":"Field","name":{"kind":"Name","value":"favourite"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"price_min"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"currency_symbol"}},{"kind":"Field","name":{"kind":"Name","value":"country_code"}},{"kind":"Field","name":{"kind":"Name","value":"skills"}},{"kind":"Field","name":{"kind":"Name","value":"achievements"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}},{"kind":"Field","name":{"kind":"Name","value":"engagement_rules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"selected"}}]}}]}}]} as unknown as DocumentNode<FullSpeakerFragment, unknown>;
export const AddSpeakerToFavouriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSpeakerToFavourite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"speaker_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSpeakerToFavourites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"speaker_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"speaker_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullSpeaker"}}]}}]}},...FullSpeakerFragmentDoc.definitions]} as unknown as DocumentNode<AddSpeakerToFavouriteMutation, AddSpeakerToFavouriteMutationVariables>;
export const BookMeetingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BookMeeting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"speaker"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"duration"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slot"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookMeeting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"speaker"},"value":{"kind":"Variable","name":{"kind":"Name","value":"speaker"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"duration"},"value":{"kind":"Variable","name":{"kind":"Name","value":"duration"}}},{"kind":"Argument","name":{"kind":"Name","value":"slot"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slot"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]} as unknown as DocumentNode<BookMeetingMutation, BookMeetingMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserSignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"invite_code"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MagicLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MagicLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"magicLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}}]}]}}]} as unknown as DocumentNode<MagicLoginMutation, MagicLoginMutationVariables>;
export const RateMeetingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RateMeeting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"meeting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rateMeeting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"meeting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"meeting"}}},{"kind":"Argument","name":{"kind":"Name","value":"rate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rate"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]} as unknown as DocumentNode<RateMeetingMutation, RateMeetingMutationVariables>;
export const RemoveSpeakerFromFavouritesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSpeakerFromFavourites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"speaker_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSpeakerFromFavourites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"speaker_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"speaker_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullSpeaker"}}]}}]}},...FullSpeakerFragmentDoc.definitions]} as unknown as DocumentNode<RemoveSpeakerFromFavouritesMutation, RemoveSpeakerFromFavouritesMutationVariables>;
export const SendMagicLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMagicLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMagicLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<SendMagicLinkMutation, SendMagicLinkMutationVariables>;
export const SetMeetingAgendaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetMeetingAgenda"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"meeting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agenda"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setMeetingAgenda"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"meeting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"meeting"}}},{"kind":"Argument","name":{"kind":"Name","value":"agenda"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agenda"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"speaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meeting_date"}},{"kind":"Field","name":{"kind":"Name","value":"meeting_time"}}]}}]}}]} as unknown as DocumentNode<SetMeetingAgendaMutation, SetMeetingAgendaMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone_number"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timezone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone_number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone_number"}}},{"kind":"Argument","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"Argument","name":{"kind":"Name","value":"timezone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timezone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const FetchMeetingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchMeetings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meetings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"speaker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image"}},{"kind":"Field","name":{"kind":"Name","value":"listing_image"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meeting_date"}},{"kind":"Field","name":{"kind":"Name","value":"meeting_time"}},{"kind":"Field","name":{"kind":"Name","value":"meeting_link"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"agenda"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"currency_symbol"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cta"}}]}}]}}]} as unknown as DocumentNode<FetchMeetingsQuery, FetchMeetingsQueryVariables>;
export const FetchRatingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchRatings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userRating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"speaker_name"}},{"kind":"Field","name":{"kind":"Name","value":"listing_image"}}]}}]}}]}}]} as unknown as DocumentNode<FetchRatingsQuery, FetchRatingsQueryVariables>;
export const FetchUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"invite_code"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"country_code"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<FetchUserQuery, FetchUserQueryVariables>;
export const GetAllCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCountries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllCountries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<GetAllCountriesQuery, GetAllCountriesQueryVariables>;
export const GetAllIndustriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllIndustries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"industries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"parent"},"value":{"kind":"NullValue"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllIndustriesQuery, GetAllIndustriesQueryVariables>;
export const GetAllSpeakersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllSpeakers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"industry"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attributes"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SpeakerAttributeValue"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"speakers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"industry"},"value":{"kind":"Variable","name":{"kind":"Name","value":"industry"}}},{"kind":"Argument","name":{"kind":"Name","value":"attributes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attributes"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image"}},{"kind":"Field","name":{"kind":"Name","value":"listing_image"}},{"kind":"Field","name":{"kind":"Name","value":"country_name"}},{"kind":"Field","name":{"kind":"Name","value":"country_code"}},{"kind":"Field","name":{"kind":"Name","value":"currency_symbol"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"favourite"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"price_min"}}]}}]}}]} as unknown as DocumentNode<GetAllSpeakersQuery, GetAllSpeakersQueryVariables>;
export const GetAttributesFromIndustryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAttributesFromIndustry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"industry"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"industry"},"value":{"kind":"Variable","name":{"kind":"Name","value":"industry"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAttributesFromIndustryQuery, GetAttributesFromIndustryQueryVariables>;
export const GetFavouriteSpeakersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFavouriteSpeakers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favouriteSpeakers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullSpeaker"}}]}}]}},...FullSpeakerFragmentDoc.definitions]} as unknown as DocumentNode<GetFavouriteSpeakersQuery, GetFavouriteSpeakersQueryVariables>;
export const GetIndustryInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetIndustryInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"industryInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"path"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"child"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetIndustryInfoQuery, GetIndustryInfoQueryVariables>;
export const GetSpeakerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSpeaker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"speaker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullSpeaker"}}]}}]}},...FullSpeakerFragmentDoc.definitions]} as unknown as DocumentNode<GetSpeakerQuery, GetSpeakerQueryVariables>;
export const GetSpeakerCalendarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSpeakerCalendar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"speaker"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"duration"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calendar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"speaker"},"value":{"kind":"Variable","name":{"kind":"Name","value":"speaker"}}},{"kind":"Argument","name":{"kind":"Name","value":"duration"},"value":{"kind":"Variable","name":{"kind":"Name","value":"duration"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"slots"}}]}}]}}]} as unknown as DocumentNode<GetSpeakerCalendarQuery, GetSpeakerCalendarQueryVariables>;
export const GetTimeZoneByCountryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTimeZoneByCountry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timezonesByCountry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"country_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"country_code"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}}]}}]} as unknown as DocumentNode<GetTimeZoneByCountryQuery, GetTimeZoneByCountryQueryVariables>;
export const IsUserLoggedInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsUserLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isLoggedIn"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}]}]}}]} as unknown as DocumentNode<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>;
export type AttributeKeySpecifier = ('id' | 'name' | 'type' | 'values' | AttributeKeySpecifier)[];
export type AttributeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	values?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttributeValueKeySpecifier = ('id' | 'attribute' | 'name' | AttributeValueKeySpecifier)[];
export type AttributeValueFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	attribute?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BookingSlotsKeySpecifier = ('date' | 'slots' | BookingSlotsKeySpecifier)[];
export type BookingSlotsFieldPolicy = {
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	slots?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CalendarKeySpecifier = ('start' | 'end' | CalendarKeySpecifier)[];
export type CalendarFieldPolicy = {
	start?: FieldPolicy<any> | FieldReadFunction<any>,
	end?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CountryKeySpecifier = ('id' | 'code' | 'name' | 'timezone' | CountryKeySpecifier)[];
export type CountryFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CountryPaginatorKeySpecifier = ('paginatorInfo' | 'data' | CountryPaginatorKeySpecifier)[];
export type CountryPaginatorFieldPolicy = {
	paginatorInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EngagementRuleKeySpecifier = ('id' | 'name' | 'selected' | EngagementRuleKeySpecifier)[];
export type EngagementRuleFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	selected?: FieldPolicy<any> | FieldReadFunction<any>
};
export type IndustryKeySpecifier = ('id' | 'name' | 'path' | 'child' | 'attributes' | IndustryKeySpecifier)[];
export type IndustryFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	path?: FieldPolicy<any> | FieldReadFunction<any>,
	child?: FieldPolicy<any> | FieldReadFunction<any>,
	attributes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MeetingKeySpecifier = ('id' | 'uuid' | 'date' | 'duration' | 'speaker' | 'meeting_date' | 'meeting_time' | 'agenda' | 'is_agenda' | 'fee' | 'currency' | 'currency_symbol' | 'completed' | 'past' | 'status' | 'cta' | 'meeting_link' | 'pay_url' | MeetingKeySpecifier)[];
export type MeetingFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	uuid?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	speaker?: FieldPolicy<any> | FieldReadFunction<any>,
	meeting_date?: FieldPolicy<any> | FieldReadFunction<any>,
	meeting_time?: FieldPolicy<any> | FieldReadFunction<any>,
	agenda?: FieldPolicy<any> | FieldReadFunction<any>,
	is_agenda?: FieldPolicy<any> | FieldReadFunction<any>,
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	currency_symbol?: FieldPolicy<any> | FieldReadFunction<any>,
	completed?: FieldPolicy<any> | FieldReadFunction<any>,
	past?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	cta?: FieldPolicy<any> | FieldReadFunction<any>,
	meeting_link?: FieldPolicy<any> | FieldReadFunction<any>,
	pay_url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('login' | 'createUser' | 'resetUserPassword' | 'magicLogin' | 'sendMagicLink' | 'updateUser' | 'updatePassword' | 'addSpeakerToFavourites' | 'removeSpeakerFromFavourites' | 'bookMeeting' | 'setMeetingAgenda' | 'rateMeeting' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	createUser?: FieldPolicy<any> | FieldReadFunction<any>,
	resetUserPassword?: FieldPolicy<any> | FieldReadFunction<any>,
	magicLogin?: FieldPolicy<any> | FieldReadFunction<any>,
	sendMagicLink?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUser?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePassword?: FieldPolicy<any> | FieldReadFunction<any>,
	addSpeakerToFavourites?: FieldPolicy<any> | FieldReadFunction<any>,
	removeSpeakerFromFavourites?: FieldPolicy<any> | FieldReadFunction<any>,
	bookMeeting?: FieldPolicy<any> | FieldReadFunction<any>,
	setMeetingAgenda?: FieldPolicy<any> | FieldReadFunction<any>,
	rateMeeting?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor' | 'total' | 'count' | 'currentPage' | 'lastPage' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	currentPage?: FieldPolicy<any> | FieldReadFunction<any>,
	lastPage?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatorInfoKeySpecifier = ('count' | 'currentPage' | 'firstItem' | 'hasMorePages' | 'lastItem' | 'lastPage' | 'perPage' | 'total' | PaginatorInfoKeySpecifier)[];
export type PaginatorInfoFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	currentPage?: FieldPolicy<any> | FieldReadFunction<any>,
	firstItem?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMorePages?: FieldPolicy<any> | FieldReadFunction<any>,
	lastItem?: FieldPolicy<any> | FieldReadFunction<any>,
	lastPage?: FieldPolicy<any> | FieldReadFunction<any>,
	perPage?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PricingTierKeySpecifier = ('duration' | 'fee' | 'currency' | PricingTierKeySpecifier)[];
export type PricingTierFieldPolicy = {
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('attributes' | 'calendar' | 'countries' | 'country' | 'engagement_rules' | 'favouriteSpeakers' | 'getAllCountries' | 'industries' | 'industry' | 'industryInfo' | 'isLoggedIn' | 'me' | 'meetings' | 'pricingTier' | 'speaker' | 'speakers' | 'timezone' | 'timezones' | 'timezonesByCountry' | 'timezonesByCountryCode' | 'userRating' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	attributes?: FieldPolicy<any> | FieldReadFunction<any>,
	calendar?: FieldPolicy<any> | FieldReadFunction<any>,
	countries?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	engagement_rules?: FieldPolicy<any> | FieldReadFunction<any>,
	favouriteSpeakers?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllCountries?: FieldPolicy<any> | FieldReadFunction<any>,
	industries?: FieldPolicy<any> | FieldReadFunction<any>,
	industry?: FieldPolicy<any> | FieldReadFunction<any>,
	industryInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	isLoggedIn?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	meetings?: FieldPolicy<any> | FieldReadFunction<any>,
	pricingTier?: FieldPolicy<any> | FieldReadFunction<any>,
	speaker?: FieldPolicy<any> | FieldReadFunction<any>,
	speakers?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	timezones?: FieldPolicy<any> | FieldReadFunction<any>,
	timezonesByCountry?: FieldPolicy<any> | FieldReadFunction<any>,
	timezonesByCountryCode?: FieldPolicy<any> | FieldReadFunction<any>,
	userRating?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RateKeySpecifier = ('id' | 'rating' | 'text' | 'speaker_name' | 'listing_image' | RateKeySpecifier)[];
export type RateFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	rating?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	speaker_name?: FieldPolicy<any> | FieldReadFunction<any>,
	listing_image?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RatingKeySpecifier = ('rating' | 'list' | RatingKeySpecifier)[];
export type RatingFieldPolicy = {
	rating?: FieldPolicy<any> | FieldReadFunction<any>,
	list?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SendLinkResponseKeySpecifier = ('success' | 'email' | SendLinkResponseKeySpecifier)[];
export type SendLinkResponseFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpeakerKeySpecifier = ('id' | 'name' | 'country' | 'invite_code' | 'profile_image' | 'listing_image' | 'country_name' | 'country_code' | 'bio' | 'skills' | 'achievements' | 'favourite' | 'engagement_rules' | 'attributes' | 'price' | 'price_min' | 'currency' | 'currency_symbol' | SpeakerKeySpecifier)[];
export type SpeakerFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	invite_code?: FieldPolicy<any> | FieldReadFunction<any>,
	profile_image?: FieldPolicy<any> | FieldReadFunction<any>,
	listing_image?: FieldPolicy<any> | FieldReadFunction<any>,
	country_name?: FieldPolicy<any> | FieldReadFunction<any>,
	country_code?: FieldPolicy<any> | FieldReadFunction<any>,
	bio?: FieldPolicy<any> | FieldReadFunction<any>,
	skills?: FieldPolicy<any> | FieldReadFunction<any>,
	achievements?: FieldPolicy<any> | FieldReadFunction<any>,
	favourite?: FieldPolicy<any> | FieldReadFunction<any>,
	engagement_rules?: FieldPolicy<any> | FieldReadFunction<any>,
	attributes?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	price_min?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	currency_symbol?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpeakerAttributeKeySpecifier = ('name' | 'values' | SpeakerAttributeKeySpecifier)[];
export type SpeakerAttributeFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	values?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimezoneKeySpecifier = ('id' | 'country_code' | 'timezone' | TimezoneKeySpecifier)[];
export type TimezoneFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	country_code?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimezonePaginatorKeySpecifier = ('paginatorInfo' | 'data' | TimezonePaginatorKeySpecifier)[];
export type TimezonePaginatorFieldPolicy = {
	paginatorInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('id' | 'name' | 'email' | 'country' | 'timezone' | 'phone_number' | 'invite_code' | 'created_at' | 'updated_at' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	phone_number?: FieldPolicy<any> | FieldReadFunction<any>,
	invite_code?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Attribute?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttributeKeySpecifier | (() => undefined | AttributeKeySpecifier),
		fields?: AttributeFieldPolicy,
	},
	AttributeValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttributeValueKeySpecifier | (() => undefined | AttributeValueKeySpecifier),
		fields?: AttributeValueFieldPolicy,
	},
	BookingSlots?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BookingSlotsKeySpecifier | (() => undefined | BookingSlotsKeySpecifier),
		fields?: BookingSlotsFieldPolicy,
	},
	Calendar?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CalendarKeySpecifier | (() => undefined | CalendarKeySpecifier),
		fields?: CalendarFieldPolicy,
	},
	Country?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CountryKeySpecifier | (() => undefined | CountryKeySpecifier),
		fields?: CountryFieldPolicy,
	},
	CountryPaginator?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CountryPaginatorKeySpecifier | (() => undefined | CountryPaginatorKeySpecifier),
		fields?: CountryPaginatorFieldPolicy,
	},
	EngagementRule?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EngagementRuleKeySpecifier | (() => undefined | EngagementRuleKeySpecifier),
		fields?: EngagementRuleFieldPolicy,
	},
	Industry?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IndustryKeySpecifier | (() => undefined | IndustryKeySpecifier),
		fields?: IndustryFieldPolicy,
	},
	Meeting?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MeetingKeySpecifier | (() => undefined | MeetingKeySpecifier),
		fields?: MeetingFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	PaginatorInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatorInfoKeySpecifier | (() => undefined | PaginatorInfoKeySpecifier),
		fields?: PaginatorInfoFieldPolicy,
	},
	PricingTier?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PricingTierKeySpecifier | (() => undefined | PricingTierKeySpecifier),
		fields?: PricingTierFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Rate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RateKeySpecifier | (() => undefined | RateKeySpecifier),
		fields?: RateFieldPolicy,
	},
	Rating?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RatingKeySpecifier | (() => undefined | RatingKeySpecifier),
		fields?: RatingFieldPolicy,
	},
	SendLinkResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SendLinkResponseKeySpecifier | (() => undefined | SendLinkResponseKeySpecifier),
		fields?: SendLinkResponseFieldPolicy,
	},
	Speaker?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpeakerKeySpecifier | (() => undefined | SpeakerKeySpecifier),
		fields?: SpeakerFieldPolicy,
	},
	SpeakerAttribute?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpeakerAttributeKeySpecifier | (() => undefined | SpeakerAttributeKeySpecifier),
		fields?: SpeakerAttributeFieldPolicy,
	},
	Timezone?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimezoneKeySpecifier | (() => undefined | TimezoneKeySpecifier),
		fields?: TimezoneFieldPolicy,
	},
	TimezonePaginator?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimezonePaginatorKeySpecifier | (() => undefined | TimezonePaginatorKeySpecifier),
		fields?: TimezonePaginatorFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    