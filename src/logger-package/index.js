import fetch from 'isomorphic-unfetch'
import browserDetails from './utils'

// Identify the device type based on the CSS media query/breakpoints
const getDeviceName = (mediaObj, defaultDevice) => {
  if (typeof mediaObj === 'object') {
    const values = Object.keys(mediaObj)
    const mediaQueryLists = Object.keys(mediaObj).map(q =>
      window.matchMedia(`(max-width: ${mediaObj[q]}px)`)
    )
    const index = mediaQueryLists.findIndex(mql => mql.matches)
    return typeof values[index] !== 'undefined' ? values[index] : defaultDevice
  }

  return defaultDevice
}

// REST API endpoint URL
const defaultServiceEndpoint = 'http://localhost:3000/ui-event-logging'

// GET session values from the browser
// currentSession = {session_id: 'session_id', user_name: 'user_name', device_id: 'device_id'}
const getCurrentSession = sessionKey => {
  const currentSession = JSON.parse(
    sessionStorage.getItem(sessionKey || 'currentSession')
  )
  const { session_id: sessionId, user_name: userId, device_id: deviceId } =
    currentSession || {}

  return {
    sessionId,
    userId,
    deviceId
  }
}

// Main/default event object values
const eventPattern = ({
  eventType,
  eventSubType,
  sessionKey,
  devicesInfo,
  serviceEndpoint = defaultServiceEndpoint
}) => {
  if (!eventType && !eventSubType) {
    console.warn("can't initialize logger without eventType and eventSubType")
    return null
  }

  const loggerPath = serviceEndpoint

  const { sessionId, userId } = getCurrentSession(sessionKey) || {}
  const { breakpoints, defaultDevice } = devicesInfo || {}
  const { browserOS, browserName, browserVersion } = browserDetails()

  return {
    eventHeader: {
      eventType,
      eventSubType,
      globalInstanceId: sessionId,
      transactionId: sessionId,
      sessionId,
      businessIdentifierType: 'USER_ID',
      businessIdentifierValue: userId
    },
    eventSource: {
      eventChannel: getDeviceName(breakpoints, defaultDevice),
      env: window.location.host,
      pathname: window.location.pathname,
      browserOS,
      browserName,
      browserVersion
    },
    eventAttributes: {
      customLog: 'customLog'
    },
    loggerPath
  }
}

// Preparing the logger object structure
const loggingObj = {}
let config = null
function composeLogObject({
  eventStatus,
  eventSource,
  eventAttributes,
  eventPayload,
  exception,
  level
}) {
  return {
    eventHeader: {
      ...config.eventHeader
    },
    eventSource: {
      ...config.eventSource,
      ...eventSource
    },
    eventStatus: eventStatus || level,
    eventPayload,
    eventAttributes: {
      ...config.eventAttributes,
      ...eventAttributes
    },
    exception
  }
}

// Trigger the REST API to store the logs
// POST API CALL
const submitLog = logObj => {
  const { loggerPath } = config
  fetch(loggerPath, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(composeLogObject(logObj))
  })
}

// Returns log-level methods error, info, log, warn, and debug.
export function LoggerWrapper() {
  const levels = {
    error: 0,
    info: 1,
    log: 2,
    warn: 3,
    debug: 4
  }

  config = null

  // const isDev = process.env.NODE_ENV !== 'production'
  const isDev = false;

  const currentLogLevel = process.env.LOG_LEVEL || (isDev ? 'debug' : 'info')

  const logsDisabled = !!process.env.LOGGING_OFF

  const log = (level, logObj) => {
    if (!logsDisabled && levels[level] <= levels[currentLogLevel]) {
      if (!config) {
        console.warn(
          'logger is not initialized, please call logger.init with required params'
        )
        return
      }

      if (isDev) {
        console[level]('Dev logs:', logObj[0])
      } else {
        submitLog({ ...logObj[0], level })
      }
    }
  }

  // initialize the logger framework
  loggingObj.init = initialConfig => {
    config = eventPattern(initialConfig)
  }

  Object.keys(levels).forEach(lvl => {
    loggingObj[lvl] = (...args) => {
      log(lvl, args)
    }
  })

  return loggingObj
}

// export LoggerWrapper()
