'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { loginSchema, LoginSchema } from './login-schema';
import { loginAction } from './login-action';
import { useForm } from '@tanstack/react-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { routes } from '@/helpers/routes';
import { toast } from '@/components/ui/toast';

export default function LoginPage() {
  const router = useRouter();

  const login = useMutation({
    mutationFn: (data: LoginSchema) => loginAction(data),
    onError: (error) => {
      toast.add({ title: 'Error', description: error.message, type: 'error' });
    },
    onSuccess: () => {
      router.push(routes.home);
    },
  });

  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => login.mutate(value),
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Welcome back! Please login to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            loginForm.handleSubmit();
          }}
        >
          <FieldGroup>
            <loginForm.Field name="email">
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
            </loginForm.Field>

            <loginForm.Field name="password">
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
                      placeholder="your password"
                      type="password"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </loginForm.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button
            variant="link"
            onClick={() => router.push(routes.forgot)}
            type="button"
            className="w-full"
          >
            Forgot password?
          </Button>
          <Button type="submit" form="login-form" className="w-full" disabled={login.isPending}>
            {login.isPending ? <Spinner /> : 'Login'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
