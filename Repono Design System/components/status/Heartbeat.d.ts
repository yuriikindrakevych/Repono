import * as React from 'react';

export interface HeartbeatProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Activation state. `active` pulses; `idle`/`down` are static. */
  status?: 'active' | 'idle' | 'stale' | 'down';
  /** Override the status word (defaults to the status name). */
  label?: string;
  /** Trailing meta, e.g. a relative timestamp ("12s ago"). */
  meta?: string;
}

/**
 * Live activation status — the pulsing "● active" heartbeat. One of the few
 * sanctioned uses of motion; pulse is dropped under reduced-motion.
 */
export function Heartbeat(props: HeartbeatProps): JSX.Element;
