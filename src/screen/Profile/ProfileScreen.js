import {useQuery, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../assets/constants';
import {IconWallet} from '../../assets/icon/Icon';
import CustomText from '../../components/CustomText';
import MainWrapper from '../../components/MainWrapper';
import {useAuthentication} from '../../hooks/useAuthentication';
import {useCountry} from '../../hooks/useCountry';
import {formatPrice} from '../../utils/format';
import Bottom from './components/Bottom';
import Content from './components/Content';
import HeaderNoToken from './components/HeaderNoToken';
import TopProfile from './components/TopProfile';
import {getListRank} from '../../Model/api/auth';
import {getProfile} from '../../Model/api_new/user/profile';

export default function ProfileScreen() {
  const upgrade = () => {};

  const {token} = useAuthentication();
  const {currency} = useCountry();
  const queryClient = useQueryClient();
  const {isLoading, data} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getProfile(),
  });

  const {data: dataRank} = useQuery({
    queryKey: ['user', 'rank'],
    queryFn: () => getListRank(),
    enabled: !!token,
  });

  const getCurrentLevel = (score, ranks) => {
    // Log các giá trị đầu vào

    // Kiểm tra điều kiện đầu vào chặt chẽ hơn
    if (
      score === undefined ||
      score === null ||
      !Array.isArray(ranks) ||
      ranks.length === 0
    ) {
      return null;
    }

    // Sắp xếp ranks theo min_score tăng dần
    const sortedRanks = [...ranks].sort((a, b) => a.min_score - b.min_score);

    // Tìm level hiện tại
    const currentLevel = sortedRanks.reduce((prev, current) => {
      if (score >= current.min_score) {
        return current;
      }
      return prev;
    }, sortedRanks[0]);

    // Tìm level tiếp theo
    const nextLevelIndex =
      sortedRanks.findIndex(rank => rank.id === currentLevel.id) + 1;
    const nextLevel =
      nextLevelIndex < sortedRanks.length ? sortedRanks[nextLevelIndex] : null;

    const result = {
      currentLevel,
      nextLevel,
      remainingScore: nextLevel ? nextLevel.min_score - score : 0,
      score: score,
    };

    // Log kết quả
    return result;
  };

  const userLevelInfo = getCurrentLevel(data?.data?.score, dataRank?.data);
  return (
    <MainWrapper
      refreshControl
      optionsHeader={{
        headerStyle: {
          minHeight: scale(Platform.OS === 'ios' ? 120 : 70),
        },
      }}
      headerTitleComponent={<HeaderNoToken />}
      headerShown={!token}
      styleContent={{
        paddingHorizontal: scale(12),
        paddingBottom: scale(120),
      }}>
      {token && (
        <View style={{paddingTop: scale(20)}}>
          {/* <View style={styles.wallet}>
            <IconWallet />
            <CustomText
              textType="bold"
              numberOfLines={1}
              style={{color: COLORS.primary, fontSize: SIZES.xMedium}}>
              {formatPrice(data?.data.balance * currency?.exchange_rate, {
                currency: currency?.currency_code,
              })}
            </CustomText>
          </View> */}
          <TopProfile
            upgrade={true}
            data={data?.data}
            name={data?.data?.fullname || 'name'}
            onPressUpgrade={upgrade}
            userLevelInfo={userLevelInfo}
          />
        </View>
      )}
      <Content token={token} />

      <Bottom />
    </MainWrapper>
  );
}
const styles = StyleSheet.create({
  wallet: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    columnGap: scale(5),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    flexDirection: 'row',
    top: scale(40),
    right: scale(10),
    backgroundColor: COLORS.white,
    minHeight: scale(40),
    minWidth: scale(90),
    borderRadius: scale(10),
    ...SHADOW,
  },
});
