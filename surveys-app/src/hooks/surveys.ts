import {
  useCreateSurveyMutation,
  useDeleteSurveyMutation,
  useFindAllSurveysQuery,
} from '../gql';
import { gqlClient } from '../utils/client';

import { useQueryClient } from '@tanstack/react-query';
export function useSurveyList() {
  const { data, isLoading } = useFindAllSurveysQuery(gqlClient, {
    page: 0,
    size: 100,
  });

  return {
    isLoading,
    surveys: data?.findAll?.records || [],
  };
}
export function useCreateSurvey() {
  const queryClient = useQueryClient();
  return useCreateSurveyMutation(gqlClient, {
    onSuccess: () => {
      queryClient.invalidateQueries(['findAllSurveys']);
    },
  });
}

export function useDeleteSurvey() {
  const queryClient = useQueryClient();

  return useDeleteSurveyMutation(gqlClient, {
    onSuccess: () => {
      queryClient.invalidateQueries(['findAllSurveys']);
    },
  });
}
