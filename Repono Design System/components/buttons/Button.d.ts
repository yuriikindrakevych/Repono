import * as React from 'react';

/**
 * Primary action control props.
 * @startingPoint section="Buttons" subtitle="Primary, secondary, ghost & danger actions" viewport="700x160"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Primary carries the petrol-teal accent — use sparingly, one per view. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** Icon element rendered before the label (pass an inline SVG, sized 1em). */
  iconLeft?: React.ReactNode;
  /** Icon element rendered after the label. */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/** Primary action control. Labels are verbs, identical across a flow. */
export function Button(props: ButtonProps): JSX.Element;
