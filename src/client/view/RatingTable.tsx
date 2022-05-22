import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { FC, useMemo } from 'react';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import LoadFailed from '../component/LoadFailed';
import RecordNotFound from '../component/RecordNotFound';
import { FailureResponse } from '../model/responses';
import { formatScore } from '../utils/formatting';
import {
  calculateBest30,
  calculateMaxAchievable,
  calculateRating,
} from '../utils/rating';

interface RatingTableProps {
  recordId: string;
}

const RatingTable: FC<RatingTableProps> = ({ recordId }) => {
  const songList = useReadLocalStorage<string>('songList');

  const { data: record, error: recordError } = useSWR<
    ChuniRecordResponse,
    FailureResponse
  >(`record/${recordId ?? ''}`);

  const { data: songData, error: songDataError } = useSWR<
    SongData[],
    FailureResponse
  >(songList ? `song-list/${songList}` : 'song-list');

  const [mappedRecord, b30Avg, maxAchv] = useMemo(() => {
    if (!record || !record.record || !songData) return [[], '', ''];

    const rec = record.record
      .map((rec) => {
        const song = songData.find((song) => song.meta.title === rec.title);
        const songDiff = song?.data?.[rec.difficulty];
        return {
          ...rec,
          score: new BigNumber(rec.score),
          const: new BigNumber(
            (songDiff?.const == 0 ? songDiff?.level : songDiff?.const) ?? 0,
          ),
          chunirecId: song?.meta.id ?? '',
        };
      })
      .map((rec) => ({
        ...rec,
        rating: calculateRating(rec.score, rec.const),
      }))
      .sort((a, b) => b.rating.minus(a.rating).toNumber());

    const ratingList = rec.map((i) => i.rating);
    const b30 = calculateBest30(ratingList).toFixed(2);
    const max = calculateMaxAchievable(ratingList).toFixed(2);

    return [rec, b30, max];
  }, [record, songData]);

  if (recordError) {
    return <RecordNotFound></RecordNotFound>;
  }

  if (songDataError) {
    return <LoadFailed></LoadFailed>;
  }

  if (!record || !songData) {
    return (
      <div className="p-4">
        <progress className="progress progress-info w-full"></progress>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap gap-1 p-1">
        <div className="badge badge-md">B30 Avg: {b30Avg}</div>
        <div className="badge badge-md">Max: {maxAchv}</div>
        <div className="badge badge-md">
          Date: {dayjs(record.createdAt).format('DD/MM/YYYY')}
        </div>
      </div>
      <div className="overflow-x-auto max-w-xl w-full">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th className="text-xs text-right">#</th>
              <th className="text-xs">
                Title (<span className="text-green-500">#</span>FC,{' '}
                <span className="text-yellow-500">@</span>AJ)
              </th>
              <th className="text-xs text-right">Const</th>
              <th className="text-xs text-right">Score</th>
              <th className="text-xs text-right">Rating</th>
            </tr>
          </thead>
          <tbody>
            {mappedRecord.map((item, index) => {
              return (
                <tr key={index}>
                  <th className="text-right">{index + 1}</th>
                  <td
                    className="whitespace-normal break-all max-w-min difficulty-title"
                    data-difficulty={item.difficulty}
                  >
                    <span className="text-yellow-500">
                      {item.fullCombo == 'AJ' ? '@' : ''}
                    </span>
                    <span className="text-green-500">
                      {item.fullCombo == 'FC' ? '#' : ''}
                    </span>
                    <a
                      href={`https://db.chunirec.net/music/${item.chunirecId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.title}
                    </a>
                  </td>
                  <td className="text-right">{item.const.toFixed(2)}</td>
                  <td className="text-right">
                    {formatScore(item.score.toNumber())}
                  </td>
                  <td className="text-right">{item.rating.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatingTable;
