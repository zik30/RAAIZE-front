import styles from './ChatHeader.module.scss';
import { paths } from '@src/shared/constants/constants';
import { useAuth } from '@src/shared/hooks/useAuth';
import { Container, CustomButton, Typography } from '@src/shared/ui';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@src/shared/assets/images/saydeckLogooo.png';

import { usePresentationStore } from '@src/shared/store/presentationStore';
import { useSavePresentationMutation } from '@src/widgets/savePresentation/api/useSavePresentation';
import { BoardSelectModal } from '@src/widgets/savePresentation/view/BoardSelectModal';

export const ChatHeader = () => {
  const { isAuth, username, setUsername, logout } = useAuth();
  const { presentation } = usePresentationStore();

  const [showModal, setShowModal] = useState(false);
  const { mutate, isLoading } = useSavePresentationMutation();

  useEffect(() => {
    if (isAuth && !username) {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [isAuth, username, setUsername]);

  const handleSave = () => {
    setShowModal(true);
  };

  const generateHTMLFromSlides = () => {
    if (!presentation || !presentation.slides) return '';
    return presentation.slides
      .map((slide) => {
        return `
          <div style="padding: 16px; border-bottom: 1px solid #eee">
            <h2>${slide.title}</h2>
            <div>${slide.content}</div>
            ${slide.image?.url ? `<img src="${slide.image.url}" style="max-width:100%; margin-top: 10px; border-radius: 8px;" />` : ''}
          </div>
        `;
      })
      .join('');
  };

  const handleBoardSelect = (boardId: number) => {
    if (!presentation) return;

    const html = generateHTMLFromSlides();

    mutate(
      {
        title: presentation.title || 'Без названия',
        html,
        boardId,
      },
      {
        onSuccess: () => {
          setShowModal(false);
          alert('✅ Презентация успешно сохранена!');
        },
        onError: (error) => {
          console.error(error);
          alert('❌ Ошибка при сохранении презентации!');
        },
      }
    );
  };

  return (
    <header>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Link to={paths.homePage || '/'} aria-label="Go to homepage">
              <img src={logo} alt="Company Logo" />
            </Link>
          </div>
          <div className={styles.userActions}>
            {isAuth ? (
              <div className={styles.userInfo}>
                <div className={styles.usernameContainer}>
                  {username ? (
                    <Typography
                      color="white"
                      variant="bodyText"
                      className={styles.username}
                    >
                      {username}
                    </Typography>
                  ) : (
                    <div className={styles.usernameSkeleton} />
                  )}
                </div>
                <div className={styles.buttonContainer}>
                  {username ? (
                    <>
                      <CustomButton color="secondary" onclick={logout}>
                        <Typography variant="bodyText">Logout</Typography>
                      </CustomButton>

                      <button
                        className={styles.save}
                        onClick={handleSave}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Сохраняем...' : 'Save'}
                      </button>
                    </>
                  ) : (
                    <div className={styles.buttonSkeleton} />
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link to={paths.loginPage}>
                  <CustomButton color="secondary">
                    <Typography variant="bodyText">Log in</Typography>
                  </CustomButton>
                </Link>
                <Link to={paths.registerPage}>
                  <CustomButton color="primary">
                    <Typography color="black" variant="bodyText">
                      Sign Up
                    </Typography>
                  </CustomButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>

      {showModal && (
        <BoardSelectModal
          onSelect={handleBoardSelect}
          onClose={() => setShowModal(false)}
        />
      )}
    </header>
  );
};
