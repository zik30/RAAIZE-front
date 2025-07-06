import { useSignInMutation } from '@src/entities/auth/api/signIn';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton, InputField, Typography } from '@src/shared/ui';
import styles from './LoginForm.module.scss';
import { useLoginForm } from '../model/useLogin';
import { paths } from '@src/shared/constants/constants';
import { IconGoogle } from '@src/shared/assets/icons/IconGoogle';

export const LoginForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useSignInMutation(() =>
    navigate(paths.homePage),
  );

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
