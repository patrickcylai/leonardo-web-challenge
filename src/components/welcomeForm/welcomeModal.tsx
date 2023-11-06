import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useUser } from '@/providers/UserProvider';
import ModalFormInput from './modalFormInput';

const steps = [
  { title: 'First', description: 'Username' },
  { title: 'Second', description: 'Job Title' },
];

export default function WelcomeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const { setUsername, setJobTitle } = useUser();
  const [formUsername, setFormUsername] = useState('');
  const [formJobTitle, setFormJobTitle] = useState('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormUsername(e.target.value);
  };

  const handleJobTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormJobTitle(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUsername(formUsername);
    setJobTitle(formJobTitle);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome! Finalising your account</ModalHeader>
        <ModalBody pb="6">
          <Stepper index={activeStep} p="10">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          {/* Show Username input on first and Job Title input on second step */}
          {activeStep === 1 ? (
            <ModalFormInput
              label="Username"
              placeholder="Username"
              value={formUsername}
              onChange={handleUsernameChange}
            />
          ) : (
            <ModalFormInput
              label="Job Title"
              placeholder="Job Title"
              value={formJobTitle}
              onChange={handleJobTitleChange}
            />
          )}
        </ModalBody>

        <ModalFooter>
          {activeStep === 2 && (
            <>
              <Button
                colorScheme="blue"
                mr="3"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleSubmit}
                isDisabled={formJobTitle === ''}
              >
                Finish
              </Button>
            </>
          )}
          {activeStep === 1 && (
            <Button
              colorScheme="blue"
              onClick={() => setActiveStep(activeStep + 1)}
              isDisabled={formUsername === ''}
            >
              Next
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
