import createDecorator from 'final-form-calculate';

const density_for_count = ({
  weight_for_count,
  length_for_count,
  width,
}) => ((weight_for_count && length_for_count && width)
  ? parseInt(weight_for_count / length_for_count / width * 100) : null);

const meters_in_roll = ({
  weight,
  density,
  width,
}) => ((weight && density && width)
  ? (weight * 100000 / density / width).toFixed(2) : null);

const price_rub_m = ({
  dollar_price = 0,
  dollar_rate = 0,
  density = 0,
  width = 0,
}) => dollar_price * dollar_rate * density * width / 100000;

const prices = ({
  PriceCoeffs = [],
  ...rest
}) => PriceCoeffs.reduce(
  (result, coeff) => result += `${coeff}: ${parseInt(price_rub_m(rest) * coeff)} / `,
  '',
);

export const calculator = createDecorator({
  field: 'weight_for_count',
  updates: {
    density_for_count: (weight_for_count, {
      length_for_count,
      width,
    }) => density_for_count({
      weight_for_count,
      length_for_count,
      width,
    }),
  },
}, {
  field: 'length_for_count',
  updates: {
    density_for_count: (length_for_count, {
      weight_for_count,
      width,
    }) => density_for_count({
      weight_for_count,
      length_for_count,
      width,
    }),
  },
}, {
  field: 'width',
  updates: {
    density_for_count: (width, {
      weight_for_count,
      length_for_count,
    }) => density_for_count({
      weight_for_count,
      length_for_count,
      width,
    }),
    meters_in_roll: (width, {
      weight,
      density,
    }) => meters_in_roll({
      weight,
      density,
      width,
    }),
    prices: (width, {
      dollar_price,
      dollar_rate,
      density,
      Consts: {
        PriceCoeffs,
      },
    }) => prices({
      dollar_price,
      dollar_rate,
      density,
      width,
      PriceCoeffs,
    }),
  },
}, {
  field: 'weight',
  updates: {
    meters_in_roll: (weight, {
      density,
      width,
    }) => meters_in_roll({
      weight,
      density,
      width,
    }),
  },
}, {
  field: 'density',
  updates: {
    meters_in_roll: (density, {
      weight,
      width,
    }) => meters_in_roll({
      weight,
      density,
      width,
    }),
    prices: (density, {
      dollar_price,
      dollar_rate,
      width,
      Consts: {
        PriceCoeffs,
      },
    }) => prices({
      dollar_price,
      dollar_rate,
      density,
      width,
      PriceCoeffs,
    }),
  },
}, {
  field: 'dollar_price',
  updates: {
    prices: (dollar_price, {
      dollar_rate,
      density,
      width,
      Consts: {
        PriceCoeffs,
      },
    }) => prices({
      dollar_price,
      dollar_rate,
      density,
      width,
      PriceCoeffs,
    }),
  },
}, {
  field: 'dollar_rate',
  updates: {
    prices: (dollar_rate, {
      dollar_price,
      density,
      width,
      Consts: {
        PriceCoeffs,
      },
    }) => prices({
      dollar_price,
      dollar_rate,
      density,
      width,
      PriceCoeffs,
    }),
  },
});
