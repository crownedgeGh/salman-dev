/**
 * @typedef {'House' | 'Shop' | 'Flat' | 'Plot' | 'Home' | 'Office' | 'Warehouse'} PropertyType
 * @typedef {'Sale' | 'Rent'} Purpose
 */

/**
 * @typedef {Object} Broker
 * @property {string} id
 * @property {string} name
 * @property {string} phone
 * @property {number} yearsExperience
 */

/**
 * @typedef {Object} Property
 * @property {string} id
 * @property {PropertyType} type
 * @property {string} title
 * @property {string} description
 * @property {string} area
 * @property {string} price
 * @property {string} city
 * @property {string} locality
 * @property {Purpose} purpose
 * @property {string} postedAt
 * @property {Broker} broker
 */

/**
 * @typedef {Object} Service
 * @property {string} id
 * @property {string} iconName
 * @property {string} title
 * @property {string} description
 */

export { };
