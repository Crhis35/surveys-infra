import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type DeleteRecord = {
  __typename?: 'DeleteRecord';
  id?: Maybe<Scalars['String']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createSurvey?: Maybe<Survey>;
  deleteSurvey?: Maybe<DeleteRecord>;
};


export type MutationCreateSurveyArgs = {
  surveyInput: SurveyInput;
};


export type MutationDeleteSurveyArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Option = {
  __typename?: 'Option';
  label?: Maybe<Scalars['String']['output']>;
  option?: Maybe<Scalars['String']['output']>;
  votes?: Maybe<Scalars['Int']['output']>;
};

export type OptionInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  option?: InputMaybe<Scalars['String']['input']>;
  votes?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  findAll?: Maybe<SurveyPage>;
  surveyById?: Maybe<Survey>;
};


export type QueryFindAllArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySurveyByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Survey = {
  __typename?: 'Survey';
  id?: Maybe<Scalars['ID']['output']>;
  options?: Maybe<Array<Maybe<Option>>>;
  question?: Maybe<Scalars['String']['output']>;
  votes?: Maybe<Scalars['Int']['output']>;
};

export type SurveyInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  options?: InputMaybe<Array<InputMaybe<OptionInput>>>;
  question?: InputMaybe<Scalars['String']['input']>;
  votes?: InputMaybe<Scalars['Int']['input']>;
};

export type SurveyPage = {
  __typename?: 'SurveyPage';
  count?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  records?: Maybe<Array<Maybe<Survey>>>;
  size?: Maybe<Scalars['Int']['output']>;
};

export type Vote = {
  __typename?: 'Vote';
  id?: Maybe<Scalars['ID']['output']>;
  optionId?: Maybe<Scalars['ID']['output']>;
  surveyId?: Maybe<Scalars['ID']['output']>;
  user?: Maybe<Scalars['String']['output']>;
};

export type SurveyFieldsFragment = { __typename?: 'Survey', votes?: number | null, id?: string | null, question?: string | null, options?: Array<{ __typename?: 'Option', votes?: number | null, label?: string | null, option?: string | null } | null> | null };

export type CreateSurveyMutationVariables = Exact<{
  surveyInput: SurveyInput;
}>;


export type CreateSurveyMutation = { __typename?: 'Mutation', createSurvey?: { __typename?: 'Survey', votes?: number | null, id?: string | null, question?: string | null, options?: Array<{ __typename?: 'Option', votes?: number | null, label?: string | null, option?: string | null } | null> | null } | null };

export type DeleteSurveyMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSurveyMutation = { __typename?: 'Mutation', deleteSurvey?: { __typename?: 'DeleteRecord', type?: string | null, id?: string | null, result?: string | null } | null };

export type FindAllSurveysQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindAllSurveysQuery = { __typename?: 'Query', findAll?: { __typename?: 'SurveyPage', size?: number | null, page?: number | null, count?: number | null, records?: Array<{ __typename?: 'Survey', votes?: number | null, id?: string | null, question?: string | null, options?: Array<{ __typename?: 'Option', votes?: number | null, label?: string | null, option?: string | null } | null> | null } | null> | null } | null };

export const SurveyFieldsFragmentDoc = `
    fragment SurveyFields on Survey {
  votes
  options {
    votes
    label
    option
  }
  id
  question
}
    `;
export const CreateSurveyDocument = `
    mutation createSurvey($surveyInput: SurveyInput!) {
  createSurvey(surveyInput: $surveyInput) {
    ...SurveyFields
  }
}
    ${SurveyFieldsFragmentDoc}`;
export const useCreateSurveyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateSurveyMutation, TError, CreateSurveyMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateSurveyMutation, TError, CreateSurveyMutationVariables, TContext>(
      ['createSurvey'],
      (variables?: CreateSurveyMutationVariables) => fetcher<CreateSurveyMutation, CreateSurveyMutationVariables>(client, CreateSurveyDocument, variables, headers)(),
      options
    );
export const DeleteSurveyDocument = `
    mutation deleteSurvey($id: ID!) {
  deleteSurvey(id: $id) {
    type
    id
    result
  }
}
    `;
export const useDeleteSurveyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteSurveyMutation, TError, DeleteSurveyMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteSurveyMutation, TError, DeleteSurveyMutationVariables, TContext>(
      ['deleteSurvey'],
      (variables?: DeleteSurveyMutationVariables) => fetcher<DeleteSurveyMutation, DeleteSurveyMutationVariables>(client, DeleteSurveyDocument, variables, headers)(),
      options
    );
export const FindAllSurveysDocument = `
    query findAllSurveys($page: Int, $size: Int) {
  findAll(page: $page, size: $size) {
    size
    page
    count
    records {
      ...SurveyFields
    }
  }
}
    ${SurveyFieldsFragmentDoc}`;
export const useFindAllSurveysQuery = <
      TData = FindAllSurveysQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FindAllSurveysQueryVariables,
      options?: UseQueryOptions<FindAllSurveysQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindAllSurveysQuery, TError, TData>(
      variables === undefined ? ['findAllSurveys'] : ['findAllSurveys', variables],
      fetcher<FindAllSurveysQuery, FindAllSurveysQueryVariables>(client, FindAllSurveysDocument, variables, headers),
      options
    );