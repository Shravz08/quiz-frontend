export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Your Profile</h2>

        <div className="space-y-4">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
        </div>

        <button className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
