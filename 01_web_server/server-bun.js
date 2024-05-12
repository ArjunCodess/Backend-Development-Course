import { serve } from 'bun';

serve({
    fetch(request) {
        const url = new URL(request.url);

        if (url.pathname === '/') {
            return new Response('Hello World', { status: 200 });
        } else if (url.pathname === '/backend') {
            return new Response('Backend', { status: 200 });
        } else {
            return new Response('Error 404: What Are You Doing Here?', { status: 404 });
        };
    },
    port: 3000,
    hostname: '127.0.0.1'
});