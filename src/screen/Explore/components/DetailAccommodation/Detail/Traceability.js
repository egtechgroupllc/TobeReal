import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomText from '../../../../../components/CustomText';
import {
  COLORS,
  SIZES,
  WIDTH,
  images,
  scale,
} from '../../../../../assets/constants';
import {TabSelect} from '../../../../../components';
import WrapperContent from '../../WrapperContent';
import {useLanguage} from '../../../../../hooks/useLanguage';
import BottomSheet from '../../../../../components/BottomSheet';
import ImageDetail from '../../../../components/ImageDetail';
import {IconDown, IconHome, IconShield} from '../../../../../assets/icon/Icon';
import calculateTimeElapsed from '../../../../../utils/calculateTimeElapsed';
import {formatDate, formatDateTime} from '../../../../../utils/format';
import {create} from 'zustand';
import {
  IconClipboardTextFilled,
  IconDownload,
  IconHammer,
  IconRosetteDiscountCheckFilled,
  IconTool,
  IconTransferIn,
} from '@tabler/icons-react-native';
export default function Traceability({data}) {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  console.log('data', data?.createdAt);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current.open();
    }
  }, [isOpen]);

  const handleOpenLink = async () => {
    await Linking.openURL(
      `https://zeroscan.org/tx/0xfd56c89048f5954277b0c9bbab02e7e25cd6ac1cae662d25553cd9fe226a3ab4`,
    );
  };
  const dataTrace = [
    {
      icon: (
        <IconHome width={scale(20)} height={scale(20)} fill={COLORS.overlay} />
      ),
      title: 'Khởi tạo bất động sản',
      description:
        'Bất động sản được khởi tạo và xác thực thông tin chủ sở hữu đầu tiên trên hệ thống.',
      date_distribution: '2024-01-05 09:15',
      document: true,
      hash: '0xfd56c89048f5954277b0c9bbab02e7e25cd6ac1cae662d25553cd9fe226a3ab4',
      createdAt: '2024-01-05 09:15',
    },
    {
      icon: (
        <IconHammer
          width={scale(20)}
          height={scale(20)}
          fill={COLORS.overlay}
          stroke={COLORS.overlay}
        />
      ),
      title: 'Sửa chữa, nâng cấp công trình',
      description:
        'Nâng cấp phần mái và hệ thống điện theo giấy phép sửa chữa số 57/GPXD-SC do Sở Xây Dựng cấp.',
      date_start: '2024-06-05',
      date_end: '2024-06-10',
      hash: '0xc5678efabcd90123456abcdef567abcd123456789abcdefabcd34567abcdef23',
      createdAt: '2024-06-05 10:00',
      building: true,
      image: [
        {
          id: 1,
          description: 'aaa',
          index: 1,
          url: 'https://xaydungtinhanh.com/wp-content/uploads/2022/06/cai-tao-can-ho-chung-cu-50m2-4.jpg',
        },
        {
          id: 2,
          description: 'aaa',
          index: 1,
          url: 'https://charminghome.com.vn/wp-content/uploads/2020/09/C%E1%BA%A3i-T%E1%BA%A1o-S%E1%BB%ADa-Ch%E1%BB%AFa-Nh%C3%A0-Chung-C%C6%B0-T%E1%BA%A1i-H%C3%A0-N%E1%BB%99i-Thi-C%C3%B4ng-Tr%E1%BB%8Dn-G%C3%B3i-T%E1%BB%AB-A-Z.jpg',
        },
        {
          id: 3,
          description: 'aaa',
          index: 3,
          url: 'https://www.xaydungthienlong.com/wp-content/uploads/2021/06/Sua-Chua-Nha-Dong-Nai.jpg',
        },
      ],
    },

    {
      icon: (
        <IconRosetteDiscountCheckFilled
          width={scale(20)}
          height={scale(20)}
          fill={COLORS.overlay}
        />
      ),
      title: 'Xác nhận kiểm định kỹ thuật',
      description:
        'Tài sản được kiểm định đạt chuẩn chất lượng xây dựng vào tháng 07/2024 bởi Công ty CP Kiểm Định ABC.',
      date_distribution: '2025-01-10 15:45',
      document: true,
      hash: '0xd9a8bcde90123456789abcdef123456789abcdefabcd456789abcdef567abc34',
      createdAt: '2025-01-10 15:45',
    },
    {
      icon: (
        <IconClipboardTextFilled
          width={scale(20)}
          height={scale(20)}
          fill={COLORS.overlay}
        />
      ),
      title: 'Xác thực pháp lý & công chứng',
      description:
        'Hợp đồng mua bán công chứng tại Văn phòng công chứng Hòa Bình, chứng thực tính pháp lý cho giao dịch gần nhất.',
      date_distribution: '2025-05-07 11:20',
      document: true,
      hash: '0xe12f3abcd4567890abcdef123456789abcdefabcd56789abcdef6789abc456',

      createdAt: '2025-05-07 11:20',
    },
    {
      icon: (
        <IconTransferIn
          width={scale(20)}
          height={scale(20)}
          fill={'transparent'}
          stroke={COLORS.overlay}
        />
      ),
      title: 'Chuyển nhượng quyền sở hữu',
      description:
        'Chuyển nhượng từ ông Nguyễn Văn A sang bà Trần Thị B theo hợp đồng công chứng số 2024/45/CC-HN.',
      date_distribution: '2025-06-07 14:30',
      hash: '0xb234abcd56ef89123456abcdef789abcd123456789abcdefabcd23456abcdef12',
      createdAt: '2025-06-07 14:30',
      document: true,
    },
  ];
  return (
    <WrapperContent
      noBackground
      heading={t('traceability')}
      styleContent={{
        paddingHorizontal: scale(16),
        minHeight: scale(100),
        borderBottomWidth: 1,
        borderColor: COLORS.pioBox,
        paddingBottom: scale(10),
      }}>
      <View onPress={handleOpenLink} activeOpacity={0.7}>
        <FlatList
          data={dataTrace}
          inverted
          keyExtractor={(item, index) =>
            `key_${item?.id}-${item?.name}-${index}`
          }
          contentContainerStyle={{rowGap: scale(10)}}
          showsVerticalScrollIndicator={false}
          renderItem={item => {
            return (
              <View style={styles.container}>
                {/* <IconBox iconText={supplyChain?.icon} /> */}
                <View style={{alignItems: 'center', rowGap: scale(10)}}>
                  <View
                    style={{
                      borderWidth: scale(1),
                      borderColor: COLORS.border,
                      padding: scale(5),
                      borderRadius: scale(99),
                      backgroundColor: COLORS.grey50,
                    }}>
                    {item?.item?.icon}
                  </View>

                  <View
                    style={{
                      flex: 0.6,
                      width: scale(2),
                      backgroundColor: COLORS.grey,
                    }}
                  />
                </View>

                <View style={styles.content}>
                  <View style={styles.header}>
                    <CustomText size={SIZES.xMedium} textType="semiBold">
                      {/* {supplyChain?.name} */}
                      {item?.item?.title}
                    </CustomText>

                    <CustomText
                      size={SIZES.xSmall}
                      color={COLORS.textSub}
                      style={{textTransform: 'capitalize'}}>
                      {/* {getTimeAgo(item?.created_at || item?.updated_at)} */}
                      {calculateTimeElapsed(item?.item?.createdAt) ||
                        'Unknown date'}
                    </CustomText>
                  </View>

                  <CustomText
                    size={SIZES.small}
                    style={styles.description}
                    numberOfLines={3}
                    color={COLORS.textSub}
                    textType="medium">
                    {/* {item?.note?.trim() || supplyChain?.description} */}
                    {item?.item?.description || 'No description available.'}
                  </CustomText>
                  {item?.item?.document && (
                    <TouchableOpacity style={styles.infoRow}>
                      <IconDownload size={scale(15)} />
                      <CustomText
                        size={SIZES.small}
                        textType="medium"
                        color={COLORS.black}>
                        Tải xuống tài liệu
                      </CustomText>
                    </TouchableOpacity>
                  )}
                  <View style={styles.infoRow}>
                    {item?.item?.building ? (
                      <CustomText
                        size={SIZES.small}
                        textType="medium"
                        color={COLORS.overlay}>
                        Ngày sửa chữa: {item?.item?.date_start} đến{' '}
                        {item?.item?.date_end}
                      </CustomText>
                    ) : (
                      <CustomText
                        size={SIZES.small}
                        textType="medium"
                        color={COLORS.overlay}>
                        Ngày: {item?.item?.date_distribution}
                      </CustomText>
                    )}
                  </View>
                  {item?.item?.image?.length > 0 && (
                    <ImageDetail
                      arrImg={item?.item?.image}
                      styleWrapper={{
                        height: scale(100),
                      }}
                    />
                  )}
                  {/* <AdditionalInfo
              title="Kênh phân phối"
              datas={[
                ...(data.ecommerce?.name_ecommerce
                  ? [
                      {
                        name: data.ecommerce?.name_ecommerce,
                        icon: IconShoppingBag,
                      },
                    ]
                  : []),
                ...(data.supermarket?.name_supermarket
                  ? [
                      {
                        name: data.supermarket?.name_supermarket,
                        icon: IconShoppingCart,
                      },
                    ]
                  : []),
                ...(data.marketplace?.name_marketplace
                  ? [
                      {
                        name: data.marketplace?.name_marketplace,
                        icon: IconShoppingCart,
                      },
                    ]
                  : []),
              ]}
            /> */}
                  {/* <ActivityImages images={data?.image} /> */}

                  <View style={styles.footer}>
                    {/* {item?.hash && (
                <View style={styles.verifiedBadge}>
                  <IconShieldCheckFilled size={12} color={COLORS.primary} />
                  <CText
                    size={SIZES.xSmall}
                    textType="medium"
                    color={COLORS.primary}>
                    Đã xác thực
                  </CText>
                </View>
              )} */}
                    {/* {item?.hash && <BlockchainRecord record={item.hash} />} */}
                    {item?.item?.hash && (
                      <View style={styles.batchContainer}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            columnGap: scale(4),
                          }}>
                          <IconShield width={scale(20)} />
                          <CustomText
                            size={SIZES.xSmall}
                            textType="medium"
                            color={COLORS.textSub}>
                            {t('verified')} {'\n'} Blockchain
                          </CustomText>
                        </View>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={handleOpenLink}>
                          <CustomText
                            numberOfLines={2}
                            size={SIZES.xSmall}
                            textType="medium">
                            Hash:{' '}
                            <CustomText
                              numberOfLines={2}
                              style={{
                                color: COLORS.blue,
                                textDecorationLine: 'underline',
                              }}>
                              {item?.item?.hash.slice(0, 6)}...
                              {item?.item?.hash.slice(-8)}
                            </CustomText>
                          </CustomText>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  introduction: {
    // backgroundColor: '#ccc',
    width: WIDTH.widthContain,
    rowGap: scale(10),
  },
  textIntroduction: {
    fontSize: SIZES.medium,
  },
  textSubIntroduction: {
    fontSize: SIZES.xMedium,
  },

  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: scale(12),
    padding: scale(10),
    columnGap: scale(10),
  },
  iconContainer: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(20),
    backgroundColor: COLORS.body,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  content: {
    flex: 1,
    rowGap: SIZES.xxSmall,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    marginBottom: scale(2),
    color: COLORS.textSub,
  },
  infoRow: {
    flexDirection: 'row',
    columnGap: scale(4),
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  batchContainer: {
    backgroundColor: COLORS.body,
    borderRadius: scale(6),
    paddingVertical: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(4),
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(12),
    alignSelf: 'flex-end',
  },
});
