export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Create Account</h1>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="text"
            placeholder="Email"
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl"
          />

          <button className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
   