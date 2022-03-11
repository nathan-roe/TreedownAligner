import React, { ReactElement } from 'react';
import GridLayout from 'react-grid-layout';

import { useAppSelector } from 'app/hooks';
import useDebug from 'hooks/useDebug';
import TextComponent from 'features/text';
import { Corpus } from 'structs';

import cssVar from 'styles/cssVar';

export const Polyglot = (): ReactElement => {
  useDebug('PolyglotComponent');
  const corpora = useAppSelector((state) => state.polyglot.corpora);

  const layoutRange = Array.from({ length: corpora.length }, (x, i) => i);

  const layout = layoutRange.map((key: number) => {
    const width = 24 / corpora.length;
    const x = width * key;

    return {
      i: `text_${key}`,
      x,
      y: 0,
      w: width,
      h: 12,
      minW: width,
      maxW: width,
      isResizable: false,
    };
  });

  const theme = useAppSelector((state) => {
    return state.app.theme;
  });

  return (
    <React.Fragment>
      <GridLayout
        draggableHandle=".drag-handle"
        layout={layout}
        cols={24}
        rowHeight={12}
        width={1200}
        maxRows={1}
        compactType="horizontal"
      >
        {corpora.map((corpus: Corpus, index: number): ReactElement => {
          const key = `text_${index}`;
          return (
            <div
              key={key}
              style={{
                border: '1px solid',
                borderColor: cssVar('border-color', theme),
              }}
            >
              <TextComponent
                id={corpus.id}
                name={corpus.name}
                words={corpus.words}
              />
            </div>
          );
        })}
      </GridLayout>
    </React.Fragment>
  );
};

export default Polyglot;
