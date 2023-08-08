import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ImageStyle, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';

import { Icon } from '../icon/Icon';
import { IMAGES } from '../../constants/assets.constants';
import { TStyle } from '../../types/shared.types';
import { User } from '../../api/HttpClient';
import { SortStore } from '../../store/SortStore';

interface TableBodyCellsProptypes {
  columnName: keyof User,
  i: number,
  item: User
  sortStore: SortStore,
}

type TErrorState = [boolean, Dispatch<SetStateAction<boolean>>]

export const TableBodyCells: React.FunctionComponent<TableBodyCellsProptypes> =
  observer(({ columnName, i, item, sortStore }: TableBodyCellsProptypes) => {
    const [error, setError]: TErrorState = useState<boolean>(false);
    const { sortBy, orderBy }: SortStore = sortStore;

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
  });

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

type TImageStyles = {
  icon: ImageStyle,
}

const imageStyle: TImageStyles = StyleSheet.create<TImageStyles>({
  icon: {
    width: 25,
  } as ImageStyle,
});
