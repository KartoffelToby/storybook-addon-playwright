import React from 'react';
import { addons, types } from '@storybook/manager-api';
import {
  ADDON_ID,
  ACTIONS_PANEL_ID,
  TOOL_ID,
  PREVIEW_ID,
  SCREENSHOT_PANEL_ID,
} from './constants';
import { Tool } from './components/tool-bar';
import { ActionPanel, ScreenshotPanel } from './components/panel';
import { AddonPanel } from '@storybook/components';
import { Preview } from './components/preview';
import * as url from 'url';

addons.register(ADDON_ID, () => {
  if (!url.parse(window.location.href).hostname) return;

  addons.add(TOOL_ID, {
    render: () => <Tool />,
    title: 'snapshot',
    type: types.TOOL,
  });

  addons.add(ACTIONS_PANEL_ID, {
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <ActionPanel />
      </AddonPanel>
    ),
    title: 'Actions',
    type: types.PANEL,
  });

  addons.add(SCREENSHOT_PANEL_ID, {
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <ScreenshotPanel />
      </AddonPanel>
    ),
    title: 'Screenshots',
    type: types.PANEL,
  });

  addons.add(PREVIEW_ID, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: Preview as any,
    title: 'Screenshot Actions',
    type: types.PREVIEW,
  });
});
