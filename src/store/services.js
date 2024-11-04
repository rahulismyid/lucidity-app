export const fetchProductsService = async () => {
  const response = await fetch(
    "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory" // can use base url from env file
  );
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return await response.json();
};
