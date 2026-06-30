export const fetchCountries = async (inputVal, controller) => {
  const url = new URL(process.env.REACT_APP_BASEURL);
  url.searchParams.set("q", inputVal.toString());
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    signal: controller.signal,
  });
  if (!res.ok) {
    throw new Error();
  }
  const response = await res.json();
  return response.data.objects;
};
