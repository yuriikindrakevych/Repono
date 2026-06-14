import * as React from 'react';

/**
 * Compact metadata / status label props.
 * @startingPoint section="Status" subtitle="Version, status & metadata badges" viewport="700x150"
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tone. `version` is the only ochre treatment (semver/build tags) and is mono by default. */
  tone?: 'neutral' | 'version' | 'accent' | 'active' | 'error' | 'warn';
  /** Show a leading status dot. */
  dot?: boolean;
  /** Force monospace on/off (defaults on for `version`). */
  mono?: boolean;
  children?: React.ReactNode;
}

/** Compact metadata / status label. Ochre is reserved for `tone="version"`. */
export function Badge(props: BadgeProps): JSX.Element;
