import { GradientBackground } from '@src/features/gradientBackground';
import { HeroBlock } from '@src/widgets/heroBlock';
import { Workspace } from '@src/widgets/workspaceBlock';

export const HomePage = () => {
  return (
    <div>
      <GradientBackground height="big">
        <HeroBlock />
        <Workspace />
      </GradientBackground>
    </div>
  );
};
