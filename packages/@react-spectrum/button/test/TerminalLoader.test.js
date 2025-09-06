/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {act, render, screen} from '@testing-library/react';
import {TerminalLoader} from '../src/TerminalLoader';
import React from 'react';

describe('TerminalLoader', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with default props', () => {
    render(<TerminalLoader />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    render(<TerminalLoader text="Saving" />);
    expect(screen.getByText('Saving')).toBeInTheDocument();
  });

  it('cycles through dots with default settings', () => {
    render(<TerminalLoader text="Loading" />);
    
    // Initial state: "Loading"
    expect(screen.getByText('Loading')).toBeInTheDocument();
    
    // After 500ms: "Loading."
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText('Loading.')).toBeInTheDocument();
    
    // After 1000ms: "Loading.."
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText('Loading..')).toBeInTheDocument();
    
    // After 1500ms: "Loading..."
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // After 2000ms: "Loading...."
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText('Loading....')).toBeInTheDocument();
    
    // After 2500ms: back to "Loading"
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('cycles through custom number of dots', () => {
    render(<TerminalLoader text="Processing" maxDots={2} />);
    
    // Initial state: "Processing"
    expect(screen.getByText('Processing')).toBeInTheDocument();
    
    // After 500ms: "Processing."
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText('Processing.')).toBeInTheDocument();
    
    // After 1000ms: "Processing.."
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText('Processing..')).toBeInTheDocument();
    
    // After 1500ms: back to "Processing"
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText('Processing')).toBeInTheDocument();
  });

  it('uses custom animation speed', () => {
    render(<TerminalLoader text="Loading" speed={200} />);
    
    // Initial state: "Loading"
    expect(screen.getByText('Loading')).toBeInTheDocument();
    
    // After 200ms: "Loading."
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(screen.getByText('Loading.')).toBeInTheDocument();
    
    // After 400ms: "Loading.."
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(screen.getByText('Loading..')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<TerminalLoader className="custom-class" />);
    const element = screen.getByText('Loading');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('spectrum-TerminalLoader');
  });

  it('has proper accessibility attributes', () => {
    render(<TerminalLoader text="Saving" aria-label="Saving in progress" />);
    const element = screen.getByText('Saving');
    
    expect(element).toHaveAttribute('aria-label', 'Saving in progress');
    expect(element).toHaveAttribute('aria-live', 'polite');
    expect(element).toHaveAttribute('role', 'status');
  });

  it('uses text as aria-label when no aria-label provided', () => {
    render(<TerminalLoader text="Processing" />);
    const element = screen.getByText('Processing');
    
    expect(element).toHaveAttribute('aria-label', 'Processing');
  });

  it('cleans up interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const {unmount} = render(<TerminalLoader />);
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('updates animation when props change', () => {
    const {rerender} = render(<TerminalLoader text="Loading" speed={1000} />);
    
    // Initial state
    expect(screen.getByText('Loading')).toBeInTheDocument();
    
    // Change speed and text
    rerender(<TerminalLoader text="Saving" speed={200} />);
    
    // Should still show "Saving" initially
    expect(screen.getByText('Saving')).toBeInTheDocument();
    
    // After 200ms with new speed: "Saving."
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(screen.getByText('Saving.')).toBeInTheDocument();
  });
});
