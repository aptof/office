'use server';

import { EverificationReport, EverificationService } from '@/services';

const service = new EverificationService();

export async function getSummaryReport(): Promise<EverificationReport[]> {
  return await service.getCaseSummaryReport();
}
