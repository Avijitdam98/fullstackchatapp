import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-base-300 bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-100 rounded-t-xl shadow-md">
      <div className="flex items-center justify-between space-x-4">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-xl text-gray-800">
              {selectedUser.fullName}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              {onlineUsers.includes(selectedUser._id) ? (
                <>
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>{" "}
                  Online
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>{" "}
                  Offline
                </>
              )}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <X className="text-gray-600 hover:text-gray-900 transition-all duration-200" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
