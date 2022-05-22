interface ChuniRecordResponse {
  createdAt: string;
  record: ChuniRecord[];
}

interface ChuniRecord {
  title: string;
  difficulty: 'BAS' | 'ADV' | 'EXP' | 'MAS' | 'ULT';
  score: number;
  fullCombo: '' | 'FC' | 'AJ';
}

interface SongData {
  meta: {
    id: string;
    title: string;
  };
  data: {
    [key: string]: {
      const: number;
      level: number;
    };
  };
}
