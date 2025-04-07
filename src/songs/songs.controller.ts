/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import {
    Controller,
    Get,
    Put,
    Delete,
    Post,
    Param,
    Inject,
    Body,
    Scope,
    ParseIntPipe,
    HttpException,
    HttpStatus,
    Query,
    DefaultValuePipe,
    UseGuards,
    Request,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './song.entity';
import { promises } from 'dns';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/artists-jwt-guard';

@Controller('songs')
export class SongsController{ 
 
    constructor ( private songsService: SongsService,
// @Inject('CONNECTION')
      //  private connection: Connection,
      ) 
      {
      //  console.log(` THIS IS THE CONNECTION STRING ${this.connection.CONNECTION_STRING}`);
    }
  
    @Post()
    @UseGuards(ArtistJwtGuard)
    create(
        @Body() createSongDTO: CreateSongDTO,
        @Request()
        request,
    ): Promise<Song> {   
        
        console.log('request.user',request.user);
        return this.songsService.create(createSongDTO);
     }

    @Get()
    findAll(
    
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit = 10,
    ): Promise<Pagination<Song>> {
        limit = limit > 100 ? 100 : limit;
        return this.songsService.paginate({
            page,
            limit,
        });
    }


    @Get(':id')
    findone( @Param(
        'id',
         new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE}),) id:number): Promise<Song>
         {
        return this.songsService.findOne(id);
    };

    @Put(':id')
    update(
        @Param ('id', ParseIntPipe) id : number, 
        @Body() UpdateSongDTO: UpdateSongDto,
    ): Promise<UpdateResult> {
        return this.songsService.update(id, UpdateSongDTO)
    };

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.songsService.remove(id);
    }
    
};
