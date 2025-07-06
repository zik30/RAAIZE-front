import { Container, CustomButton, Typography } from '@src/shared/ui';
import styles from './Pricing.module.scss';
import { PricingPlan } from '../types/types';
import { pricingPlans } from '@src/shared/constants/constants';
import { Check } from 'lucide-react';

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
  <div className={styles.card}>
    <div className={styles.title}>
      <Typography variant="h3" color="white" weight="medium">
        {plan.title}
      </Typography>
      {plan.isPopular && (
        <div className={styles.isPopular}>
          <Typography variant="extraSmall" color="lightBlue" weight="bold">
            POPULAR
          </Typography>
        </div>
      )}
    </div>

    <div className={styles.price}>
      <Typography variant="h2" color="white">
        {plan.price}
        <span className={styles.smallText}> {plan.period}</span>
      </Typography>
    </div>

    <div className={styles.creditInfo}>
      <Typography variant="smallText" color="grey">
        {plan.description}
      </Typography>
      {plan.credit && (
        <div className={styles.creditAmount}>
          <Typography variant="smallText" color="grey">
            {plan.credit}
          </Typography>
        </div>
      )}
      {plan.buttonText && (
        <CustomButton color="secondary" size="small" disabled>
          {plan.buttonText}
        </CustomButton>
      )}
    </div>

    <div className={styles.features}>
      <Typography variant="smallText" color="white">
        Specifications:
      </Typography>
      <ul className={styles.featuresList}>
        {plan.features.map((feature, index) => (
          <li key={index} className={styles.listElement}>
            <Check color="white" size={17} />
            <Typography variant="smallText" color="grey">
              {feature}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const Pricing = () => {
  return (
    <Container>
      <div className={styles.pricingBlock}>
        <div className={styles.textArea}>
          <Typography variant="h2" color="white" weight="bold">
            Pricing
          </Typography>
          <Typography variant="bodyText" color="grey">
            Begin with a free plan. Upgrade to meet your team&apos;s evolving
            needs.
          </Typography>
        </div>
        <div className={styles.cardsList}>
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </Container>
  );
};
