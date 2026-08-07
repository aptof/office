'use server';

import { EverificationReport, EverificationService, ReportWithStatus } from '@/services';

const service = new EverificationService();

export async function getSummaryReport(): Promise<ReportWithStatus> {
  return await service.getCaseSummaryReport();
}

//: Promise<EverificationReport[]>
export async function loadReportFromInsight() {}
