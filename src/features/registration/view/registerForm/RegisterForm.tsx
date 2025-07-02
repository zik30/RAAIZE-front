import { useSignUpMutation } from '@src/entities/auth/api/signUp';
import { useAuth } from '@src/shared/hooks/useAuth';
import { toaster } from '@src/shared/lib/toaster/toaster';
import InputField from './InputField';
import styles from './RegisterForm.module.scss';
import { useRegisterForm } from '../../model/useSignUp';

export const RegisterForm = () => {
  const { register: registerUser } = useAuth();
  const { mutate, isPending } = useSignUpMutation(() => {
    toaster('success', 'Registration successful!');
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useRegisterForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    registerUser(mutate, {
      email: data.email,
      username: data.first_name,
      password: data.password,
    });
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formDescription}>
          <h2>Registration</h2>
        </div>
        <InputField
          control={control}
          name="first_name"
          type="text"
          label="Name"
          placeholder="Enter your name"
          error={errors.first_name?.message}
          className={styles.input}
        />
        <InputField
          control={control}
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          error={errors.email?.message}
          className={styles.input}
        />
        <InputField
          control={control}
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          className={styles.input}
        />
        <InputField
          control={control}
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Repeat your password"
          error={errors.confirmPassword?.message}
          className={styles.input}
        />
        <div className={styles.formActions}>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Loading...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
