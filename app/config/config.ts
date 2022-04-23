// TODO later - pick up values from .env file
export const config = {
  // prod
  API_DOMAIN: 'https://api.lasswho.com',
  API_URL: 'https://api.lasswho.com/graphql',
  SPEAKER_URL: 'https://speaker.lasswho.com', // important: SPEAKER_URL is used for payments
  CLIENT_ID: 'cf981762-0720-6e8c-67c5-f0e69f0d41fe', // slightly different than local / test env

  // shared - not changing between envs
  WEB_URL: 'https://lasswho.com',
  RULES_URL: 'https://lasswho.com/rules-of-engagement',
  COC_URL: 'https://lasswho.com/code-of-conduct',
};

// local
//  API_DOMAIN: 'https://api-lw.testnode.cc',
//  API_URL: 'https://api-lw.testnode.cc/graphql',
//  SPEAKER_URL: 'https://speaker-lw.testnode.cc'
//  CLIENT_ID: 'cf981762-0720-6e8c-67c5-f0e69f0d41fd',
//
//  extra for local:
//  BUTTON_TEXT: 'Reload',

// todo: refactor (remove) COC and RULES and just use ${config.WEB_URL}/code-of-conduct