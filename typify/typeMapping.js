// Mapping des types simples vers les PropTypes valides
const typeMapping = {
  'String': 'string',
  'Number': 'number',
  'Boolean': 'bool',
  'Function': 'func',
  'Object': 'object',
  'Array': 'array',
  'Node': 'node',
  'Element': 'element',
  'Symbol': 'symbol'
};

// Mapping des types d'événements DOM
const eventTypeMapping = {
  'ClickEvent': 'MouseEvent',
  'ChangeEvent': 'ChangeEvent',
  'SubmitEvent': 'FormEvent',
  'KeyEvent': 'KeyboardEvent',
  'FocusEvent': 'FocusEvent',
  'BlurEvent': 'FocusEvent',
  'InputEvent': 'FormEvent',
  'SelectEvent': 'ChangeEvent',
  'ScrollEvent': 'UIEvent',
  'ResizeEvent': 'UIEvent',
  'DragEvent': 'DragEvent',
  'TouchEvent': 'TouchEvent',
  'WheelEvent': 'WheelEvent',
  'ClipboardEvent': 'ClipboardEvent',
  'CompositionEvent': 'CompositionEvent',
  'AnimationEvent': 'AnimationEvent',
  'TransitionEvent': 'TransitionEvent'
};

/**
 * Obtient le type PropTypes correspondant à un type simple
 * @param {string} typeName - Nom du type (ex: 'String', 'Number')
 * @returns {string} Nom du type PropTypes (ex: 'string', 'number')
 */
function getPropTypeName(typeName) {
  return typeMapping[typeName] || typeName.toLowerCase();
}

/**
 * Obtient le type d'événement DOM correspondant
 * @param {string} eventType - Type d'événement (ex: 'ClickEvent')
 * @returns {string} Type d'événement DOM (ex: 'MouseEvent')
 */
function getEventTypeName(eventType) {
  return eventTypeMapping[eventType] || eventType;
}

module.exports = {
  typeMapping,
  eventTypeMapping,
  getPropTypeName,
  getEventTypeName
}; 