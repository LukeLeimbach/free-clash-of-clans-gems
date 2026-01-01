'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSteps = [
  {
    name: 'username',
    label: 'Username',
    schema: z.object({
      username: z.string().min(1, 'Username is required'),
    }),
  },
  {
    name: 'email',
    label: 'Email',
    schema: z.object({
      email: z.string().email('Please enter a valid email address'),
    }),
  },
  {
    name: 'creditCard',
    label: 'Credit Card Number (FREE)',
    schema: z.object({
      creditCard: z
        .string()
        .min(13, 'Please enter a valid credit card number')
        .max(19, 'Please enter a valid credit card number'),
    }),
  },
  {
    name: 'mothersMaidenName',
    label: "Mother's Maiden Name",
    schema: z.object({
      mothersMaidenName: z.string().min(1, "Mother's maiden name is required"),
    }),
  },
  {
    name: 'firstDogsName',
    label: "First Dog's Name",
    schema: z.object({
      firstDogsName: z.string().min(1, "Dog's name is required"),
    }),
  },
  {
    name: 'homeAddress',
    label: 'Home Address',
    schema: z.object({
      homeAddress: z.string().min(1, 'Home address is required'),
    }),
  },
] as const;

type FormData = {
  username?: string;
  email?: string;
  creditCard?: string;
  mothersMaidenName?: string;
  firstDogsName?: string;
  homeAddress?: string;
};

interface FreeGemFormProps {
  onSpin?: () => void;
  isSpinning?: boolean;
}

// 20 random verification questions
const verificationQuestions = [
  {
    label: 'Social Security Number',
    name: 'ssn',
    placeholder: 'XXX-XX-XXXX',
    type: 'text',
    minLength: 9,
    errorMessage: 'SSN is required for verification',
  },
  {
    label: 'Bank Account Number',
    name: 'bankAccount',
    placeholder: 'Enter your bank account number',
    type: 'text',
    minLength: 10,
    errorMessage: 'Bank account number is required',
  },
  {
    label: 'ATM PIN',
    name: 'pin',
    placeholder: 'Enter your PIN',
    type: 'password',
    minLength: 4,
    errorMessage: 'PIN is required',
  },
  {
    label: 'Credit Card CVV',
    name: 'cvv',
    placeholder: 'Enter CVV',
    type: 'password',
    minLength: 3,
    errorMessage: 'CVV is required',
  },
  {
    label: 'Driver License Number',
    name: 'driverLicense',
    placeholder: 'Enter your driver license number',
    type: 'text',
    minLength: 5,
    errorMessage: 'Driver license number is required',
  },
  {
    label: 'Passport Number',
    name: 'passport',
    placeholder: 'Enter your passport number',
    type: 'text',
    minLength: 6,
    errorMessage: 'Passport number is required',
  },
  {
    label: 'Date of Birth',
    name: 'dob',
    placeholder: 'MM/DD/YYYY',
    type: 'text',
    minLength: 8,
    errorMessage: 'Date of birth is required',
  },
  {
    label: 'Mother\'s Maiden Name',
    name: 'mothersMaidenName',
    placeholder: 'Enter mother\'s maiden name',
    type: 'text',
    minLength: 2,
    errorMessage: 'Mother\'s maiden name is required',
  },
  {
    label: 'First Pet\'s Name',
    name: 'firstPet',
    placeholder: 'Enter your first pet\'s name',
    type: 'text',
    minLength: 2,
    errorMessage: 'First pet\'s name is required',
  },
  {
    label: 'High School Mascot',
    name: 'highSchoolMascot',
    placeholder: 'Enter your high school mascot',
    type: 'text',
    minLength: 2,
    errorMessage: 'High school mascot is required',
  },
  {
    label: 'Favorite Teacher\'s Name',
    name: 'favoriteTeacher',
    placeholder: 'Enter your favorite teacher\'s name',
    type: 'text',
    minLength: 2,
    errorMessage: 'Favorite teacher\'s name is required',
  },
  {
    label: 'Childhood Best Friend\'s Name',
    name: 'childhoodFriend',
    placeholder: 'Enter your childhood best friend\'s name',
    type: 'text',
    minLength: 2,
    errorMessage: 'Childhood best friend\'s name is required',
  },
  {
    label: 'First Car Make and Model',
    name: 'firstCar',
    placeholder: 'Enter your first car',
    type: 'text',
    minLength: 3,
    errorMessage: 'First car is required',
  },
  {
    label: 'Street You Grew Up On',
    name: 'childhoodStreet',
    placeholder: 'Enter the street you grew up on',
    type: 'text',
    minLength: 3,
    errorMessage: 'Childhood street is required',
  },
  {
    label: 'Favorite Food',
    name: 'favoriteFood',
    placeholder: 'Enter your favorite food',
    type: 'text',
    minLength: 2,
    errorMessage: 'Favorite food is required',
  },
  {
    label: 'Phone Number',
    name: 'phone',
    placeholder: '(XXX) XXX-XXXX',
    type: 'tel',
    minLength: 10,
    errorMessage: 'Phone number is required',
  },
  {
    label: 'Email Password',
    name: 'emailPassword',
    placeholder: 'Enter your email password',
    type: 'password',
    minLength: 6,
    errorMessage: 'Email password is required',
  },
  {
    label: 'Bank Routing Number',
    name: 'routingNumber',
    placeholder: 'Enter your bank routing number',
    type: 'text',
    minLength: 9,
    errorMessage: 'Routing number is required',
  },
  {
    label: 'Social Media Password',
    name: 'socialMediaPassword',
    placeholder: 'Enter your social media password',
    type: 'password',
    minLength: 6,
    errorMessage: 'Social media password is required',
  },
  {
    label: 'WiFi Password',
    name: 'wifiPassword',
    placeholder: 'Enter your WiFi password',
    type: 'password',
    minLength: 8,
    errorMessage: 'WiFi password is required',
  },
] as const;

export function FreeGemForm({ onSpin, isSpinning = false }: FreeGemFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const currentStepConfig = formSteps[currentStep];

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  // Randomly select a verification question when dialog opens
  useEffect(() => {
    if (isVerificationOpen) {
      setSelectedQuestionIndex(
        Math.floor(Math.random() * verificationQuestions.length)
      );
    }
  }, [isVerificationOpen]);

  const selectedQuestion = verificationQuestions[selectedQuestionIndex];

  // Create dynamic verification schema based on selected question
  const verificationSchema = useMemo(() => {
    return z.object({
      [selectedQuestion.name]: z
        .string()
        .min(selectedQuestion.minLength, selectedQuestion.errorMessage),
    });
  }, [selectedQuestion]);

  const verificationForm = useForm<Record<string, string>>({
    resolver: zodResolver(verificationSchema as any),
    defaultValues: {
      [selectedQuestion.name]: '',
    },
    mode: 'onChange',
  });

  // Reset form when question changes
  useEffect(() => {
    if (isVerificationOpen) {
      verificationForm.reset({
        [selectedQuestion.name]: '',
      });
    }
  }, [isVerificationOpen, selectedQuestion.name, verificationForm]);

  // Get current value, ensuring it's always a string
  const getCurrentValue = () => {
    const value = formData[currentStepConfig.name as keyof FormData];
    return value || '';
  };

  const form = useForm<Record<string, string>>({
    resolver: zodResolver(currentStepConfig.schema as any),
    defaultValues: {
      [currentStepConfig.name]: getCurrentValue(),
    },
    mode: 'onChange',
  });

  // Update form when step changes
  useEffect(() => {
    const currentValue = getCurrentValue();
    form.reset({
      [currentStepConfig.name]: currentValue,
    });
    // Re-validate after reset
    form.trigger();
  }, [currentStep, currentStepConfig.name, form, formData]);

  const onSubmit = (data: Record<string, string>) => {
    // Save current step data
    const updatedData = { ...formData, ...data } as FormData;
    setFormData(updatedData);

    // Open verification dialog instead of spinning directly
    setIsVerificationOpen(true);
  };

  const onVerificationSubmit = (data: Record<string, string>) => {
    // Close dialog
    setIsVerificationOpen(false);
    // Reset verification form
    verificationForm.reset();

    // Trigger spin
    onSpin?.();

    // Move to next step
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step - form is complete
      console.log('Form completed:', formData);
    }
  };

  const isFormValid = form.formState.isValid;

  return (
    <div className='space-y-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <h2>
            unlock <span className='font-extrabold text-primary'>FREE</span> gem
            by spining the wheel
          </h2>

          <FormField
            control={form.control}
            name={currentStepConfig.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{currentStepConfig.label}</FormLabel>
                <FormControl>
                  <Input
                    type={
                      currentStepConfig.name === 'email'
                        ? 'email'
                        : currentStepConfig.name === 'creditCard'
                          ? 'text'
                          : 'text'
                    }
                    placeholder={`Enter your ${currentStepConfig.label.toLowerCase()}`}
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={!isFormValid || isSpinning}>
            FREE SPIN
          </Button>
        </form>
      </Form>

      <Dialog
        open={isVerificationOpen}
        onOpenChange={(open) => {
          // Prevent closing by clicking outside or pressing escape
          // Only allow closing through Cancel button or form submission
          if (open) {
            setIsVerificationOpen(true);
          }
        }}
      >
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>human verifiy required</DialogTitle>
            <DialogDescription>
              because this works so good, bad hakcers keep going to hack this site. prove you arnt trying to hack
            </DialogDescription>
          </DialogHeader>

          <Form {...verificationForm}>
            <form
              onSubmit={verificationForm.handleSubmit(onVerificationSubmit)}
              className='space-y-4'
            >
              <FormField
                control={verificationForm.control}
                name={selectedQuestion.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{selectedQuestion.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={selectedQuestion.type}
                        placeholder={selectedQuestion.placeholder}
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => {
                    setIsVerificationOpen(false);
                    verificationForm.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={!verificationForm.formState.isValid}
                >
                  Verify & Spin
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
