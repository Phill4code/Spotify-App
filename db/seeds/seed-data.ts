/*eslint-disable prettier/prettier*/
import { User } from "src/users/user.entity"
import { Artist } from "src/artists/artists.entity";
import { Playlist } from "src/playlists/playlist.entity";
import { faker } from "@faker-js/faker";
import { v4 as uuid4 } from "uuid";
import * as bcrypt from "bcryptjs";
import { EntityManager } from "typeorm";

export const seedData = async ( manager: EntityManager): Promise <void> => {
    // seeding logic goes....


    await seedUser();
    await seedArtist();
    await seedPlayLists();


    async function seedUser() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword =  await bcrypt.hash('123456',salt);

        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apikey = uuid4();

        await manager.getRepository(User).save(user);
        
        
    }
    async function seedArtist() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword =  await bcrypt.hash('123456', salt);

        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apikey = uuid4();

        const artist = new Artist();artist.name = faker.music.genre();
        Artist.user = user;

        await manager.getRepository(User).save(user);
        await manager.getRepository(Artist).save(artist)


    }

    async function seedPlayLists() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword =  await bcrypt.hash('123456', salt);

        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apikey = uuid4();

        const playList = new Playlist();
        playList.name = faker.music.genre();
        playList.user = user;

        await manager.getRepository(User).save(user);
        await manager.getRepository(Playlist).save(playList);

        
    }
}; 