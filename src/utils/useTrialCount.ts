"use client";

import { useCallback, useSyncExternalStore } from "react";

// Free-trial counters live in localStorage, which is not a React data source.
// The previous approach — a `isMounted` flag plus a localStorage read, both
// setState calls inside an effect — worked, but caused a cascading re-render
// on every mount and is exactly what React 19's set-state-in-effect rule
// flags. useSyncExternalStore is the supported way to read an external store:
// it hands React a server snapshot (null, meaning "not hydrated yet") so the
// server and client markup agree, then swaps in the real value in the same
// commit rather than a second one.
//
// It also fixes a real bug for free: writing the counter in one tab now
// updates any other open tab, because we emit to local subscribers as well as
// listening for the cross-tab `storage` event. Before, a user could keep
// spending "free" trials by opening the tool in a second tab.

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function readTrialCount(key: string): number {
  try {
    return parseInt(localStorage.getItem(key) ?? "0", 10) || 0;
  } catch {
    // Private mode, disabled site data, or a sandboxed frame — treat as a
    // fresh visitor rather than crashing the page.
    return 0;
  }
}

export function writeTrialCount(key: string, next: number): void {
  try {
    localStorage.setItem(key, String(next));
  } catch {
    // Nothing to persist to; the in-memory value below still advances for
    // this session so the gate is not simply bypassed.
  }
  emit();
}

/**
 * Returns the current trial count and a setter that persists it.
 *
 * `count` is `null` until hydration completes — render a loading state while
 * it is null, otherwise the server HTML and the first client render disagree.
 */
export function useTrialCount(key: string): [number | null, (next: number) => void] {
  const getSnapshot = useCallback(() => readTrialCount(key), [key]);
  const getServerSnapshot = useCallback(() => null, []);

  const count = useSyncExternalStore<number | null>(subscribe, getSnapshot, getServerSnapshot);

  const setCount = useCallback(
    (next: number) => {
      writeTrialCount(key, next);
    },
    [key]
  );

  return [count, setCount];
}
