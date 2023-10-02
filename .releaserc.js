/**
 * semantic-release config
 *
 * semantic-release automates the whole package release workflow including: determining the next version number,
 * generating the release notes and publishing the package.
 *
 * https://github.com/semantic-release/semantic-release
 */
module.exports = {
  branches: [
    "main",
    {
      name: "develop",
      prerelease: true,
    },
  ],
  /**
   * repositoryUrl
   * Default: repository property in package.json or git origin url
   */
  // repositoryUrl: 'https://github.com/mogenius/punq-frontend.git',
  /**
   * tagFormat
   * Default: v${version}
   */
  // tagFormat: 'v${version}',
  plugins: [
    /**
     * semantic-release plugin to analyze commits with conventional-changelog
     *
     * https://github.com/semantic-release/commit-analyzer
     */
    ["@semantic-release/commit-analyzer"],
    /**
     * semantic-release plugin to generate changelog content with conventional-changelog.
     *
     * https://github.com/semantic-release/release-notes-generator
     */
    [
      "@semantic-release/release-notes-generator",
      {
        linkCompare: false,
      },
    ],
    /**
     * semantic-release plugin to create or update a changelog file.
     *
     * https://github.com/semantic-release/changelog
     */
    [
      "@semantic-release/changelog",
      {
        changelogTitle: "# Changelog\n\n",
      },
    ],
    /**
     * semantic-release plugin to execute custom shell commands.
     *
     * https://github.com/semantic-release/exec
     */
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "npm version --new-version ${nextRelease.version} --no-git-tag-version --no-commit-hooks --allow-same-version",
      },
    ],
    /**
     * semantic-release plugin to publish a npm package.
     *
     * https://github.com/semantic-release/npm
     */
    ["@semantic-release/npm"],
    /**
     * semantic-release plugin to commit release assets to the project's git repository.
     *
     * https://github.com/semantic-release/git
     */
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        // Default
        // message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    /**
     * Semantic release plugin for automatic builds on Azure DevOps pipelines.
     *
     * https://github.com/lluchmk/semantic-release-ado
     */
    [
      "semantic-release-ado",
      {
        varName: "nextRelease",
        setOnlyOnRelease: false, // this will set release number even if release was not made!
      },
    ],
  ],
};
