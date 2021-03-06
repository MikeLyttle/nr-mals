// Paths
export const HOME_PATHNAME = "/";
export const LICENSES_PATHNAME = "/licenses";
export const SEARCH_LICENSES_PATHNAME = "/licenses/search";
export const LICENSE_RESULTS_PATHNAME = "/licenses/results";
export const CREATE_LICENSES_PATHNAME = "/licenses/create";
export const REGISTRANTS_PATHNAME = "/registrants";
export const SEARCH_REGISTRANTS_PATHNAME = "/registrants/search";
export const SITES_PATHNAME = "/sites";
export const SEARCH_SITES_PATHNAME = "/sites/search";
export const CREATE_SITES_PATHNAME = "/sites/create";
export const CONTACTS_PATHNAME = "/contacts";
export const CREATE_CONTACTS_PATHNAME = "/contacts/create";
export const INSPECTIONS_PATHNAME = "/inspections";
export const SEARCH_INSPECTIONS_PATHNAME = "/inspections/search";
export const CREATE_INSPECTIONS_PATHNAME = "/inspections/create";
export const REPORTS_PATHNAME = "/reports";
export const ADMIN_PATHNAME = "/admin";
export const USERS_AND_ROLES_ADMIN_PATHNAME = "/admin/users-and-roles";
export const LICENSE_TYPES_ADMIN_PATHNAME = "/admin/license-types";
export const SITES_ADMIN_PATHNAME = "/admin/sites";
export const INSPECTIONS_ADMIN_PATHNAME = "/admin/inspections";
export const DAIRY_TEST_RESULTS_ADMIN_PATHNAME = "/admin/dairy-test-results";

export const REQUEST_STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

export const SEARCH_TYPE = {
  SIMPLE: "simple",
  ADVANCED: "advanced",
};

export const LICENCE_MODE = {
  CREATE: "create",
  VIEW: "view",
  EDIT: "edit",
};

export const REGISTRANT_MODE = {
  CREATE: "create",
  VIEW: "view",
  EDIT: "edit",
};

export const DAIRY_TANK_MODE = {
  CREATE: "create",
  VIEW: "view",
  EDIT: "edit",
};

export const REGISTRANT_STATUS = {
  NEW: "new",
  EXISTING: "existing",
  DELETED: "deleted",
  CANCELLED: "cancelled",
};

export const DAIRY_TANK_STATUS = {
  NEW: "new",
  EXISTING: "existing",
  DELETED: "deleted",
  CANCELLED: "cancelled",
};

export const ADDRESS_TYPES = {
  PRIMARY: "Primary",
  MAILING: "Mailing",
};

export const PHONE_NUMBER_TYPES = {
  PRIMARY: "Primary",
  SECONDARY: "Secondary",
  FAX: "Fax",
};

export const LICENCE_STATUS_TYPES = {
  ACTIVE: "Active",
  DRAFT: "Draft",
  EXPIRED: "Expired",
  INACTIVE: "Inactive",
  PENDING: "Pending",
};

export const COUNTRIES = {
  CANADA: "Canada",
  UNITEDSTATES: "United States",
};

export const COUNTRIES_MAP = [COUNTRIES.CANADA, COUNTRIES.UNITEDSTATES];
