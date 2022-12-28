import { STORY_CHANGED } from '@storybook/core-events';
import { useStorybookApi } from '@storybook/api';
import { useGlobalActionDispatch } from './use-global-action-dispatch';
import { useCurrentStoryData } from './use-current-story-data';

export const useResetSetting = () => {
  const api = useStorybookApi();

  const { dispatch } = useGlobalActionDispatch();

  const data = useCurrentStoryData();

  const reset = () => {
    api.emit(STORY_CHANGED);
    dispatch({ type: 'clearCurrentActionSets' });
    dispatch({ storyId: data.id, type: 'deleteTempActionSets' });
  };

  return reset;
};
