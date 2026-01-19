import type { LoaderFunctionArgs } from "react-router";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function loader({ params }: LoaderFunctionArgs) {
    const file = params.file;
    if (!file) {
        throw new Response("Not Found", { status: 404 });
    }

    const filePath = path.join(
        process.cwd(),
        "public",
        "images",
        file
    );

    try {
        const data = await readFile(filePath);
        return new Response(data, {
            headers: {
                "Content-Type": "image/png",
            },
        });
    } catch {
        throw new Response("Not Found", { status: 404 });
    }
}
