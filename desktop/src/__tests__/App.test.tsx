import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { DesktopApp } from '../renderer/DesktopApp';

describe('App', () => {
  it('should render', () => {
    expect(render(<DesktopApp />)).toBeTruthy();
  });
});
