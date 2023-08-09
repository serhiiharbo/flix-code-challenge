import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ImageStyle, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { Icon } from '../icon/Icon';
import { IMAGES } from '../../constants';
import { TSort, TStyle } from '../../types/shared.types';
import { User } from '../../api/HttpClient';

interface ITableBodyCellsProps {
  columnName: keyof User,
  i: number,
  item: User
  sortParams: TSort,
}

type TErrorState = [boolean, Dispatch<SetStateAction<boolean>>]
type TImageStyles = {
  icon: ImageStyle,
}

export const TableBodyCells: React.FunctionComponent<ITableBodyCellsProps> =
  ({ columnName, i, item, sortParams }: ITableBodyCellsProps) => {
    const [error, setError]: TErrorState = useState<boolean>(false);
    const { sortBy, orderBy }: TSort = sortParams;

    useEffect(() => {
      setError(false);
    }, [sortBy, orderBy]);

    const pressableStyles: (ViewStyle | ImageStyle)[] = [
      styles.rowCell,
      { borderRightWidth: i === 0 ? 1 : 0 },
      { backgroundColor: error ? 'pink' : 'transparent' },
    ];

    return (
      <Pressable
        style={pressableStyles}
        onPress={() => setError(!error)}
      >
        {
          Boolean(error) &&
          <Icon source={IMAGES.ERROR.CELL} styles={imageStyle.icon} />
        }
        <Text style={styles.text}>
          {`${item[columnName]}`}
        </Text>
      </Pressable>
    );
  };

const styles: TStyle = StyleSheet.create({
  rowCell: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 8,
    borderColor: 'black',
  },
  text: {
    fontSize: 20,
    marginLeft: 8,
  },
  icon: {
    width: 25,
  } as ImageStyle,
});

const imageStyle: TImageStyles = StyleSheet.create<TImageStyles>({
  icon: {
    width: 25,
  } as ImageStyle,
});
