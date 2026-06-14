import * as React from 'react';

export type TerminalLineType = 'command' | 'output' | 'comment' | 'success';
export interface TerminalLine {
  type: TerminalLineType;
  text: string;
}

/**
 * Signature terminal surface props — a live package manifest.
 * @startingPoint section="Registry" subtitle="Signature terminal — composer require, live" viewport="700x300"
 */
export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Window title shown in the bar. */
  name?: string;
  /** Ordered lines. A package spec (owner/name) inside a command is highlighted. */
  lines: TerminalLine[];
  /** Type out the first command, then reveal output lines. Off => static. */
  typeCommand?: boolean;
  /** ms per character while typing. */
  typeSpeed?: number;
}

/** Signature surface — a live package manifest in a terminal window. */
export function Terminal(props: TerminalProps): JSX.Element;
