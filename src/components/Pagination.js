import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {COLORS, SIZES, scale} from '../assets/constants';
import {
  IconNext,
  IconNextAll,
  IconPrevious,
  IconPreviousAll,
} from '../assets/icon/Icon';
import CustomText from './CustomText';

const Pagination = ({
  totalPages = 0,
  pageSize = 10,
  onChange = () => {},
  currentPage = 1,
  styleWrapper,
}) => {
  const countPage = useMemo(
    () => Math.ceil(totalPages / pageSize),
    [pageSize, totalPages],
  );

  let arrOfCurrButtons = useMemo(() => {
    const numberOfPages = [];
    for (let i = 1; i <= countPage; i++) {
      numberOfPages.push(i);
    }

    if (numberOfPages.length < 8) {
      return numberOfPages;
    } else if (currentPage >= 1 && currentPage < 5) {
      return [1, 2, 3, 4, 5, '...', numberOfPages.length];
    } else if (currentPage > numberOfPages.length - 4) {
      const sliced = numberOfPages.slice(numberOfPages.length - 5);
      return [1, '...', ...sliced];
    } else {
      const sliced1 = numberOfPages.slice(currentPage - 2, currentPage);
      const sliced2 = numberOfPages.slice(currentPage, currentPage + 1);

      return [1, '...', ...sliced1, ...sliced2, '...', numberOfPages.length];
    }
  }, [currentPage, countPage]);

  const PageBox = ({onPress, children, disabled, style}) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        activeOpacity={0.7}
        style={[
          styles.styleView,
          disabled && {
            backgroundColor: '#eaeaea',
          },

          style,
        ]}>
        {children}
      </TouchableOpacity>
    );
  };

  if (countPage <= 1) return null;
  return (
    <View style={[styles.paging, styleWrapper]}>
      <>
        <PageBox onPress={() => onChange(1)} disabled={currentPage <= 1}>
          <IconPreviousAll
            style={styles.styleIcon}
            fill={currentPage <= 1 && '#adadad'}
          />
        </PageBox>

        <PageBox
          onPress={() => onChange(--currentPage)}
          disabled={currentPage <= 1}>
          <IconPrevious
            style={styles.styleIcon}
            fill={currentPage <= 1 && '#adadad'}
          />
        </PageBox>
      </>

      {arrOfCurrButtons.map((item, index) => {
        const focus = currentPage === item;
        return item === '...' ? (
          <CustomText textType="semiBold" key={index} style={styles.pageNumber}>
            {item}
          </CustomText>
        ) : (
          <PageBox
            key={index}
            onPress={() => onChange(item)}
            style={[focus && styles.currentNumberPage]}>
            <CustomText
              textType="semiBold"
              style={[styles.pageNumber, focus && {color: COLORS.primary}]}>
              {item}
            </CustomText>
          </PageBox>
        );
      })}

      <>
        <PageBox
          onPress={() => onChange(++currentPage)}
          disabled={currentPage === countPage}>
          <IconNext
            style={styles.styleIcon}
            fill={currentPage === countPage && '#adadad'}
          />
        </PageBox>

        <PageBox
          onPress={() => onChange(countPage)}
          disabled={currentPage === countPage}>
          <IconNextAll
            style={styles.styleIcon}
            fill={currentPage === countPage && '#adadad'}
          />
        </PageBox>
      </>
    </View>
  );
};
const styles = StyleSheet.create({
  paging: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginVertical: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pageNumber: {
    fontSize: SIZES.xMedium,
    color: COLORS.black,
  },
  currentNumberPage: {
    borderWidth: 1,
  },
  styleView: {
    minWidth: scale(28),
    height: scale(28),
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 3,
    alignItems: 'center',
    borderColor: COLORS.primary,
    // ...SHADOW,
  },
  styleIcon: {
    height: scale(14),
    width: scale(14),
  },
  // styleIcon: {
  //   color: '#949494',
  //   justifyContent: 'center',
  //   alignSelf: 'center',
  // },
});
export default Pagination;
