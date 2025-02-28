import { deleteActionSet } from '../delete-action-set';
import { storyFileInfo } from '../../../../../__test_data__/story-file-info';
import { saveStoryFile, loadStoryData } from '../../utils';
import { mocked } from 'jest-mock';

jest.mock('../../utils/save-story-file');
jest.mock('../../utils/load-story-data');
const saveStoryFileMock = mocked(saveStoryFile);
const loadStoryDataMock = mocked(loadStoryData);

describe('deleteActionSet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should throw error if story id missing', async () => {
    await expect(
      deleteActionSet({
        actionSetId: '',
        fileName: 'story-file-name',
        storyId: 'story-id',
      }),
    ).rejects.toThrow();
  });

  it('should not call save if story id cannot be found', async () => {
    await deleteActionSet({
      actionSetId: 'action-set-id',
      fileName: 'story-file-name',
      storyId: 'story-id-1',
    });
    expect(saveStoryFile).toHaveBeenCalledTimes(0);
  });

  it("should not call save if story doesn't have action sets", async () => {
    loadStoryDataMock.mockImplementationOnce(() => {
      return new Promise((resolve) => {
        const data = storyFileInfo();
        delete data.stories['story-id'].actionSets;
        resolve(data);
      });
    });

    await deleteActionSet({
      actionSetId: 'action-set-id',
      fileName: 'story-file-name',
      storyId: 'story-id',
    });

    expect(saveStoryFileMock).toHaveBeenCalledTimes(0);
  });

  it('should save', async () => {
    await deleteActionSet({
      actionSetId: 'action-set-id',
      fileName: 'story-file-name',
      storyId: 'story-id',
    });
    expect(saveStoryFileMock).toHaveBeenCalledTimes(1);
  });

  it('should delete actionSets if empty', async () => {
    loadStoryDataMock.mockImplementationOnce(() => {
      return new Promise((resolve) => {
        const data = storyFileInfo();
        data.stories['story-id'].actionSets = [
          {
            actions: [],
            id: 'action-set-id',
            title: '',
          },
        ];
        resolve(data);
      });
    });

    await deleteActionSet({
      actionSetId: 'action-set-id',
      fileName: 'story-file-name',
      storyId: 'story-id',
    });

    const actionSets =
      saveStoryFileMock.mock.calls[0][1].stories['story-id'].actionSets;
    expect(actionSets).toStrictEqual(undefined);
  });
});
