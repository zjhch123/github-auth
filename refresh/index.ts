import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import fetch from 'node-fetch';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const refresh_token = req.query.refresh_token;

  if (!refresh_token) {
    context.res = {
      status: 400,
      body: { error: 'Invalid request' },
    };
    return;
  }

  const body = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token,
    }),
  }).then(data => data.json());

  const status = body.access_token ? 200 : 400;

  context.res = {
    status: status,
    body,
  };
};

export default httpTrigger;