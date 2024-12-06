<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\CollegePOC;
use App\Models\LeadPOC;
use App\Models\EIEHead;
use App\Models\ESLPrime;
use App\Models\ESLChampion;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Handle user login.
     */
    public function login(Request $request)
    {
        try {
            // Validate the incoming request
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
                'user_type' => 'required|string|in:students,college_pocs,lead_pocs,eie_heads,esl_prime,esl_champion',
            ]);

            // Retrieve input data
            $email = $request->input('email');
            $password = $request->input('password');
            $userType = $request->input('user_type');

            // Get the user based on the type and email
            $user = $this->getUserByType($userType, $email);

            // Log the login attempt (Remove sensitive info once debugging is done)
            Log::debug("Login attempt: Email - " . $email . " User Type - " . $userType);

            // If no user is found, log and return an error
            if (!$user) {
                Log::warning("Login failed: User not found for email: $email and user type: $userType");
                return response()->json(['error' => 'User not found'], 404);
            }

            // Check the user's password (use Hash::check for hashed passwords)
            if (!$this->checkPassword($user, $password)) {
                Log::warning("Login failed: Invalid credentials for user type: $userType with email: $email");
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            // Create a token for the authenticated user
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json(['token' => $token, 'user' => $user], 200);
        } catch (\Exception $e) {
            // Log the error if something goes wrong
            Log::error("Login Error: " . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Get the user by their type and email.
     */
    private function getUserByType($userType, $email)
    {
        switch ($userType) {
            case 'students':
                return Student::where('email', $email)->first();
            case 'college_pocs':
                return CollegePOC::where('email', $email)->first();
            case 'lead_pocs':
                return LeadPOC::where('email', $email)->first();
            case 'eie_heads':
                return EIEHead::where('email', $email)->first();
            case 'esl_prime':
                return ESLPrime::where('email', $email)->first();
            case 'esl_champion':
                return ESLChampion::where('email', $email)->first();
            default:
                return null;
        }
    }

    /**
     * Check if the provided password is correct.
     */
    private function checkPassword($user, $password)
    {
        // If the user has a hashed password, check using Hash::check
        if (!empty($user->password)) {
            return Hash::check($password, $user->password); // Compare hashed password
        }

        // If password column is empty, fall back to checking student_id (or another method)
        // Example: Assuming the password is the same as the student_id, adjust as necessary.
        return false; // or return trim($user->student_id) === trim($password);
    }

    /**
     * Handle user logout.
     */
    public function logout(Request $request)
    {
        // Delete the user's current access token
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
