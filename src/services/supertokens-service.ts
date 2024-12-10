import Session from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import Passwordless from "supertokens-node/recipe/passwordless";
import { TypeInput } from "supertokens-node/types";
import { TwilioService } from "supertokens-node/recipe/passwordless/smsdelivery";

export function getAppDomain() {
  const appPort = process.env.REACT_NATIVE_APP_PORT || 3000;
  const appUrl = process.env.REACT_NATIVE_APP_DOMAIN || `http://localhost:${appPort}`;
  return appUrl;
}

export function getApiDomain() {
  const apiPort = process.env.BACKEND_API_PORT || 3001;
  const apiUrl = process.env.BACKEND_API_DOMAIN || `http://localhost:${apiPort}`;
  return apiUrl;
}

export const supertokensConfig: TypeInput = {
  framework: "express" as const,
  supertokens: {
    connectionURI: process.env.SUPERTOKENS_CONNECTION_URI || "",
    apiKey: process.env.SUPERTOKENS_API_KEY || "",
  },
  appInfo: {
    appName: "voicechat-app",
    websiteDomain: getAppDomain(),
    apiDomain: getApiDomain(),
  },
  recipeList: [
    Passwordless.init({
      flowType: "USER_INPUT_CODE",
      contactMethod: "PHONE",
      smsDelivery: {
        service: new TwilioService({
          twilioSettings: {
            accountSid: process.env.TWILIO_ACCOUNT_SID || "",
            authToken: process.env.TWILIO_AUTH_TOKEN || "",
            from: process.env.TWILIO_PHONE_NUMBER || "",
          },
        }),
      },
    }),
    Session.init(),
    Dashboard.init(),
  ]
}