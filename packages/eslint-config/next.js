import nextConfig from "eslint-config-next";

export const config = [
  ...nextConfig,
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];
