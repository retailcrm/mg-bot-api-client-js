/**
 * New message websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsMessageNew
 */
export const wsMessageNew = 'message_new';

/**
 * Updating message websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsMessageUpdated
 */
export const wsMessageUpdated = 'message_updated';

/**
 * Websocket event delete message
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsMessageDeleted
 */
export const wsMessageDeleted = 'message_deleted';

/**
 * Dialogue opening websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsDialogOpened
 *
 */
export const wsDialogOpened = 'dialog_opened';

/**
 * Dialogue closing websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsDialogClosed
 */
export const wsDialogClosed = 'dialog_closed';

/**
 * Dialogue appointment websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsDialogAssign
 */
export const wsDialogAssign = 'dialog_assign';

/**
 * Chat creating websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsChatCreated
 */
export const wsChatCreated = 'chat_created';

/**
 * Chat updating websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsChatUpdated
 */
export const wsChatUpdated = 'chat_updated';

/**
 * Unread chat updating websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsChatUnreadUpdated
 */
export const wsChatUnreadUpdated = 'chat_unread_updated';

/**
 * User online status updating websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsUserOnlineUpdated
 */
export const wsUserOnlineUpdated = 'user_online_updated';

/**
 * User joined chat websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsUserJoinedChat
 */
export const wsUserJoinedChat = 'user_joined_chat';

/**
 * User left chat websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsUserLeftChat
 *
 */
export const wsUserLeftChat = 'user_left_chat';

/**
 * User updating websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsUserUpdated
 */
export const wsUserUpdated = 'user_updated';

/**
 * Customer updating websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsCustomerUpdated
 */
export const wsCustomerUpdated = 'customer_updated';

/**
 * Bot updating websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsBotUpdated
 *
 */
export const wsBotUpdated = 'bot_updated';

/**
 * Channel updating websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsChannelUpdated
 */
export const wsChannelUpdated = 'channel_updated';

/**
 * Settings updating websocket event
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().wsSettingsUpdated
 */
export const wsSettingsUpdated = 'settings_updated';


/**
 * Public message scope
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().messageScopePublic
 */
export const messageScopePublic = 'public';

/**
 * Public message scope
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().messageScopePrivate
 */
export const messageScopePrivate = 'private';


/**
 * Text message type
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().msgTypeText
 */
export const msgTypeText = 'text';

/**
 * System message type
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().msgTypeSystem
 */
export const msgTypeSystem = 'system';

/**
 * Command message type
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().msgTypeCommand
 */
export const msgTypeCommand = 'command';

/**
 * Order message type
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().msgTypeOrder
 */
export const msgTypeOrder = 'order';

/**
 * Product message type
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().msgTypeProduct
 */
export const msgTypeProduct = 'product';

/**
 * File message type
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().msgTypeFile
 */
export const msgTypeFile = 'file';

/**
 * Image message type
 * @constant
 * @type {string}
 * @example MgBotApiClient.types().msgTypeImage
 */
export const msgTypeImage = 'image';
