dbPassword = 'mongodb://localhost:27017/node-passport';

module.exports = {
    mongoURI: dbPassword,
    GOOGLE_CLIENT_ID: "Google client id",
    GOOGLE_CLIENT_SECRET: "google client secret",
    GOOGLE_CALLBACK_URL: "/api/google/callback", //add callback api url. This api google will hit when it will send the response.
    FACEBOOK_CLIENT_ID: "facgbook client id",
    FACEBOOK_CLIENT_SECRET: "facebook client secret",
    FACEBOOK_CALLBACK_URL: "/api/facebook/callback", //add callback api url. This api facebook will hit when it will send the response.
};
