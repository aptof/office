'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignupSchema, signupSchema } from './signup-schema';
import { useForm } from '@tanstack/react-form';
import { FieldGroup, Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { signupAction } from './signup-action';
import { toast } from '@/components/ui/toast';
import { Spinner } from '@/components/ui/spinner';
import { routes } from '@/helpers/routes';

export default function SignupPage() {
  const router = useRouter();

  const createUser = useMutation({
    mutationFn: (data: SignupSchema) => signupAction(data),
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      toast.add({ title: 'Error', description: error.message, type: 'error' });
    },
  });

  const signumForm = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      createUser.mutate(value);
    },
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Signup for Office</CardTitle>
        <CardDescription>Please signup to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            signumForm.handleSubmit();
          }}
        >
          <FieldGroup>
            <signumForm.Field name="name">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your name"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </signumForm.Field>

            <signumForm.Field name="email">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="e.g. john@example.com"
                      type="email"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </signumForm.Field>

            <signumForm.Field name="password">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Use an strong password"
                      type="password"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </signumForm.Field>

            <signumForm.Field name="confirm">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Re-enter your password"
                      type="password"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </signumForm.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button
            type="submit"
            form="signup-form"
            className="w-full"
            disabled={createUser.isPending}
          >
            {createUser.isPending ? <Spinner /> : 'Sign Up'}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(routes.login)}
            type="button"
            className="w-full"
          >
            Login
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
