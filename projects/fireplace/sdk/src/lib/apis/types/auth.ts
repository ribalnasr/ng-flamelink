/**
 * Interface representing common properties of a user enrolled second factor
 * for an `UpdateRequest`.
 */
export interface UpdateMultiFactorInfoRequest {

  /**
   * The ID of the enrolled second factor. This ID is unique to the user. When not provided,
   * a new one is provisioned by the Auth server.
   */
  uid?: string;

  /**
   * The optional display name for an enrolled second factor.
   */
  displayName?: string;

  /**
   * The optional date the second factor was enrolled, formatted as a UTC string.
   */
  enrollmentTime?: string;

  /**
   * The type identifier of the second factor. For SMS second factors, this is `phone`.
   */
  factorId: string;
}


/**
 * The multi-factor related user settings for update operations.
 */
export interface MultiFactorUpdateSettings {

  /**
   * The updated list of enrolled second factors. The provided list overwrites the user's
   * existing list of second factors.
   * When null is passed, all of the user's existing second factors are removed.
   */
  enrolledFactors: UpdateMultiFactorInfoRequest[] | null;
}



/**
* Interface representing the properties to update on the provided user.
*/
export interface UpdateRequest {

  /**
   * Whether or not the user is disabled: `true` for disabled;
   * `false` for enabled.
   */
  disabled?: boolean;

  /**
   * The user's display name.
   */
  displayName?: string | null;

  /**
   * The user's primary email.
   */
  email?: string;

  /**
   * Whether or not the user's primary email is verified.
   */
  emailVerified?: boolean;

  /**
   * The user's unhashed password.
   */
  password?: string;

  /**
   * The user's primary phone number.
   */
  phoneNumber?: string | null;

  /**
   * The user's photo URL.
   */
  photoURL?: string | null;

  /**
   * The user's updated multi-factor related properties.
   */
  multiFactor?: MultiFactorUpdateSettings;
}


/**
 * The multi-factor related user settings for create operations.
 */
export interface MultiFactorCreateSettings {

  /**
   * The created user's list of enrolled second factors.
   */
  enrolledFactors: CreateMultiFactorInfoRequest[];
}
/**
 * Interface representing base properties of a user enrolled second factor for a
 * `CreateRequest`.
 */
export interface CreateMultiFactorInfoRequest {

  /**
   * The optional display name for an enrolled second factor.
   */
  displayName?: string;

  /**
   * The type identifier of the second factor. For SMS second factors, this is `phone`.
   */
  factorId: string;
}

/**
* Interface representing the properties to set on a new user record to be
* created.
*/
export interface CreateRequest extends UpdateRequest {

  /**
   * The user's `uid`.
   */
  uid?: string;

  /**
   * The user's multi-factor related properties.
   */
  multiFactor?: MultiFactorCreateSettings;
}
