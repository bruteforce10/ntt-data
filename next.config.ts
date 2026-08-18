import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Registration for this batch is closed. `permanent: false` (307) is
        // deliberate: a 308 would be cached by browsers indefinitely and be
        // painful to undo when the next batch opens. Delete this block to
        // re-enable the page — the form and its API are untouched.
        source: "/startup-registration",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
