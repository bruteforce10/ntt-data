import { describe, it, expect, beforeEach } from "vitest";

import {
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS,
  consumeRateLimit,
  resetRateLimit,
} from "@/lib/notify/rate-limit";

const START = 1_000_000;

describe("consumeRateLimit", () => {
  beforeEach(() => {
    resetRateLimit();
  });

  it("allows requests up to the limit", () => {
    for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i += 1) {
      expect(consumeRateLimit("1.2.3.4", START)).toBe(true);
    }
  });

  it("blocks the request past the limit within the window", () => {
    for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i += 1) {
      consumeRateLimit("1.2.3.4", START);
    }

    expect(consumeRateLimit("1.2.3.4", START + 1)).toBe(false);
  });

  it("tracks each key independently", () => {
    for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i += 1) {
      consumeRateLimit("1.2.3.4", START);
    }

    expect(consumeRateLimit("5.6.7.8", START)).toBe(true);
  });

  it("allows again once the window has elapsed", () => {
    for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i += 1) {
      consumeRateLimit("1.2.3.4", START);
    }

    expect(consumeRateLimit("1.2.3.4", START + RATE_LIMIT_WINDOW_MS + 1)).toBe(
      true,
    );
  });

  it("drops expired buckets so the map cannot grow without bound", () => {
    consumeRateLimit("stale", START);
    consumeRateLimit("fresh", START + RATE_LIMIT_WINDOW_MS + 1);

    // "stale" was swept, so its budget starts over rather than continuing.
    for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i += 1) {
      expect(consumeRateLimit("stale", START + RATE_LIMIT_WINDOW_MS + 2)).toBe(
        true,
      );
    }
  });
});
