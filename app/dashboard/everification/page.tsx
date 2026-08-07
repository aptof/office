'use client';

import BasicShell from '@/components/basic-shell';
import { useQuery } from '@tanstack/react-query';
import { getSummaryReport } from './everification-actions';
import ErrorText from '@/components/aptof/error-text';
import { EverificationReport } from '@/services';

export default function EVerification() {
  return (
    <BasicShell>
      <EVerificationContent />
    </BasicShell>
  );
}

function EVerificationContent() {
  const {
    data: reports,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['everifiation-summary-report'],
    queryFn: () => getSummaryReport(),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <ErrorText message={error.message ?? 'Unknown Error'}></ErrorText>;
  }

  if (!reports) {
    return <ErrorText message="No reports found." />;
  }

  if (reports.length == 0) {
    return <ErrorText message="No reports found. Please fetch from insight." />;
  }

  return <ReportTable reports={reports} />;
}

function ReportTable({ reports }: { reports: EverificationReport[] }) {
  return <p>{reports.length}</p>;
}
