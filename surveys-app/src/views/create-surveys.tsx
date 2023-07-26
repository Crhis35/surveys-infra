import React from 'react';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { SurveyInput } from '../gql';
import { FaMinus } from 'react-icons/fa';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateSurvey } from '../hooks';

export const validateSchema = z.object({
  question: z.string(),
  options: z
    .array(
      z.object({
        option: z.string(),
        label: z.string(),
        votes: z.coerce.number().positive(),
      })
    )
    .min(2),
});
export default function CreateSurvey() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { mutateAsync } = useCreateSurvey();

  const methods = useForm<SurveyInput>({
    mode: 'all',
    resolver: zodResolver(validateSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
    register,
  } = methods;

  const optionsField = useFieldArray({
    control,
    name: 'options',
  });

  const onSubmit = async (data: SurveyInput) => {
    try {
      const surveyInput = {
        ...data,
        votes: data.options?.reduce(
          (result, curr) => result + Number(curr?.votes),
          0
        ),
      };
      await mutateAsync({
        surveyInput,
      });
      onClose();
      toast({
        title: 'Created successfully`',
        position: 'bottom',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: error?.message,
        position: 'bottom',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Survey</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormProvider {...methods}>
              <Stack spacing={4} as="form">
                <FormControl>
                  <FormLabel>Question</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Question"
                    {...register('question')}
                  />
                </FormControl>
                {optionsField.fields.map((field, idx) => (
                  <Stack key={field.id} direction="column" spacing={2}>
                    <Stack direction="row" w="full" alignItems="flex-end">
                      <FormControl>
                        <FormLabel>Label {idx + 1}</FormLabel>
                        <Input
                          placeholder={`Option ${idx + 1}`}
                          {...register(`options.${idx}.label`)}
                        />
                      </FormControl>
                    </Stack>
                    <Stack direction="row" w="full">
                      <FormControl>
                        <FormLabel>Option {idx + 1}</FormLabel>
                        <Input
                          placeholder={`Option ${idx + 1}`}
                          {...register(`options.${idx}.option`)}
                        />
                      </FormControl>
                    </Stack>
                    <Stack direction="row" w="full">
                      <FormControl>
                        <FormLabel>Votes {idx + 1}</FormLabel>
                        <Input
                          placeholder={`Votes ${idx + 1}`}
                          type="number"
                          {...register(`options.${idx}.votes`)}
                        />
                      </FormControl>
                    </Stack>

                    <Stack direction="row-reverse">
                      <IconButton
                        icon={<FaMinus />}
                        aria-label={`Add option ${idx}`}
                        onClick={() => optionsField.remove(idx)}
                      />
                    </Stack>
                  </Stack>
                ))}
                <Box>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() =>
                      optionsField.append({
                        votes: 0,
                        label: '',
                        option: '',
                      })
                    }
                  >
                    +
                  </Button>
                </Box>
              </Stack>
            </FormProvider>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              isDisabled={!isValid}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
