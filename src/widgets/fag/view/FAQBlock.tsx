import { Container, Typography } from '@src/shared/ui';
import styles from './FAQBlock.module.scss';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export const FAQBlock = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const FAQData = [
    {
      id: 1,
      title: 'What is MirrorAi?',
      description:
        'MirrorAi is an AI-powered platform that helps you generate presentation slides (.pptx) using voice input, text prompts, or links to web pages like Wikipedia in under 4 seconds.',
    },
    {
      id: 2,
      title: 'Who is MirrorAi for?',
      description:
        'MirrorAi is designed for students aged 12 to 25 who need to quickly create presentations for school or university using AI assistance.',
    },
    {
      id: 3,
      title: 'Do I need to register to use MirrorAi?',
      description:
        'No, guests can use MirrorAi with limited features. However, registered users get full access, including unlimited credits, the ability to save and edit presentations, and more.',
    },
    {
      id: 4,
      title: 'Can I choose the style of my presentation?',
      description:
        'Yes! MirrorAi offers a variety of templates and styles that you can select from before generating your presentation.',
    },
    {
      id: 5,
      title: 'What languages does MirrorAi support?',
      description:
        'MirrorAi currently supports Russian, English, and Kyrgyz languages for both input and presentation content.',
    },
    {
      id: 6,
      title: 'How do I generate a presentation?',
      description:
        'Simply enter a text or voice prompt, or paste a link to a webpage like Wikipedia. MirrorAi will extract key information and generate a presentation for you in seconds.',
    },
    {
      id: 7,
      title: "Can I edit my presentation after it's generated?",
      description:
        'Yes, presentations can be edited directly on the working page, including modifying text, repositioning elements, and adjusting styles.',
    },
    {
      id: 8,
      title: 'Is there a limit on presentation length?',
      description:
        'Guests can create presentations up to 4-5 slides. Registered users have no slide limit and can also enable animations.',
    },
  ];

  return (
    <Container>
      <div className={styles.FAQBlock}>
        <Typography variant="h2" color="white">
          FAQ
        </Typography>
        <div className={styles.collapsibleBlock}>
          {FAQData.map((faq) => (
            <div className={styles.itemWrapper} key={faq.id}>
              <div
                className={`${styles.question} ${
                  openItems.has(faq.id) ? styles.active : ''
                }`}
                onClick={() => toggleItem(faq.id)}
              >
                <Typography variant="bodyText" weight="bold" color="white">
                  {faq.title}
                </Typography>
                <ChevronDown
                  color="white"
                  size={30}
                  className={`${styles.icon} ${
                    openItems.has(faq.id) ? styles.rotated : ''
                  }`}
                />
              </div>
              <div
                className={`${styles.answer} ${
                  openItems.has(faq.id) ? styles.open : ''
                }`}
              >
                <div className={styles.answerContent}>
                  <Typography variant="bodyText" color="white">
                    {faq.description}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
