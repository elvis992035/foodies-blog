import fs from 'node:fs'; // allow as to work with the file system

import sql from 'better-sqlite3'; // light sql db 
import slugify from 'slugify';
import xss from 'xss';


const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // throw new Error('Loading meals failed');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`); // allow us to write data into certain file
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!');
        }
    });

    meal.image = `/images/${fileName}` // no public in the path because it's automatically set in the public folder

    db.prepare(`
        INSERT INTO meals 
          (title, summary, instructions, creator, creator_email, image, slug)
          VALUES (
          @title,
          @summary,
          @instructions,
          @creator,
          @creator_email,              
          @image,
          @slug   
         )
        `).run(meal); // make sure the values of order should be the same with the key
}