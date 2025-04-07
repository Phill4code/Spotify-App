/* eslint-disable prettier/prettier */
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity ('artists')
export class Artist {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(()=> User )
    @JoinColumn()
    user: User;

    @OneToMany(() => Song, (song) => song.artists)
    songs: Song[];
}