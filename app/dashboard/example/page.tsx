'use client';
import CenterLoading from '@/components/aptof/center-loading';
import ErrorText from '@/components/aptof/error-text';
import { Chapter } from '@/data/model/chapter';
import { Subject } from '@/data/model/subject';
import { chapterRepository } from '@/data/repository/chapter-repository';
import { subjectRepository } from '@/data/repository/subject-repository';
import { routes } from '@/helpers/routes';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import ChaptersList from './chapter-list';

export default function Chapters() {
  const router = useRouter();
  const { subjectId }: { subjectId: string } = useParams();

  const queryClient = useQueryClient();

  const subjectResult = useQuery({
    queryKey: ['subject', subjectId],
    queryFn: () => subjectRepository.get(subjectId),
    initialData: () => {
      const subjects = queryClient.getQueryData<Subject[]>(['subjects']);
      return subjects?.find((subject) => subject.id === subjectId);
    },
  });

  const chaptersResult = useQuery({
    queryKey: ['chapters', subjectId],
    queryFn: () => chapterRepository.getAll(subjectId),
  });

  function onEdit(chapter: Chapter) {
    router.push(`${routes.editChpater(chapter.id, chapter.subjectId)}`);
  }

  function onAdd(subjectId: string) {
    router.push(`${routes.addChapter(subjectId)}`);
  }

  function onClick(chapter: Chapter) {
    router.push(`${routes.questions(chapter.id, chapter.subjectId, '')}`);
  }

  if (subjectResult.isPending || chaptersResult.isPending) {
    return <CenterLoading />;
  } else if (subjectResult.isError || chaptersResult.isError) {
    return (
      <ErrorText
        error={chaptersResult.error?.message ?? subjectResult.error?.message ?? 'Unknown error.'}
      />
    );
  } else {
    return (
      <ChaptersList
        subject={subjectResult.data}
        chapters={chaptersResult.data}
        onClick={onClick}
        onEdit={onEdit}
        onAdd={onAdd}
      />
    );
  }
}
