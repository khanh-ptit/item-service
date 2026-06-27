import { ItemRepository } from 'src/components/item/repository/item.repository';
import { DatabaseService } from './database.service';

export const databaseProviders = [DatabaseService, ItemRepository];
