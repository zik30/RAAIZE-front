import { Container, Typography } from '@src/shared/ui';
import styles from './Footer.module.scss';
import { navigation, paths } from '@src/shared/constants/constants';
import logo from '@src/shared/assets/images/saydeckLogooo.png';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const Footer = () => {
  const socialLinks = [
    { id: 1, name: 'Instagram', url: 'https://instagram.com' },
    { id: 2, name: 'Facebook', url: 'https://facebook.com' },
    { id: 3, name: 'Twitter', url: 'https://twitter.com' },
    { id: 4, name: 'LinkedIn', url: 'https://linkedin.com' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.footerTop}>
            <div className={styles.logoSection}>
              <Link
                to={paths.homePage || '/'}
                aria-label="Go to homepage"
                className={styles.logoLink}
              >
                <img src={logo} alt="Company Logo" className={styles.logo} />
              </Link>
              <Typography
                variant="smallText"
                color="white"
                className={styles.description}
              >
                Creating innovative solutions for your business
              </Typography>
            </div>

            <nav className={styles.navigation}>
              <Typography
                variant="smallText"
                color="white"
                weight="bold"
                className={styles.navTitle}
              >
                Navigation
              </Typography>
              <ul className={styles.navList}>
                {navigation.map((elem) => (
                  <li key={elem.id}>
                    <Link to={elem.path} className={styles.navLink}>
                      <Typography variant="smallText" color="grey">
                        {elem.key}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.socialSection}>
              <Typography
                variant="smallText"
                color="white"
                weight="bold"
                className={styles.socialTitle}
              >
                Social Media
              </Typography>
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={`Visit ${social.name}`}
                  >
                    <Typography
                      variant="smallText"
                      color="grey"
                      className={styles.socialIcon}
                    >
                      {social.name}
                    </Typography>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.divider}></div>
            <div className={styles.bottomContent}>
              <Typography variant="extraSmall" color="grey">
                © {currentYear} All rights reserved
              </Typography>
              <div className={styles.bottomLinks}>
                <Link to="" className={styles.bottomLink}>
                  <Typography variant="extraSmall" color="grey">
                    Privacy Policy
                  </Typography>
                </Link>
                <Link to="" className={styles.bottomLink}>
                  <Typography variant="extraSmall" color="grey">
                    Terms of Service
                  </Typography>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.made}>
          <Sparkles size={18} className={styles.icon} />
          <Typography
            variant="extraSmall"
            weight="medium"
            className={styles.madeText}
          >
            MADE BY RAAIZE
          </Typography>
        </div>
      </Container>
    </footer>
  );
};
