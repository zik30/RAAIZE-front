import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CustomButton, InputField, Typography } from '@src/shared/ui';
import styles from './LoginForm.module.scss';
import { useLoginForm } from '../model/useLogin';
import { paths } from '@src/shared/constants/constants';
import { IconGoogle } from '@src/shared/assets/icons/IconGoogle';
import { useEffect } from 'react';
import { toaster } from '@src/shared/lib/toaster/toaster';
import { initiateGoogleAuth, useSignInMutation } from '@src/entities/auth';

export const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate, isPending } = useSignInMutation(() =>
    navigate(paths.homePage),
  );

  useEffect(() => {
    if (location.state?.showGoogleError && location.state?.error) {
      toaster('error', location.state.error);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  const onSubmit = (data: { username: string; password: string }) => {
    mutate({
      username: data.username,
      password: data.password,
    });
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formDescription}>
          <Typography variant="h2" color="white">
            Login
          </Typography>
          <div className={styles.loginByGoogle}>
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
            type="email"
            label="Email"
            placeholder="Enter your email"
            error={errors.username?.message}
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
            type="submit"
            classnames={styles.submitButton}
            size="medium"
            color="secondary"
            disabled={isPending}
          >
            {isPending ? 'Loading...' : 'Login'}
          </CustomButton>
          <div className={styles.signUpText}>
            <Typography variant="smallText" color="white">
              Don&apos;t have an account?{' '}
              <Link to={paths.registerPage} className={styles.linker}>
                Create your account
              </Link>
            </Typography>
          </div>
        </div>
      </form>
    </div>
  );
};
