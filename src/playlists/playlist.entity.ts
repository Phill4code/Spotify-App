import { Song } from 'src/songs/song.entity';   
import { User } from 'src/users/user.entity';
import {Column, Entity, ManyToOne, OneToMany,PrimaryGeneratedColumn } from 'typeorm';

@Entity("playlists")
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    
   



/**Each playlist will have multiple songs */
@OneToMany(() => Song, (song) => song.playlist)
song: Song[];



/**Many playlists can belong to one specific user */
@ManyToOne(()=>User,(user)=>user.playlist)
user:User;
    static songs: Song[];
    static user: User;


}