import crypto from "crypto";

const urlJoin = require("url-join");
const { getAbsoluteServerUrl } = require("@strapi/utils");

//

export function generateSecureString(length: number): string {
    return crypto.randomBytes(length).toString("hex");
}

export function generateConfirmationTokenURL() {
    // Creating verification token
    const token = generateSecureString(20);

    // Building the verification url
    const apiPrefix = strapi.config.get("api.rest.prefix");
    const url = urlJoin(
        getAbsoluteServerUrl(strapi.config),
        apiPrefix,
        `/auth/email-confirmation?confirmation=${token}`
    );

    return {
        token,
        url,
    };
}
