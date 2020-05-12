import { getSnapShot } from '../get-screenshot';
import fetch from 'jest-fetch-mock';
import { GetScreenshotRequest, GetScreenshotResponse } from '../../typings';

describe('getSnapShot', () => {
  beforeEach(() => {
    fetch.doMock();
  });

  const reqData: GetScreenshotRequest = {
    browserType: 'chromium',
    storyId: 'story-id',
  };

  const respData: GetScreenshotResponse = {
    base64: 'base64',
    error: '',
  };

  it('should ', async () => {
    fetch.mockResponseOnce(JSON.stringify(respData));

    const data = await getSnapShot(reqData);

    expect(data).toStrictEqual(respData);
  });
});
