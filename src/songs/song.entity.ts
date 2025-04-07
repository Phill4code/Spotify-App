/* eslint-disable prettier/prettier */
import { Artist } from 'src/artists/artists.entity'
import { Playlist } from 'src/playlists/playlist.entity';
import { Column,Entity, JoinTable,ManyToOne, ManyToMany,PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;

    //@Column ('varchar', {array:true})
    //artists: string[]

@Column('date')
releasedDate:Date;

@Column('time')
duration:Date;

@Column('text')
lyrics:string;


@ManyToMany(()=>Artist, (artist)=>artist.songs, {cascade:true})
@JoinTable({name: 'songs_artists'})
artists:Artist[];


@ManyToOne(()=>Playlist, (Playlist)=>Playlist.song)
playlist:Playlist
    //artists: string[];



}