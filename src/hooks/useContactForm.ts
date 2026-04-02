import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { sendContactEmail } from '../api';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  inquiryType: string;
  message: string;
}

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  inquiryType: '',
  message: '',
};

export const useContactForm = () => {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await sendContactEmail(formState);
      setSubmitted(true);
      setFormState(initialState);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unexpected error occurred.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formState, isSubmitting, submitted, error, handleChange, handleSubmit };
};