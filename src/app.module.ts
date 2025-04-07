/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller'
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artists/artists.entity';
import { Playlist } from './playlists/playlist.entity';
import { Song } from './songs/song.entity';
import { User } from './users/user.entity';
import { PlayListModule } from './playlists/playlists.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ArtistsModule } from './artists/artists.module';


const devconfig = {port: 3000};
const proconfig = {port: 4000};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'spotify',
      host: 'localhost',
      port:5432,
      username: 'postgres',
      password: 'root',
      entities: [Song, Artist, User, Playlist],
      synchronize: true,
    }),
   
    SongsModule,
    PlayListModule,
    AuthModule,
    UsersModule,
    ArtistsModule, 
   
    
    
  ],
  controllers: [AppController],
  providers: [AppService,
    {
    provide: DevConfigService,
    useClass: DevConfigService,
  },
 { provide: 'CONFIG',
   useFactory: ()=>{
    return process.env.NODE_ENV ==='development'? devconfig : proconfig;
  },
  },
   

]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs');opt1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({path:'songs', method: RequestMethod.POST});//opt2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);//opt3

  }
}
