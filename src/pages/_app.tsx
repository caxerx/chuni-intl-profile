import { FC } from 'react';
import { AppProps } from 'next/app';
import '../client/style/global.css';
import { SWRConfig } from 'swr';
import { request } from '../client/service/request';
import { BaseResponse, SuccessResponse } from '../client/model/responses';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: async (resource: string) => {
            const resp = await request.get(resource).json<BaseResponse>();
            if (resp.success) {
              return (resp as SuccessResponse).result;
            }

            throw resp;
          },
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
};

export default App;
