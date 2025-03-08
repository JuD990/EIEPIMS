<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Students;
use App\Models\CollegePOCs;
use App\Models\LeadPOCs;
use App\Models\EIEHeads;
use App\Models\ESLadmins;
use App\Models\ClassLists;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Session;

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

            // Log the login attempt
            Log::debug("Login attempt: Email - " . $email . " User Type - " . $userType);

            // If no user is found, log and return an error
            if (!$user) {
                Log::warning("Login failed: User not found for email: $email and user type: $userType");
                return response()->json(['error' => 'User not found'], 404);
            }

            // Check the user's password (use Hash::check for hashed passwords)
            if (!$this->checkPassword($user, $password)) {
                Log::warning("Login failed: Invalid credentials for user type: $userType with email: $email", [
                    'email' => $email,
                    'user_type' => $userType
                ]);
                Log::warning("Expected password", ['password' => $password]); // Log the password securely if needed (avoid this in production)
                return response()->json(['error' => 'Invalid credentials'], 401);
            }


            // Create a token for the authenticated user
            $token = $user->createToken('authToken')->plainTextToken;

            // Create a session record
            $sessionId = Str::uuid(); // Generate a unique session ID
            Session::create([
                'id' => $sessionId,
                'user_id' => $user->id,
                'ip_address' => $request->ip(),
                            'user_agent' => $request->userAgent(),
                            'payload' => json_encode($user),
                            'last_activity' => time(),
            ]);

            // Return employee_id or student_id along with token and user info
            return response()->json([
                'token' => $token,
                'user' => $user,
                'session_id' => $sessionId,
                'employee_id' => $user->employee_id ?? null, // For non-students
                'student_id' => $user->student_id ?? null,   // For students, if available
            ], 200);
        } catch (\Exception $e) {
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
                return Students::where('email', $email)->first();
            case 'college_pocs':
                return CollegePOCs::where('email', $email)->first();
            case 'lead_pocs':
                return LeadPOCs::where('email', $email)->first();
            case 'eie_heads':
                return EIEHeads::where('email', $email)->first();
            case 'esl_prime':
                return ESLadmins::where('email', $email)->first();
            case 'esl_champion':
                return ESLadmins::where('email', $email)->first();
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

        // If the password column is empty, compare the password with the student_id
        if (empty($user->password) && isset($user->student_id)) {
            return trim($user->student_id) === trim($password); // Compare with student_id if no password is set
        }

        return false; // Return false if password is not valid or not found
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

    public function getUserInfo(Request $request)
    {
        $user = $request->user();
        $studentId = $user->student_id ?? null;
        $yearLevel = null;

        if ($user->role === 'student' && $studentId) {
            // Fetch latest year_level from ClassLists
            $classList = ClassLists::where('student_id', $studentId)
            ->orderByDesc('updated_at')
            ->first();

            if ($classList) {
                $yearLevel = $classList->year_level;
                Log::info("✅ Year Level Found in ClassLists", ['student_id' => $studentId, 'year_level' => $yearLevel]);
            }

            // If ClassLists does not have year_level, fetch from Students
            if (!$yearLevel) {
                $student = Students::where('student_id', $studentId)->first();
                if ($student) {
                    $yearLevel = $student->year_level;
                    Log::info("✅ Year Level Found in Students Table", ['student_id' => $studentId, 'year_level' => $yearLevel]);
                } else {
                    Log::info("❌ No year_level found for student_id: " . $studentId);
                }
            }
        }

        return response()->json([
            'name' => $user->firstname . ' ' . $user->lastname,
            'role' => $user->role ?? $request->input('user_type'),
                                'employee_id' => $user->employee_id,
                                'department' => $user->department ?? '',
                                'student_id' => $studentId,
                                'year_level' => $yearLevel ?? '', // Change this to check response
        ]);
    }

}
