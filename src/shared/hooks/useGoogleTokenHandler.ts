import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleAuthMutation } from '@src/entities/auth/api/googleAuth';
import { paths } from '@src/shared/constants/constants';

export const useGoogleTokenHandler = () => {
  const navigate = useNavigate();

  const { mutate: handleGoogleAuth, isPending } = useGoogleAuthMutation(() => {
    navigate(paths.homePage);
  });

  useEffect(() => {
    // Проверяем URL на наличие токена при загрузке приложения
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Если есть токен в URL, обрабатываем его
      handleGoogleAuth(token);

      // Очищаем URL от токена для безопасности
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [handleGoogleAuth, navigate]);

  return { isPending };
};
