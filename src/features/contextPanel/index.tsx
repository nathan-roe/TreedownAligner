import { ReactElement } from 'react';
import { Card, Stack } from '@mui/material';

import { useAppSelector } from 'app/hooks';
import useDebug from 'hooks/useDebug';
import LinkBuilderComponent from 'features/linkBuilder';

import { Corpus } from 'structs';

export const ContextPanel = (): ReactElement => {
  useDebug('ContextPanel');

  const greekCorpus =
    useAppSelector((state) => {
      const syntaxCorpora = ['sbl', 'nestle1904'];
      return state.alignment.present.corpora.find((corpus: Corpus) => {
        return syntaxCorpora.includes(corpus.id);
      });
    }) ?? ({} as Corpus);

  return (
    <Stack
      direction="row"
      spacing={2}
      style={{ height: '16rem' }}
      justifyContent="stretch"
      alignItems="stretch"
    >
      <Card
        elevation={6}
        key="a"
        style={{
          flexGrow: '1',
          flexBasis: '0',
        }}
      >
        <LinkBuilderComponent />
      </Card>
    </Stack>
  );
};

export default ContextPanel;
