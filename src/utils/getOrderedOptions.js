export const getOrderedOptions = (possibleOptions) => {
  const uniqueCountryOptions = [];
  const repeatedCountryOptions = [];
  possibleOptions.forEach(option => {
    let included = false;
    for (const unique of uniqueCountryOptions) {
      if (unique.country === option.country) included = true;
    };
    included ? repeatedCountryOptions.push(option) : uniqueCountryOptions.push(option);
  });
  return uniqueCountryOptions.concat(repeatedCountryOptions);
};