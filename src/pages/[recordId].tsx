import { FC } from 'react';
import RatingTable from 'src/client/view/RatingTable';
import SettingDialog from '../client/view/SettingDialog';
import { useRouter } from 'next/router';
import RecordNotFound from 'src/client/component/RecordNotFound';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { SuccessResponse, FailureResponse } from '../client/model/responses';

interface RecordProps {
  record?: ChuniRecordResponse;
  serverSongData?: SongData[];
  hideMenu: boolean;
  host: string;
}

const Record: FC<RecordProps> = ({
  record,
  serverSongData,
  host,
  hideMenu = false,
}) => {
  const router = useRouter();
  const { recordId } = router.query;

  if (!recordId || !record) {
    return <RecordNotFound></RecordNotFound>;
  }

  if (Array.isArray(recordId)) {
    return <RecordNotFound></RecordNotFound>;
  }

  return (
    <>
      <Head>
        <title>Chunithm International Profile</title>
        <meta property="og:title" content="Chunithm International Profile" />
        <meta
          property="twitter:title"
          content="Chunithm International Profile"
        />

        <meta
          key="og:image"
          name="og:image"
          content={`${host}/api/record-image/${recordId}`}
        />
        <meta
          key="twitter:image"
          name="twitter:image"
          content={`${host}/api/record-image/${recordId}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {!hideMenu && <SettingDialog></SettingDialog>}
      <RatingTable
        record={record}
        serverSongData={serverSongData}
      ></RatingTable>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { recordId, hideMenu } = context.query;

  const host = process.env.NEXT_PUBLIC_HOST_URL;

  try {
    const record:
      | SuccessResponse<ChuniRecordResponse>
      | FailureResponse<string> = await (
      await fetch(`${host}/api/record/${recordId}`)
    ).json();

    const serverSongData:
      | SuccessResponse<SongData[]>
      | FailureResponse<string> = await (
      await fetch(`${host}/api/song-list`)
    ).json();

    if (!record.success || !serverSongData.success) {
      throw new Error('Request Failed');
    }

    return {
      props: {
        record: record.result,
        serverSongData: serverSongData.result,
        hideMenu: hideMenu ?? false,
        host,
      },
    };
  } catch {
    return {
      props: {
        hideMenu: hideMenu ?? false,
        host,
      },
    };
  }
};

export default Record;
