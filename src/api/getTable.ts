import z from "zod";

const CountryDataSchema = z.object({
  year: z.number(),
  population: z.number().optional(),
  cement_co2: z.number(),
  cement_co2_per_capita: z.number().optional(),
  cumulative_cement_co2: z.number(),
});

const CountrySchema = z.object({
  iso_code: z.string(),
  data: z.array(CountryDataSchema),
});

const ApiResponseSchema = z.array(CountrySchema);

type Country = z.infer<typeof CountrySchema>;

export async function getTable(): Promise<Country[]> {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/wingedseraph/dump/refs/heads/gh-pages/assets/owid-co2-data.json?raw=true"
    );
    const result: unknown = await response.json();

    const validatedData = ApiResponseSchema.parse(result);

    return validatedData;
  } catch (error) {
    console.error(error);

    return [];
  }
}
