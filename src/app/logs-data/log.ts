export interface Log {
    
        _id : number;
        logEvent: {
          eventHeader: {
            eventType: string,
            eventSubType: string,
            InteractionId: string,
            globalInstanceId: string,
            transactionId: string,
            sessionId: string,
            eventCreationTime: string,
            businessIdentifierValue: string,
            businessIdentifierType: string
          };
          eventSource: {
            businessCapability: string,
            component: string,
            subComponent: string,
            stepName: string,
            eventChannel: string,
            env: string,
            appVersion: string,
            browserOS: string,
            browserName: string,
            browserVersion: string
          };
          eventStatus: string[];
          eventAttributes: {
            url: string
          };
          eventPayload: {
            response: string
          }
        };
        "@timestamp": string,
        "@clientIPAddress": string
      
}