/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: bugreports
 * Interface for BugReports
 */
export interface BugReports {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  reporterName?: string;
  /** @wixFieldType text */
  reporterContact?: string;
  /** @wixFieldType text */
  reportType?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
  /** @wixFieldType image */
  screenshot?: string;
}


/**
 * Collection ID: contactsubmissions
 * Interface for ContactSubmissions
 */
export interface ContactSubmissions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  senderName?: string;
  /** @wixFieldType text */
  senderEmail?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: gamemodes
 * Interface for GameModes
 */
export interface GameModes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType image */
  icon?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType image */
  bannerImage?: string;
  /** @wixFieldType number */
  maxPlayers?: number;
}


/**
 * Collection ID: serverrules
 * Interface for ServerRules
 */
export interface ServerRules {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  ruleTitle?: string;
  /** @wixFieldType text */
  ruleContent?: string;
  /** @wixFieldType number */
  ruleNumber?: number;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType datetime */
  lastUpdated?: Date | string;
  /** @wixFieldType text */
  consequence?: string;
}


/**
 * Collection ID: socialmedialinks
 * Interface for SocialMediaLinks
 */
export interface SocialMediaLinks {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  platformName?: string;
  /** @wixFieldType url */
  profileUrl?: string;
  /** @wixFieldType image */
  platformIcon?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}
