/* eslint-disable sort-keys-fix/sort-keys-fix */
import { getActionArgs } from '../get-action-args';
import { getActionSchemaData } from '../../../__test_data__/action-schema';
import { StoryAction } from '../../typings';

describe('getActionArgs', () => {
  it('should generate args in current order', () => {
    const action: StoryAction = {
      id: 'someId',
      name: 'click',
      args: {
        options: {
          x: 1,
        },
        selector: 'div>div',
      },
    };
    const sortedAction = getActionArgs(action, getActionSchemaData());
    expect(sortedAction).toStrictEqual(['div>div', { x: 1 }, undefined]);
  });

  it('should have undefined if args missing', () => {
    const action: StoryAction = {
      id: 'someId',
      name: 'click',
    };
    const sortedAction = getActionArgs(action, getActionSchemaData());
    expect(sortedAction).toStrictEqual([undefined, undefined, undefined]);
  });

  it('should replace  empty object with undefined', () => {
    const action: StoryAction = {
      id: 'someId',
      name: 'click',
      args: {
        options: {},
        selector: 'div>div',
      },
    };
    const sortedAction = getActionArgs(action, getActionSchemaData());
    expect(sortedAction).toStrictEqual(['div>div', undefined]);
  });

  it('should not ignore 0 and null args', () => {
    const action: StoryAction = {
      id: 'someId',
      name: 'click',
      args: {
        selector: 'div>div',
        options: null,
        delay: 0,
      },
    };
    const sortedAction = getActionArgs(action, getActionSchemaData());
    expect(sortedAction).toStrictEqual(['div>div', null, 0]);
  });

  it('should generate nested action args in current order', () => {
    const action: StoryAction = {
      id: 'someId',
      name: 'mouse.click',
      args: {
        x: 1,
        y: 2,
      },
    };
    const sortedAction = getActionArgs(action, getActionSchemaData());
    expect(sortedAction).toStrictEqual([1, 2, undefined]);
  });

  it('should keep order even if no value present e.g selector missing', () => {
    const action: StoryAction = {
      id: 'someId',
      name: 'click',
      args: {
        options: {
          x: 1,
        },
      },
    };
    const sortedAction = getActionArgs(action, getActionSchemaData());
    expect(sortedAction).toStrictEqual([undefined, { x: 1 }, undefined]);
  });

  it('should throw error if action is not exist in schema, so we know its deprecated', () => {
    const action: StoryAction = {
      id: 'someId',
      name: 'mouse.deprecated',
      args: {
        y: 2,
        x: 1,
      },
    };

    expect(() => {
      getActionArgs(action, getActionSchemaData());
    }).toThrow(
      `Unable to find 'mouse.deprecated', possibly this action has deprecated/removed from playwright and or from custom definitions.`,
    );
  });
});
