-- CreateTable
CREATE TABLE "SongData" (
    "chunirecId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "songModeId" TEXT NOT NULL,

    CONSTRAINT "SongData_pkey" PRIMARY KEY ("chunirecId","songModeId")
);

-- CreateTable
CREATE TABLE "SongMode" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SongMode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

-- AddForeignKey
ALTER TABLE "SongData" ADD CONSTRAINT "SongData_songModeId_fkey" FOREIGN KEY ("songModeId") REFERENCES "SongMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
