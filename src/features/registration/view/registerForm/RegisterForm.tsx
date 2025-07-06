import { toaster } from '@src/shared/lib/toaster/toaster';
import { useAuth } from '@src/shared/hooks/useAuth';
import { CustomButton, InputField, Typography } from '@src/shared/ui';
import { useRegisterForm } from '../../model/useSignUp';
import styles from './RegisterForm.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { paths } from '@src/shared/constants/constants';
import { IconGoogle } from '@src/shared/assets/icons/IconGoogle';
import { initiateGoogleAuth, useSignUpMutation } from '@src/entities/auth';
import { useEffect } from 'react';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    if (!data.email || !data.username || !data.password) {
      toaster('error', 'All fields are required');
      return;
    }
    registerUser(mutate, {
      email: data.email,
      username: data.username,
      password: data.password,
    });
  };

  useEffect(() => {
    if (location.state?.showGoogleError && location.state?.error) {
      toaster('error', location.state.error);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formDescription}>
          <Typography variant="h2" color="white">
            Create your account
          </Typography>
          <div className={styles.registerByGoogle}>
            <CustomButton
              color="tertiary"
              classnames={styles.customButton}
              size="small"
              onclick={initiateGoogleAuth}
              type="button"
            >
              <IconGoogle />
              <Typography variant="smallText">Continue with Google</Typography>
            </CustomButton>
          </div>
        </div>
        <div className={styles.line}>OR</div>
        <div className={styles.inputList}>
          <InputField
            control={control}
            name="username"
            type="text"
            label="Username"
            placeholder="Enter your username"
            error={errors.username?.message}
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
        </div>
        <div className={styles.formActions}>
          <CustomButton
            classnames={styles.submitButton}
            size="medium"
            color="secondary"
            disabled={isPending}
          >
            {isPending ? 'Loading...' : 'Register'}
          </CustomButton>
          <div className={styles.loginText}>
            <Typography variant="smallText" color="white">
              Already have an account?{' '}
              <Link to={paths.loginPage} className={styles.linker}>
                Log in
              </Link>
            </Typography>
          </div>
        </div>
      </form>
    </div>
  );
};
