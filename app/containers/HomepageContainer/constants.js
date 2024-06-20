export const GET_USER_CARS = 'HOMEPAGECONTAINER/GET_USER_CARS';
export const GET_USER_CARS_SUCCESS = 'HOMEPAGECONTAINER/GET_USER_CARS_SUCCESS';
export const GET_USER_CARS_FAILURE = 'HOMEPAGECONTAINER/GET_USER_CARS_FAILURE';

export const ADD_CAR = 'HOMEPAGECONTAINER/ADD_CAR';
export const ADD_CAR_SUCCESS = 'HOMEPAGECONTAINER/ADD_CAR_SUCCESS';
export const ADD_CAR_FAILURE = 'HOMEPAGECONTAINER/ADD_CAR_FAILURE';

export const DELETE_CAR = 'HOMEPAGECONTAINER/DELETE_CAR';
export const DELETE_CAR_SUCCESS = 'HOMEPAGECONTAINER/DELETE_CAR_SUCCESS';
export const DELETE_CAR_FAILURE = 'HOMEPAGECONTAINER/DELETE_CAR_FAILURE';

export const UPDATE_CAR = 'HOMEPAGECONTAINER/UPDATE_CAR';
export const UPDATE_CAR_SUCCESS = 'HOMEPAGECONTAINER/UPDATE_CAR_SUCCESS';
export const UPDATE_CAR_FAILURE = 'HOMEPAGECONTAINER/UPDATE_CAR_FAILURE';

export const GET_PLUGS = 'HOMEPAGECONTAINER/GET_PLUGS';
export const GET_PLUGS_SUCCESS = 'HOMEPAGECONTAINER/GET_PLUGS_SUCCESS';
export const GET_PLUGS_FAILURE = 'HOMEPAGECONTAINER/GET_PLUGS_FAILURE';

export const GET_STATIONS = 'HOMEPAGECONTAINER/GET_STATIONS';
export const GET_STATIONS_SUCCESS = 'HOMEPAGECONTAINER/GET_STATIONS_SUCCESS';
export const GET_STATIONS_FAILURE = 'HOMEPAGECONTAINER/GET_STATIONS_FAILURE';

export const GET_CHARTS_DATA = 'HOMEPAGECONTAINER/GET_CHARTS_DATA';
export const GET_CHARTS_DATA_SUCCESS =
  'HOMEPAGECONTAINER/GET_CHARTS_DATA_SUCCESS';
export const GET_CHARTS_DATA_FAILURE =
  'HOMEPAGECONTAINER/GET_CHARTS_DATA_FAILURE';

export const BOOKING_TYPES = [
  'Type 1 (SAE J1772)',
  'Type 2 (Mennekes)',
  'CCS Type 1',
  'CCS Type 2',
  'CHAdeMO',
  'GB/T',
  'Tesla Connector',
];

export const pieChartOptions = {
  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  },
};

export const barChartOptionsDailyTraffic = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
      },
    },
    theme: 'dark',
  },
  xaxis: {
    categories: ['L', 'M', 'Mi', 'J', 'V', 'S', 'D'],
    show: false,
    labels: {
      show: true,
      style: {
        colors: '#A3AED0',
        fontSize: '14px',
        fontWeight: '500',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: 'black',
    labels: {
      show: true,
      style: {
        colors: '#CBD5E0',
        fontSize: '14px',
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: '#4318FF',
            opacity: 1,
          },
          {
            offset: 100,
            color: 'rgba(67, 24, 255, 1)',
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: '48rem',
    },
  },
};

export const lineChartOptionsOverallRevenue = {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: '#4318FF',
    },
  },
  colors: ['#4318FF', '#39B8FF'],
  markers: {
    size: 0,
    colors: 'white',
    strokeColors: '#7551FF',
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: 'circle',
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    theme: 'dark',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    type: 'line',
  },
  xaxis: {
    type: 'numeric',
    categories: [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ],
    labels: {
      style: {
        colors: '#A3AED0',
        fontSize: '12px',
        fontWeight: '500',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
    column: {
      color: ['#7551FF', '#39B8FF'],
      opacity: 0.5,
    },
  },
  color: ['#7551FF', '#39B8FF'],
};
