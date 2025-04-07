/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm'
import { Playlist } from "src/playlists/playlist.entity"
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number

@Column()
firstName: string;

@Column()
lastName: string;

@Column({unique:true})
email: string;


@Column()
@Exclude()
password: string;

@Column({ nullable: true, type: 'text'})
twoFASecret: string;

@Column({default: false, type: 'boolean'})
enable2FA: boolean;




/**A user can create many playlists */
@OneToMany(()=>Playlist, (playlist)=>playlist.user)
playlist:Playlist[];

}