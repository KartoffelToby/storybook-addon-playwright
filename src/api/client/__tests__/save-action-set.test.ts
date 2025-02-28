import { saveActionSet } from '../save-action-set';
import fetch from 'jest-fetch-mock';
import { ActionSet } from '../../../typings';
import { SaveActionSetRequest } from '../../typings';

describe('saveActionSet', () => {
  const actionSet: ActionSet = {
    actions: [
      {
        id: 'action-id',
        name: 'action-name',
      },
    ],
    id: 'action-set-id',
    title: 'action-set-desc',
  };

  const data: SaveActionSetRequest = {
    actionSet,
    fileName: 'story-file-name',
    storyId: 'story-id',
  };

  beforeEach(() => {
    fetch.doMock();
  });

  it('should call successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: true }));
    await expect(() => saveActionSet(data)).not.toThrow();
  });

  it('should throw error on server reject', async () => {
    fetch.mockReject(new Error('foo'));
    await expect(saveActionSet(data)).rejects.toThrow('foo');
  });
});
