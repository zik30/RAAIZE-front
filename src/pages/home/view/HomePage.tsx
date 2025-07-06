import { GradientBackground } from '@src/features/gradientBackground';
import { CommunityBlock } from '@src/widgets/community';
import { HeroBlock } from '@src/widgets/heroBlock';
import { WorkspaceBlock } from '@src/widgets/workspaceBlock/view/WorkspaceBlock';
export const HomePage = () => {
  return (
    <div>
      <GradientBackground height="big">
        <HeroBlock />
        <CommunityBlock viewButton={true} />
        <WorkspaceBlock />
      </GradientBackground>
    </div>
  );
};
