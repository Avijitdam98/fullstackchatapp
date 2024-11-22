import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-gray-800 rounded-b-lg shadow-lg">
      {/* Image preview section */}
      {imagePreview && (
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-lg border-2 border-gray-600"
            />
            <button
              onClick={removeImage}
              className="absolute top-0 right-0 bg-gray-900 text-white rounded-full p-1 hover:bg-gray-700 transition-all"
              type="button"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Input and button form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-4">
        {/* Input container */}
        <div className="flex-1 flex items-center gap-3">
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Image upload button */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`p-3 rounded-full transition-all ${
              imagePreview ? "text-emerald-400" : "text-gray-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>

        {/* Send message button */}
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all disabled:opacity-50"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
