import z from "zod";

const CountryDataSchema = z.object({
  year: z.number(),
  population: z.number().optional(),
  cement_co2: z.number().optional(),
  cement_co2_per_capita: z.number().optional(),
  cumulative_cement_co2: z.number().optional(),
  total_ghg: z.number().optional(),
  total_ghg_excluding_lucf: z.number().optional(),
});

const CountrySchema = z.object({
  iso_code: z.string().optional(),
  data: z.array(CountryDataSchema),
});

export const ApiResponseSchema = z.record(z.string(), CountrySchema);

export type Country = z.infer<typeof CountrySchema>;
export type Countries = z.infer<typeof ApiResponseSchema>;
