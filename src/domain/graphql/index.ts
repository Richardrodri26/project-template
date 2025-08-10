import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  ValidatePassword: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type Cards = {
  __typename?: 'Cards';
  cardsAddress: Array<CardsAddress>;
  cardsEmails: Array<CardsEmails>;
  cardsPhones: Array<CardsPhones>;
  cardsSocial: Array<CardsSocial>;
  cardsWeb: Array<CardsWeb>;
  colorPrincipal?: Maybe<Scalars['String']['output']>;
  colorSegundario?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageProfile?: Maybe<FileInfo>;
  isActive: Scalars['Boolean']['output'];
  subTitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type CardsAddress = {
  __typename?: 'CardsAddress';
  card: Cards;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  websiteUrl: Scalars['String']['output'];
};

export type CardsCreateInput = {
  card: CreateCardInput;
  cardAddress: Array<CreateCardAddressInput>;
  cardEmail: Array<CreateCardEmailInput>;
  cardPhone: Array<CreateCardPhoneInput>;
  cardSocial: Array<CreateCardSocialInput>;
  cardWeb: Array<CreateCardWebInput>;
  imageProfileId: Scalars['String']['input'];
};

export type CardsEmails = {
  __typename?: 'CardsEmails';
  card: Cards;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  icono?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CardsPhones = {
  __typename?: 'CardsPhones';
  card: Cards;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  icono?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  phone: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CardsSocial = {
  __typename?: 'CardsSocial';
  card: Cards;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  icono?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
  typeSocial: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type CardsWeb = {
  __typename?: 'CardsWeb';
  card: Cards;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  icono?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  web: Scalars['String']['output'];
};

export type City = {
  __typename?: 'City';
  code: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CodeConfirmationInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type CodeRecoverPasswordInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCardAddressInput = {
  cardId?: InputMaybe<Scalars['ID']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCardEmailInput = {
  cardId?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  icono?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCardInput = {
  colorPrincipal?: InputMaybe<Scalars['String']['input']>;
  colorSegundario?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageProfileId?: InputMaybe<Scalars['ID']['input']>;
  isActive: Scalars['Boolean']['input'];
  subTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateCardPhoneInput = {
  cardId?: InputMaybe<Scalars['ID']['input']>;
  icono?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCardSocialInput = {
  cardId?: InputMaybe<Scalars['ID']['input']>;
  icono?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  typeSocial: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type CreateCardWebInput = {
  cardId?: InputMaybe<Scalars['ID']['input']>;
  icono?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  web: Scalars['String']['input'];
};

export type CreateCarruselInput = {
  descripcion: Scalars['String']['input'];
  fileId: Scalars['String']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateDummyInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstField: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  secondField: Scalars['DateTime']['input'];
  thirdField: Scalars['Float']['input'];
};

export type CreateParametersInput = {
  codigo: Scalars['String']['input'];
  companyId: Scalars['ID']['input'];
  descripcion: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type: TypeParameterEnum;
  valueDate?: InputMaybe<Scalars['DateTime']['input']>;
  valueFileId?: InputMaybe<Scalars['ID']['input']>;
  valueInt?: InputMaybe<Scalars['Float']['input']>;
  valueString?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePlanInput = {
  companyId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  expirationDate: Scalars['DateTime']['input'];
  fileId: Scalars['ID']['input'];
  isActive: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  address: Scalars['String']['input'];
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  fileId?: InputMaybe<Scalars['ID']['input']>;
  identificationNumber: Scalars['String']['input'];
  identificationType: UserDocumentTypes;
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['ValidatePassword']['input'];
  phoneNumber: Scalars['String']['input'];
  tokenExpoNotification?: InputMaybe<Scalars['String']['input']>;
  type: UserTypes;
};

export type DateFilter = {
  _between?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  _eq?: InputMaybe<Scalars['DateTime']['input']>;
  _gt?: InputMaybe<Scalars['DateTime']['input']>;
  _gte?: InputMaybe<Scalars['DateTime']['input']>;
  _in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  _lt?: InputMaybe<Scalars['DateTime']['input']>;
  _lte?: InputMaybe<Scalars['DateTime']['input']>;
  _neq?: InputMaybe<Scalars['DateTime']['input']>;
  _notbetween?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type Department = {
  __typename?: 'Department';
  code: Scalars['Int']['output'];
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DoubleVerificationInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  emailVerification?: InputMaybe<Scalars['Boolean']['input']>;
  phoneVerification?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Dummy = {
  __typename?: 'Dummy';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstField: Scalars['String']['output'];
  group?: Maybe<DummyGroup>;
  id: Scalars['ID']['output'];
  items: Array<DummyItem>;
  phone: Scalars['String']['output'];
  secondField: Scalars['DateTime']['output'];
  thirdField: Scalars['Float']['output'];
  type?: Maybe<DummyType>;
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyFamily = {
  __typename?: 'DummyFamily';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyGroup = {
  __typename?: 'DummyGroup';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  family?: Maybe<DummyFamily>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyItem = {
  __typename?: 'DummyItem';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  dummy: Dummy;
  firstField: Scalars['String']['output'];
  fourthField: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  secondField: Scalars['DateTime']['output'];
  thirdField: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyType = {
  __typename?: 'DummyType';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FileInfo = {
  __typename?: 'FileInfo';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fileExtension: Scalars['String']['output'];
  fileMode: FileModes;
  fileMongoId?: Maybe<Scalars['String']['output']>;
  fileName: Scalars['String']['output'];
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  transformedFileUrl?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export enum FileModes {
  Buffer = 'buffer',
  Mongo = 'mongo',
  Url = 'url'
}

export type FindCardAddressOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindCardAddressWhere = {
  _and?: InputMaybe<Array<FindCardAddressWhere>>;
  _or?: InputMaybe<Array<FindCardAddressWhere>>;
  card?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  streetAddress?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindCardEmailOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindCardEmailWhere = {
  _and?: InputMaybe<Array<FindCardEmailWhere>>;
  _or?: InputMaybe<Array<FindCardEmailWhere>>;
  card?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  email?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindCardOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindCardPhoneOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindCardPhoneWhere = {
  _and?: InputMaybe<Array<FindCardPhoneWhere>>;
  _or?: InputMaybe<Array<FindCardPhoneWhere>>;
  card?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  phone?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindCardSocialOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindCardSocialWhere = {
  _and?: InputMaybe<Array<FindCardSocialWhere>>;
  _or?: InputMaybe<Array<FindCardSocialWhere>>;
  card?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  title?: InputMaybe<StringFilter>;
  typeSocial?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type FindCardWebOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindCardWebWhere = {
  _and?: InputMaybe<Array<FindCardWebWhere>>;
  _or?: InputMaybe<Array<FindCardWebWhere>>;
  card?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  title?: InputMaybe<StringFilter>;
  web?: InputMaybe<StringFilter>;
};

export type FindCardWhere = {
  _and?: InputMaybe<Array<FindCardWhere>>;
  _or?: InputMaybe<Array<FindCardWhere>>;
  createdAt?: InputMaybe<DateFilter>;
  descripcion?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<NumberFilter>;
  title?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
};

export type FindCarruselOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindCarruselWhere = {
  _and?: InputMaybe<Array<FindCarruselWhere>>;
  _or?: InputMaybe<Array<FindCarruselWhere>>;
  descripcion?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindDummyFamilyWhere = {
  _and?: InputMaybe<Array<FindDummyFamilyWhere>>;
  _or?: InputMaybe<Array<FindDummyFamilyWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindDummyGroupWhere = {
  _and?: InputMaybe<Array<FindDummyGroupWhere>>;
  _or?: InputMaybe<Array<FindDummyGroupWhere>>;
  family?: InputMaybe<FindDummyFamilyWhere>;
  name?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindDummyOrderBy = {
  firstField?: InputMaybe<OrderTypes>;
  secondField?: InputMaybe<OrderTypes>;
  thirdField?: InputMaybe<OrderTypes>;
};

export type FindDummyTypeWhere = {
  _and?: InputMaybe<Array<FindDummyTypeWhere>>;
  _or?: InputMaybe<Array<FindDummyTypeWhere>>;
  name?: InputMaybe<StringFilter>;
};

export type FindDummyWhere = {
  _and?: InputMaybe<Array<FindDummyWhere>>;
  _or?: InputMaybe<Array<FindDummyWhere>>;
  firstField?: InputMaybe<StringFilter>;
  group?: InputMaybe<FindDummyGroupWhere>;
  secondField?: InputMaybe<DateFilter>;
  thirdField?: InputMaybe<NumberFilter>;
  type?: InputMaybe<FindDummyTypeWhere>;
};

export type FindParameterOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindParameterWhere = {
  _and?: InputMaybe<Array<FindParameterWhere>>;
  _or?: InputMaybe<Array<FindParameterWhere>>;
  company?: InputMaybe<DateFilter>;
  descripcion?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
};

export type FindPlanOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindPlanWhere = {
  _and?: InputMaybe<Array<FindPlanWhere>>;
  _or?: InputMaybe<Array<FindPlanWhere>>;
  company?: InputMaybe<StringFilter>;
  descripcion?: InputMaybe<StringFilter>;
  expirationDate?: InputMaybe<DateFilter>;
  isActive?: InputMaybe<NumberFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindUsersOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  email?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
};

export type FindUsersWhere = {
  _and?: InputMaybe<Array<FindUsersWhere>>;
  _or?: InputMaybe<Array<FindUsersWhere>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  type?: InputMaybe<Array<UserTypes>>;
};

export type HoursCompanyModel = {
  __typename?: 'HoursCompanyModel';
  hoursClose: Scalars['Float']['output'];
  hoursOpen: Scalars['Float']['output'];
};

export type MetadataPagination = {
  __typename?: 'MetadataPagination';
  currentPage?: Maybe<Scalars['Int']['output']>;
  itemsPerPage?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  codeConfirmation: User;
  createCardAddres: CardsAddress;
  createCardFull: Cards;
  createCardPhone: CardsPhones;
  createCardSocial: CardsSocial;
  createCardWeb: CardsWeb;
  createCards: Cards;
  createCardsEmail: CardsEmails;
  createCarrusel: WebCarrusel;
  createDummiesX: Array<Dummy>;
  createDummy: Dummy;
  createParameter: Parameter;
  createPlans: WebPlans;
  createUser: User;
  enableAndDisableDoubleVerification: Scalars['String']['output'];
  i18nTest: Scalars['String']['output'];
  recoverPassword: Scalars['String']['output'];
  removeCardAddres: CardsAddress;
  removeCardPhone: CardsPhones;
  removeCardSocial: CardsSocial;
  removeCardWeb: CardsWeb;
  removeCards: Cards;
  removeCardsEmail: CardsEmails;
  removeCarrusel: WebCarrusel;
  removeDummy: Dummy;
  removeParameter: Parameter;
  removePlans: WebPlans;
  removeUser: User;
  resetPassword: User;
  resetSuperAdmin: User;
  signin: AuthResponse;
  updateCardAddres: CardsAddress;
  updateCardPhone: CardsPhones;
  updateCardSocial: CardsSocial;
  updateCardWeb: CardsWeb;
  updateCards: Cards;
  updateCardsEmail: CardsEmails;
  updateCarrusel: WebCarrusel;
  updateDummy: Dummy;
  updateParameter: Parameter;
  updatePassword: User;
  updatePlans: WebPlans;
  updateUser: User;
  updateUserPassword: User;
};


export type MutationCodeConfirmationArgs = {
  createInput: CodeConfirmationInput;
};


export type MutationCreateCardAddresArgs = {
  createInput: CreateCardAddressInput;
};


export type MutationCreateCardFullArgs = {
  input: CardsCreateInput;
};


export type MutationCreateCardPhoneArgs = {
  createInput: CreateCardPhoneInput;
};


export type MutationCreateCardSocialArgs = {
  createInput: CreateCardSocialInput;
};


export type MutationCreateCardWebArgs = {
  createInput: CreateCardWebInput;
};


export type MutationCreateCardsArgs = {
  createInput: CreateCardInput;
};


export type MutationCreateCardsEmailArgs = {
  createInput: CreateCardEmailInput;
};


export type MutationCreateCarruselArgs = {
  createInput: CreateCarruselInput;
};


export type MutationCreateDummyArgs = {
  createInput: CreateDummyInput;
};


export type MutationCreateParameterArgs = {
  createInput: CreateParametersInput;
};


export type MutationCreatePlansArgs = {
  createInput: CreatePlanInput;
};


export type MutationCreateUserArgs = {
  createInput: CreateUserInput;
};


export type MutationEnableAndDisableDoubleVerificationArgs = {
  doubleVerificationInput: DoubleVerificationInput;
};


export type MutationRecoverPasswordArgs = {
  recoverPasswordInput: RecoverPasswordInput;
};


export type MutationRemoveCardAddresArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCardPhoneArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCardSocialArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCardWebArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCardsArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCardsEmailArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCarruselArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveDummyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveParameterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePlansArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
};


export type MutationSigninArgs = {
  signinInput: SigninInput;
};


export type MutationUpdateCardAddresArgs = {
  updateInput: UpdateCardAddressInput;
};


export type MutationUpdateCardPhoneArgs = {
  updateInput: UpdateCardPhoneInput;
};


export type MutationUpdateCardSocialArgs = {
  updateInput: UpdateCardSocialInput;
};


export type MutationUpdateCardWebArgs = {
  updateInput: UpdateCardWebInput;
};


export type MutationUpdateCardsArgs = {
  updateInput: UpdateCardInput;
};


export type MutationUpdateCardsEmailArgs = {
  updateInput: UpdateCardEmailInput;
};


export type MutationUpdateCarruselArgs = {
  updateInput: UpdateCarruselInput;
};


export type MutationUpdateDummyArgs = {
  updateInput: UpdateDummyInput;
};


export type MutationUpdateParameterArgs = {
  updateInput: UpdateParametersInput;
};


export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};


export type MutationUpdatePlansArgs = {
  updateInput: UpdatePlanInput;
};


export type MutationUpdateUserArgs = {
  updateInput: UpdateUserInput;
};


export type MutationUpdateUserPasswordArgs = {
  updateUserPasswordInput: UpdateUserPasswordInput;
};

export type NumberFilter = {
  _between?: InputMaybe<Array<Scalars['Float']['input']>>;
  _eq?: InputMaybe<Scalars['Float']['input']>;
  _gt?: InputMaybe<Scalars['Float']['input']>;
  _gte?: InputMaybe<Scalars['Float']['input']>;
  _in?: InputMaybe<Array<Scalars['Float']['input']>>;
  _lt?: InputMaybe<Scalars['Float']['input']>;
  _lte?: InputMaybe<Scalars['Float']['input']>;
  _neq?: InputMaybe<Scalars['Float']['input']>;
  _notbetween?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export enum OrderTypes {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Pagination = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type Parameter = {
  __typename?: 'Parameter';
  codigo: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  descripcion: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: TypeParameterEnum;
  updatedAt: Scalars['DateTime']['output'];
  valueDate?: Maybe<Scalars['DateTime']['output']>;
  valueFile?: Maybe<FileInfo>;
  valueInt?: Maybe<Scalars['Float']['output']>;
  valueString?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  Card: Cards;
  CardAddres: CardsAddress;
  CardAddreses: Array<CardsAddress>;
  CardAddresesCount: MetadataPagination;
  CardEmail: CardsEmails;
  CardPhone: CardsPhones;
  CardPhones: Array<CardsPhones>;
  CardPhonesCount: MetadataPagination;
  CardSocial: CardsSocial;
  CardSocials: Array<CardsSocial>;
  CardSocialsCount: MetadataPagination;
  CardWeb: CardsWeb;
  CardWebs: Array<CardsWeb>;
  CardWebsCount: MetadataPagination;
  Cards: Array<Cards>;
  CardsCount: MetadataPagination;
  CardsEmail: Array<CardsEmails>;
  CardsEmailCount: MetadataPagination;
  Carrusel: WebCarrusel;
  Carrusels: Array<WebCarrusel>;
  CarruselsCount: MetadataPagination;
  Plan: WebPlans;
  Plans: Array<WebPlans>;
  PlansCount: MetadataPagination;
  cities: Array<City>;
  city: City;
  codeRecoverPassword: Scalars['String']['output'];
  countries: Array<Country>;
  country: Country;
  department: Department;
  departments: Array<Department>;
  dummies: Array<Dummy>;
  dummiesCount: MetadataPagination;
  dummy: Dummy;
  file: FileInfo;
  getHoursCompany: HoursCompanyModel;
  parameter: Parameter;
  parameters: Array<Parameter>;
  parametersCount: MetadataPagination;
  revalidate: AuthResponse;
  sendEmailRecovryPassword: Scalars['String']['output'];
  user: User;
  users: Array<User>;
  usersCount: MetadataPagination;
  validateUserToken: User;
};


export type QueryCardArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCardAddresArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCardAddresesArgs = {
  orderBy?: InputMaybe<Array<FindCardAddressOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCardAddressWhere>;
};


export type QueryCardAddresesCountArgs = {
  orderBy?: InputMaybe<Array<FindCardAddressOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCardAddressWhere>;
};


export type QueryCardEmailArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCardPhoneArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCardPhonesArgs = {
  orderBy?: InputMaybe<Array<FindCardPhoneOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCardPhoneWhere>;
};


export type QueryCardPhonesCountArgs = {
  orderBy?: InputMaybe<Array<FindCardPhoneOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCardPhoneWhere>;
};


export type QueryCardSocialArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCardSocialsArgs = {
  orderBy?: InputMaybe<Array<FindCardSocialOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCardSocialWhere>;
};


export type QueryCardSocialsCountArgs = {
  orderBy?: InputMaybe<Array<FindCardSocialOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCardSocialWhere>;
};


export type QueryCardWebArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCardWebsArgs = {
  orderBy?: InputMaybe<Array<FindCardWebOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCardWebWhere>;
};


export type QueryCardWebsCountArgs = {
  orderBy?: InputMaybe<Array<FindCardWebOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCardWebWhere>;
};


export type QueryCardsArgs = {
  orderBy?: InputMaybe<Array<FindCardOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCardWhere>;
};


export type QueryCardsCountArgs = {
  orderBy?: InputMaybe<Array<FindCardOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCardWhere>;
};


export type QueryCardsEmailArgs = {
  orderBy?: InputMaybe<Array<FindCardEmailOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCardEmailWhere>;
};


export type QueryCardsEmailCountArgs = {
  orderBy?: InputMaybe<Array<FindCardEmailOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCardEmailWhere>;
};


export type QueryCarruselArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCarruselsArgs = {
  orderBy?: InputMaybe<Array<FindCarruselOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCarruselWhere>;
};


export type QueryCarruselsCountArgs = {
  orderBy?: InputMaybe<Array<FindCarruselOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCarruselWhere>;
};


export type QueryPlanArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPlansArgs = {
  orderBy?: InputMaybe<Array<FindPlanOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindPlanWhere>;
};


export type QueryPlansCountArgs = {
  orderBy?: InputMaybe<Array<FindPlanOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindPlanWhere>;
};


export type QueryCitiesArgs = {
  departmentId?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryCityArgs = {
  departmentId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type QueryCodeRecoverPasswordArgs = {
  codeRecoverPasswordInput: CodeRecoverPasswordInput;
};


export type QueryCountriesArgs = {
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryCountryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDepartmentArgs = {
  countryId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type QueryDepartmentsArgs = {
  countryId?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryDummiesArgs = {
  orderBy?: InputMaybe<Array<FindDummyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDummyWhere>;
};


export type QueryDummiesCountArgs = {
  orderBy?: InputMaybe<Array<FindDummyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDummyWhere>;
};


export type QueryDummyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetHoursCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryParameterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryParametersArgs = {
  orderBy?: InputMaybe<Array<FindParameterOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindParameterWhere>;
};


export type QueryParametersCountArgs = {
  orderBy?: InputMaybe<Array<FindParameterOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindParameterWhere>;
};


export type QuerySendEmailRecovryPasswordArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryUsersCountArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryValidateUserTokenArgs = {
  validateTokenInput: ValidateTokenInput;
};

export type RecoverPasswordInput = {
  email: Scalars['String']['input'];
};

export type SigninInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type StringFilter = {
  _contains?: InputMaybe<Scalars['String']['input']>;
  _endswith?: InputMaybe<Scalars['String']['input']>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  _like?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _notcontains?: InputMaybe<Scalars['String']['input']>;
  _notendswith?: InputMaybe<Scalars['String']['input']>;
  _notlike?: InputMaybe<Scalars['String']['input']>;
  _notstartswith?: InputMaybe<Scalars['String']['input']>;
  _startswith?: InputMaybe<Scalars['String']['input']>;
};

export enum TypeParameterEnum {
  Date = 'date',
  File = 'file',
  Hours = 'hours',
  Number = 'number',
  String = 'string'
}

export type UpdateCardAddressInput = {
  cardId?: InputMaybe<Scalars['ID']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCardEmailInput = {
  cardId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  icono?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCardInput = {
  colorPrincipal?: InputMaybe<Scalars['String']['input']>;
  colorSegundario?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  imageProfileId?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  subTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateCardPhoneInput = {
  cardId?: InputMaybe<Scalars['ID']['input']>;
  icono?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCardSocialInput = {
  cardId?: InputMaybe<Scalars['ID']['input']>;
  icono?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  typeSocial?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCardWebInput = {
  cardId?: InputMaybe<Scalars['ID']['input']>;
  icono?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  web?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCarruselInput = {
  descripcion?: InputMaybe<Scalars['String']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDummyInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstField?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  secondField?: InputMaybe<Scalars['DateTime']['input']>;
  thirdField?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateParametersInput = {
  codigo?: InputMaybe<Scalars['String']['input']>;
  companyId?: InputMaybe<Scalars['ID']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TypeParameterEnum>;
  valueDate?: InputMaybe<Scalars['DateTime']['input']>;
  valueFileId?: InputMaybe<Scalars['ID']['input']>;
  valueInt?: InputMaybe<Scalars['Float']['input']>;
  valueString?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePasswordInput = {
  password: Scalars['ValidatePassword']['input'];
  passwordConfirm: Scalars['ValidatePassword']['input'];
  token: Scalars['String']['input'];
};

export type UpdatePlanInput = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expirationDate?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fileId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  identificationNumber?: InputMaybe<Scalars['String']['input']>;
  identificationType?: InputMaybe<UserDocumentTypes>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['ValidatePassword']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  tokenExpoNotification?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<UserTypes>;
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['ValidatePassword']['input'];
  newPassword: Scalars['ValidatePassword']['input'];
  newPasswordConfirm: Scalars['ValidatePassword']['input'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  confirmationCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  emailVerification: Scalars['Boolean']['output'];
  file?: Maybe<FileInfo>;
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  identificationNumber?: Maybe<Scalars['String']['output']>;
  identificationType?: Maybe<UserDocumentTypes>;
  lastName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneVerification: Scalars['Boolean']['output'];
  status: UserStatusTypes;
  tokenExpoNotification?: Maybe<Scalars['String']['output']>;
  type: UserTypes;
  updatedAt: Scalars['DateTime']['output'];
};

export enum UserDocumentTypes {
  CitizenshipCard = 'CitizenshipCard',
  DiplomaticCard = 'DiplomaticCard',
  ForeignerIdentityCard = 'ForeignerIdentityCard',
  IdentityCard = 'IdentityCard',
  Nit = 'Nit',
  Passport = 'Passport',
  SafeConduct = 'SafeConduct',
  SpecialPermissionToStay = 'SpecialPermissionToStay',
  TemporaryProtectionPermit = 'TemporaryProtectionPermit'
}

export enum UserStatusTypes {
  Active = 'Active',
  Inactive = 'Inactive',
  PartlyActive = 'PartlyActive'
}

export enum UserTypes {
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
  User = 'User'
}

export type ValidateTokenInput = {
  token: Scalars['String']['input'];
};

export type WebCarrusel = {
  __typename?: 'WebCarrusel';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  descripcion: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imgen?: Maybe<FileInfo>;
  link: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type WebPlans = {
  __typename?: 'WebPlans';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  expirationDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  imgen?: Maybe<FileInfo>;
  isActive: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CardsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindCardOrderBy> | FindCardOrderBy>;
  where?: InputMaybe<FindCardWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type CardsQuery = { __typename?: 'Query', Cards: Array<{ __typename?: 'Cards', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, title?: string | null, description?: string | null, subTitle?: string | null, colorPrincipal?: string | null, colorSegundario?: string | null, isActive: boolean, imageProfile?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, transformedFileUrl?: string | null, url: string } | null, cardsEmails: Array<{ __typename?: 'CardsEmails', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, title?: string | null, email: string, icono?: string | null }>, cardsPhones: Array<{ __typename?: 'CardsPhones', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, title?: string | null, phone: string, icono?: string | null }>, cardsWeb: Array<{ __typename?: 'CardsWeb', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, title?: string | null, web: string, icono?: string | null }>, cardsSocial: Array<{ __typename?: 'CardsSocial', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, title?: string | null, url: string, typeSocial: string, icono?: string | null }>, cardsAddress: Array<{ __typename?: 'CardsAddress', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, title?: string | null, websiteUrl: string, city?: string | null, postalCode?: string | null, country?: string | null, region?: string | null, streetAddress?: string | null }> }>, CardsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };


export const CardsDocument = gql`
    query Cards($orderBy: [FindCardOrderBy!], $where: FindCardWhere, $pagination: Pagination) {
  Cards(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    title
    description
    subTitle
    colorPrincipal
    colorSegundario
    isActive
    imageProfile {
      id
      createdAt
      updatedAt
      deletedAt
      fileName
      fileExtension
      fileMode
      fileMongoId
      fileUrl
      transformedFileUrl
      url
    }
    cardsEmails {
      id
      createdAt
      updatedAt
      deletedAt
      title
      email
      icono
    }
    cardsPhones {
      id
      createdAt
      updatedAt
      deletedAt
      title
      phone
      icono
    }
    cardsWeb {
      id
      createdAt
      updatedAt
      deletedAt
      title
      web
      icono
    }
    cardsSocial {
      id
      createdAt
      updatedAt
      deletedAt
      title
      url
      typeSocial
      icono
    }
    cardsAddress {
      id
      createdAt
      updatedAt
      deletedAt
      title
      websiteUrl
      city
      postalCode
      country
      region
      streetAddress
    }
  }
  CardsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useCardsQuery__
 *
 * To run a query within a React component, call `useCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useCardsQuery(baseOptions?: Apollo.QueryHookOptions<CardsQuery, CardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
      }
export function useCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CardsQuery, CardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
        }
export function useCardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CardsQuery, CardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
        }
export type CardsQueryHookResult = ReturnType<typeof useCardsQuery>;
export type CardsLazyQueryHookResult = ReturnType<typeof useCardsLazyQuery>;
export type CardsSuspenseQueryHookResult = ReturnType<typeof useCardsSuspenseQuery>;
export type CardsQueryResult = Apollo.QueryResult<CardsQuery, CardsQueryVariables>;