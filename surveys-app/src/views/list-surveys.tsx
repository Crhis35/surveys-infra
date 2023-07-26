import React from 'react';
import { SimpleGrid, Box, Center, Spinner } from '@chakra-ui/react';
import { useSurveyList } from '../hooks/surveys';
import SurveyCard from '../components/survey-card';

export default function ListSurveys() {
  const { isLoading, surveys } = useSurveyList();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Center w="full" h="vh">
      <SimpleGrid columns={2} spacing={10} w="full" p="20">
        {surveys.length > 0 &&
          surveys.map((survey) => (
            <SurveyCard item={survey} key={survey?.id} />
          ))}
      </SimpleGrid>
    </Center>
  );
}
