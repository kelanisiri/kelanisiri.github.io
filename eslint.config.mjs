/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "scripts/**"],
  },
];

export default eslintConfig;
