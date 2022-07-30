function ChatBubbleRe({ message, prev, image }) {
  return (
    <>
      <div className="flex items-end">
        <div className="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 ">
          <div>
            <span
              className={`inline-block rounded-lg ${
                prev ? "rounded-bl-none mb-4" : "ml-5 mb-1"
              } bg-lightblue px-4 py-2 text-gray-300`}
            >
              {message.message}
            </span>
          </div>
        </div>
        {prev ? (
          <img
            src={image}
            alt="My profile"
            className="order-1 h-6 w-6 rounded-full"
            referrerpolicy="no-referrer"
          />
        ) : null}
      </div>
    </>
  );
}

export default ChatBubbleRe;
