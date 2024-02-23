import {images} from '../assets/constants';

export const markers = [
  {
    coordinate: {
      latitude: 22.6293867,
      longitude: 88.4354486,
    },
    title: 'Amazing Food Place',
    description: 'This is the best food place',
    image: images.background,
    rating: 4,
    reviews: 99,
    price: 100000,
  },
  {
    coordinate: {
      latitude: 22.5345648,
      longitude: 88.4377279,
    },
    title: 'Second Amazing Food Place',
    description: 'This is the second best food place',
    image: images.wishList,
    rating: 5,
    reviews: 102,
    price: 50000,
  },
  {
    coordinate: {
      latitude: 22.6281662,
      longitude: 88.4410113,
    },
    title: 'Third Amazing Food Place',
    description: 'This is the third best food place',
    image: images.emptyData,
    rating: 3,
    reviews: 220,
    price: 200000,
  },
  {
    coordinate: {
      latitude: 22.6341137,
      longitude: 88.4497463,
    },
    title: 'Fourth Amazing Food Place',
    description: 'This is the fourth best food place',
    image: images.voucher25,
    rating: 4,
    reviews: 48,
    price: 9000000,
  },
  {
    coordinate: {
      latitude: 22.6292757,
      longitude: 88.444781,
    },
    title: 'Fifth Amazing Food Place',
    description: 'This is the fifth best food place',
    image: images.voucher50,
    rating: 4,
    reviews: 178,
    price: 1000000,
  },
];

export const mapDarkStyle = [
  {
    zoom: 15,
    center: {lat: 2.924793, lng: 101.651487},
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242633'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#B9D0DB'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#B9D0DB'}],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#B9D0DB'}],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#33354F'}],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#00C4FF'}],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}],
      },
    ],
  },
];

export const mapStandardStyle = [
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
