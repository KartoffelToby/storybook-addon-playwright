import { testStoryScreenshots } from '../test-story-screenshots';
import { getConfigs } from '../../configs';
import { mocked } from 'jest-mock';
import { defaultConfigs } from '../../../../../__test_data__/configs';

jest.mock('../make-screenshot');
jest.mock('../../utils/load-story-data');
jest.mock('../diff-image-to-screenshot');
jest.mock('../../configs');

const afterStoryImageDiffMock = jest.fn();
const beforeStoryImageDiffMock = jest.fn();
mocked(getConfigs).mockImplementation(() => ({
  afterStoryImageDiff: afterStoryImageDiffMock,
  beforeStoryImageDiff: beforeStoryImageDiffMock,
  ...defaultConfigs(),
}));

describe('testStoryScreenshot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should have diff', async () => {
    const result = await testStoryScreenshots({
      fileName: 'story.ts',
      requestId: 'request-id',
      storyId: 'story-id',
    });
    expect(result).toStrictEqual([
      {
        added: true,
        fileName: 'story.ts',
        newScreenshot: 'base64-image',
        screenshotData: {
          actionSets: [
            {
              actions: [
                { args: { selector: 'html' }, id: 'action-id', name: 'click' },
              ],
              id: 'action-set-id',
              title: 'click',
            },
          ],
          browserType: 'chromium',
          id: 'screenshot-id',
          index: 0,
          title: 'title',
        },
        screenshotId: 'screenshot-id',
        storyId: 'story-id',
      },
      {
        added: true,
        fileName: 'story.ts',
        newScreenshot: 'base64-image',
        screenshotData: {
          actionSets: [
            {
              actions: [
                { args: { selector: 'html' }, id: 'action-id', name: 'click' },
              ],
              id: 'action-set-id-2',
              title: 'click',
            },
          ],
          browserType: 'chromium',
          id: 'screenshot-id-2',
          index: 1,
          title: 'title-2',
        },
        screenshotId: 'screenshot-id-2',
        storyId: 'story-id',
      },
    ]);
  });

  it('should throw if story not found', async () => {
    await expect(
      testStoryScreenshots({
        fileName: 'story.ts',
        requestId: 'request-id',
        storyId: 'story-id-2',
      }),
    ).rejects.toThrow('Unable to find story screenshots');
  });

  it('should call afterAllImageDiff with result', async () => {
    await testStoryScreenshots({
      fileName: 'story.ts',
      requestId: 'request-id',
      requestType: 'story',
      storyId: 'story-id',
    });
    expect(afterStoryImageDiffMock).toHaveBeenCalledWith(
      [
        {
          added: true,
          fileName: 'story.ts',
          newScreenshot: 'base64-image',
          screenshotData: {
            actionSets: [
              {
                actions: [
                  {
                    args: { selector: 'html' },
                    id: 'action-id',
                    name: 'click',
                  },
                ],
                id: 'action-set-id',
                title: 'click',
              },
            ],
            browserType: 'chromium',
            id: 'screenshot-id',
            index: 0,
            title: 'title',
          },
          screenshotId: 'screenshot-id',
          storyId: 'story-id',
        },
        {
          added: true,
          fileName: 'story.ts',
          newScreenshot: 'base64-image',
          screenshotData: {
            actionSets: [
              {
                actions: [
                  {
                    args: { selector: 'html' },
                    id: 'action-id',
                    name: 'click',
                  },
                ],
                id: 'action-set-id-2',
                title: 'click',
              },
            ],
            browserType: 'chromium',
            id: 'screenshot-id-2',
            index: 1,
            title: 'title-2',
          },
          screenshotId: 'screenshot-id-2',
          storyId: 'story-id',
        },
      ],
      {
        fileName: 'story.ts',
        requestId: 'request-id',
        requestType: 'story',
        storyId: 'story-id',
      },
    );
  });

  it('should call beforeStoryImageDiff with request data', async () => {
    await testStoryScreenshots({
      fileName: 'story.ts',
      requestId: 'request-id',
      storyId: 'story-id',
    });
    expect(beforeStoryImageDiffMock).toHaveBeenCalledWith({
      fileName: 'story.ts',
      requestId: 'request-id',
      requestType: 'story',
      storyId: 'story-id',
    });
  });
});
