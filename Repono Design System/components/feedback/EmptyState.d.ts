import * as React from 'react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inline SVG glyph in the framed slot. */
  icon?: React.ReactNode;
  title?: React.ReactNode;
  /** One-line explanation — an invitation to act. */
  children?: React.ReactNode;
  /** Action button(s). */
  actions?: React.ReactNode;
}

/** Empty screen: framed glyph, one-line copy, a single primary action. */
export function EmptyState(props: EmptyStateProps): JSX.Element;
