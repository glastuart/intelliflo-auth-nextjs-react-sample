import { AuthOptions } from 'next-auth';
import { Provider } from "next-auth/providers/index";

const IntellifloProvider = () => ({
    id: 'iflo',
    name: 'iflo',
    type: 'oauth',
    wellKnown: `${process.env.IFLO_AUTHORITY}/.well-known/openid-configuration`,
    clientId: process.env.IFLO_CLIENT_ID,
    clientSecret: process.env.IFLO_CLIENT_SECRET,
    idToken: true,
    checks: ["pkce", "state"],
    authorization: {
        params: {
            scope: 'openid profile myprofile client_data'
        }
    },
    profile(profile) {
        const { sub, ...rest } = profile;
        return { id: sub, ...rest };
    }
}) as Provider;

export const authOptions : AuthOptions = {
    debug: process.env.NODE_ENV === 'development',
    providers: [IntellifloProvider()],
    session: { strategy: 'jwt' },
    callbacks: {
        jwt: async ({ token, account }) => {
            if (account?.access_token) {
                console.log('token', account?.access_token);
                token.ifloAccessToken = account.access_token;
            }
            return token
        },
    },
};