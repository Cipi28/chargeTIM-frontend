/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

export const STORE_USER = 'APPCONTAINER/STORE_USER';
export const USER = 'APPCONTAINER/USER';
export const LOAD_DATA_SUCCESS = 'APPCONTAINER/LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILURE = 'APPCONTAINER/LOAD_DATA_FAILURE';
export const LOAD_USER = 'APPCONTAINER/LOAD_USER';

export const LOCALSTORAGE_KEY = 'USER_DATA';

export const ERROR_DATA = {
  OBJECT_CODES: {
    User: '10',
    Role: '11',
    Categories: '20',
    Folders: '30',
    Templates: '55',
    Surveys: '50',
    Contacts: '60',
    Questionnaire: '51',
    DistributionLists: '61',
    Invite: '70',
    Answers: '80',
    Feedback: '81',
    Reports: '100',
    Charts: '120',
    ScheduledQuestionnaire: '131',
    Tiles: '140',
    Dashboards: '150',
    Profiles: '170',
    Permissions: '180',
    FollowUp: '190',
    Tags: '200',
    Companies: '210',
    FollowUpHistory: '220',
    Actions: '230',
    ConditionGroup: '235',
    Conditions: '240',
    DataFilter: '250',
    SurveyStats: '260',
    Export: '280',
    Translations: '300',
    EmailActivity: '310',
    Assets: '320',
    ActivityLog: '340',
    ShortenedLinks: '330',
    SmsDeliveryActivity: '350',
  },
  RESPONSE_CODES: {
    ALL_OK: '200',
    CREATED: '201',
    ACCEPTED: '202'
  },
  ERROR_MESSAGES: {
    // User
    10999: 'Unknown User error',
    10998: 'Unexpected User data format',
    10996: 'test error',
    // Category
    20999: 'Unknown Category error',
    20998: 'Unexpected Category data format',
    // Folder
    30999: 'Unknown Folder error',
    30998: 'Unexpected Folder data format',
    // Template
    40999: 'Unknown Template error',
    40998: 'Unexpected Template data format',
    // Survey
    50999: 'Unknown Survey error',
    50998: 'Unexpected Survey data format',
    // Generic
    XX998: 'Unexpected data format',
    UNKNOWN: 'Unknown error',
  },
};
