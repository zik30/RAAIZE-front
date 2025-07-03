import { useSignInMutation } from '@src/entities/auth/api/signIn';
import { useNavigate } from 'react-router-dom';
import { CustomButton, InputField, Typography } from '@src/shared/ui';
import styles from './LoginForm.module.scss';
import { useLoginForm } from '../model/useLogin';
import { paths } from '@src/shared/constants/constants';

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
    console.log('Login form data:', data);
    mutate({
      username: data.username,
      password: data.password,
    });
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formDescription}>
          <Typography variant="h3">Login</Typography>
        </div>
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
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          className={styles.input}
        />
        <div className={styles.formActions}>
          <CustomButton
            classnames={styles.submitButton}
            size="medium"
            color="primary"
            disabled={isPending}
          >
            {isPending ? 'Loading...' : 'Login'}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
