import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { SeederService } from './seederService';

async function runSeeder() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seederService = app.get(SeederService);

  console.log('Running Seeder...');
  await seederService.seed();
  console.log('Seeder finished!');

  await app.close();
}

runSeeder().catch((error) => {
  console.error(error);
  process.exit(1);
});
