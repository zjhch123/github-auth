import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.res = {
    body: 'Login success! Now you can close this page safely.',
  };
};

export default httpTrigger;