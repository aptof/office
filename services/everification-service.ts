import { db } from '@/lib/db'; // your drizzle db instance
import { everificationCase, everificationCaseType, InsightStatus } from '@/lib/db/schema';
import { InsightStatusRepository } from '@/repositories/insight-status-repository';
import { sql, eq } from 'drizzle-orm';

export interface EverificationReport {
  caseTypeId: number;
  caseTypeName: string;
  year: number;
  underVerificationCount: number;
  verifiedCount: number;
  totalCases: number;
}

export interface ReportWithStatus {
  reports: EverificationReport[];
  status: InsightStatus;
}

export class EverificationService {
  private insightStatusRepo = new InsightStatusRepository();

  public async getCaseSummaryReport(): Promise<ReportWithStatus> {
    const summaryData = await db
      .select({
        caseTypeId: everificationCaseType.id,
        caseTypeName: everificationCaseType.type,
        year: everificationCase.year,

        // Dynamic status counts using conditional aggregation
        // Replace these status IDs with your actual database status IDs (e.g., 'UV', 'VR', etc.)
        underVerificationCount: sql<number>`SUM(CASE WHEN ${everificationCase.statusId} = 'Under-Verification' THEN 1 ELSE 0 END)`,
        verifiedCount: sql<number>`SUM(CASE WHEN ${everificationCase.statusId} = 'Verified' THEN 1 ELSE 0 END)`,
        // underReVerificationCount: sql<number>`SUM(CASE WHEN ${everificationCase.statusId} = 'URV' THEN 1 ELSE 0 END)`,
        // sentBackCount: sql<number>`SUM(CASE WHEN ${everificationCase.statusId} = 'SB' THEN 1 ELSE 0 END)`,
        // pendingApprovalCount: sql<number>`SUM(CASE WHEN ${everificationCase.statusId} = 'PA' THEN 1 ELSE 0 END)`,
        // submittedApprovalCount: sql<number>`SUM(CASE WHEN ${everificationCase.statusId} = 'SA' THEN 1 ELSE 0 END)`,

        // Total cases for this group
        totalCases: sql<number>`COUNT(${everificationCase.id})`,
      })
      .from(everificationCase)
      .innerJoin(everificationCaseType, eq(everificationCase.typeId, everificationCaseType.id))
      .groupBy(everificationCase.typeId, everificationCase.year);

    const status = await this.insightStatusRepo.getEverificationStatus();

    return { reports: summaryData, status: status };
  }
}
