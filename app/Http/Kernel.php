<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    protected $middleware = [
        // Handle CORS (Cross-Origin Resource Sharing)
        \Fruitcake\Cors\HandleCors::class,

        // Trust proxies if your application is behind a load balancer or proxy.
        \App\Http\Middleware\TrustProxies::class,

        // Handle HTTP-to-HTTPS redirection.
        \Illuminate\Http\Middleware\RedirectIfAuthenticated::class,

        // Ensure requests are using the correct URL scheme.
        \Illuminate\Http\Middleware\SetCacheHeaders::class,

        // Prevent invalid POST requests.
        \App\Http\Middleware\PreventRequestsDuringMaintenance::class,

        // Handle large file uploads.
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,

        // Check for cross-site request forgery (CSRF).
        \App\Http\Middleware\CheckForMaintenanceMode::class,

        // Convert requests into array format.
        \Illuminate\Foundation\Http\Middleware\TransformsRequest::class,

        // Automatically trim extra spaces from input.
        \App\Http\Middleware\TrimStrings::class,

        // Convert empty strings into null.
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,

        \App\Http\Middleware\CorsMiddleware::class,
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        // Middleware for the "web" routes.
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            // \Illuminate\Session\Middleware\AuthenticateSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        // Middleware for the "api" routes.
        'api' => [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        'throttle:api',
        \Illuminate\Routing\Middleware\ThrottleRequests::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    protected $routeMiddleware = [
        // Ensures authenticated users.
        'auth' => \App\Http\Middleware\Authenticate::class,

        // Authenticate via API token.
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,

        // Ensure users are a guest (not authenticated).
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,

        // Verify email for users.
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,

        // Ensure users have specific roles or permissions.
        'role' => \Spatie\Permission\Middlewares\RoleMiddleware::class,

        // Throttle API requests.
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,

        // Verify signed URLs.
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,

        // Handle CORS.
        'cors' => \Fruitcake\Cors\HandleCors::class,

        // Sanctum middleware for authenticating API tokens.
        'auth:sanctum' => \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    ];
}
