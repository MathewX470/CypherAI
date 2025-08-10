import { Link, useLocation, useNavigate } from "react-router-dom";
import "./chatList.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";

const ChatList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  // Get current chat ID from URL
  const currentChatId = location.pathname.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (chatId) =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        method: "DELETE",
        credentials: "include",
      }),
    onSuccess: (data, deletedChatId) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      toast.success("Chat deleted successfully!");
      setShowDeleteModal(false);
      setChatToDelete(null);

      // If we're currently viewing the deleted chat, redirect to dashboard
      if (currentChatId === deletedChatId) {
        navigate("/dashboard");
      }
    },
    onError: () => {
      toast.error("Failed to delete chat. Please try again.");
      setShowDeleteModal(false);
      setChatToDelete(null);
    },
  });

  // Delete handler - opens modal
  const handleDelete = (e, chatId, chatTitle) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling

    setChatToDelete({ id: chatId, title: chatTitle });
    setShowDeleteModal(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (chatToDelete) {
      deleteMutation.mutate(chatToDelete.id);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setChatToDelete(null);
  };

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore Lama AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
              <div className="chat-item" key={chat._id}>
                <Link to={`/dashboard/chats/${chat._id}`} className="chat-link">
                  {chat.title}
                </Link>
                <button
                  onClick={(e) => handleDelete(e, chat._id, chat.title)}
                  className="delete-btn"
                  disabled={deleteMutation.isPending}
                  title="Delete chat"
                >
                  🗑️
                </button>
              </div>
            ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to Lama AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Chat</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete{" "}
                <strong>"{chatToDelete?.title}"</strong>?
              </p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button
                onClick={cancelDelete}
                className="cancel-btn"
                disabled={deleteMutation.isPending}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="confirm-delete-btn"
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatList;
