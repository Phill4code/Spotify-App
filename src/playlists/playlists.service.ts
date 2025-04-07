import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
import { Repository } from "typeorm";
import { Song } from "src/songs/song.entity";
import { User } from "src/users/user.entity";
import { CreatePlayListDto } from "./dto/create-playlist.dto";

@Injectable()
export class PlayListsService{
    constructor(
        @InjectRepository(Playlist)
        private playListRepo:Repository<Playlist>,

        @InjectRepository(Song)
        private songsRepo:Repository<Song>,

        @InjectRepository(User)
        private userRepo:Repository<User>
    ){}

    async create(PlayListDTO: CreatePlayListDto): Promise <Playlist> {
        const playList = new Playlist();
        playList.name = PlayListDTO.name;

        //songs will be the array of ids that we are getting from the request
        const songs = await this.songsRepo.findByIds(PlayListDTO.songs);
        //set the relation for the songs with olaylist entity
        Playlist.songs = songs;

        //A user will be the id of the user we are getting from the request
        // when we implement the user authentication this id will become the loggedIn user id
        const user = await this.userRepo.findOneByOrFail({id: PlayListDTO.user});
        playList.user = user;

        return this.playListRepo.save(playList);
    }
}