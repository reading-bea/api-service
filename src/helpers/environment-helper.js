const config = require('config');

/**
 * Returns true if the instance is running on the cloud, hence it has
 * the environment set to either: int, test or live.
 */
const isCloudEnvironment = () => {
  return ['live'].includes(config.get('environment'));
};

/**
 * This object provides a mapping between the environment and the DNS fragment
 * which is used for that environment. For example, if SoundsNav runs on TEST,
 * it must point to  "www.test.bbc.co.uk". But if it runs on LIVE, the environment
 * is dropped and the DNS is "www.bbc.co.uk".
 */
const environmentDnsFragmentMapping = {
  live: '.'
};

/**
 * Returns ".int." for local and INT, "test" for TEST and "." for live.
 */
const getEnvironmentDnsFragment = () => {
  return environmentDnsFragmentMapping[config.get('environment')];
};

module.exports = {
  isCloudEnvironment,
  getEnvironmentDnsFragment
};
