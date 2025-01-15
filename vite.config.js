import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, 'resources/js/assets'),
            '@services': path.resolve(__dirname, 'resources/services'),
            '@user-info': path.resolve(__dirname, 'resources/js/components/user_info'),
            '@logout': path.resolve(__dirname, 'resources/js/components/Logout'),
        },
    },
});
