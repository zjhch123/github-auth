import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import fetch from 'node-fetch';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const code = req.query.code;

  if (!code) {
    context.res = {
      status: 400,
      body: 'Invalid request',
    };
    return;
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    }),
  }).then(data => data.text());

  if (!response.includes('access_token=')) {
    context.res = {
      status: 400,
      body: 'Failed to get access token :(',
    };

    return;
  }

  context.res = {
    status: 302,
    headers: {
      location: `https://github-auth.jiahao.tech/api/success#${response}`,
    },
  };
};

export default httpTrigger;