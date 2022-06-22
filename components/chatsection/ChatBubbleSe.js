function ChatBubbleSe({ message, prev, image }) {
  return (
    <>
      <div className="chat-message">
        <div className="flex items-end justify-end">
          <div className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2">
            <div>
              <span
                className={`inline-block rounded-lg ${
                  prev ? "rounded-br-none mb-4" : "mr-5 mb-1"
                } bg-secondary px-4 py-2 text-gray-300`}
              >
                {message.message}
              </span>
            </div>
          </div>
          {prev ? (
            <img
              src={image}
              alt="My profile"
              className="order-2 h-6 w-6 rounded-full"
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ChatBubbleSe;
