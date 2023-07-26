import React, { lazy, Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { Spinner, VStack } from '@chakra-ui/react';
import MainLayout from './layout/main-layout';

const ListSurveys = lazy(() => import('./views/list-surveys'));

export default function App() {
  return (
    <VStack h="100vh" w="100vw">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ListSurveys />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </VStack>
  );
}
