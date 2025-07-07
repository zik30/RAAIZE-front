import { GradientBackground } from '@src/features/gradientBackground';
import { useAuth } from '@src/shared/hooks/useAuth';
import { CommunityBlock } from '@src/widgets/community';
import { HeroBlock } from '@src/widgets/heroBlock';
import { WorkspaceBlock } from '@src/widgets/workspaceBlock/view/WorkspaceBlock';

export const HomePage = () => {
  const { isAuth, username } = useAuth();

  return (
    <div>
      <GradientBackground height="big">
        <HeroBlock />
        {isAuth && username && <WorkspaceBlock viewButton={true} />}
        <CommunityBlock viewButton={true} />
      </GradientBackground>
    </div>
  );
};
