import { BaseRepository } from './base-repository';
import * as schema from '@/lib/db/schema';

export class InsightStatusRepository extends BaseRepository<typeof schema.insightStatus, 'id'> {
  constructor() {
    super(schema.insightStatus);
  }

  async getEverificationStatus(): Promise<schema.InsightStatus> {
    const status = await this.findById(1);
    if (status) {
      return status;
    } else {
      return await this.create({ id: 1, name: 'Everification', updatedAt: new Date(2000, 12, 31) });
    }
  }
}
