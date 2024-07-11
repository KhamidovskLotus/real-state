type EndpointMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

export type Endpoint = {
  url: string;
  method: EndpointMethod;
};

type PropertyEndpoint = {
  getByUser: Endpoint;
  get: Endpoint;
  getById: Endpoint;
  delete: Endpoint;
  add: Endpoint;
  update: Endpoint;
  getAll: Endpoint;
  getAllByUser: Endpoint;
};

function createEndpoint(method: EndpointMethod, url: string): Endpoint {
  return {
    method,
    url,
  };
}

const propertyEndpoint: PropertyEndpoint = {
  getAll: createEndpoint('GET', 'properties-np/'),
  getAllByUser: createEndpoint('GET', 'user-properties-np/'),
  getByUser: createEndpoint('GET', 'user-properties/'),
  update: createEndpoint('PUT', 'property/update'),
  add: createEndpoint('POST', 'property/'),
  get: createEndpoint('GET', 'properties/'),
  getById: createEndpoint('GET', 'property/'),
  delete: createEndpoint('DELETE', 'property/delete'),
};

type AuthEndpoint = {
  register: Endpoint;
  login: Endpoint;
  logout: Endpoint;
  otpVerification: Endpoint;
  update: Endpoint;
  forgotPasswordRequest: Endpoint;
  forgotPassword: Endpoint;
};

const authEndpoint: AuthEndpoint = {
  forgotPasswordRequest: createEndpoint('POST', 'auth/password-reset/'),
  forgotPassword: createEndpoint('POST', 'auth/password-reset-confirm/'),
  update: createEndpoint('PUT', 'auth/user/update/'),
  login: createEndpoint('POST', 'auth/login/'),
  register: createEndpoint('POST', 'auth/register/'),
  logout: createEndpoint('POST', 'auth/logout/'),
  otpVerification: createEndpoint('POST', 'auth/verification/'),
};

type OtherEndpoint = {
  contact: Endpoint;
  treeCounter: Endpoint;
};

const otherEndpoint: OtherEndpoint = {
  contact: createEndpoint('POST', 'auth/contact-lotus/'),
  treeCounter: createEndpoint('GET', 'tree-counter/'),
};

type InquiriesEndpoint = {
  get: Endpoint;
  create: Endpoint;
};

const inquiriesEndpoint: InquiriesEndpoint = {
  get: createEndpoint('GET', '/inquiriesList/'),
  create: createEndpoint('POST', '/inquiries/'),
};

type AgentEndpoint = {
  get: Endpoint;
  updatePropertyAvailability: Endpoint;
};

const agentEndpoint: AgentEndpoint = {
  get: createEndpoint('GET', 'agentList/'),
  updatePropertyAvailability: createEndpoint('PUT', 'updateAvailibility'),
};

type SaveListEndpoint = {
  get: Endpoint;
  add: Endpoint;
  delete: Endpoint;
  addAgent:Endpoint;
  deleteAgent:Endpoint;
  getAgent:Endpoint;
};

const saveListEndpoint: SaveListEndpoint = {
  get: createEndpoint('GET', 'savelist/'),
  add: createEndpoint('POST', 'savelist/'),
  delete: createEndpoint('DELETE', 'savelist'),
  getAgent: createEndpoint('GET', 'saveagent/'),
  addAgent: createEndpoint('POST', 'saveagent/'),
  deleteAgent: createEndpoint('DELETE', 'saveagent')
}

type EndpointList = {
  saveList: SaveListEndpoint;
  agent: AgentEndpoint;
  auth: AuthEndpoint;
  property: PropertyEndpoint;
  inquiries: InquiriesEndpoint;
  other: OtherEndpoint;
};

const endpoints: EndpointList = {
  saveList: saveListEndpoint,
  other: otherEndpoint,
  agent: agentEndpoint,
  auth: authEndpoint,
  property: propertyEndpoint,
  inquiries: inquiriesEndpoint,
};

export default endpoints;
