/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import {connection} from 'src/common/constants/connection';
import { SongsController } from './songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artists/artists.entity';


// const mockSongsService ={
//   findAll() {
//     return [{id: 1, title: 'Lasting lover', artist: 'siagra'}]
//   },
// };

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [SongsService,
  // {
  //   provide: SongsService,
  //   useClass: SongsService,
  // },
  // {
  //   provide: SongsService,
  //  useValue: mockSongsService,
  // }
   {
     provide: 'CONNECTION',
     useValue: connection,
   },
],
exports: [SongsService]
})
export class SongsModule {}
