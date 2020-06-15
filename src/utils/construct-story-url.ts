import { ScreenshotProp } from '../typings';
import normalize from 'normalize-url';
import { knobsToQuerystring } from './knobs-to-querystring';
import { parse } from 'url';
import { resolve } from 'path';
import ip from 'ip';

export const constructStoryUrl = (
  endpoint: string,
  id: string,
  knobs?: ScreenshotProp[],
) => {
  const parsedEndpoint = parse(endpoint);

  const normalized =
    parsedEndpoint.hostname || ip.isV4Format(endpoint)
      ? normalize(endpoint)
      : 'file:///' + resolve(endpoint);

  let storyUrl = `${normalized}/iframe.html?id=${id}`;

  if (knobs) {
    storyUrl = `${storyUrl}&${knobsToQuerystring(knobs)}`;
  }

  return storyUrl.replace(/\\/g, '/');
};
