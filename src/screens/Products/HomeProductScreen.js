/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// import Menu from '@components/Home/ListFood/Menu';
// import MenuItem from '@components/Home/ListFood/MenuItem';
// import AnimatedHeader from '@components/Home/ListFood/AnimatedHeader';
import {BorderTopHeader} from '@components/Common/Header/BorderTopHeader';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@navigation/navigator';
import {GET_LIST_PRODUCT} from '@services/Product';
import Input from '~/components/Input';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {IconHandShake, IconRight, IconSearch} from '~/assets/icon/Icon';
import {scale} from '~/utils/scale';
import {
  IconArrowLeft,
  IconSearchOff,
  IconShoppingCart,
} from '@tabler/icons-react-native';
import {useQuery} from '@tanstack/react-query';
import {getListProduct} from '~/api/product';
import ProductItem from './ListProduct/components/ProductItem';
import Category from './ListProduct/components/Category';
import Header from '../Home/components/Header';
import {useLanguage} from '~/hooks/useLanguage';
import ProductHeader from './ListProduct/components/ProductHeader';
import AnimateScrollWrapper from '~/components/AnimateHeader/AnimateScrollWrapper';
import PartnerItem from './ListProduct/components/PartnerItem';
import {useAuthentication} from '~/hooks/useAuthentication';

// const HEADER_HEIGHT = scale(-10);

const fake = [
  {
    id: 1,
    name: 'Shop partner',
    items: [
      {
        name: 'Bwell Official Store',
        url: 'https://youmedstore.vn/media/avatar/B.Well_1_.jpeg',
        items: [
          {
            name: 'Sữa FontActiv Complete 400 gram – Dinh dưỡng cho người ốm yếu và mệt mỏi',
            url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/f/o/font_activ_complete_400g.png',
            price: 385000,
            description:
              'Sữa FontActiv Complete 400 gram – Dinh dưỡng cho người ốm yếu và mệt mỏi\n\n' +
              'Sữa bột FontActiv Complete là một sản phẩm dinh dưỡng được thiết kế đặc biệt để cung cấp các chất dinh dưỡng cho người ốm yếu và mệt mỏi. Sản phẩm này có mục tiêu hỗ trợ tăng cường sức khỏe, bổ sung dinh dưỡng và cung cấp năng lượng cho cơ thể.\n\n' +
              'Các đặc điểm và lợi ích của sữa FontActiv Complete bao gồm:\n\n' +
              '- Bổ sung chất dinh dưỡng: Sữa bột FontActiv Complete chứa các chất dinh dưỡng quan trọng như 100% đạm Whey, carbohydrate, chất béo, vitamin và khoáng chất.\n' +
              '- Dễ tiêu hóa: Sữa bột FontActiv Complete được thiết kế với công thức dễ tiêu hóa, phù hợp cho người có hệ tiêu hóa yếu.\n' +
              '- Hỗ trợ tăng cường sức khỏe: Các chất dinh dưỡng trong sữa bột giúp tái tạo và phục hồi cơ thể, tăng cường hệ miễn dịch.\n' +
              '- Cung cấp năng lượng: Sữa bột cung cấp năng lượng dồi dào giúp vượt qua cảm giác mệt mỏi.\n\n' +
              'Sản phẩm thường được đóng gói trong các lon hoặc hũ có dung tích 400gr và 800gr.',
          },
          {
            name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
            url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
            price: 675000,
            description:
              'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
              'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
              '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
              '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
              '- Lưu kết quả đo cuối cùng.\n' +
              '- Nhỏ gọn và di động.\n' +
              '- Tự động tắt nguồn khi không sử dụng.\n\n' +
              'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
          },
          {
            name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
            url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
            price: 675000,
            description:
              'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
              'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
              '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
              '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
              '- Lưu kết quả đo cuối cùng.\n' +
              '- Nhỏ gọn và di động.\n' +
              '- Tự động tắt nguồn khi không sử dụng.\n\n' +
              'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
          },
          {
            name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
            url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
            price: 675000,
            description:
              'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
              'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
              '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
              '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
              '- Lưu kết quả đo cuối cùng.\n' +
              '- Nhỏ gọn và di động.\n' +
              '- Tự động tắt nguồn khi không sử dụng.\n\n' +
              'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
          },
          {
            name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
            url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
            price: 675000,
            description:
              'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
              'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
              '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
              '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
              '- Lưu kết quả đo cuối cùng.\n' +
              '- Nhỏ gọn và di động.\n' +
              '- Tự động tắt nguồn khi không sử dụng.\n\n' +
              'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
          },
          {
            name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
            url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
            price: 675000,
            description:
              'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
              'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
              '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
              '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
              '- Lưu kết quả đo cuối cùng.\n' +
              '- Nhỏ gọn và di động.\n' +
              '- Tự động tắt nguồn khi không sử dụng.\n\n' +
              'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
          },
          {
            name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
            url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
            price: 675000,
            description:
              'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
              'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
              '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
              '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
              '- Lưu kết quả đo cuối cùng.\n' +
              '- Nhỏ gọn và di động.\n' +
              '- Tự động tắt nguồn khi không sử dụng.\n\n' +
              'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
          },
        ],
        title: 'BWELL - Thương hiệu đáng tin cậy từ Thụy Sĩ',
        description:
          'BWELL là thương hiệu đáng tin cậy từ Thụy Sĩ, với hơn 100 năm kinh nghiệm trong sản xuất và phát triển các sản phẩm y tế chất lượng cao.',
      },
      {
        name: 'MEGA WECARE',
        url: 'https://youmedstore.vn/media/avatar/Mega_-_01.png',
        title: 'MEGA We care - Giải pháp chăm sóc sức khỏe toàn diện',
        description:
          'Mega tự hào về dòng sản phẩm Nutraceuticals là dòng sản phẩm chủ đạo không chỉ ở Việt Nam mà còn là sản phẩm chiến lược toàn cầu. Các nhóm sản phẩm đa dạng không chỉ nâng cao sức khỏe con người mà còn đẩy lùi bệnh tật, đáp ứng yêu cầu tự điều trị của các lứa tuổi và phù hợp với tình trạng sức khỏe khác nhau của từng cá nhân.',
      },
      {
        name: 'CJ InnerB Official Store',
        url: 'https://youmedstore.vn/media/avatar/innerb-logo-300.jpg',
        title: 'INNERB - Chăm da khỏe đẹp từ bên trong',
        description:
          'INNEBR thuộc tập đoàn CJ Cheiljedang Hàn Quốc với 60 năm nghiên cứu các thành phần thực phẩm phù hợp nhất với phụ nữ có nhu cầu chăm sóc da. Sản phẩm được chứng nhận an toàn từ Cục quản lý thực phẩm dược phẩm Hàn Quốc – KFDA. InnerB theo đuổi vẻ đẹp từ bên trong với các dòng sản phẩm chăm sóc da được định phù hợp với hàng triệu người trên khắp Châu Á, giúp bạn tự tin tỏa sáng.',
      },
      {
        name: 'DHC Official Store',
        url: 'https://youmedstore.vn/media/avatar/DhC.jpeg',
        title: 'DHC - Chuyên gia chăm sóc sức khỏe và sắc đẹp',
        description:
          'DHC là thương hiệu đến từ Nhật Bản với hơn 50 năm kinh nghiệm trong lĩnh vực chăm sóc sức khỏe và sắc đẹp. DHC cam kết cung cấp các sản phẩm chất lượng cao, an toàn và hiệu quả cho khách hàng.',
      },
      {
        name: 'Partner 1',
        url: 'https://via.placeholder.com/150',
        title: 'BWELL - Thương hiệu đáng tin cậy từ Thụy Sĩ',
      },
      {
        name: 'Partner 1',
        url: 'https://via.placeholder.com/150',
        title: 'BWELL - Thương hiệu đáng tin cậy từ Thụy Sĩ',
      },
    ],
  },
  {
    id: 2,
    name: 'Hotdeal',
    items: [
      {
        name: 'Sữa FontActiv Complete 400 gram – Dinh dưỡng cho người ốm yếu và mệt mỏi',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/f/o/font_activ_complete_400g.png',
        price: 385000,
        description:
          'Sữa FontActiv Complete 400 gram – Dinh dưỡng cho người ốm yếu và mệt mỏi\n\n' +
          'Sữa bột FontActiv Complete là một sản phẩm dinh dưỡng được thiết kế đặc biệt để cung cấp các chất dinh dưỡng cho người ốm yếu và mệt mỏi. Sản phẩm này có mục tiêu hỗ trợ tăng cường sức khỏe, bổ sung dinh dưỡng và cung cấp năng lượng cho cơ thể.\n\n' +
          'Các đặc điểm và lợi ích của sữa FontActiv Complete bao gồm:\n\n' +
          '- Bổ sung chất dinh dưỡng: Sữa bột FontActiv Complete chứa các chất dinh dưỡng quan trọng như 100% đạm Whey, carbohydrate, chất béo, vitamin và khoáng chất.\n' +
          '- Dễ tiêu hóa: Sữa bột FontActiv Complete được thiết kế với công thức dễ tiêu hóa, phù hợp cho người có hệ tiêu hóa yếu.\n' +
          '- Hỗ trợ tăng cường sức khỏe: Các chất dinh dưỡng trong sữa bột giúp tái tạo và phục hồi cơ thể, tăng cường hệ miễn dịch.\n' +
          '- Cung cấp năng lượng: Sữa bột cung cấp năng lượng dồi dào giúp vượt qua cảm giác mệt mỏi.\n\n' +
          'Sản phẩm thường được đóng gói trong các lon hoặc hũ có dung tích 400gr và 800gr.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
    ],
  },
  {
    id: 3,
    name: 'Medical equipment',
    items: [
      {
        name: 'Sữa FontActiv Complete 400 gram – Dinh dưỡng cho người ốm yếu và mệt mỏi',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/f/o/font_activ_complete_400g.png',
        price: 385000,
        description:
          'Sữa FontActiv Complete 400 gram – Dinh dưỡng cho người ốm yếu và mệt mỏi\n\n' +
          'Sữa bột FontActiv Complete là một sản phẩm dinh dưỡng được thiết kế đặc biệt để cung cấp các chất dinh dưỡng cho người ốm yếu và mệt mỏi. Sản phẩm này có mục tiêu hỗ trợ tăng cường sức khỏe, bổ sung dinh dưỡng và cung cấp năng lượng cho cơ thể.\n\n' +
          'Các đặc điểm và lợi ích của sữa FontActiv Complete bao gồm:\n\n' +
          '- Bổ sung chất dinh dưỡng: Sữa bột FontActiv Complete chứa các chất dinh dưỡng quan trọng như 100% đạm Whey, carbohydrate, chất béo, vitamin và khoáng chất.\n' +
          '- Dễ tiêu hóa: Sữa bột FontActiv Complete được thiết kế với công thức dễ tiêu hóa, phù hợp cho người có hệ tiêu hóa yếu.\n' +
          '- Hỗ trợ tăng cường sức khỏe: Các chất dinh dưỡng trong sữa bột giúp tái tạo và phục hồi cơ thể, tăng cường hệ miễn dịch.\n' +
          '- Cung cấp năng lượng: Sữa bột cung cấp năng lượng dồi dào giúp vượt qua cảm giác mệt mỏi.\n\n' +
          'Sản phẩm thường được đóng gói trong các lon hoặc hũ có dung tích 400gr và 800gr.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
    ],
  },
  {
    id: 4,
    name: 'Take care',
    items: [
      {
        name: 'Sữa FontActiv Complete 400 gram – Dinh dưỡng cho người ốm yếu và mệt mỏi',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/f/o/font_activ_complete_400g.png',
        price: 385000,
        description:
          'Sữa FontActiv Complete 400 gram – Dinh dưỡng cho người ốm yếu và mệt mỏi\n\n' +
          'Sữa bột FontActiv Complete là một sản phẩm dinh dưỡng được thiết kế đặc biệt để cung cấp các chất dinh dưỡng cho người ốm yếu và mệt mỏi. Sản phẩm này có mục tiêu hỗ trợ tăng cường sức khỏe, bổ sung dinh dưỡng và cung cấp năng lượng cho cơ thể.\n\n' +
          'Các đặc điểm và lợi ích của sữa FontActiv Complete bao gồm:\n\n' +
          '- Bổ sung chất dinh dưỡng: Sữa bột FontActiv Complete chứa các chất dinh dưỡng quan trọng như 100% đạm Whey, carbohydrate, chất béo, vitamin và khoáng chất.\n' +
          '- Dễ tiêu hóa: Sữa bột FontActiv Complete được thiết kế với công thức dễ tiêu hóa, phù hợp cho người có hệ tiêu hóa yếu.\n' +
          '- Hỗ trợ tăng cường sức khỏe: Các chất dinh dưỡng trong sữa bột giúp tái tạo và phục hồi cơ thể, tăng cường hệ miễn dịch.\n' +
          '- Cung cấp năng lượng: Sữa bột cung cấp năng lượng dồi dào giúp vượt qua cảm giác mệt mỏi.\n\n' +
          'Sản phẩm thường được đóng gói trong các lon hoặc hũ có dung tích 400gr và 800gr.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
    ],
  },
  {
    id: 5,
    name: 'Treatment support',
    items: [
      {
        name: 'Sữa FontActiv Complete 400 gram – Dinh dưỡng cho người ốm yếu và mệt mỏi',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/f/o/font_activ_complete_400g.png',
        price: 385000,
        description:
          'Sữa FontActiv Complete 400 gram – Dinh dưỡng cho người ốm yếu và mệt mỏi\n\n' +
          'Sữa bột FontActiv Complete là một sản phẩm dinh dưỡng được thiết kế đặc biệt để cung cấp các chất dinh dưỡng cho người ốm yếu và mệt mỏi. Sản phẩm này có mục tiêu hỗ trợ tăng cường sức khỏe, bổ sung dinh dưỡng và cung cấp năng lượng cho cơ thể.\n\n' +
          'Các đặc điểm và lợi ích của sữa FontActiv Complete bao gồm:\n\n' +
          '- Bổ sung chất dinh dưỡng: Sữa bột FontActiv Complete chứa các chất dinh dưỡng quan trọng như 100% đạm Whey, carbohydrate, chất béo, vitamin và khoáng chất.\n' +
          '- Dễ tiêu hóa: Sữa bột FontActiv Complete được thiết kế với công thức dễ tiêu hóa, phù hợp cho người có hệ tiêu hóa yếu.\n' +
          '- Hỗ trợ tăng cường sức khỏe: Các chất dinh dưỡng trong sữa bột giúp tái tạo và phục hồi cơ thể, tăng cường hệ miễn dịch.\n' +
          '- Cung cấp năng lượng: Sữa bột cung cấp năng lượng dồi dào giúp vượt qua cảm giác mệt mỏi.\n\n' +
          'Sản phẩm thường được đóng gói trong các lon hoặc hũ có dung tích 400gr và 800gr.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
    ],
  },
  {
    id: 6,
    name: 'Nutrition',
    items: [
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
    ],
  },
  {
    id: 7,
    name: 'Beauty care',
    items: [
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
      {
        name: 'Máy đo huyết áp cổ tay B.Well Swiss PRO-39',
        url: 'https://youmedstore.vn/media/catalog/product/cache/9deded0f4ad69d3264c78b97af1f2ca9/m/_/m_y_o_huy_t_p_c_tay_b.well_swiss_pro-39.jpg',
        price: 675000,
        description:
          'Máy đo huyết áp cổ tay B.Well Swiss PRO-39\n\n' +
          'Sản phẩm máy đo huyết áp Swiss Pro-39 của B.well tuân thủ tiêu chuẩn chất lượng cao của Châu Âu và cung cấp độ chính xác cao. Với thiết kế đơn giản và gọn gàng, dễ dàng theo dõi huyết áp ở mọi nơi.\n\n' +
          '- Công nghệ PAD: Phát hiện rối loạn nhịp tim.\n' +
          '- Công nghệ Intellect Classic: Đảm bảo độ chính xác khi đo huyết áp.\n' +
          '- Lưu kết quả đo cuối cùng.\n' +
          '- Nhỏ gọn và di động.\n' +
          '- Tự động tắt nguồn khi không sử dụng.\n\n' +
          'Máy đo huyết áp cổ tay B.Well Swiss bảo hành 05 năm.',
      },
    ],
  },
];

const ProductSection = ({title, onPress, children, onLayout, item}) => (
  <View key={title} onLayout={onLayout} style={{rowGap: scale(10)}}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(16),
      }}>
      <CText
        style={{fontSize: SIZES.xMedium, color: COLORS.White}}
        textType="bold">
        {title}
      </CText>
      <Button.Icon
        Icon={IconRight}
        fill={COLORS.White}
        onPress={() => onPress(item)}
      />
    </View>
    {children}
  </View>
);
export const HomeProductScreen = () => {
  const {token} = useAuthentication();
  const {t} = useLanguage();
  const [search, setSearch] = useState('');
  const {navigate} = useNavigation();
  const onChangeText = useCallback(text => {
    setSearch(text);
  }, []);

  // const {data, isLoading} = useQuery({
  //   queryKey: [...getListProduct.queryKey, {keyword: search}],
  //   queryFn: () => getListProduct({keyword: search}),
  // });

  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [sectionsLayout, setSectionsLayout] = useState([]); // Lưu vị trí của các section

  // Hàm xử lý khi cuộn đến mục nào
  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
      listener: event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        let newActiveIndex = activeNavIndex;

        sectionsLayout.forEach((layout, index) => {
          if (offsetY + 100 >= layout.top && offsetY < layout.bottom) {
            newActiveIndex = index;
          }
        });

        if (newActiveIndex !== activeNavIndex) {
          setActiveNavIndex(newActiveIndex);
        }
      },
    },
  );

  // Hàm xử lý scroll đến một section cụ thể
  const handleScrollTo = useCallback(
    index => {
      if (scrollViewRef.current && sectionsLayout[index]) {
        scrollViewRef.current.scrollTo({
          y: sectionsLayout[index].top,
          animated: true,
        });
      }
    },
    [sectionsLayout],
  );

  // Hàm lưu vị trí của mỗi section
  const onSectionLayout = (event, index) => {
    const layout = event.nativeEvent.layout;
    setSectionsLayout(prev => {
      const newLayouts = [...prev];
      newLayouts[index] = {top: layout.y, bottom: layout.y + layout.height};
      return newLayouts;
    });
  };
  const listNavBar = useMemo(
    () => [
      {name: t('TobeCare partner shop')},
      {name: t('Hotdeal')},
      {name: t('Medical equipment')},
      {name: t('Take Care')},
      {name: t('Treatment support')},
      {name: t('Nutrition')},
      {name: t('Beauty care')},
    ],
    [t],
  );

  const sections = [
    {title: t('TobeCare partner shop'), key: 'section1', isPartner: true},
    {title: t('Hotdeal'), key: 'section2'},
    {title: t('Medical equipment'), key: 'section3'},
    {title: t('Take Care'), key: 'section4'},
    {title: t('Treatment support'), key: 'section5'},
    {title: t('Nutrition'), key: 'section6'},
    {title: t('Beauty care'), key: 'section7'},
  ];

  const listView = useMemo(() => {
    return [
      <View
        style={{
          rowGap: scale(20),
          paddingBottom: scale(100),
          paddingTop: scale(10),
        }}>
        {sections.map((section, index) => (
          <ProductSection
            key={section.key}
            title={section.title}
            onLayout={event => onSectionLayout(event, index)}
            item={fake[index]}
            onPress={item => {
              if (index !== 0) {
                navigate('NoBottomTab', {
                  screen: 'SeeAllProductScreen',
                  params: item,
                });
              } else {
                navigate('NoBottomTab', {
                  screen: 'SeeAllShopScreen',
                  params: item,
                });
              }
            }}>
            {section.isPartner ? (
              <PartnerItem data={fake[index]} isLoading={false} />
            ) : (
              <ProductItem data={fake[index]} isLoading={false} />
            )}
          </ProductSection>
        ))}
      </View>,
    ];
  }, [t, navigate, onSectionLayout, fake]);

  const goShopping = () => {
    if (!!token) {
      navigate('NoBottomTab', {
        screen: 'ShoppingCartScreen',
      });
    } else {
      navigate('NavigationAuth', {
        screen: 'LoginScreen',
      });
    }
  };
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      scrollEnabled={false}
      headerTitle={'Medical products'}
      optionsHeader={{
        headerTitleStyle: {
          textAlign: 'left',
        },
        headerStyle: {
          paddingBottom: 0,
        },
        headerRight: () => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Button.Icon
                Icon={IconHandShake}
                color={COLORS.White}
                size={scale(25)}
                onPress={() =>
                  navigate('NoBottomTab', {screen: 'CooperateShopManage'})
                }
              />
              <Button.Icon
                Icon={IconShoppingCart}
                color={COLORS.White}
                isCount
                count={1}
                onPress={goShopping}
              />
            </View>
          );
        },
      }}>
      <View style={styles.navBar}>
        <Category
          data={listNavBar}
          isObject
          onPress={(item, index) => handleScrollTo(index)}
          activeNavIndex={activeNavIndex}
          styleButton={{borderRadius: scale(5)}}
          styleWrapper={{paddingHorizontal: scale(10)}}
          styleContent={{paddingHorizontal: scale(10)}}
        />
      </View>

      {/* Nội dung cuộn */}
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent} // Thêm style này
      >
        {listView}
      </Animated.ScrollView>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: scale(20),
  },
  scrollViewContent: {
    paddingBottom: scale(100), // Thêm padding bottom để đảm bảo có thể scroll đến cuối
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchIcon: {
    width: scale(20),
    height: scale(21),
    // marginLeft: scale(338),
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    height: scale(100),
    padding: scale(16),
    justifyContent: 'center',
    // backgroundColor: colors.WHITE,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(12),
    backgroundColor: COLORS.BlueSemi,
    height: scale(120),
    marginTop: scale(35),
  },
  input: {
    color: COLORS.greyBold,
  },
  searchIconSecond: {
    width: scale(19),
    height: scale(20),
  },
  imageBG: {
    flex: 1,
    justifyContent: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: scale(15),
    borderBottomWidth: 1,
    borderColor: COLORS.input,
  },
  navText: {
    fontSize: scale(16),
    color: 'gray', // Màu mặc định khi không active
  },
  activeNavText: {
    color: 'blue', // Màu khi active
    fontWeight: 'bold',
  },
});
