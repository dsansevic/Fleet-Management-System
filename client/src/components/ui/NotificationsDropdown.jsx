import { useState, useEffect } from "react";
import { apiClient } from "@api/apiClient";
import { BellIcon, CheckIcon } from "@heroicons/react/20/solid";
import { formatDate } from "@utils/formatDate";
import { useAuthContext } from "@hooks/useAuthContext";

const NotificationsDropdown = () => {
  const { user } = useAuthContext();
  const isAdmin = user?.role === "admin";

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const url = isAdmin ? "/notification" : "/notification/user";
      const response = await apiClient.get(url);
      setNotifications(response.data.data || []);
    } catch (err) {
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiClient.patch("/notification/read-all");
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await apiClient.patch(`/notification/${id}/read`);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="relative p-0">
        <BellIcon className="h-10 w-10 p-0 text-brand-dark hover:text-brand-dark_hover cursor-pointer" />
        {(notifications || []).some((n) => !n.read) && (
          <span className="absolute top-0 right-1 flex items-center justify-center w-5 h-5 bg-error text-white text-xs font-bold rounded-full">
            {(notifications || []).filter((n) => !n.read).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-base shadow-lg z-50">
          <div className="p-3 font-bold text-white bg-brand-dark rounded-t-2xl flex justify-between items-center">
            <span>Notifications</span>
            {isAdmin && notifications.length > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-purple-200 hover:text-brand-light+"
              >
                Mark all as read
              </button>
            )}
          </div>

          {loading ? (
            <p className="p-3 text-gray-600">Loading...</p>
          ) : error ? (
            <p className="p-3 text-red-600">{error}</p>
          ) : notifications.length === 0 ? (
            <p className="p-3 text-gray-600">No new notifications.</p>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {notifications.map((notification) => (
                <li
                  key={notification._id}
                  className={`p-3 border-b text-sm flex justify-between items-center ${
                    notification.read
                      ? "text-gray-500"
                      : "font-semibold text-gray-900 bg-gray-50"
                  } hover:bg-gray-100 transition-all duration-200`}
                >
                  <div>
                    {notification.message}
                    <span className="block text-xs text-gray-400">
                      {formatDate(notification.createdAt)}
                    </span>
                  </div>

                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      className="ml-2 text-green-600 hover:text-green-800"
                      title="Mark as read"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
