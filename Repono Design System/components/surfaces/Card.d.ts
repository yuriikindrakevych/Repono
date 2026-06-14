import * as React from 'react';

/**
 * Default container props. Sits on a hairline; reserve `raised` for floating things.
 * @startingPoint section="Surfaces" subtitle="Card container with header & footer" viewport="700x260"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Header title; renders the header row when set. */
  title?: React.ReactNode;
  /** Right-aligned header slot (button, badge, menu). */
  headerAction?: React.ReactNode;
  /** Footer slot, on a sunken bar. */
  footer?: React.ReactNode;
  /** Lift onto a shadow instead of a hairline (use sparingly). */
  raised?: boolean;
  /** Teal accent rule across the top. */
  accent?: boolean;
  interactive?: boolean;
  /** Remove body padding (for tables / full-bleed media). */
  flushBody?: boolean;
  children?: React.ReactNode;
}

/** Default container. Sits on a hairline; reserve `raised` for floating things. */
export function Card(props: CardProps): JSX.Element;
