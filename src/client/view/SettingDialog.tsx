import { FC } from 'react';
import useSWR from 'swr';
import { useLocalStorage } from 'usehooks-ts';

import { FailureResponse } from '../model/responses';
import { SongList } from '../typings/song-list';

const SettingDialog: FC = () => {
  const [songList, setSongList] = useLocalStorage<string>('songList', '');

  const { data: record, error: listError } = useSWR<
    SongList[],
    FailureResponse
  >('song-lists');

  return (
    <>
      <div className="fixed bottom-0 right-0 m-4 z-10 opacity-80">
        <label
          htmlFor="setting-modal"
          className="btn btn-circle btn-sm modal-button"
        >
          <svg style={{ height: '18px', width: '18px' }} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
            />
          </svg>
        </label>
      </div>

      <input type="checkbox" id="setting-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="setting-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Settings</h3>
          <div className="py-4">
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor="song-list">
                <span className="label-text">Song Constant List</span>
              </label>
              <select
                disabled={!!listError}
                className="select select-bordered"
                id="song-list"
                value={songList}
                onChange={(e) => {
                  setSongList(e.target.value);
                }}
              >
                <option value={''}>Default (International)</option>
                {record?.map((r) => (
                  <option value={r.id} key={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingDialog;
