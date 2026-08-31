interface Capital {
  name: string;
}

interface Currency {
  name: string;
  symbol: string;
}

interface NativeNameOfCountry {
  common: string;
  official: string;
}

export interface Country {
  names: {
    common: string;
    native: Record<string, NativeNameOfCountry>;
  };
  links: {
    google_maps: string;
  };
  flag: {
    url_png: string;
  };
  timezones: string[];
  subregion: string;
  borders: string[];
  capitals: Capital[];
  currencies: Currency[];
  landlocked: boolean;
  region: string;
  area: {
    kilometers: number;
  };
  population: number;
}

interface CountriesResponse {
  data: {
    objects: Country[];
  };
}

export const fetchCountries = async (
  inputVal: string,
  controller: AbortController,
): Promise<Country[]> => {
  const baseUrl = process.env.REACT_APP_BASEURL;
  if (!baseUrl) {
    throw new Error("Base URL is not defined");
  }
  const url = new URL(baseUrl);
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
  const response: CountriesResponse = await res.json();
  return response.data.objects;
};
