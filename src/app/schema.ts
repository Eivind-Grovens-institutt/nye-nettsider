import {z } from "zod";

export const BookSchema = z.object({
        title: z.string(),
        authors: z.string().array(),
        editors: z.string().array(),
        text: z.array(z.object({})),
        image: z.object({}),
        year: z.number(),
        url: z.string(),
        file: z.object({}),
});
