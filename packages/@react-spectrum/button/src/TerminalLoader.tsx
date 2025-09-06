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

import React, {useEffect, useState} from 'react';
import {classNames} from '@react-spectrum/utils';
import styles from '@adobe/spectrum-css-temp/components/button/vars.css';

export interface TerminalLoaderProps {
  /**
   * The base text to display before the dots.
   * @default 'Loading'
   */
  text?: string;
  /**
   * Animation speed in milliseconds per frame.
   * @default 500
   */
  speed?: number;
  /**
   * Maximum number of dots to cycle through.
   * @default 4
   */
  maxDots?: number;
  /**
   * Additional CSS classes to apply to the loader.
   */
  className?: string;
  /**
   * Accessibility label for screen readers.
   */
  'aria-label'?: string;
}

/**
 * A terminal-style loading animation component that cycles through dots.
 * Displays text like 'Loading', 'Loading.', 'Loading..', 'Loading...', 'Loading....'
 */
export const TerminalLoader = React.forwardRef<HTMLSpanElement, TerminalLoaderProps>(
  function TerminalLoader(props, ref) {
    const {
      text = 'Loading',
      speed = 500,
      maxDots = 4,
      className,
      'aria-label': ariaLabel
    } = props;

    const [dotCount, setDotCount] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setDotCount(prev => (prev + 1) % (maxDots + 1));
      }, speed);

      return () => clearInterval(interval);
    }, [speed, maxDots]);

    const displayText = text + '.'.repeat(dotCount);
    const computedAriaLabel = ariaLabel || displayText;

    return (
      <span
        ref={ref}
        className={classNames(styles, 'spectrum-TerminalLoader', className)}
        aria-label={computedAriaLabel}
        aria-live="polite"
        role="status"
      >
        {displayText}
      </span>
    );
  }
);
