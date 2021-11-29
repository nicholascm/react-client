import React from 'react';
import SplitTreatments from './SplitTreatments';
import { ON } from './constants';
import { ISimpleTreatmentProps } from './types';

const SimpleTreatment = ({
  names = [],
  attributes = {},
  children,
}: ISimpleTreatmentProps) => {
  return (
    <SplitTreatments names={names} attributes={attributes}>
      {({ treatments, isReady }) => {
        // https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#multiple-evaluations-at-once
        const nameLookup = names.reduce((lookup: object, next: string) => {
          (lookup as any)[next] = true;
          return lookup;
        }, {});

        const allRequestedFlags = Object.keys(treatments).filter((key) => {
          return (nameLookup as any)[key];
        });

        const allProvidedFlagsEnabled = allRequestedFlags.reduce(
          (final, next) => {
            if (!final) {
              return final;
            }

            return treatments[next]?.treatment === ON;
          },
          true,
        );

        if (!names || !names.length) {
          return null;
        }
        if (isReady && allProvidedFlagsEnabled) {
          return children;
        }

        return null;
      }}
    </SplitTreatments>
  );
};

export default SimpleTreatment;
