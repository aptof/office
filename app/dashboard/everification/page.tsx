'use client';

import BasicShell from '@/components/basic-shell';
import { useQuery } from '@tanstack/react-query';
import { getSummaryReport } from './everification-actions';
import ErrorText from '@/components/aptof/error-text';
import { EverificationReport, ReportWithStatus } from '@/services';
import { InsightStatus } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState, useTransition } from 'react';

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

  return <ReportContent reports={reports} />;
}

function ReportContent({ reports }: { reports: ReportWithStatus }) {
  return (
    <div>
      <StatusBar status={reports.status} />
      <ReportTable reports={reports.reports} />
    </div>
  );
}

function StatusBar({ status }: { status: InsightStatus }) {
  const [isPending, startTransition] = useTransition();
  const [serverReport, setServerReport] = useState<EverificationReport[]>([]);

  async function getConfirmation() {}

  return (
    <div className="flex justify-stretch items-center">
      <p>{`${status.name} last updated on: ${status.updatedAt.toDateString()}`}</p>
      <p className="grow"></p>

      <AlertDialog>
        <AlertDialogTrigger render={<Button className="min-w-48">Fetch Now</Button>}>
          Show Dialog
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ReportTable({ reports }: { reports: EverificationReport[] }) {
  if (reports.length === 0) {
    return (
      <div className="w-full flex justify-center items-center">
        <ErrorText message="No reports found. Please fetch report from insight."></ErrorText>
      </div>
    );
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
