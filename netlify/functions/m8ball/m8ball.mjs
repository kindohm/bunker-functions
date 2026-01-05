"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (request, context) => {
    try {
        const url = new URL(request.url);
        const subject = url.searchParams.get("name") || "World";
        return new Response(`Hello ${subject}`);
    }
    catch (error) {
        // @ts-expect-error its fine
        return new Response(error.toString(), {
            status: 500,
        });
    }
};
