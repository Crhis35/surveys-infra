import React, { PropsWithChildren } from 'react';

import {
  Card,
  Heading,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Stack,
  Badge,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Survey } from '../gql';
import { FaTrash } from 'react-icons/fa';
import { useDeleteSurvey } from '../hooks';
interface Props {
  item?: Survey;
}

export default function SurveyCard(props: PropsWithChildren<Props>) {
  const { item } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { mutateAsync, isLoading } = useDeleteSurvey();
  const toast = useToast();
  const deleteSurvey = async () => {
    try {
      await mutateAsync({
        id: item?.id || '',
      });
      onClose();
      toast({
        title: 'Deleted record!',
        status: 'success',
        position: 'bottom',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: error?.message,
        status: 'error',
        position: 'bottom',
      });
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <Stack direction="row" w="full" justifyContent="space-between">
            <Heading size="md"> {item?.question}</Heading>
            <IconButton
              icon={<FaTrash />}
              aria-label="delete card"
              colorScheme="red"
              onClick={onOpen}
            />
          </Stack>
        </CardHeader>
        <CardBody>
          <Text>Votes: {item?.votes}</Text>
        </CardBody>
        <CardFooter>
          <Stack direction="row">
            {item?.options?.length > 0 &&
              item?.options?.map((option, idx) => (
                <Badge
                  variant="outline"
                  colorScheme="green"
                  key={`${option?.label}${idx}`}
                >
                  {option?.label}:{' '}
                  {Math.round(
                    ((option?.votes || 1 * 100) / (item?.votes || 1)) * 100,
                    0
                  )}
                  %
                </Badge>
              ))}
          </Stack>
        </CardFooter>
      </Card>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Survey
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteSurvey}
                ml={3}
                isLoading={isLoading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
