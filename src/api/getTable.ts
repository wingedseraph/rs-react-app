import { ApiResponseSchema, type Countries } from "@/lib/apiTypes";

export async function getTable(): Promise<Countries> {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/wingedseraph/dump/refs/heads/gh-pages/assets/owid-co2-data.json?raw=true"
    );
    const result: unknown = await response.json();

    const validatedData = ApiResponseSchema.parse(result);

    const countryNames = Object.keys(validatedData);
    const countriesOnly = Object.fromEntries(
      countryNames
        .filter((name) => validatedData[name].iso_code)
        .map((name) => [name, validatedData[name]])
    );

    return countriesOnly;
  } catch (error) {
    console.error(error);

    return {};
  }
}
